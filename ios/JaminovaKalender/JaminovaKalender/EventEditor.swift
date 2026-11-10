import SwiftUI

struct EventInspector: View {
    var event: CalendarEvent
    var onEdit: () -> Void
    var onDelete: (CalendarEvent) -> Void
    @State private var confirmingDelete = false
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                Image("CalendarOrnament").resizable().scaledToFit().frame(height: 145)
                    .frame(maxWidth: .infinity).accessibilityHidden(true)
                Divider().overlay(CalendarStyle.line)
                Text(event.title).font(.system(size: 24, weight: .bold)).fixedSize(horizontal: false, vertical: true)
                    .accessibilityIdentifier("inspector-title")
                VStack(alignment: .leading, spacing: 22) {
                    detail("calendar", CalendarDates.text(event.start, "EEEE, d. MMMM"))
                    detail("clock", event.timeLabel)
                    detail(event.category.symbol, event.category.rawValue)
                    Text("Persönlicher Termin").font(.footnote).foregroundStyle(CalendarStyle.muted)
                }
                if !event.note.isEmpty {
                    Divider().overlay(CalendarStyle.line)
                    detail("text.alignleft", event.note)
                }
                Button(action: onEdit) {
                    Text("Bearbeiten").font(.system(size: 17, weight: .semibold)).frame(maxWidth: .infinity).frame(height: 45)
                        .foregroundStyle(CalendarStyle.olive).overlay { Capsule().strokeBorder(CalendarStyle.olive.opacity(0.7)) }
                }.buttonStyle(.plain).padding(.top, 14).accessibilityIdentifier("edit-event")
                Menu {
                    Button("Termin absagen", role: .destructive) { confirmingDelete = true }
                } label: {
                    Image(systemName: "ellipsis").frame(width: 44, height: 44).frame(maxWidth: .infinity)
                }.accessibilityLabel("Weitere Optionen")
            }.padding(22)
        }
        .confirmationDialog("Termin absagen?", isPresented: $confirmingDelete, titleVisibility: .visible) {
            Button("Termin absagen", role: .destructive) { onDelete(event) }
            Button("Abbrechen", role: .cancel) { }
        } message: { Text(event.title) }
    }
    private func detail(_ symbol: String, _ value: String) -> some View {
        HStack(alignment: .top, spacing: 16) {
            Image(systemName: symbol).font(.system(size: 20)).foregroundStyle(CalendarStyle.olive).frame(width: 24)
            Text(value).font(.system(size: 16)).fixedSize(horizontal: false, vertical: true)
        }
    }
}

struct EventEditor: View {
    @State var event: CalendarEvent
    var saveError: String? = nil
    var isNew: Bool
    var onSave: (CalendarEvent) -> Void
    @Environment(\.dismiss) private var dismiss
    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Button("Abbrechen") { dismiss() }.keyboardShortcut(.escape, modifiers: [])
                Spacer()
                Text(isNew ? "Neuer Termin" : "Termin bearbeiten").fontWeight(.semibold)
                Spacer()
                Button("Speichern") {
                    var clean = event
                    clean.title = clean.title.trimmingCharacters(in: .whitespacesAndNewlines)
                    onSave(clean)
                }.fontWeight(.semibold).disabled(event.validationMessage != nil)
                    .accessibilityIdentifier("save-event").keyboardShortcut("s", modifiers: .command)
            }.font(.system(size: 16)).padding(.horizontal, 20).frame(minHeight: 60).padding(.top, 12)
            Form {
                Section {
                    TextField("Titel", text: $event.title).accessibilityIdentifier("event-title-input")
                    Picker("Kalender", selection: $event.category) {
                        ForEach(EventCategory.allCases) { Text($0.rawValue).tag($0) }
                    }
                }
                Section("Zeit") {
                    Toggle("Ganztägig", isOn: $event.allDay)
                    if !event.allDay { Toggle("Ohne Uhrzeit", isOn: $event.timeUnspecified) }
                    DatePicker("Beginn", selection: $event.start, displayedComponents: event.isBanner ? [.date] : [.date, .hourAndMinute])
                        .onChange(of: event.start) { old, new in
                            let days = CalendarDates.calendar.dateComponents([.day], from: old, to: event.end).day ?? 0
                            event.end = event.allDay ? CalendarDates.add(max(0, days), to: new) : new.addingTimeInterval(max(300, event.end.timeIntervalSince(old)))
                        }
                    if !event.isBanner { Toggle("Endzeit angeben", isOn: Binding(get: { !event.endUnspecified }, set: { event.endUnspecified = !$0 })) }
                    if event.allDay || (!event.timeUnspecified && !event.endUnspecified) {
                        DatePicker("Ende", selection: $event.end, displayedComponents: event.allDay ? [.date] : [.date, .hourAndMinute])
                    }
                }
                Section("Notiz · maximal 500 Zeichen") {
                    TextField("Notiz hinzufügen", text: $event.note, axis: .vertical).lineLimit(3...6)
                }
                if let saveError { Section { Text(saveError).foregroundStyle(.red) } }
                if let error = event.validationMessage, !event.title.isEmpty {
                    Section { Text(error).foregroundStyle(.red) }
                }
            }
            .scrollContentBackground(.hidden)
        }.background { CalendarBackdrop() }
    }
}
