import Foundation
import Combine
import Security

protocol CalendarCredentials {
    func read() -> String?
    func write(_ token: String) throws
    func clear() throws
}
struct CalendarKeychain: CalendarCredentials {
    private var query: [String: Any] { [kSecClass as String: kSecClassGenericPassword,
        kSecAttrService as String: "com.radyar.jaminovakalender", kSecAttrAccount as String: "andarun-session"] }
    func read() -> String? {
        var q = query; q[kSecReturnData as String] = true; q[kSecMatchLimit as String] = kSecMatchLimitOne
        var value: CFTypeRef?
        guard SecItemCopyMatching(q as CFDictionary, &value) == errSecSuccess, let data = value as? Data else { return nil }
        return String(data: data, encoding: .utf8)
    }
    func write(_ token: String) throws {
        let attributes: [String: Any] = [kSecValueData as String: Data(token.utf8), kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlockedThisDeviceOnly]
        let result = SecItemUpdate(query as CFDictionary, attributes as CFDictionary)
        if result == errSecItemNotFound {
            guard SecItemAdd(query.merging(attributes) { _, new in new } as CFDictionary, nil) == errSecSuccess else { throw CalendarAPIError.storage }
        } else if result != errSecSuccess { throw CalendarAPIError.storage }
    }
    func clear() throws {
        let result = SecItemDelete(query as CFDictionary)
        guard result == errSecSuccess || result == errSecItemNotFound else { throw CalendarAPIError.storage }
    }
}

@MainActor final class CalendarStore: ObservableObject {
    @Published private(set) var state = CalendarDiskState()
    @Published private(set) var authenticated = false
    @Published private(set) var needsLogin = false
    @Published private(set) var syncing = false
    @Published private(set) var loggingIn = false
    @Published private(set) var storageReady = true
    @Published var message: String?
    private var token: String?
    private let api: CalendarService
    private let credentials: CalendarCredentials
    private let file: URL
    private var generation = UUID()
    var events: [CalendarEvent] { state.visible.filter(\.isActive) }
    var conflicts: [CalendarMutation] { state.pending.filter(\.conflict) }
    var pendingCount: Int { state.pending.count }
    var status: String {
        if !storageReady { return "Lokaler Speicher nicht verfügbar" }
        if needsLogin { return "Anmeldung erneuern · Änderungen gesichert" }
        if !conflicts.isEmpty { return "\(conflicts.count) Änderung(en) vergleichen" }
        if syncing { return "Wird synchronisiert …" }
        if pendingCount > 0 { return "\(pendingCount) Änderung(en) auf diesem Gerät gesichert" }
        if message != nil { return "Offline · Letzter gespeicherter Stand" }
        if let date = state.lastSync { return "Synchronisiert · " + CalendarDates.text(date, "HH:mm") }
        return "Noch nicht synchronisiert"
    }
    init(api: CalendarService = CalendarAPI(), credentials: CalendarCredentials = CalendarKeychain(), directory: URL? = nil) {
        self.api = api; self.credentials = credentials
        let folder = directory ?? FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0].appendingPathComponent("JaminovaKalender", isDirectory: true)
        file = folder.appendingPathComponent("calendar-v1.json")
        token = credentials.read(); authenticated = token != nil
        if authenticated { load() }
    }
    private func load() {
        guard FileManager.default.fileExists(atPath: file.path) else { return }
        do {
            let data = try JSONDecoder().decode(CalendarDiskState.self, from: Data(contentsOf: file))
            guard data.version == 1 else { throw CalendarAPIError.invalidData }
            state = data; storageReady = true
        } catch { storageReady = false; message = "Der gespeicherte Kalender konnte nicht gelesen werden. Die Datei bleibt unverändert. Bitte die App nicht löschen." }
    }
    @discardableResult private func commit(_ next: CalendarDiskState) -> Bool {
        guard storageReady else { return false }
        do {
            try FileManager.default.createDirectory(at: file.deletingLastPathComponent(), withIntermediateDirectories: true)
            let bytes = try JSONEncoder().encode(next)
            #if os(iOS)
            try bytes.write(to: file, options: [.atomic, .completeFileProtection])
            #else
            try bytes.write(to: file, options: [.atomic])
            #endif
            state = next
            return true
        } catch { message = CalendarAPIError.storage.localizedDescription; return false }
    }
    func login(password: String) async {
        guard !loggingIn, !syncing else { return }
        loggingIn = true; message = nil
        defer { loggingIn = false }
        do {
            let value = try await api.login(password: password)
            try credentials.write(value); token = value; authenticated = true; needsLogin = false
            load()
            await sync()
        } catch { message = error.localizedDescription }
    }
    func logout() {
        guard !syncing, !loggingIn, state.pending.isEmpty, storageReady else {
            message = "Bitte zuerst ausstehende Änderungen synchronisieren oder Konflikte klären."; return
        }
        do {
            // Clear the durable snapshot before removing the credential; failures never hide pending work.
            if FileManager.default.fileExists(atPath: file.path) { try FileManager.default.removeItem(at: file) }
            try credentials.clear()
            generation = UUID(); token = nil; authenticated = false; needsLogin = false
            state = CalendarDiskState(); message = nil
        } catch { message = CalendarAPIError.storage.localizedDescription }
    }
    @discardableResult func save(_ event: CalendarEvent, cancel: Bool = false) -> Bool {
        guard authenticated, storageReady, event.validationMessage == nil || cancel else { return false }
        guard !state.pending.contains(where: { $0.event.id == event.id && $0.conflict }) else {
            message = "Bitte zuerst den Konflikt dieses Termins im Profil klären."; return false
        }
        var next = state
        // Keep each operation stable, including across process death and a lost server response.
        next.pending.append(CalendarMutation(event: event, expectedUpdatedAt: event.updatedAt, operation: cancel ? "cancel" : "save"))
        guard commit(next) else { return false }
        message = nil
        Task { await sync() }
        return true
    }
    func sync() async {
        guard !syncing, storageReady, !needsLogin, let token else { return }
        syncing = true
        let epoch = generation
        defer { syncing = false }
        do {
            let remote = try await api.fetch(token: token)
            guard epoch == generation else { return }
            var next = state; next.remote = remote
            guard commit(next) else { return }
            var blocked = Set(state.pending.filter(\.conflict).map { $0.event.id })
            while let mutation = state.pending.first(where: { !blocked.contains($0.event.id) }) {
                do {
                    let saved = try await api.send(mutation, token: token)
                    guard epoch == generation else { return }
                    var acknowledged = state; acknowledged.acknowledge(mutation, server: saved)
                    guard commit(acknowledged) else { return }
                } catch CalendarAPIError.conflict(let text, let current) {
                    var conflicted = state
                    if let index = conflicted.pending.firstIndex(where: { $0.id == mutation.id }) {
                        conflicted.pending[index].conflict = true; conflicted.pending[index].conflictMessage = text
                        conflicted.pending[index].remote = try current?.local()
                    }
                    guard commit(conflicted) else { return }
                    blocked.insert(mutation.event.id)
                } catch CalendarAPIError.rejected(let text) {
                    var rejected = state
                    if let index = rejected.pending.firstIndex(where: { $0.id == mutation.id }) {
                        rejected.pending[index].conflict = true; rejected.pending[index].conflictMessage = text
                        rejected.pending[index].remote = rejected.remote.first { $0.id == mutation.event.id }
                    }
                    guard commit(rejected) else { return }; blocked.insert(mutation.event.id)
                }
            }
            guard epoch == generation else { return }
            var finished = state; finished.lastSync = Date()
            if commit(finished) { message = nil }
        } catch {
            guard epoch == generation else { return }
            if case CalendarAPIError.unauthorized = error { needsLogin = true }
            message = error.localizedDescription
        }
    }
    func resolve(_ change: CalendarMutation, keepLocal: Bool) {
        guard !syncing, let conflict = state.pending.first(where: { $0.id == change.id && $0.conflict }) else { return }
        var next = state
        let latest = next.pending.last { $0.event.id == conflict.event.id } ?? conflict
        next.pending.removeAll { $0.event.id == conflict.event.id }
        next.remote.removeAll { $0.id == conflict.event.id }
        if let remote = conflict.remote { next.remote.append(remote) }
        if keepLocal {
            var event = latest.event
            if conflict.remote == nil {
                // Explicitly chosen recovery creates a new ID; a deleted server event is never resurrected silently.
                event.id = UUID(); event.updatedAt = nil
            } else { event.updatedAt = conflict.remote?.updatedAt }
            if conflict.remote != nil || latest.operation != "cancel" {
                next.pending.append(CalendarMutation(event: event, expectedUpdatedAt: event.updatedAt, operation: latest.operation))
            }
        }
        if commit(next) { message = nil; Task { await sync() } }
    }
}

extension CalendarStore {
    static func application() -> CalendarStore {
        #if CALENDAR_QA
        precondition(Bundle.main.bundleIdentifier == "com.radyar.jaminovakalender.preview")
        return CalendarStore(api: CalendarQAService(), credentials: CalendarQACredentials())
        #else
        return CalendarStore()
        #endif
    }
}
#if CALENDAR_QA
// Synthetic simulator-only data. This service never performs a network request.
private struct CalendarQACredentials: CalendarCredentials {
    func read() -> String? { "synthetic-session" }
    func write(_ token: String) throws {}
    func clear() throws {}
}
@MainActor private final class CalendarQAService: CalendarService {
    private var records: [UUID: CalendarEvent] = [:]
    init() {
        let today = CalendarDates.calendar.startOfDay(for: Date())
        let event = CalendarEvent(id: UUID(uuidString: "11111111-1111-4111-8111-111111111111")!, title: "Projektbesprechung", start: CalendarDates.at(660, on: today), end: CalendarDates.at(720, on: today), note: "Synthetische Testdaten", updatedAt: "2026-11-10T09:00:00Z")
        let banner = CalendarEvent(id: UUID(uuidString: "22222222-2222-4222-8222-222222222222")!, title: "Ganztägiger Termin", start: today, end: CalendarDates.add(2, to: today), allDay: true, updatedAt: "2026-11-10T09:00:00Z")
        records[event.id] = event; records[banner.id] = banner
    }
    func login(password: String) async throws -> String { "synthetic-session" }
    func fetch(token: String) async throws -> [CalendarEvent] { Array(records.values) }
    func send(_ mutation: CalendarMutation, token: String) async throws -> CalendarEvent {
        if records[mutation.event.id]?.updatedAt != mutation.expectedUpdatedAt {
            throw CalendarAPIError.conflict("Auf einem anderen Gerät geändert.", records[mutation.event.id].map(CalendarWireEvent.init))
        }
        var event = mutation.event; event.updatedAt = ISO8601DateFormatter().string(from: Date()); event.mutationId = mutation.id.uuidString
        if mutation.operation == "cancel" { event.cancelled = true }
        records[event.id] = event
        return event
    }
}
#endif
