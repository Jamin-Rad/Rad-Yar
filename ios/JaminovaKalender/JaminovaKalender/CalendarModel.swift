import Foundation

enum CalendarDates {
    static var calendar: Calendar {
        var value = Calendar(identifier: .gregorian)
        value.timeZone = TimeZone(identifier: "Europe/Berlin")!
        value.locale = Locale(identifier: "de_DE")
        value.firstWeekday = 2
        value.minimumDaysInFirstWeek = 4
        return value
    }
    static let previewDay = make(2026, 11, 9)
    static let previewNow = make(2026, 11, 9, 10, 30)
    static func make(_ year: Int, _ month: Int, _ day: Int, _ hour: Int = 0, _ minute: Int = 0) -> Date {
        calendar.date(from: DateComponents(year: year, month: month, day: day, hour: hour, minute: minute))!
    }
    static func add(_ count: Int, _ component: Calendar.Component = .day, to date: Date) -> Date {
        calendar.date(byAdding: component, value: count, to: date)!
    }
    static func text(_ date: Date, _ format: String) -> String {
        let formatter = DateFormatter()
        formatter.calendar = calendar
        formatter.locale = Locale(identifier: "de_DE")
        formatter.timeZone = calendar.timeZone
        formatter.dateFormat = format
        return formatter.string(from: date)
    }
    static func week(containing date: Date) -> [Date] {
        let start = calendar.dateInterval(of: .weekOfYear, for: date)!.start
        return (0..<7).map { add($0, to: start) }
    }
    static func minute(_ date: Date) -> Int {
        calendar.component(.hour, from: date) * 60 + calendar.component(.minute, from: date)
    }
    static func at(_ minute: Int, on day: Date) -> Date {
        calendar.date(bySettingHour: minute / 60, minute: minute % 60, second: 0, of: day)!
    }
    static func sameDay(_ a: Date, _ b: Date) -> Bool { calendar.isDate(a, inSameDayAs: b) }
}

enum EventCategory: String, CaseIterable, Identifiable, Codable {
    case work = "Arbeit", personal = "Privat", focus = "Fokus"
    var id: String { rawValue }
    var symbol: String {
        switch self { case .work: return "briefcase"; case .personal: return "leaf"; case .focus: return "sparkle" }
    }
}

struct CalendarEvent: Identifiable, Equatable, Codable {
    var id = UUID()
    var title: String
    var start: Date
    var end: Date
    var category: EventCategory = .work
    var note = ""
    var reminder = 0
    var allDay = false
    var timeUnspecified = false
    var endUnspecified = false
    var done = false
    var cancelled = false
    var updatedAt: String?
    var mutationId: String?
    var isActive: Bool { !done && !cancelled }
    var isBanner: Bool { allDay || timeUnspecified }
    func occurs(on date: Date) -> Bool {
        let day = CalendarDates.calendar.startOfDay(for: date)
        return allDay ? day >= CalendarDates.calendar.startOfDay(for: start) && day <= CalendarDates.calendar.startOfDay(for: end) : CalendarDates.sameDay(start, date)
    }
    var timeLabel: String {
        if allDay { return CalendarDates.sameDay(start, end) ? "Ganztägig" : "Ganztägig · " + CalendarDates.text(end, "d. MMM yyyy") }
        if timeUnspecified { return "Ohne Uhrzeit" }
        return CalendarDates.text(start, "HH:mm") + (endUnspecified ? "" : " – " + CalendarDates.text(end, "HH:mm"))
    }
    var validationMessage: String? {
        if title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty { return "Bitte gib einen Titel ein." }
        if title.count > 240 { return "Der Titel darf höchstens 240 Zeichen enthalten." }
        if note.count > 500 { return "Die Notiz darf höchstens 500 Zeichen enthalten." }
        if allDay {
            return CalendarDates.calendar.startOfDay(for: end) < CalendarDates.calendar.startOfDay(for: start) ? "Das Ende darf nicht vor dem Beginn liegen." : nil
        }
        if timeUnspecified || endUnspecified { return nil }
        if end <= start { return "Das Ende muss nach dem Beginn liegen." }
        if !CalendarDates.sameDay(start, end) { return "Bitte für mehrtägige Termine „Ganztägig“ wählen." }
        return nil
    }
    static func examples() -> [CalendarEvent] {
        func event(_ day: Int, _ title: String, _ start: Int, _ end: Int, _ category: EventCategory = .work, _ note: String = "") -> CalendarEvent {
            let date = CalendarDates.add(day, to: CalendarDates.previewDay)
            return CalendarEvent(title: title, start: CalendarDates.at(start, on: date), end: CalendarDates.at(end, on: date), category: category, note: note)
        }
        return [
            event(0, "Fokuszeit", 540, 600, .focus),
            event(0, "Projektbesprechung", 660, 720, .work, "Nächste Schritte besprechen."),
            event(0, "Spaziergang", 810, 840, .personal),
            event(0, "Lesen", 1020, 1080, .personal),
            event(1, "E-Mails", 600, 630), event(1, "Planung", 900, 960),
            event(2, "Sport", 510, 570, .personal), event(2, "Einkauf", 960, 1020, .personal),
            event(3, "Konzept", 540, 600, .focus), event(3, "Teammeeting", 660, 720), event(3, "Review", 840, 900),
            event(3, "Arzttermin", 930, 990, .personal), event(4, "Wandern", 600, 720, .personal),
            event(5, "Familienessen", 750, 840, .personal)
        ]
    }
}

/// Group intersecting intervals before assigning widths so later overlaps cannot cover earlier events.
struct EventPlacement: Identifiable {
    var event: CalendarEvent
    var lane: Int
    var lanes: Int
    var id: UUID { event.id }
    static func arrange(_ events: [CalendarEvent]) -> [EventPlacement] {
        let sorted = events.sorted { $0.start == $1.start ? $0.end < $1.end : $0.start < $1.start }
        var groups: [[CalendarEvent]] = []
        var groupEnd = Date.distantPast
        for event in sorted {
            if event.start >= groupEnd { groups.append([event]); groupEnd = event.end }
            else { groups[groups.count - 1].append(event); groupEnd = max(groupEnd, event.end) }
        }
        return groups.flatMap { group in
            var ends: [Date] = []
            var placements: [EventPlacement] = []
            for event in group {
                let lane = ends.firstIndex(where: { $0 <= event.start }) ?? ends.count
                if lane == ends.count { ends.append(event.end) } else { ends[lane] = event.end }
                placements.append(EventPlacement(event: event, lane: lane, lanes: 1))
            }
            return placements.map { EventPlacement(event: $0.event, lane: $0.lane, lanes: ends.count) }
        }
    }
}
