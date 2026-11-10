import SwiftUI

@main
struct JaminovaKalenderApp: App {
    var body: some Scene {
        WindowGroup {
            CalendarRootView()
                .environment(\.locale, Locale(identifier: "de_DE"))
                .environment(\.calendar, CalendarDates.calendar)
                .environment(\.timeZone, CalendarDates.calendar.timeZone)
                .preferredColorScheme(.light)
        }
    }
}
