import SwiftUI

struct CalendarTimeline: View {
    var days: [Date]
    var events: [CalendarEvent]
    var selectedID: UUID?
    var dayView: Bool
    var onSelect: (CalendarEvent) -> Void
    var onCreate: (Date, Int) -> Void
    private let axis: CGFloat = 54
    private var visibleEvents: [CalendarEvent] { events.filter { event in !event.isBanner && days.contains { CalendarDates.sameDay(event.start, $0) } } }
    private var firstHour: Int { min(dayView ? 9 : 8, visibleEvents.map { CalendarDates.minute($0.start) / 60 }.min() ?? 9) }
    private var lastHour: Int { max(dayView ? 18 : 19, visibleEvents.map { Int(ceil(Double(endMinute($0)) / 60)) }.max() ?? 18) }

    var body: some View {
        GeometryReader { geometry in
            let row = max(dayView ? 36.0 : 44.0, (geometry.size.height - (dayView ? 22 : 66)) / CGFloat(lastHour - firstHour))
            let width = max(geometry.size.width, dayView ? 0 : axis + CGFloat(days.count) * 88)
            let column = (width - axis - 8) / CGFloat(days.count)
            ScrollView([.vertical, .horizontal]) {
                VStack(spacing: 0) {
                    if !dayView { dayHeaders(column: column) }
                    if events.contains(where: { event in event.isBanner && days.contains(where: { event.occurs(on: $0) }) }) {
                        HStack(alignment: .top, spacing: 0) {
                            Text("Ganztägig").font(.system(size: 9)).lineLimit(1).minimumScaleFactor(0.7).frame(width: axis).accessibilityLabel("Ganztägig oder ohne Uhrzeit")
                            ForEach(days, id: \.self) { day in
                                ScrollView {
                                    VStack(spacing: 5) {
                                        ForEach(events.filter { $0.isBanner && $0.occurs(on: day) }) { event in
                                            Button { onSelect(event) } label: {
                                                Text(event.title).font(.caption.weight(.semibold)).lineLimit(3)
                                                    .frame(maxWidth: .infinity, alignment: .leading).padding(7)
                                                    .background(CalendarStyle.lilac.opacity(0.15), in: RoundedRectangle(cornerRadius: 8))
                                            }.buttonStyle(.plain).accessibilityLabel(event.title + ", " + event.timeLabel)
                                        }
                                    }.padding(3)
                                }.frame(width: column, height: 90)
                            }
                        }.padding(.bottom, 8)
                    }
                    ZStack(alignment: .topLeading) {
                        grid(width: width, column: column, row: row)
                        ForEach(Array(days.enumerated()), id: \.offset) { index, day in
                            ForEach(EventPlacement.arrange(events.filter { !$0.isBanner && CalendarDates.sameDay($0.start, day) })) { placement in
                                eventBlock(placement, column: column, row: row, dayIndex: index)
                            }
                            if CalendarDates.sameDay(day, Date()) {
                                nowLine(column: column, row: row, index: index)
                            }
                        }
                    }.frame(width: width, height: CGFloat(lastHour - firstHour) * row + 22)
                }.frame(width: width)
            }.scrollIndicators(.hidden).accessibilityIdentifier(dayView ? "day-timeline" : "week-timeline")
        }
    }
    private func dayHeaders(column: CGFloat) -> some View {
        HStack(spacing: 0) {
            Color.clear.frame(width: axis, height: 46)
            ForEach(days, id: \.self) { day in
                Text(CalendarDates.text(day, "EE d").replacingOccurrences(of: ".", with: ""))
                    .font(.system(size: 16, weight: .medium))
                    .foregroundStyle(CalendarDates.sameDay(day, Date()) ? .white : CalendarStyle.ink)
                    .frame(width: column - 8, height: 36)
                    .background(CalendarDates.sameDay(day, Date()) ? CalendarStyle.olive.opacity(0.82) : .clear, in: Capsule())
                    .frame(width: column)
            }
        }.padding(.top, 10).padding(.bottom, 12)
    }
    private func grid(width: CGFloat, column: CGFloat, row: CGFloat) -> some View {
        ZStack(alignment: .topLeading) {
            ForEach(Array(days.enumerated()), id: \.offset) { index, day in
                Rectangle().fill(CalendarDates.sameDay(day, Date()) && !dayView ? CalendarStyle.olive.opacity(0.045) : .clear)
                    .frame(width: column, height: CGFloat(lastHour - firstHour) * row)
                    .offset(x: axis + CGFloat(index) * column)
                if !dayView {
                    Rectangle().fill(CalendarStyle.line).frame(width: 0.6, height: CGFloat(lastHour - firstHour) * row)
                        .offset(x: axis + CGFloat(index) * column)
                }
                ForEach(firstHour..<lastHour, id: \.self) { hour in
                    Color.clear.frame(width: column, height: row).contentShape(Rectangle())
                        .onTapGesture(count: 2) { onCreate(day, hour * 60) }
                        .offset(x: axis + CGFloat(index) * column, y: CGFloat(hour - firstHour) * row)
                }
            }
            ForEach(firstHour...lastHour, id: \.self) { hour in
                Text(String(format: "%02d:00", hour)).font(.system(size: dayView ? 13 : 12))
                    .foregroundStyle(CalendarStyle.muted).frame(width: 46, alignment: .leading)
                    .offset(x: 4, y: CGFloat(hour - firstHour) * row - 7)
                Rectangle().fill(CalendarStyle.line).frame(width: width - axis - 8, height: 0.6)
                    .offset(x: axis, y: CGFloat(hour - firstHour) * row)
            }
        }.padding(.top, 9)
    }
    private func endMinute(_ event: CalendarEvent) -> Int {
        if CalendarDates.sameDay(event.start, event.end) { return CalendarDates.minute(event.end) }
        return 1440
    }
    private func eventBlock(_ placement: EventPlacement, column: CGFloat, row: CGFloat, dayIndex: Int) -> some View {
        let event = placement.event
        let selected = selectedID == event.id
        let duration = CGFloat(endMinute(event) - CalendarDates.minute(event.start)) / 60 * row
        let width = (column - 8) / CGFloat(placement.lanes)
        let accent = selected ? CalendarStyle.olive : CalendarStyle.lilac
        return Button { onSelect(event) } label: {
            HStack(spacing: dayView ? 8 : 4) {
                RoundedRectangle(cornerRadius: 2).fill(accent.opacity(0.85)).frame(width: 3)
                VStack(alignment: .leading, spacing: 2) {
                    Text(event.title).font(.system(size: dayView ? 15 : 11, weight: .semibold))
                        .lineLimit(dayView ? 1 : 2)
                    if duration >= 35 || dayView {
                        Text(event.timeLabel).font(.system(size: dayView ? 12 : 10))
                            .lineLimit(1).minimumScaleFactor(0.8)
                    }
                }.frame(maxWidth: .infinity, alignment: .leading)
                Spacer(minLength: 0)
            }.padding(.horizontal, 5).padding(.vertical, duration < 30 ? 2 : 5)
                .frame(width: width - 2, height: max(dayView ? 35 : 24, duration - 3), alignment: .topLeading)
                .background(accent.opacity(selected ? 0.15 : 0.13), in: RoundedRectangle(cornerRadius: 8))
                .overlay {
                    if selected && !dayView { RoundedRectangle(cornerRadius: 8).strokeBorder(CalendarStyle.olive, lineWidth: 1.2) }
                }
        }.buttonStyle(.plain)
            .accessibilityLabel("\(event.title), \(CalendarDates.text(event.start, "EEEE, d. MMMM")), \(event.timeLabel)")
            .accessibilityIdentifier("event-\(event.title)")
            .offset(x: axis + CGFloat(dayIndex) * column + 4 + CGFloat(placement.lane) * width,
                    y: CGFloat(CalendarDates.minute(event.start) - firstHour * 60) / 60 * row + 9)
    }
    @ViewBuilder private func nowLine(column: CGFloat, row: CGFloat, index: Int) -> some View {
        let minute = CalendarDates.minute(Date())
        if minute >= firstHour * 60 && minute <= lastHour * 60 {
            HStack(spacing: 0) {
                if dayView {
                    Text(CalendarDates.text(Date(), "HH:mm")).font(.system(size: 11, weight: .medium)).foregroundStyle(.white)
                        .frame(width: 45, height: 20).background(CalendarStyle.olive, in: Capsule())
                    Spacer().frame(width: 9)
                }
                Circle().fill(CalendarStyle.olive).frame(width: 7, height: 7)
                Rectangle().fill(CalendarStyle.olive).frame(height: 1.4)
            }.frame(width: dayView ? column + axis : column)
                .offset(x: dayView ? 0 : axis + CGFloat(index) * column,
                        y: CGFloat(minute - firstHour * 60) / 60 * row - (dayView ? 1 : -5.5))
                .allowsHitTesting(false).accessibilityHidden(true)
        }
    }
}
