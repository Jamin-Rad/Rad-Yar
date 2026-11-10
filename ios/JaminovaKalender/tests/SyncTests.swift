import Foundation

final class TestCredentials: CalendarCredentials {
    var value: String? = "test-session"
    func read() -> String? { value }
    func write(_ token: String) throws { value = token }
    func clear() throws { value = nil }
}
@MainActor final class FakeCalendarService: CalendarService {
    var rows: [UUID: CalendarEvent] = [:]
    var offline = true
    var unauthorized = false
    var loseReply = false
    var revision = 0
    var sent = 0
    func login(password: String) async throws -> String { "test-session" }
    func fetch(token: String) async throws -> [CalendarEvent] {
        if unauthorized { throw CalendarAPIError.unauthorized }
        if offline { throw CalendarAPIError.unavailable }
        return Array(rows.values)
    }
    func send(_ mutation: CalendarMutation, token: String) async throws -> CalendarEvent {
        if offline { throw CalendarAPIError.unavailable }
        sent += 1
        let current = rows[mutation.event.id]
        if current?.mutationId == mutation.id.uuidString { return current! }
        if current?.updatedAt != mutation.expectedUpdatedAt {
            throw CalendarAPIError.conflict("Changed elsewhere", current.map(CalendarWireEvent.init))
        }
        revision += 1
        var next = mutation.event; next.updatedAt = "version-\(revision)"; next.mutationId = mutation.id.uuidString
        if mutation.operation == "cancel" { next.cancelled = true }
        rows[next.id] = next
        if loseReply { loseReply = false; throw CalendarAPIError.unavailable }
        return next
    }
}
@main struct SyncTests {
    @MainActor static func main() async throws {
        var count = 0
        func check(_ condition: @autoclosure () -> Bool, _ message: String) { precondition(condition(), message); count += 1 }
        let root = FileManager.default.temporaryDirectory.appendingPathComponent("calendar-tests-" + UUID().uuidString)
        defer { try? FileManager.default.removeItem(at: root) }
        let api = FakeCalendarService(); let credentials = TestCredentials()
        let first = CalendarStore(api: api, credentials: credentials, directory: root.appendingPathComponent("phone"))
        var draft = CalendarEvent(title: "Phone offline", start: CalendarDates.make(2026,11,10,10), end: CalendarDates.make(2026,11,10,11), note: "فارسی 👨‍👩‍👧‍👦")
        check(first.save(draft), "offline save durable before success")
        await first.sync()
        check(first.pendingCount == 1 && first.events.first?.title == "Phone offline", "offline retains pending and visible")
        let restarted = CalendarStore(api: api, credentials: credentials, directory: root.appendingPathComponent("phone"))
        check(restarted.pendingCount == 1 && restarted.events.first?.note == draft.note, "process restart restores queue + Unicode")
        restarted.logout(); check(restarted.authenticated, "logout cannot erase unsynced work")
        api.offline = false; api.loseReply = true
        await restarted.sync()
        check(api.rows.count == 1 && restarted.pendingCount == 1, "lost response keeps queue")
        await restarted.sync()
        check(api.rows.count == 1 && restarted.pendingCount == 0, "retry creates no duplicate")
        let tablet = CalendarStore(api: api, credentials: TestCredentials(), directory: root.appendingPathComponent("ipad"))
        await tablet.sync(); check(tablet.events.first?.note == draft.note, "second device receives phone write")
        api.offline = true
        draft = restarted.events.first!; draft.title = "Offline phone edit"
        check(restarted.save(draft), "offline edit queued")
        await restarted.sync()
        api.offline = false
        var other = tablet.events.first!; other.title = "Web / ChatGPT edit"
        var external = other; external.updatedAt = "external-version"; external.mutationId = nil; api.rows[external.id] = external
        await restarted.sync()
        check(restarted.conflicts.count == 1, "concurrent edit becomes conflict")
        check(restarted.events.first?.title == "Offline phone edit", "local draft retained during conflict")
        check(api.rows[external.id]?.title == "Web / ChatGPT edit", "remote not overwritten")
        let conflictRestart = CalendarStore(api: api, credentials: credentials, directory: root.appendingPathComponent("phone"))
        check(conflictRestart.conflicts.count == 1, "conflict survives process restart")
        conflictRestart.resolve(conflictRestart.conflicts[0], keepLocal: false)
        await conflictRestart.sync()
        check(conflictRestart.pendingCount == 0 && conflictRestart.events.first?.title == external.title, "explicit server resolution")
        api.offline = true
        var changed = conflictRestart.events[0]; changed.title = "Retained after deletion"
        check(conflictRestart.save(changed), "queue after server resolution")
        await conflictRestart.sync(); api.rows.removeValue(forKey: changed.id); api.offline = false
        await conflictRestart.sync(); check(conflictRestart.conflicts.count == 1, "remote deletion not resurrected")
        conflictRestart.resolve(conflictRestart.conflicts[0], keepLocal: true)
        await conflictRestart.sync()
        check(conflictRestart.events[0].id != changed.id && api.rows.count == 1, "explicit save-copy creates fresh ID")
        let saved = conflictRestart.events[0]
        check(conflictRestart.save(saved, cancel: true), "cancel durably queued")
        await conflictRestart.sync(); await tablet.sync()
        check(tablet.events.isEmpty && api.rows[saved.id]?.cancelled == true, "cancel syncs without hard delete")
        api.unauthorized = true; await conflictRestart.sync()
        check(conflictRestart.needsLogin && conflictRestart.authenticated, "expired auth keeps local data")
        let corrupt = root.appendingPathComponent("corrupt")
        try FileManager.default.createDirectory(at: corrupt, withIntermediateDirectories: true)
        try Data("not json".utf8).write(to: corrupt.appendingPathComponent("calendar-v1.json"))
        let broken = CalendarStore(api: api, credentials: TestCredentials(), directory: corrupt)
        check(!broken.storageReady && !broken.save(draft), "corrupt cache fails closed without replacement")
        let corruptText = try String(contentsOf: corrupt.appendingPathComponent("calendar-v1.json"), encoding:.utf8)
        check(corruptText == "not json", "corrupt source retained")
        let badFolder = root.appendingPathComponent("not-directory")
        try Data().write(to: badFolder)
        let noDisk = CalendarStore(api: api, credentials: TestCredentials(), directory: badFolder)
        check(!noDisk.save(draft) && noDisk.pendingCount == 0, "disk error is not reported as saved")
        var allDay = CalendarEvent(title:"Multi-day", start:CalendarDates.make(2026,10,24), end:CalendarDates.make(2026,10,27), allDay:true)
        let roundTrip = try CalendarWireEvent(allDay).local()
        check(roundTrip.occurs(on:CalendarDates.make(2026,10,25)), "all-day spans DST")
        check(roundTrip.occurs(on:CalendarDates.make(2026,10,27)), "all-day end inclusive")
        check(!roundTrip.occurs(on:CalendarDates.make(2026,10,28)), "all-day ends correctly")
        check(roundTrip.validationMessage == nil, "multi-day valid")
        allDay.allDay=false; allDay.timeUnspecified=true; allDay.endUnspecified=true
        let untimed=try CalendarWireEvent(allDay).local()
        check(untimed.timeUnspecified && untimed.endUnspecified, "untimed is not converted to midnight appointment")
        check(CalendarWireEvent.parse("2026-03-29 02:30", "yyyy-MM-dd HH:mm") == nil, "nonexistent Berlin DST time not silently shifted")
        var state=CalendarDiskState(); let a=CalendarMutation(event:draft,expectedUpdatedAt:nil)
        let b=CalendarMutation(event:draft,expectedUpdatedAt:nil);state.pending=[a,b]
        var answer=draft;answer.updatedAt="ack-version";state.acknowledge(a,server:answer)
        check(state.pending[0].expectedUpdatedAt=="ack-version", "queued local edit advances only after preceding acknowledgment")
        print("Passed \(count) persistence and two-device sync checks")
    }
}
