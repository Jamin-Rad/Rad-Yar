import SwiftUI

struct CalendarLogin: View {
    @ObservedObject var store: CalendarStore
    @State private var password = ""
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                Image("CalendarOrnament").resizable().scaledToFit().frame(height: 150)
                BrandWordmark()
                Text("Ein Kalender. Auf allen Geräten.").font(.title2.bold()).multilineTextAlignment(.center)
                Text("Melde dich mit deinem Jaminova-Webpasswort an. Termine aus der Webversion und ChatGPT erscheinen auch hier.")
                    .foregroundStyle(CalendarStyle.muted).multilineTextAlignment(.center)
                SecureField("Jaminova-Passwort", text: $password).textContentType(.password)
                    .padding(16).background(.white.opacity(0.7), in: RoundedRectangle(cornerRadius: 16))
                    .accessibilityIdentifier("calendar-password")
                Button {
                    let value = password; password = ""
                    Task { await store.login(password: value) }
                } label: {
                    HStack { if store.loggingIn { ProgressView() }; Text("Anmelden").fontWeight(.semibold) }
                        .frame(maxWidth: .infinity).padding(16)
                }.buttonStyle(.borderedProminent).tint(CalendarStyle.olive)
                    .disabled(password.isEmpty || store.loggingIn || store.syncing).accessibilityIdentifier("calendar-login")
                if let message = store.message { Text(message).foregroundStyle(.red).font(.callout) }
                Label("Deine Termine bleiben privat", systemImage: "lock.shield").font(.footnote).foregroundStyle(CalendarStyle.muted)
            }.padding(28).frame(maxWidth: 480).frame(maxWidth: .infinity)
        }.background { CalendarBackdrop() }
    }
}
struct CalendarAccount: View {
    @ObservedObject var store: CalendarStore
    @Environment(\.dismiss) private var dismiss
    @State private var confirmingLogout = false
    var body: some View {
        VStack(spacing: 0) {
            HStack { Text("Dein Kalender").font(.title2.bold()); Spacer(); Button("Fertig") { dismiss() } }.padding(24)
            if store.needsLogin { CalendarLogin(store: store) }
            else {
                List {
                    Section("Synchronisierung") {
                        Label(store.status, systemImage: store.pendingCount > 0 ? "arrow.triangle.2.circlepath" : "checkmark.icloud")
                        if let date = store.state.lastSync { Text("Letzter Abgleich: " + CalendarDates.text(date, "d. MMM yyyy · HH:mm")).font(.footnote) }
                        Button("Jetzt synchronisieren") { Task { await store.sync() } }.disabled(store.syncing)
                        if let message = store.message { Text(message).foregroundStyle(.red) }
                    }
                    ForEach(store.conflicts) { conflict in
                        Section("Änderungen vergleichen") {
                            Text(conflict.conflictMessage ?? "Der Termin wurde auch anderswo geändert.")
                            let local = store.state.visible.first { $0.id == conflict.event.id } ?? conflict.event
                            comparison("Auf diesem Gerät", local)
                            if let remote = conflict.remote { comparison("Web / anderes Gerät", remote) }
                            else { Text("Im Web nicht mehr vorhanden.").foregroundStyle(.secondary) }
                            Button("Webstand übernehmen", role: .destructive) { store.resolve(conflict, keepLocal: false) }.disabled(store.syncing)
                            Button(conflict.remote == nil ? "Lokalen Termin als Kopie speichern" : "Meine Änderung übernehmen") {
                                store.resolve(conflict, keepLocal: true)
                            }.disabled(store.syncing)
                        }
                    }
                    if store.state.visible.contains(where: { !$0.isActive }) {
                        Section("Abgesagt & erledigt") {
                            ForEach(store.state.visible.filter { !$0.isActive }) { event in
                                VStack(alignment: .leading, spacing: 6) {
                                    Text(event.title).fontWeight(.semibold)
                                    Text(CalendarDates.text(event.start, "d. MMM yyyy") + " · " + (event.cancelled ? "Abgesagt" : "Erledigt")).font(.caption)
                                    Button("Termin wieder öffnen") {
                                        var restored = event; restored.cancelled = false; restored.done = false
                                        _ = store.save(restored)
                                    }
                                }
                            }
                        }
                    }
                    Section("Verbunden") {
                        Label("Jaminova Web · iPhone · iPad · ChatGPT", systemImage: "icloud")
                        Text("Änderungen werden beim Öffnen und während der Nutzung automatisch abgeglichen. Offline bleiben sie geschützt auf diesem Gerät gespeichert.")
                        Link("Webkalender öffnen", destination: URL(string: "https://www.rad-yar.com/andarun/termine")!)
                        Label("Europe/Berlin", systemImage: "globe.europe.africa")
                    }
                    Section {
                        Button("Abmelden", role: .destructive) { confirmingLogout = true }
                            .disabled(store.syncing || store.pendingCount > 0 || !store.storageReady)
                    } footer: { Text("Abmelden entfernt die lokale Kopie. Synchronisierte Termine bleiben im Web erhalten. Bei ausstehenden Änderungen ist Abmelden gesperrt.") }
                }.scrollContentBackground(.hidden)
            }
        }.background { CalendarBackdrop() }.tint(CalendarStyle.olive)
            .confirmationDialog("Von diesem Gerät abmelden?", isPresented: $confirmingLogout, titleVisibility: .visible) {
                Button("Abmelden", role: .destructive) { store.logout(); if !store.authenticated { dismiss() } }
            }
    }
    private func comparison(_ heading: String, _ event: CalendarEvent) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(heading).font(.caption).foregroundStyle(.secondary)
            Text(event.title).fontWeight(.semibold)
            Text(CalendarDates.text(event.start, "d. MMM yyyy") + " · " + event.timeLabel)
            if event.cancelled { Text("Abgesagt") }
            if event.done { Text("Erledigt") }
            if !event.note.isEmpty { Text(event.note).font(.callout) }
        }
    }
}
