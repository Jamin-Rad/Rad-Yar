import SwiftUI

enum CalendarMode: String, CaseIterable, Identifiable {
    case day = "Tag", week = "Woche", month = "Monat"
    var id: String { rawValue }
}

enum CalendarSheet: Identifiable {
    case details(UUID), editor(CalendarEvent), profile
    var id: String {
        switch self {
        case .details(let id): return "details-\(id)"
        case .editor(let event): return "editor-\(event.id)"
        case .profile: return "profile"
        }
    }
}

struct CalendarRootView: View {
    @StateObject private var store = CalendarStore.application()
    private var events: [CalendarEvent] { store.events }
    @Environment(\.scenePhase) private var scenePhase
    @State private var selectedID: UUID?
    @State private var date = Date()
    @State private var mode = CalendarMode.week
    @State private var tab = 0
    @State private var sheet: CalendarSheet?
    @Environment(\.dynamicTypeSize) private var typeSize

    private var selected: CalendarEvent? { events.first { $0.id == selectedID } }
    private var week: [Date] { CalendarDates.week(containing: date) }

    var body: some View {
        GeometryReader { geometry in
            ZStack {
                CalendarBackdrop()
                if !store.authenticated {
                    CalendarLogin(store: store)
                } else if geometry.size.width >= 740 && !typeSize.isAccessibilitySize {
                    tablet(size: geometry.size)
                } else {
                    phone
                }
            }
            .foregroundStyle(CalendarStyle.ink)
            .sheet(item: $sheet) { destination in
                sheetContent(destination)
                    .tint(CalendarStyle.olive)
                    .presentationDragIndicator(.visible)
            }
        }
        .tint(CalendarStyle.olive)
        .safeAreaInset(edge: .top, spacing: 0) {
            if store.authenticated {
                Button { sheet = .profile } label: {
                    HStack(spacing: 8) {
                        if store.syncing { ProgressView().controlSize(.small) }
                        else { Image(systemName: store.conflicts.isEmpty ? "icloud" : "exclamationmark.arrow.triangle.2.circlepath") }
                        Text(store.status).font(.caption).lineLimit(2)
                        Spacer()
                        Image(systemName: "chevron.right").font(.caption2)
                    }.padding(.horizontal, 24).padding(.vertical, 7)
                        .foregroundStyle(CalendarStyle.olive).background(CalendarStyle.canvas)
                }.buttonStyle(.plain).accessibilityIdentifier("sync-status")
            }
        }
        .task(id: scenePhase) {
            guard scenePhase == .active else { return }
            while !Task.isCancelled {
                await store.sync()
                do { try await Task.sleep(for: .seconds(15)) } catch { break }
            }
        }
    }

    private var phone: some View {
        VStack(spacing: 0) {
            HStack(alignment: .top) {
                BrandWordmark()
                Spacer()
                AvatarButton { sheet = .profile }
            }.padding(.horizontal, 24).padding(.top, 10)
            if tab == 0 {
                phoneDateHeader
                CalendarTimeline(days: [date], events: events, selectedID: selectedID, dayView: true,
                    onSelect: { select($0, inline: false) }, onCreate: create)
                    .padding(.horizontal, 17)
            } else {
                HStack {
                    Text(CalendarDates.text(date, "MMMM yyyy")).font(CalendarStyle.serif(26))
                    Spacer()
                    periodControls(showTitle: false)
                }.padding(.horizontal, 24).padding(.vertical, 18)
                Picker("Ansicht", selection: $mode) {
                    ForEach(CalendarMode.allCases) { Text($0.rawValue).tag($0) }
                }.pickerStyle(.segmented).padding(.horizontal, 24).padding(.bottom, 12)
                calendarContent(inline: false)
                    .padding(.horizontal, 17)
            }
            HStack {
                Spacer()
                AddEventButton { create(date, 660) }
            }.padding(.horizontal, 22).padding(.top, 10).padding(.bottom, 8)
            phoneNavigation
        }
    }

    private var phoneDateHeader: some View {
        HStack(alignment: .center, spacing: 4) {
            VStack(alignment: .leading, spacing: 12) {
                Text(CalendarDates.sameDay(date, Date()) ? "Heute" : CalendarDates.text(date, "EEEE"))
                    .font(.system(size: 30, weight: .bold))
                HStack(spacing: 12) {
                    Text(CalendarDates.text(date, "d")).font(.custom("Georgia-Bold", size: 66, relativeTo: .largeTitle))
                    VStack(alignment: .leading, spacing: 4) {
                        Text(CalendarDates.text(date, "EEEE") + ",").font(.system(size: 19, weight: .semibold))
                        Text(CalendarDates.text(date, "MMMM yyyy")).font(.system(size: 15))
                    }
                }
            }
            Spacer(minLength: 0)
            Image("CalendarOrnament").resizable().scaledToFit().frame(width: 126, height: 139)
                .accessibilityHidden(true)
        }
        .padding(.horizontal, 24).padding(.top, 20).padding(.bottom, 15)
        .overlay(alignment: .bottom) { Rectangle().fill(CalendarStyle.line).frame(height: 1).padding(.horizontal, 24) }
        .padding(.bottom, 14)
    }

    private var phoneNavigation: some View {
        HStack(spacing: 0) {
            navigationItem("Heute", image: "NavigationHome", index: 0) {
                tab = 0; date = Date()
            }
            navigationItem("Kalender", image: "CalendarOrnament", index: 1) { tab = 1; mode = .month }
            navigationItem("Profil", image: "NavigationFriends", index: 2) { sheet = .profile }
        }.padding(.top, 5).padding(.bottom, 4).pearlSurface(24)
            .padding(.horizontal, 5)
    }

    private func navigationItem(_ title: String, image: String, index: Int, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            VStack(spacing: 1) {
                Image(image).resizable().scaledToFit().frame(width: 44, height: 40)
                Text(title).font(.system(size: 12, weight: tab == index ? .semibold : .regular))
            }.frame(maxWidth: .infinity).frame(minHeight: 57)
                .foregroundStyle(tab == index ? CalendarStyle.olive : CalendarStyle.ink)
        }.buttonStyle(.plain).accessibilityIdentifier("tab-\(index)")
            .accessibilityAddTraits(tab == index ? .isSelected : [])
    }

    private func tablet(size: CGSize) -> some View {
        let inspectorVisible = size.width >= 1050
        return VStack(spacing: 22) {
            HStack(spacing: 22) {
                BrandWordmark(compact: true)
                Spacer(minLength: 12)
                Picker("Ansicht", selection: $mode) {
                    ForEach(CalendarMode.allCases) { Text($0.rawValue).tag($0) }
                }.pickerStyle(.segmented).frame(width: 265).accessibilityIdentifier("view-mode")
                AddEventButton { create(date, 660) }
                AvatarButton { sheet = .profile }
            }
            HStack {
                Text(CalendarDates.text(date, "MMMM yyyy")).font(CalendarStyle.serif(35))
                Spacer()
                periodControls()
                Spacer().frame(width: inspectorVisible ? 285 : 0)
            }.frame(height: 52)
            HStack(alignment: .top, spacing: 14) {
                calendarContent(inline: inspectorVisible)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .pearlSurface(20)
                if inspectorVisible {
                    if let selected {
                        EventInspector(event: selected, onEdit: { sheet = .editor(selected) }, onDelete: delete)
                            .frame(width: 280).frame(maxHeight: .infinity).pearlSurface(24)
                    } else {
                        VStack(spacing: 18) {
                            Image("CalendarOrnament").resizable().scaledToFit().frame(height: 140)
                            Text("Deine Woche").font(.title2.bold())
                            Text("Wähle einen Termin, um die Details zu sehen.").multilineTextAlignment(.center).foregroundStyle(CalendarStyle.muted)
                            Spacer()
                        }.padding(24).frame(width: 280).frame(maxHeight: .infinity).pearlSurface(24)
                    }
                }
            }
        }.padding(.horizontal, 27).padding(.top, 20).padding(.bottom, 18)
    }

    @ViewBuilder private func calendarContent(inline: Bool) -> some View {
        if mode == .month {
            MonthCalendar(date: date, events: events) { day in date = day; mode = .day }
        } else {
            CalendarTimeline(days: mode == .day ? [date] : week, events: events, selectedID: selectedID, dayView: mode == .day,
                onSelect: { select($0, inline: inline) }, onCreate: create)
        }
    }

    private func periodControls(showTitle: Bool = true) -> some View {
        HStack(spacing: 16) {
            Button { move(-1) } label: { Image(systemName: "chevron.left").frame(width: 40, height: 40).pearlSurface(20) }
                .accessibilityLabel("Zurück").accessibilityIdentifier("previous-period")
            if showTitle {
                Text(rangeTitle).font(.system(size: 18, weight: .semibold)).lineLimit(1)
                    .accessibilityIdentifier("period-title")
            }
            Button { move(1) } label: { Image(systemName: "chevron.right").frame(width: 40, height: 40).pearlSurface(20) }
                .accessibilityLabel("Weiter").accessibilityIdentifier("next-period")
        }.buttonStyle(.plain)
    }
    private var rangeTitle: String {
        switch mode {
        case .day: return CalendarDates.text(date, "d. MMM")
        case .month: return CalendarDates.text(date, "MMM yyyy")
        case .week:
            let sameMonth = CalendarDates.calendar.component(.month, from: week[0]) == CalendarDates.calendar.component(.month, from: week[6])
            return CalendarDates.text(week[0], sameMonth ? "d." : "d. MMM") + " – " + CalendarDates.text(week[6], "d. MMMM")
        }
    }
    private func move(_ amount: Int) {
        date = CalendarDates.add(mode == .week ? amount * 7 : amount, mode == .month ? .month : .day, to: date)
    }
    private func select(_ event: CalendarEvent, inline: Bool) {
        selectedID = event.id
        if !inline { sheet = .details(event.id) }
    }
    private func create(_ day: Date, _ minute: Int) {
        let start = CalendarDates.at(min(minute, 23 * 60), on: day)
        sheet = .editor(CalendarEvent(title: "", start: start, end: CalendarDates.add(30, .minute, to: start)))
    }
    private func save(_ event: CalendarEvent) {
        guard event.validationMessage == nil else { return }
        guard store.save(event) else { return }
        selectedID = event.id
        date = CalendarDates.calendar.startOfDay(for: event.start)
        sheet = nil
    }
    private func delete(_ event: CalendarEvent) {
        guard store.save(event, cancel: true) else { return }
        if selectedID == event.id { selectedID = nil }
        sheet = nil
    }
    @ViewBuilder private func sheetContent(_ destination: CalendarSheet) -> some View {
        switch destination {
        case .editor(let event):
            EventEditor(event: event, saveError: store.message, isNew: !events.contains(where: { $0.id == event.id }), onSave: save)
        case .details(let id):
            if let event = events.first(where: { $0.id == id }) {
                NavigationStack {
                    ZStack {
                        CalendarBackdrop()
                        EventInspector(event: event, onEdit: { sheet = .editor(event) }, onDelete: delete)
                    }.toolbar {
                        ToolbarItem(placement: .confirmationAction) { Button("Schließen") { sheet = nil } }
                    }
                }
            }
        case .profile:
            CalendarAccount(store: store)
        }
    }
}

struct MonthCalendar: View {
    var date: Date
    var events: [CalendarEvent]
    var onSelect: (Date) -> Void
    private var days: [Date] {
        let first = CalendarDates.calendar.dateInterval(of: .month, for: date)!.start
        let start = CalendarDates.week(containing: first)[0]
        return (0..<42).map { CalendarDates.add($0, to: start) }
    }
    var body: some View {
        ScrollView {
            LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 4), count: 7), spacing: 8) {
                ForEach(["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"], id: \.self) {
                    Text($0).font(.subheadline.weight(.medium)).foregroundStyle(CalendarStyle.muted)
                }
                ForEach(days, id: \.self) { day in
                    Button { onSelect(day) } label: {
                        VStack(spacing: 8) {
                            Text(CalendarDates.text(day, "d")).font(.system(size: 19, weight: .medium))
                            HStack(spacing: 3) {
                                ForEach(events.filter { $0.occurs(on: day) }.prefix(3)) { _ in
                                    Circle().fill(CalendarStyle.olive).frame(width: 4, height: 4)
                                }
                            }.frame(height: 5)
                        }.frame(maxWidth: .infinity).frame(height: 60)
                            .background(CalendarDates.sameDay(day, Date()) ? CalendarStyle.olive.opacity(0.17) : .clear, in: RoundedRectangle(cornerRadius: 16))
                            .opacity(CalendarDates.calendar.component(.month, from: day) == CalendarDates.calendar.component(.month, from: date) ? 1 : 0.4)
                    }.buttonStyle(.plain).accessibilityLabel(CalendarDates.text(day, "EEEE, d. MMMM"))
                        .accessibilityIdentifier("month-day-\(CalendarDates.text(day, "yyyy-MM-dd"))")
                }
            }.padding(16)
        }
    }
}
