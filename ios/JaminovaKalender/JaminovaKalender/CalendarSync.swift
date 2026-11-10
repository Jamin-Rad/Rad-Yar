import Foundation

struct CalendarWireEvent: Codable, Equatable {
    var id: UUID
    var title: String
    var note: String
    var date: String
    var startTime: String
    var endDate: String
    var endTime: String
    var allDay: Bool
    var done: Bool
    var cancelled: Bool
    var category: String
    var updatedAt: String?
    var mutationId: String?

    init(_ event: CalendarEvent) {
        id = event.id; title = event.title; note = event.note
        date = CalendarDates.text(event.start, "yyyy-MM-dd")
        allDay = event.allDay; done = event.done; cancelled = event.cancelled
        startTime = event.isBanner ? "" : CalendarDates.text(event.start, "HH:mm")
        endDate = allDay ? CalendarDates.text(event.end, "yyyy-MM-dd") : ""
        endTime = event.isBanner || event.endUnspecified ? "" : CalendarDates.text(event.end, "HH:mm")
        category = event.category.rawValue; updatedAt = event.updatedAt; mutationId = event.mutationId
    }
    func local() throws -> CalendarEvent {
        guard let day = Self.parse(date, "yyyy-MM-dd"), let category = EventCategory(rawValue: category) else { throw CalendarAPIError.invalidData }
        let start: Date
        if allDay || startTime.isEmpty { start = day }
        else {
            guard let value = Self.parse(date + " " + startTime, "yyyy-MM-dd HH:mm") else { throw CalendarAPIError.invalidData }
            start = value
        }
        let end: Date
        if allDay {
            guard let value = Self.parse(endDate.isEmpty ? date : endDate, "yyyy-MM-dd"), value >= day else { throw CalendarAPIError.invalidData }
            end = value
        } else if endTime.isEmpty { end = CalendarDates.add(30, .minute, to: start) }
        else {
            guard let value = Self.parse(date + " " + endTime, "yyyy-MM-dd HH:mm"), value > start else { throw CalendarAPIError.invalidData }
            end = value
        }
        return CalendarEvent(id: id, title: title, start: start, end: end, category: category, note: note,
            allDay: allDay, timeUnspecified: !allDay && startTime.isEmpty, endUnspecified: !allDay && endTime.isEmpty,
            done: done, cancelled: cancelled, updatedAt: updatedAt, mutationId: mutationId)
    }
    static func parse(_ text: String, _ format: String) -> Date? {
        let f = DateFormatter(); f.calendar = CalendarDates.calendar; f.timeZone = CalendarDates.calendar.timeZone
        f.locale = Locale(identifier: "en_US_POSIX"); f.dateFormat = format; f.isLenient = false
        guard let date = f.date(from: text), f.string(from: date) == text else { return nil }
        return date
    }
}

struct CalendarMutation: Codable, Identifiable, Equatable {
    var id = UUID()
    var event: CalendarEvent
    var expectedUpdatedAt: String?
    var operation = "save"
    var conflict = false
    var conflictMessage: String?
    var remote: CalendarEvent?
}
struct CalendarDiskState: Codable {
    var version = 1
    var remote: [CalendarEvent] = []
    var pending: [CalendarMutation] = []
    var lastSync: Date?
    var visible: [CalendarEvent] {
        var result = remote
        for change in pending {
            result.removeAll { $0.id == change.event.id }
            var event = change.event
            if change.operation == "cancel" { event.cancelled = true }
            result.append(event)
        }
        return result.sorted { $0.start < $1.start }
    }
    mutating func acknowledge(_ mutation: CalendarMutation, server: CalendarEvent) {
        remote.removeAll { $0.id == server.id }; remote.append(server)
        pending.removeAll { $0.id == mutation.id }
        // Later local edits on the same event build on this acknowledged version.
        if let index = pending.firstIndex(where: { $0.event.id == server.id }) {
            pending[index].expectedUpdatedAt = server.updatedAt
        }
    }
}

enum CalendarAPIError: Error, LocalizedError {
    case unauthorized, invalidData, unavailable, conflict(String, CalendarWireEvent?), rejected(String), storage
    var errorDescription: String? {
        switch self {
        case .unauthorized: return "Bitte mit deinem Jaminova-Passwort anmelden. Lokale Änderungen bleiben erhalten."
        case .invalidData: return "Die Kalenderdaten konnten nicht vollständig gelesen werden. Deine lokalen Daten bleiben erhalten."
        case .unavailable: return "Offline oder Server nicht erreichbar. Änderungen bleiben auf diesem Gerät gespeichert."
        case .conflict(let message, _), .rejected(let message): return message
        case .storage: return "Speichern auf diesem Gerät fehlgeschlagen. Bitte freien Speicher prüfen."
        }
    }
}
protocol CalendarService {
    func login(password: String) async throws -> String
    func fetch(token: String) async throws -> [CalendarEvent]
    func send(_ mutation: CalendarMutation, token: String) async throws -> CalendarEvent
}
final class CalendarAPI: NSObject, CalendarService, URLSessionTaskDelegate {
    private let base: URL
    private let configuration: URLSessionConfiguration
    init(base: URL = URL(string: "https://www.rad-yar.com")!, configuration: URLSessionConfiguration = .ephemeral) {
        self.base = base; self.configuration = configuration; super.init()
    }
    private lazy var session: URLSession = {
        configuration.httpCookieStorage = nil; configuration.httpShouldSetCookies = false
        configuration.urlCache = nil; configuration.timeoutIntervalForRequest = 25
        return URLSession(configuration: configuration, delegate: self, delegateQueue: nil)
    }()
    func urlSession(_ session: URLSession, task: URLSessionTask, willPerformHTTPRedirection response: HTTPURLResponse,
                    newRequest request: URLRequest, completionHandler: @escaping (URLRequest?) -> Void) { completionHandler(nil) }
    private func request<T: Decodable>(_ path: String, token: String? = nil, body: Data? = nil, after: String? = nil) async throws -> T {
        var url = URLComponents(url: base.appendingPathComponent(path), resolvingAgainstBaseURL: false)!
        if let after { url.queryItems = [URLQueryItem(name: "after", value: after)] }
        var request = URLRequest(url: url.url!)
        request.httpMethod = body == nil ? "GET" : "POST"; request.httpBody = body
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        if body != nil { request.setValue("application/json", forHTTPHeaderField: "Content-Type") }
        if let token { request.setValue(token, forHTTPHeaderField: "X-Andarun-Token") }
        let data: Data; let response: URLResponse
        do { (data, response) = try await session.data(for: request) } catch { throw CalendarAPIError.unavailable }
        guard let http = response as? HTTPURLResponse else { throw CalendarAPIError.invalidData }
        if http.statusCode == 401 || http.statusCode == 403 { throw CalendarAPIError.unauthorized }
        if http.statusCode == 409 {
            let result = try? JSONDecoder().decode(Failure.self, from: data)
            throw CalendarAPIError.conflict(result?.error ?? "Termin wurde inzwischen geändert.", result?.current)
        }
        if http.statusCode == 400 || http.statusCode == 413 {
            throw CalendarAPIError.rejected((try? JSONDecoder().decode(Failure.self, from: data))?.error ?? "Bitte den Termin prüfen.")
        }
        guard (200..<300).contains(http.statusCode) else { throw CalendarAPIError.unavailable }
        do { return try JSONDecoder().decode(T.self, from: data) } catch { throw CalendarAPIError.invalidData }
    }
    private struct Failure: Decodable { var error: String; var current: CalendarWireEvent? }
    private struct Login: Decodable { var token: String }
    private struct Page: Decodable { var events: [CalendarWireEvent]; var nextCursor: String? }
    private struct Saved: Decodable { var event: CalendarWireEvent }
    func login(password: String) async throws -> String {
        let result: Login = try await request("api/andarun/login", body: JSONSerialization.data(withJSONObject: ["password": password, "client": "mobile"]))
        guard !result.token.isEmpty else { throw CalendarAPIError.invalidData }; return result.token
    }
    func fetch(token: String) async throws -> [CalendarEvent] {
        var values: [UUID: CalendarEvent] = [:]; var cursor: String?; var cursors = Set<String>()
        repeat {
            let page: Page = try await request("api/andarun/calendar", token: token, after: cursor)
            for item in page.events { values[item.id] = try item.local() }
            cursor = page.nextCursor
            if let cursor, !cursors.insert(cursor).inserted { throw CalendarAPIError.invalidData }
        } while cursor != nil
        return Array(values.values)
    }
    func send(_ mutation: CalendarMutation, token: String) async throws -> CalendarEvent {
        var payload: [String: Any] = ["id": mutation.event.id.uuidString, "mutationId": mutation.id.uuidString,
            "expectedUpdatedAt": mutation.expectedUpdatedAt as Any? ?? NSNull(), "operation": mutation.operation]
        payload["event"] = try JSONSerialization.jsonObject(with: JSONEncoder().encode(CalendarWireEvent(mutation.event)))
        let saved: Saved = try await request("api/andarun/calendar", token: token, body: JSONSerialization.data(withJSONObject: payload))
        return try saved.event.local()
    }
}
