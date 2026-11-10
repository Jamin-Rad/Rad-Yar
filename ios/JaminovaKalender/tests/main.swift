import Foundation
var checks = 0
func check(_ condition: @autoclosure () -> Bool, _ message: String) {
    precondition(condition(), message); checks += 1
}
let monday = CalendarDates.previewDay
check(CalendarDates.text(monday, "EEEE") == "Montag", "fixture weekday")
let week = CalendarDates.week(containing: CalendarDates.make(2026, 11, 15))
check(week.first == monday && CalendarDates.text(week.last!, "yyyy-MM-dd") == "2026-11-15", "Monday-first week")
let newYearWeek = CalendarDates.week(containing: CalendarDates.make(2027, 1, 1))
check(CalendarDates.text(newYearWeek.first!, "yyyy-MM-dd") == "2026-12-28", "year boundary")
let spring = CalendarDates.make(2026, 3, 28, 12)
let next = CalendarDates.add(1, to: spring)
check(CalendarDates.text(next, "HH:mm") == "12:00", "Berlin wall time across DST")
check(next.timeIntervalSince(spring) == 23 * 3600, "DST 23-hour day")
var event = CalendarEvent.examples()[1]
check(event.validationMessage == nil, "valid event")
event.title = "  "
check(event.validationMessage != nil, "blank title")
event.title = "Test"
event.end = event.start
check(event.validationMessage != nil, "zero duration")
event.end = CalendarDates.add(1, to: event.start)
check(event.validationMessage != nil, "multi-day preview constraint")
func item(_ from: Int, _ to: Int) -> CalendarEvent {
    CalendarEvent(title: "Test", start: CalendarDates.at(from, on: monday), end: CalendarDates.at(to, on: monday))
}
let overlap = EventPlacement.arrange([item(540,660),item(570,600),item(600,630),item(660,720)])
check(overlap[0].lanes == 2 && overlap[1].lane == 1 && overlap[2].lane == 1, "overlap lanes reuse without covering")
check(overlap[3].lanes == 1, "adjacent event starts new group")
let triple = EventPlacement.arrange([item(540,660),item(540,630),item(600,720)])
check(triple.allSatisfy { $0.lanes == 3 }, "transitive overlap")
check(Set(triple.map(\.lane)).count == 3, "unique overlap lanes")
print("Passed \(checks) calendar model checks")
