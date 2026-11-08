import SwiftUI

private enum Language: String, CaseIterable {
    case english = "EN", german = "DE"
    func text(_ en: String, _ de: String) -> String { self == .german ? de : en }
}

private struct Option: Identifiable {
    let id: String
    let en: String
    let de: String
    func title(_ language: Language) -> String { language.text(en, de) }
}

private struct QuestionData {
    let en: String
    let de: String
    let hintEN: String
    let hintDE: String
    let options: [Option]
    func title(_ language: Language) -> String { language.text(en, de) }
    func hint(_ language: Language) -> String { language.text(hintEN, hintDE) }
}

private struct BiradsTableRow: Identifiable {
    let id: String
    let assessment: String
    let likelihood: String
    let management: String
    let color: Color
}

private struct ReferenceEntry: Identifiable {
    let id: String
    let tag: String
    let title: String
    let citation: String
    let relevance: String
    let url: URL
}

private let questions: [String: QuestionData] = [
    "quality": .init(en: "Enhancing lesion on MRI?", de: "Anreichernder Herd im MRT?", hintEN: "Can morphology and enhancement kinetics be assessed reliably?", hintDE: "Sind Morphologie und Kontrastmittelkinetik zuverlässig beurteilbar?", options: [.init(id: "no", en: "No", de: "Nein"), .init(id: "yes", en: "Yes", de: "Ja")]),
    "root": .init(en: "Spiculated extensions?", de: "Spikulierte Ausläufer?", hintEN: "Only unequivocal spicules count. Artefacts or suspected spicules must not be classified as positive.", hintDE: "Nur eindeutig erkennbare Spikulae zählen. Artefakte oder vermutete Ausläufer nicht als positiv werten.", options: [.init(id: "no", en: "No", de: "Nein"), .init(id: "yes", en: "Yes, unequivocal", de: "Ja, eindeutig")]),
    "curve": .init(en: "Enhancement curve", de: "Kontrastmittelkurve", hintEN: "Assess the signal from early or peak enhancement to the delayed phase.", hintDE: "Signal zwischen früher bzw. maximaler und später Phase beurteilen.", options: [.init(id: "persistent", en: "Persistent", de: "Persistierend"), .init(id: "plateau", en: "Plateau", de: "Plateau"), .init(id: "washout", en: "Wash-out", de: "Wash-out")]),
    "margin": .init(en: "Lesion margin", de: "Läsionsrand", hintEN: "Use the most suspicious unequivocal feature, including for non-mass enhancement.", hintDE: "Das verdächtigste eindeutig erkennbare Merkmal verwenden, auch bei Non-mass Enhancement.", options: [.init(id: "circumscribed", en: "Circumscribed", de: "Umschrieben"), .init(id: "irregular", en: "Irregular", de: "Irregulär")]),
    "enhancement": .init(en: "Internal enhancement", de: "Internes Enhancement", hintEN: "Heterogeneous includes rim and clustered-ring enhancement.", hintDE: "Heterogen umfasst auch Rim und Clustered-ring Enhancement.", options: [.init(id: "homogeneous", en: "Homogeneous", de: "Homogen"), .init(id: "heterogeneous", en: "Heterogeneous / rim", de: "Heterogen / Rim")]),
    "edema": .init(en: "Ipsilateral edema", de: "Ipsilaterales Ödem", hintEN: "Perifocal or diffuse ipsilateral edema is positive; diffuse bilateral edema is negative here.", hintDE: "Perifokales oder diffuses ipsilaterales Ödem ist positiv; diffuses bilaterales hier negativ.", options: [.init(id: "absent", en: "Absent", de: "Nicht vorhanden"), .init(id: "present", en: "Present", de: "Vorhanden")]),
]

struct CalculatorView: View {
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    @AppStorage("preferredLanguage") private var language: Language = .english
    @State private var started = false
    @State private var showStartConfirmation = false
    @State private var showReferences = false
    @State private var showDeveloper = false
    @State private var showBiradsTable = false
    @State private var showDecisionPath = false
    @State private var answers: [String: String] = [:]
    @State private var history: [String] = []
    @State private var selection: String?
    @State private var adcChoice: Bool?
    @State private var adcResult: Bool?
    @State private var measuredADC: Double?
    @State private var adcSliderValue = 1.50

    private let teal = Color(red: 0.16, green: 0.76, blue: 0.80)
    private let tealBright = Color(red: 0.32, green: 0.84, blue: 0.87)
    private let coral = Color(red: 1.00, green: 0.44, blue: 0.41)
    private let background = Color(red: 0.024, green: 0.067, blue: 0.106)
    private let surface = Color(red: 0.043, green: 0.102, blue: 0.153)
    private let raised = Color(red: 0.063, green: 0.149, blue: 0.212)
    private let muted = Color(red: 0.61, green: 0.69, blue: 0.73)
    private let line = Color(red: 0.58, green: 0.76, blue: 0.79).opacity(0.20)

    private var contentMaxWidth: CGFloat { horizontalSizeClass == .regular ? 760 : 620 }
    private var horizontalContentPadding: CGFloat { horizontalSizeClass == .regular ? 36 : 20 }

    private var current: String? { KaiserScoreModel.next(answers: answers) }
    private var score: Int? { KaiserScoreModel.score(answers: answers) }
    var body: some View {
        ZStack {
            atmosphericBackground
            VStack(spacing: 0) {
                if started {
                    assessmentHeader
                    decisionTrail
                } else {
                    landingHeader
                }
                GeometryReader { viewport in
                    ScrollViewReader { scrollProxy in
                        ScrollView {
                            Group {
                                if !started { landing(minHeight: viewport.size.height) }
                                else if let current, let question = questions[current] { questionView(current, question) }
                                else if let score { resultView(score) }
                                else { qualityStop }
                            }
                            .frame(maxWidth: contentMaxWidth)
                            .frame(maxWidth: .infinity)
                            .padding(.horizontal, horizontalContentPadding)
                            .padding(.bottom, 34)
                        }
                        .scrollIndicators(.hidden)
                        .id(started ? (current ?? (score == nil ? "quality-stop" : "result")) : "landing")
                        .onChange(of: measuredADC) { _, newValue in
                            guard newValue != nil else { return }
                            withAnimation(.easeInOut(duration: 0.30)) {
                                scrollProxy.scrollTo("adc-result", anchor: .center)
                            }
                        }
                    }
                }
            }
        }
        .foregroundStyle(.white)
        .tint(teal)
        .preferredColorScheme(.dark)
        .sheet(isPresented: $showReferences) { referencesSheet }
        .sheet(isPresented: $showDeveloper) { developerSheet }
        .sheet(isPresented: $showBiradsTable) { biradsTableSheet }
        .sheet(isPresented: $showDecisionPath) { decisionPathSheet }
        .alert(language.text("Clinical use notice", "Hinweis zur Anwendung"), isPresented: $showStartConfirmation) {
            Button(language.text("Cancel", "Abbrechen"), role: .cancel) { }
            Button(language.text("Confirm and start", "Bestätigen und starten")) { started = true }
        } message: {
            Text(clinicalUseNotice)
        }
        .safeAreaInset(edge: .bottom, spacing: 0) { if started { bottomControls } }
    }

    private var clinicalUseNotice: String {
        language.text(
            "For medical professionals: The Kaiser Score is a decision aid and depends on correct interpretation of morphology and enhancement kinetics. It does not replace the complete clinical assessment, prior imaging or temporal context. Please confirm this notice to continue.",
            "Für medizinisches Fachpersonal: Der Kaiser Score ist eine Entscheidungshilfe und setzt die korrekte Beurteilung von Morphologie und Kontrastmittelkinetik voraus. Er ersetzt nicht die klinische Gesamtbeurteilung, Voraufnahmen oder den zeitlichen Verlauf. Bitte bestätigen Sie diesen Hinweis, um fortzufahren."
        )
    }

    private var atmosphericBackground: some View {
        GeometryReader { proxy in
            ZStack {
                background
                Image("BreastBackground")
                    .resizable()
                    .scaledToFill()
                    .frame(width: proxy.size.width, height: proxy.size.height)
                    .clipped()
                    .saturation(1.05)
                    .contrast(1.08)
                    .opacity(started ? 0.25 : 0.42)
                LinearGradient(colors: [background.opacity(0.38), background.opacity(0.76), background], startPoint: .topTrailing, endPoint: .bottomLeading)
                RadialGradient(colors: [teal.opacity(0.11), .clear], center: .topLeading, startRadius: 10, endRadius: 430)
            }
        }
        .ignoresSafeArea()
    }

    private var landingHeader: some View {
        HStack(spacing: 12) {
            Image("Logo")
                .resizable()
                .scaledToFit()
                .frame(width: 46, height: 46)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                .shadow(color: teal.opacity(0.25), radius: 14, y: 6)

            VStack(alignment: .leading, spacing: 3) {
                Text("KAISER SCORE")
                    .font(.system(size: 13, weight: .black, design: .serif))
                    .tracking(1.8)
                Text(language.text("BREAST MRI", "MAMMA-MRT"))
                    .font(.system(size: 8, weight: .bold))
                    .tracking(2.2)
                    .foregroundStyle(tealBright)
            }

            Spacer()
            languagePicker
        }
        .padding(.horizontal, horizontalContentPadding)
        .padding(.top, 12)
        .padding(.bottom, 8)
        .frame(maxWidth: contentMaxWidth)
        .frame(maxWidth: .infinity)
    }

    private var assessmentHeader: some View {
        HStack(spacing: 12) {
            Image("Logo")
                .resizable()
                .scaledToFit()
                .frame(width: 40, height: 40)
                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                .shadow(color: teal.opacity(0.24), radius: 12, y: 5)
            Text("KAISER SCORE")
                .font(.system(size: 14, weight: .black, design: .serif))
                .tracking(2.0)
            Spacer()
            languagePicker
        }
        .padding(.horizontal, horizontalContentPadding)
        .padding(.vertical, 12)
        .frame(maxWidth: contentMaxWidth)
        .frame(maxWidth: .infinity)
        .background(surface.opacity(0.84))
        .overlay(alignment: .bottom) { Rectangle().fill(line).frame(height: 1) }
    }

    private var languagePicker: some View {
        HStack(spacing: 2) {
            ForEach(Language.allCases, id: \.self) { item in
                Button(item.rawValue) { language = item }
                    .font(.system(size: 10, weight: .bold))
                    .foregroundStyle(language == item ? tealBright : muted)
                    .frame(width: 34, height: 30)
                    .background(language == item ? raised : .clear, in: RoundedRectangle(cornerRadius: 9))
            }
        }
        .padding(3)
        .background(surface.opacity(0.58), in: RoundedRectangle(cornerRadius: 12, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 12, style: .continuous).stroke(line))
    }

    private var decisionTrail: some View {
        HStack(spacing: 10) {
            ScrollViewReader { proxy in
                ScrollView(.horizontal) {
                    HStack(spacing: 9) {
                        ForEach(Array(history.enumerated()), id: \.offset) { index, key in
                            if index > 0 { trailConnector }
                            completedTrailStep(key)
                        }

                        if let current {
                            if !history.isEmpty { trailConnector }
                            currentTrailStep(current).id("trail-end")
                        } else if score != nil {
                            if !history.isEmpty { trailConnector }
                            resultTrailStep.id("trail-end")
                        }
                    }
                    .padding(.leading, 18)
                    .padding(.vertical, 9)
                }
                .scrollIndicators(.hidden)
                .onAppear {
                    DispatchQueue.main.async { proxy.scrollTo("trail-end", anchor: .trailing) }
                }
                .onChange(of: history.count) { _, _ in
                    withAnimation(.easeOut(duration: 0.24)) { proxy.scrollTo("trail-end", anchor: .trailing) }
                }
            }

            Button { showDecisionPath = true } label: {
                Image(systemName: "list.bullet.rectangle")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundStyle(tealBright)
                    .frame(width: 38, height: 38)
                    .background(raised.opacity(0.78), in: RoundedRectangle(cornerRadius: 11, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 11, style: .continuous).stroke(line))
            }
            .accessibilityLabel(language.text("View decision path", "Entscheidungspfad anzeigen"))
            .padding(.trailing, 14)
        }
        .frame(height: 66)
        .background(surface.opacity(0.70))
        .overlay(alignment: .bottom) { Rectangle().fill(line).frame(height: 1) }
    }

    private var trailConnector: some View {
        Capsule().fill(teal.opacity(0.38)).frame(width: 18, height: 1.5)
    }

    private func completedTrailStep(_ key: String) -> some View {
        Button { showDecisionPath = true } label: {
            HStack(spacing: 7) {
                ZStack {
                    Circle().fill(teal.opacity(0.15))
                    Image(systemName: "checkmark")
                        .font(.system(size: 8, weight: .black))
                        .foregroundStyle(tealBright)
                }
                .frame(width: 22, height: 22)

                VStack(alignment: .leading, spacing: 1) {
                    Text(trailLabel(key))
                        .font(.system(size: 7, weight: .bold))
                        .tracking(0.7)
                        .foregroundStyle(muted)
                    Text(trailAnswer(key))
                        .font(.system(size: 10, weight: .bold, design: .rounded))
                        .foregroundStyle(.white)
                        .lineLimit(1)
                }
            }
            .padding(.horizontal, 9)
            .frame(height: 38)
            .background(raised.opacity(0.52), in: Capsule())
            .overlay(Capsule().stroke(line))
        }
        .buttonStyle(.plain)
    }

    private func currentTrailStep(_ key: String) -> some View {
        HStack(spacing: 7) {
            ZStack {
                Circle().stroke(coral.opacity(0.75), lineWidth: 1.5)
                Circle().fill(coral).frame(width: 6, height: 6)
            }
            .frame(width: 22, height: 22)

            VStack(alignment: .leading, spacing: 1) {
                Text(language.text("CURRENT", "AKTUELL"))
                    .font(.system(size: 7, weight: .black))
                    .tracking(0.8)
                    .foregroundStyle(coral)
                Text(trailLabel(key))
                    .font(.system(size: 10, weight: .bold, design: .rounded))
                    .foregroundStyle(.white)
                    .lineLimit(1)
            }
        }
        .padding(.horizontal, 9)
        .frame(height: 38)
        .background(coral.opacity(0.07), in: Capsule())
        .overlay(Capsule().stroke(coral.opacity(0.34)))
    }

    private var resultTrailStep: some View {
        HStack(spacing: 7) {
            Image(systemName: "checkmark.seal.fill")
                .font(.system(size: 18))
                .foregroundStyle(tealBright)
            Text(language.text("RESULT", "ERGEBNIS"))
                .font(.system(size: 9, weight: .black))
                .tracking(0.8)
        }
        .padding(.horizontal, 10)
        .frame(height: 38)
        .background(teal.opacity(0.10), in: Capsule())
        .overlay(Capsule().stroke(teal.opacity(0.34)))
    }

    private func trailLabel(_ key: String) -> String {
        switch key {
        case "quality": return language.text("MRI", "MRT")
        case "root": return language.text("SPICULES", "SPIKULAE")
        case "curve": return language.text("CURVE", "KURVE")
        case "margin": return language.text("MARGIN", "RAND")
        case "enhancement": return language.text("ENHANCEMENT", "ENHANCEMENT")
        case "edema": return language.text("EDEMA", "ÖDEM")
        default: return key.uppercased()
        }
    }

    private func trailAnswer(_ key: String) -> String {
        guard let answer = answers[key],
              let option = questions[key]?.options.first(where: { $0.id == answer }) else { return "—" }
        return option.title(language)
    }

    private func landing(minHeight: CGFloat) -> some View {
        VStack(alignment: .leading, spacing: 0) {
            Spacer(minLength: 54)

            HStack(spacing: 10) {
                Capsule().fill(tealBright).frame(width: 22, height: 3)
                Text(language.text("BREAST MRI DECISION SUPPORT", "MAMMA-MRT · ENTSCHEIDUNGSHILFE"))
                    .font(.system(size: 10, weight: .black))
                    .tracking(1.7)
                    .foregroundStyle(tealBright)
            }

            VStack(alignment: .leading, spacing: -5) {
                Text("Kaiser")
                    .font(.system(size: 61, weight: .semibold, design: .serif))
                    .tracking(-2.2)
                    .foregroundStyle(.white)
                Text("Score")
                    .font(.system(size: 67, weight: .black, design: .rounded))
                    .tracking(-3.0)
                    .foregroundStyle(coral)
            }
            .padding(.top, 18)

            Text(language.text(
                "Structured assessment of enhancing lesions on breast MRI.",
                "Strukturierte Beurteilung anreichernder Läsionen in der Mamma-MRT."
            ))
            .font(.system(size: 16, weight: .medium, design: .rounded))
            .foregroundStyle(.white.opacity(0.72))
            .lineSpacing(5)
            .frame(maxWidth: 355, alignment: .leading)
            .padding(.top, 18)

            Button { showStartConfirmation = true } label: {
                HStack(spacing: 14) {
                    Capsule()
                        .fill(coral)
                        .frame(width: 3, height: 28)
                    Text(language.text("Start assessment", "Beurteilung starten"))
                    Spacer()
                    Image(systemName: "arrow.right")
                        .font(.system(size: 15, weight: .bold))
                        .foregroundStyle(background)
                        .frame(width: 46, height: 46)
                        .background(teal, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                }
            }
            .buttonStyle(PrimaryButtonStyle(color: teal)).padding(.top, 34)

            Spacer(minLength: 48)
            HStack(spacing: 20) {
                Button { showReferences = true } label: {
                    Label(language.text("References", "Quellen"), systemImage: "book.closed")
                }
                Button { showDeveloper = true } label: {
                    Label(language.text("Developer", "Entwickler"), systemImage: "person.crop.circle")
                }
            }
            .font(.caption2.weight(.semibold)).foregroundStyle(muted).padding(.bottom, 12)
        }
        .frame(minHeight: minHeight, alignment: .top)
    }

    private func questionView(_ key: String, _ question: QuestionData) -> some View {
        VStack(alignment: .leading, spacing: 0) {
            Text(question.title(language)).font(.system(size: 31, weight: .bold, design: .serif)).tracking(-0.6).padding(.top, 48)
            Text(question.hint(language)).font(.system(size: 12)).foregroundStyle(muted).lineSpacing(4).padding(.top, 8)

            Group {
                if key == "quality" {
                    HStack(spacing: 10) { ForEach(question.options) { option in choiceCard(question: key, option: option) } }
                } else {
                    VStack(spacing: 10) { ForEach(question.options) { option in choiceCard(question: key, option: option) } }
                }
            }.padding(.top, 20)

        }
    }

    private func choiceCard(question: String, option: Option) -> some View {
        let selected = selection == option.id
        return Button { selection = option.id } label: {
            ZStack(alignment: .topTrailing) {
                Group {
                    if question == "quality" {
                        HStack(spacing: 10) {
                            ZStack {
                                Circle().fill(selected ? .white.opacity(0.10) : surface.opacity(0.8))
                                Circle().stroke(selected ? .white.opacity(0.55) : line)
                                Text(option.id == "yes" ? "✓" : "×")
                                    .font(.system(size: 23, weight: .medium, design: .serif))
                                    .foregroundStyle(selected ? .white : tealBright)
                            }.frame(width: 40, height: 40)
                            optionText(question: question, option: option, selected: selected)
                        }
                    } else {
                        HStack(spacing: 12) {
                            OptionSchematicView(question: question, option: option.id, color: selected ? .white : tealBright)
                                .frame(width: 88, height: 64)
                            optionText(question: question, option: option, selected: selected)
                        }
                    }
                }
                .padding(question == "quality" ? 12 : 14)
                .padding(.trailing, 20)
                .frame(maxWidth: .infinity, minHeight: question == "quality" ? 108 : 106, alignment: .leading)

                ZStack {
                    Circle().stroke(selected ? .white.opacity(0.75) : line, lineWidth: 1.5)
                    if selected { Text("✓").font(.system(size: 8, weight: .black)).foregroundStyle(.white) }
                }.frame(width: 24, height: 24).padding(11)
            }
            .background(selected ? Color(red: 0.025, green: 0.42, blue: 0.47) : surface.opacity(0.78), in: RoundedRectangle(cornerRadius: 15))
            .overlay(RoundedRectangle(cornerRadius: 15).stroke(selected ? tealBright : line, lineWidth: selected ? 1.3 : 1))
            .clipShape(RoundedRectangle(cornerRadius: 15))
            .shadow(color: selected ? teal.opacity(0.18) : .black.opacity(0.10), radius: 16, y: 7)
        }
        .buttonStyle(.plain)
        .accessibilityAddTraits(selected ? .isSelected : [])
    }

    private func optionText(question: String, option: Option, selected: Bool) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(option.title(language)).font(.system(size: question == "quality" ? 15 : 18, weight: .bold, design: .serif))
            if question != "quality" {
                Text(optionDetail(question: question, option: option.id))
                    .font(.system(size: 10))
                    .foregroundStyle(selected ? .white.opacity(0.74) : muted)
                    .multilineTextAlignment(.leading).lineLimit(3)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    @ViewBuilder
    private var bottomControls: some View {
        HStack(spacing: 14) {
            if let current {
                Button { back() } label: {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 16, weight: .bold))
                }
                .accessibilityLabel(language.text("Back", "Zurück"))
                .buttonStyle(QuietButtonStyle()).disabled(history.isEmpty)
                Spacer()
                Button {
                    guard let selection else { return }
                    answers[current] = selection
                    history.append(current)
                    self.selection = nil
                } label: {
                    HStack(spacing: 11) {
                        Text(language.text("Next", "Weiter"))
                        Image(systemName: "chevron.right")
                            .font(.system(size: 13, weight: .bold))
                            .foregroundStyle(teal)
                    }
                }
                    .buttonStyle(CompactPrimaryButtonStyle(color: teal)).disabled(selection == nil)
            } else if score != nil {
                Button { back() } label: {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 16, weight: .bold))
                }
                .accessibilityLabel(language.text("Back", "Zurück"))
                .buttonStyle(QuietButtonStyle())
                Spacer()
                Button(language.text("Start again", "Neu beginnen")) { reset() }.buttonStyle(CompactPrimaryButtonStyle(color: teal))
            } else {
                Spacer()
                Button(language.text("Start again", "Neu beginnen")) { reset() }.buttonStyle(CompactPrimaryButtonStyle(color: teal))
            }
        }
        .padding(.horizontal, horizontalContentPadding).padding(.vertical, 12)
        .frame(maxWidth: contentMaxWidth)
        .frame(maxWidth: .infinity)
        .background(
            LinearGradient(
                colors: [surface.opacity(0.96), background.opacity(0.98)],
                startPoint: .top,
                endPoint: .bottom
            )
        )
        .overlay(alignment: .top) { Rectangle().fill(line.opacity(0.72)).frame(height: 1) }
    }

    private func optionDetail(question: String, option: String) -> String {
        switch (question, option) {
        case ("quality", "yes"): return language.text("Morphology and kinetics are assessable", "Morphologie und Kinetik sind beurteilbar")
        case ("quality", "no"): return language.text("Diagnostic image quality is insufficient", "Diagnostische Bildqualität nicht ausreichend")
        case ("root", "yes"): return language.text("At least one genuine spicule", "Mindestens eine echte Spikula")
        case ("root", _): return language.text("No spiculated extension", "Keine spikulierten Ausläufer")
        case ("curve", "persistent"): return language.text("Continuous signal increase", "Kontinuierlicher Signalanstieg")
        case ("curve", "plateau"): return language.text("Delayed phase remains stable", "Spätphase annähernd stabil")
        case ("curve", _): return language.text("Signal decreases in the delayed phase", "Signalabfall in der Spätphase")
        case ("margin", "circumscribed"): return language.text("Sharply defined margin", "Scharf begrenzter Rand")
        case ("margin", _): return language.text("Irregular or ill-defined", "Unregelmäßig oder unscharf")
        case ("enhancement", "homogeneous"): return language.text("Uniform internal enhancement", "Gleichmäßige interne Kontrastaufnahme")
        case ("enhancement", _): return language.text("Includes rim and clustered ring", "Inklusive Rim und Clustered Ring")
        case ("edema", "present"): return language.text("Perifocal or diffuse ipsilateral", "Perifokal oder diffus ipsilateral")
        default: return language.text("No suspicious edema", "Kein suspektes Ödem")
        }
    }

    private func resultView(_ score: Int) -> some View {
        let birads = KaiserScoreModel.birads(for: score) ?? .twoOrThree
        let presentation = resultPresentation(for: birads)
        let offersADC = (5...7).contains(score)
        let adcReadyForResult = !offersADC || adcChoice == false || measuredADC != nil

        return VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text(language.text("RESULT", "ERGEBNIS")).font(.caption2.bold()).tracking(1.5).foregroundStyle(presentation.color)
                Spacer()
                Text("KAISER SCORE \(score) / 11").font(.caption2.bold()).foregroundStyle(muted)
            }.padding(.top, 32)
            RiskScaleView(score: score, color: presentation.color, muted: muted).padding(.top, 22)

            if offersADC {
                adcQuestionCard
                    .padding(.top, 22)
            }

            if adcReadyForResult {
                biradsResultCard(birads: birads, presentation: presentation)
                    .padding(.top, offersADC ? 18 : 23)

                if offersADC {
                    Text(adcChoice == false
                         ? language.text("ADC not entered; tissue diagnosis remains recommended for this BI-RADS 4 result.", "ADC nicht eingegeben; bei diesem BI-RADS-4-Ergebnis bleibt die histologische Abklärung empfohlen.")
                         : language.text("ADC is an adjunct and does not replace the complete MRI and clinical assessment.", "ADC ist ein Zusatzkriterium und ersetzt nicht die vollständige MRT- und klinische Beurteilung."))
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundStyle(muted)
                        .lineSpacing(3)
                        .padding(.top, 12)
                }

                Button { showBiradsTable = true } label: {
                    Label(language.text("Open BI-RADS reference table", "BI-RADS-Referenztabelle öffnen"), systemImage: "tablecells")
                }
                .buttonStyle(OutlinedButtonStyle(color: teal)).padding(.top, 16)
            } else {
                Text(language.text("Complete the ADC assessment to view the final management guidance.", "ADC-Bewertung abschließen, um die endgültige Empfehlung anzuzeigen."))
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundStyle(tealBright)
                    .lineSpacing(3)
                    .padding(.top, 16)
            }
        }
    }

    private func biradsResultCard(
        birads: KaiserBiradsGroup,
        presentation: (meaning: String, likelihood: String, color: Color)
    ) -> some View {
        VStack(spacing: 11) {
            Text(language.text("CORRESPONDS TO", "ENTSPRICHT")).font(.caption2.bold()).tracking(1.5).foregroundStyle(muted)
            Text(birads.label).font(.system(size: 38, weight: .bold, design: .serif)).foregroundStyle(presentation.color)
            Text(presentation.meaning).font(.subheadline.weight(.semibold)).foregroundStyle(.white.opacity(0.90))
                .multilineTextAlignment(.center).lineSpacing(4)
            VStack(spacing: 3) {
                Text(language.text("MALIGNANCY LIKELIHOOD", "MALIGNITÄTSWAHRSCHEINLICHKEIT"))
                    .font(.system(size: 8, weight: .bold)).tracking(1.0).foregroundStyle(muted)
                Text(presentation.likelihood)
                    .font(.system(size: 20, weight: .black, design: .rounded)).foregroundStyle(presentation.color)
            }
            .padding(.horizontal, 16).padding(.vertical, 9)
            .background(presentation.color.opacity(0.09), in: RoundedRectangle(cornerRadius: 11))
            .padding(.top, 4)
        }
        .padding(20).frame(maxWidth: .infinity)
        .background(surface.opacity(0.80), in: RoundedRectangle(cornerRadius: 20))
        .overlay(RoundedRectangle(cornerRadius: 20).stroke(presentation.color.opacity(0.34)))
        .shadow(color: presentation.color.opacity(0.10), radius: 26, y: 12)
    }

    private var adcQuestionCard: some View {
        VStack(alignment: .leading, spacing: 15) {
            HStack(spacing: 11) {
                Image(systemName: "waveform.path.ecg.rectangle.fill")
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundStyle(tealBright)
                    .frame(width: 42, height: 42)
                    .background(teal.opacity(0.13), in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                VStack(alignment: .leading, spacing: 3) {
                    Text(language.text("OPTIONAL ADC", "OPTIONALER ADC"))
                        .font(.system(size: 8, weight: .black)).tracking(1.2).foregroundStyle(tealBright)
                    Text(language.text("Would you like to enter an ADC value?", "Möchten Sie einen ADC-Wert eingeben?"))
                        .font(.system(size: 18, weight: .bold, design: .serif))
                }
                Spacer()
                if let measuredADC {
                    Text(String(format: "%.2f", measuredADC))
                        .font(.system(size: 14, weight: .black, design: .rounded))
                        .foregroundStyle(tealBright)
                }
            }

            HStack(spacing: 10) {
                adcChoiceButton(
                    title: language.text("No", "Nein"),
                    symbol: "xmark",
                    selected: adcChoice == false
                ) {
                    adcChoice = false
                    adcSliderValue = 1.50
                    measuredADC = nil
                    adcResult = nil
                }

                adcChoiceButton(
                    title: language.text("Yes", "Ja"),
                    symbol: "checkmark",
                    selected: adcChoice == true
                ) {
                    if adcChoice != true { adcSliderValue = 1.50 }
                    adcChoice = true
                    measuredADC = nil
                    adcResult = nil
                }
            }

            if adcChoice == true {
                adcRangeSelector
                    .transition(.opacity.combined(with: .move(edge: .top)))

                if let measuredADC, let adcResult {
                    adcInlineResult(value: measuredADC, supportsDowngrade: adcResult)
                        .id("adc-result")
                        .transition(.opacity.combined(with: .move(edge: .top)))
                }
            }
        }
        .animation(.easeInOut(duration: 0.22), value: adcChoice)
        .padding(17)
        .background(surface.opacity(0.86), in: RoundedRectangle(cornerRadius: 18, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 18, style: .continuous).stroke(teal.opacity(0.32)))
    }

    private var adcRangeSelector: some View {
        VStack(alignment: .leading, spacing: 14) {
            Rectangle().fill(line).frame(height: 1)

            HStack(alignment: .lastTextBaseline) {
                VStack(alignment: .leading, spacing: 3) {
                    Text(language.text("ADC VALUE", "ADC-WERT"))
                        .font(.system(size: 8, weight: .black))
                        .tracking(1.2)
                        .foregroundStyle(tealBright)
                    Text(language.text("Select the measured value", "Gemessenen Wert auswählen"))
                        .font(.system(size: 12, weight: .semibold))
                        .foregroundStyle(muted)
                }
                Spacer()
                Text(String(format: "%.2f", adcSliderValue))
                    .font(.system(size: 30, weight: .black, design: .rounded))
                    .monospacedDigit()
                    .foregroundStyle(.white)
                Text("×10⁻³")
                    .font(.system(size: 10, weight: .bold, design: .rounded))
                    .foregroundStyle(muted)
                    .padding(.bottom, 4)
            }

            HStack(spacing: 12) {
                adcStepButton(symbol: "minus", disabled: adcSliderValue <= 0.50) {
                    updateADCDraft(max(0.50, adcSliderValue - 0.05))
                }

                Slider(
                    value: Binding(
                        get: { adcSliderValue },
                        set: { updateADCDraft($0) }
                    ),
                    in: 0.50...2.50,
                    step: 0.05
                )
                .tint(tealBright)
                .accessibilityLabel(language.text("ADC value", "ADC-Wert"))
                .accessibilityValue(String(format: "%.2f × 10⁻³ mm²/s", adcSliderValue))

                adcStepButton(symbol: "plus", disabled: adcSliderValue >= 2.50) {
                    updateADCDraft(min(2.50, adcSliderValue + 0.05))
                }
            }

            HStack {
                Text("0.50")
                Spacer()
                Text(language.text("threshold 1.50", "Grenzwert 1,50"))
                Spacer()
                Text("2.50")
            }
            .font(.system(size: 9, weight: .bold, design: .rounded))
            .foregroundStyle(muted)

            Button {
                confirmADC()
            } label: {
                HStack(spacing: 9) {
                    Text("OK")
                    Image(systemName: "checkmark")
                }
                .font(.system(size: 14, weight: .black, design: .rounded))
                .frame(maxWidth: .infinity)
                .frame(height: 46)
                .foregroundStyle(background)
                .background(tealBright, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
            }
            .buttonStyle(.plain)
        }
        .padding(15)
        .background(raised.opacity(0.56), in: RoundedRectangle(cornerRadius: 16, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 16, style: .continuous).stroke(.white.opacity(0.12)))
    }

    private func adcStepButton(symbol: String, disabled: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Image(systemName: symbol)
                .font(.system(size: 13, weight: .black))
                .frame(width: 42, height: 42)
                .foregroundStyle(disabled ? muted.opacity(0.45) : .white)
                .background(.white.opacity(disabled ? 0.035 : 0.09), in: RoundedRectangle(cornerRadius: 11, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 11, style: .continuous).stroke(.white.opacity(disabled ? 0.05 : 0.14)))
        }
        .buttonStyle(.plain)
        .disabled(disabled)
    }

    private func updateADCDraft(_ value: Double) {
        let rounded = (value * 20).rounded() / 20
        adcSliderValue = rounded
        measuredADC = nil
        adcResult = nil
    }

    private func confirmADC() {
        measuredADC = adcSliderValue
        adcResult = KaiserScoreModel.adcSupportsDowngrade(adcSliderValue)
    }

    private func adcInlineResult(value: Double, supportsDowngrade: Bool) -> some View {
        let statusColor = supportsDowngrade ? Color(red: 0.20, green: 0.78, blue: 0.50) : coral

        return HStack(alignment: .top, spacing: 12) {
            Image(systemName: supportsDowngrade ? "arrow.down.right.circle.fill" : "exclamationmark.circle.fill")
                .font(.system(size: 22))
                .foregroundStyle(statusColor)

            VStack(alignment: .leading, spacing: 5) {
                Text(supportsDowngrade
                     ? language.text("ADC supports BI-RADS 3", "ADC unterstützt BI-RADS 3")
                     : language.text("BI-RADS 4 remains", "BI-RADS 4 bleibt bestehen"))
                    .font(.system(size: 17, weight: .bold, design: .serif))
                    .foregroundStyle(statusColor)

                Text(supportsDowngrade
                     ? language.text("Immediate biopsy may be avoided in eligible lesions; MRI follow-up at 12 months.", "Bei geeigneten Läsionen kann eine sofortige Biopsie möglicherweise vermieden werden; MRT-Kontrolle nach 12 Monaten.")
                     : language.text("ADC does not support avoiding biopsy; tissue diagnosis remains recommended.", "ADC unterstützt keinen Verzicht auf die Biopsie; die histologische Abklärung bleibt empfohlen."))
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundStyle(.white.opacity(0.88))
                    .lineSpacing(3)
            }

            Spacer(minLength: 0)
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(statusColor.opacity(0.09), in: RoundedRectangle(cornerRadius: 14, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 14, style: .continuous).stroke(statusColor.opacity(0.34)))
        .accessibilityElement(children: .combine)
        .accessibilityLabel(String(format: "ADC %.2f. %@", value, supportsDowngrade ? "BI-RADS 3 may be considered" : "BI-RADS 4 remains"))
    }

    private func adcChoiceButton(title: String, symbol: String, selected: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            HStack(spacing: 8) {
                Image(systemName: symbol).font(.system(size: 11, weight: .black))
                Text(title).font(.system(size: 13, weight: .bold, design: .rounded))
            }
            .frame(maxWidth: .infinity)
            .frame(height: 44)
            .foregroundStyle(selected ? background : .white.opacity(0.82))
            .background(selected ? tealBright : .white.opacity(0.06), in: RoundedRectangle(cornerRadius: 12, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 12, style: .continuous).stroke(selected ? tealBright : line))
        }
        .buttonStyle(.plain)
    }

    private func resultPresentation(for birads: KaiserBiradsGroup) -> (meaning: String, likelihood: String, color: Color) {
        switch birads {
        case .twoOrThree:
            return (language.text("Benign / probably benign.", "Benigne / wahrscheinlich benigne."), "≤ 2%", Color(red: 0.13, green: 0.72, blue: 0.46))
        case .four:
            return (language.text("Suspicious · tissue diagnosis.", "Suspekt · histologische Abklärung."), "> 2% – < 95%", Color(red: 0.93, green: 0.66, blue: 0.18))
        case .five:
            return (language.text("Highly suggestive of malignancy · tissue diagnosis.", "Hochgradig malignitätsverdächtig · histologische Abklärung."), "≥ 95%", coral)
        }
    }

    private var qualityStop: some View {
        VStack(alignment: .leading, spacing: 18) {
            ZStack { Circle().stroke(coral, lineWidth: 1.5); Text("!").font(.system(size: 27, weight: .bold, design: .serif)).foregroundStyle(coral) }.frame(width: 52, height: 52)
            Text(language.text("No reliable score can be calculated", "Keine verlässliche Berechnung möglich")).font(.system(size: 32, weight: .bold, design: .serif))
            Text(language.text("Diagnostic image quality and assessable morphology and kinetics are required.", "Diagnostische Bildqualität sowie beurteilbare Morphologie und Kinetik sind erforderlich."))
                .foregroundStyle(muted).lineSpacing(4)
            Button(language.text("Start again", "Neu beginnen")) { reset() }.buttonStyle(PrimaryButtonStyle(color: teal))
        }.padding(.top, 70)
    }

    private var referenceEntries: [ReferenceEntry] {
        [
            .init(
                id: "kaiser-guide",
                tag: "KAISER SCORE",
                title: "How to use the Kaiser score as a clinical decision rule for diagnosis in multiparametric breast MRI",
                citation: "Dietzel M, Baltzer PAT. Insights Imaging. 2018;9:325–335. doi:10.1007/s13244-018-0611-8",
                relevance: language.text("Practical description of the five-feature Kaiser decision tree and interpretation.", "Praxisorientierte Beschreibung des Kaiser-Entscheidungsbaums mit fünf Merkmalen und seiner Interpretation."),
                url: URL(string: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5990997/")!
            ),
            .init(
                id: "adc-prospective",
                tag: "PROSPECTIVE ADC",
                title: "Utility of Diffusion-weighted Imaging to Decrease Unnecessary Biopsies Prompted by Breast MRI",
                citation: "Rahbar H, et al. Clin Cancer Res. 2019;25:1756–1765. doi:10.1158/1078-0432.CCR-18-2967",
                relevance: language.text("Prospective multicenter A6702 trial that established the approximately 1.5 × 10⁻³ mm²/s threshold.", "Prospektive multizentrische A6702-Studie, die den Grenzwert von ungefähr 1,5 × 10⁻³ mm²/s etablierte."),
                url: URL(string: "https://pubmed.ncbi.nlm.nih.gov/30647080/")!
            ),
            .init(
                id: "adc-validation",
                tag: "ADC VALIDATION",
                title: "Diffusion-weighted Imaging Allows for Downgrading MR BI-RADS 4 Lesions",
                citation: "Clauser P, et al. Clin Cancer Res. 2021;27:1941–1948. doi:10.1158/1078-0432.CCR-20-3037",
                relevance: language.text("Multicenter validation of ADC ≥1.5 for BI-RADS 4; sensitivity 96.6%, with 12-month follow-up suggested by the authors after downgrading.", "Multizentrische Validierung von ADC ≥1,5 bei BI-RADS 4; Sensitivität 96,6 %, mit von den Autoren vorgeschlagener 12-Monats-Kontrolle nach Downgrading."),
                url: URL(string: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8406278/")!
            ),
            .init(
                id: "adc-b",
                tag: "ADC-B 2023",
                title: "Introduction of a breast apparent diffusion coefficient category system (ADC-B)",
                citation: "Bickel H, et al. Eur Radiol. 2023;33:5400–5410. doi:10.1007/s00330-023-09675-0",
                relevance: language.text("Large multicenter dataset proposing standardized ADC-B categories to complement BI-RADS.", "Große multizentrische Datenbank zur standardisierten ADC-B-Kategorisierung als Ergänzung zu BI-RADS."),
                url: URL(string: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10326122/")!
            ),
            .init(
                id: "birads-2025",
                tag: "BI-RADS 2025",
                title: "ACR BI-RADS® v2025 Manual · Magnetic Resonance Imaging",
                citation: "DeMartini WB, Strigel RM, Pinker K, Rahbar H, Wang LC. ACR BI-RADS® v2025 Manual. ACR; 2025.",
                relevance: language.text("Current official MRI terminology, assessment categories and management framework.", "Aktuelle offizielle MRT-Terminologie, Beurteilungskategorien und Managementempfehlungen."),
                url: URL(string: "https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/BI-RADS")!
            )
        ]
    }

    private var referencesSheet: some View {
        NavigationStack {
            ZStack {
                background.ignoresSafeArea()
                ScrollView {
                    VStack(alignment: .leading, spacing: 13) {
                        Text(language.text("Primary sources used for score interpretation, ADC assessment and BI-RADS management.", "Primärquellen zur Interpretation des Scores, zur ADC-Beurteilung und zum BI-RADS-Management."))
                            .font(.subheadline)
                            .foregroundStyle(muted)
                            .lineSpacing(4)
                            .padding(.bottom, 5)

                        ForEach(referenceEntries) { entry in
                            Link(destination: entry.url) {
                                VStack(alignment: .leading, spacing: 10) {
                                    HStack {
                                        Text(entry.tag)
                                            .font(.system(size: 8, weight: .black)).tracking(1.1).foregroundStyle(tealBright)
                                        Spacer()
                                        Image(systemName: "arrow.up.right").font(.caption.bold()).foregroundStyle(tealBright)
                                    }
                                    Text(entry.title)
                                        .font(.system(size: 16, weight: .bold, design: .serif))
                                        .foregroundStyle(.white)
                                        .multilineTextAlignment(.leading)
                                    Text(entry.citation)
                                        .font(.system(size: 10, weight: .semibold, design: .rounded))
                                        .foregroundStyle(tealBright.opacity(0.88))
                                        .multilineTextAlignment(.leading)
                                    Rectangle().fill(line).frame(height: 1)
                                    Text(entry.relevance)
                                        .font(.system(size: 11, weight: .medium))
                                        .foregroundStyle(muted)
                                        .lineSpacing(3)
                                        .multilineTextAlignment(.leading)
                                }
                                .padding(16)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .background(surface.opacity(0.88), in: RoundedRectangle(cornerRadius: 17, style: .continuous))
                                .overlay(RoundedRectangle(cornerRadius: 17, style: .continuous).stroke(teal.opacity(0.20)))
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .frame(maxWidth: 700)
                    .frame(maxWidth: .infinity)
                    .padding(20)
                }
            }
            .navigationTitle(language.text("References", "Quellen"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar { ToolbarItem(placement: .topBarTrailing) { Button(language.text("Close", "Schließen")) { showReferences = false } } }
        }.presentationBackground(background)
    }

    private var decisionPathSheet: some View {
        NavigationStack {
            ZStack {
                background.ignoresSafeArea()
                ScrollView {
                    VStack(alignment: .leading, spacing: 0) {
                        Text(language.text(
                            "Your selected features along the current Kaiser decision path.",
                            "Ihre ausgewählten Merkmale entlang des aktuellen Kaiser-Entscheidungspfads."
                        ))
                        .font(.subheadline)
                        .foregroundStyle(muted)
                        .lineSpacing(4)
                        .padding(.bottom, 24)

                        ForEach(Array(history.enumerated()), id: \.offset) { index, key in
                            decisionPathRow(index: index + 1, key: key, answer: answers[key], isCurrent: false)
                            if index < history.count - 1 || current != nil || score != nil { decisionPathConnector }
                        }

                        if let current {
                            decisionPathRow(index: history.count + 1, key: current, answer: nil, isCurrent: true)
                        } else if let score, let birads = KaiserScoreModel.birads(for: score) {
                            HStack(spacing: 14) {
                                ZStack {
                                    Circle().fill(teal)
                                    Image(systemName: "checkmark")
                                        .font(.system(size: 13, weight: .black))
                                        .foregroundStyle(background)
                                }
                                .frame(width: 40, height: 40)

                                VStack(alignment: .leading, spacing: 4) {
                                    Text(language.text("RESULT", "ERGEBNIS"))
                                        .font(.system(size: 8, weight: .black)).tracking(1.1).foregroundStyle(tealBright)
                                    Text("Kaiser Score \(score)  ·  \(birads.label)")
                                        .font(.system(size: 17, weight: .bold, design: .rounded))
                                }
                            }
                            .padding(16)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(teal.opacity(0.09), in: RoundedRectangle(cornerRadius: 16, style: .continuous))
                            .overlay(RoundedRectangle(cornerRadius: 16, style: .continuous).stroke(teal.opacity(0.32)))
                        }
                    }
                    .padding(20)
                }
            }
            .navigationTitle(language.text("Decision path", "Entscheidungspfad"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button(language.text("Close", "Schließen")) { showDecisionPath = false }
                }
            }
        }
        .presentationBackground(background)
    }

    private func decisionPathRow(index: Int, key: String, answer: String?, isCurrent: Bool) -> some View {
        HStack(spacing: 14) {
            ZStack {
                Circle()
                    .fill(isCurrent ? coral.opacity(0.14) : teal.opacity(0.14))
                Circle()
                    .stroke(isCurrent ? coral.opacity(0.70) : teal.opacity(0.55), lineWidth: 1.3)
                if isCurrent {
                    Circle().fill(coral).frame(width: 8, height: 8)
                } else {
                    Text("\(index)")
                        .font(.system(size: 12, weight: .black, design: .rounded))
                        .foregroundStyle(tealBright)
                }
            }
            .frame(width: 40, height: 40)

            VStack(alignment: .leading, spacing: 5) {
                Text(isCurrent ? language.text("CURRENT STEP", "AKTUELLER SCHRITT") : trailLabel(key))
                    .font(.system(size: 8, weight: .black))
                    .tracking(1.0)
                    .foregroundStyle(isCurrent ? coral : muted)
                Text(questions[key]?.title(language) ?? trailLabel(key))
                    .font(.system(size: 15, weight: .bold, design: .serif))
                if answer != nil {
                    Text(trailAnswer(key))
                        .font(.system(size: 12, weight: .semibold, design: .rounded))
                        .foregroundStyle(tealBright)
                }
            }

            Spacer(minLength: 8)
            if let answer, key != "quality" {
                OptionSchematicView(question: key, option: answer, color: tealBright)
                    .frame(width: 54, height: 40)
            }
        }
        .padding(15)
        .background(surface.opacity(0.78), in: RoundedRectangle(cornerRadius: 16, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 16, style: .continuous).stroke(isCurrent ? coral.opacity(0.30) : line))
    }

    private var decisionPathConnector: some View {
        HStack(spacing: 0) {
            Rectangle().fill(teal.opacity(0.34)).frame(width: 1.5, height: 22).padding(.leading, 19)
            Spacer()
        }
    }

    private var biradsTableRows: [BiradsTableRow] {
        [
            .init(id: "0", assessment: language.text("Incomplete", "Unvollständig"), likelihood: "—", management: language.text("Additional imaging and/or comparison with prior examinations", "Zusatzaufnahmen und/oder Vergleich mit Voruntersuchungen"), color: muted),
            .init(id: "1", assessment: language.text("Negative", "Negativ"), likelihood: language.text("Essentially 0%", "Im Wesentlichen 0 %"), management: language.text("Routine screening", "Reguläres Screening"), color: Color(red: 0.20, green: 0.72, blue: 0.48)),
            .init(id: "2", assessment: language.text("Benign", "Benigne"), likelihood: language.text("Essentially 0%", "Im Wesentlichen 0 %"), management: language.text("Routine screening", "Reguläres Screening"), color: Color(red: 0.20, green: 0.72, blue: 0.48)),
            .init(id: "3", assessment: language.text("Probably benign", "Wahrscheinlich benigne"), likelihood: "> 0% – ≤ 2%", management: language.text("Short-interval follow-up, usually 6 months", "Kurzfristige Verlaufskontrolle, meist nach 6 Monaten"), color: Color(red: 0.68, green: 0.72, blue: 0.23)),
            .init(id: "4", assessment: language.text("Suspicious", "Suspekt"), likelihood: "> 2% – < 95%", management: language.text("Tissue diagnosis", "Histologische Abklärung"), color: Color(red: 0.93, green: 0.66, blue: 0.18)),
            .init(id: "4A", assessment: language.text("Low suspicion", "Geringer Verdacht"), likelihood: "> 2% – ≤ 10%", management: language.text("Tissue diagnosis", "Histologische Abklärung"), color: Color(red: 0.93, green: 0.70, blue: 0.25)),
            .init(id: "4B", assessment: language.text("Moderate suspicion", "Mäßiger Verdacht"), likelihood: "> 10% – ≤ 50%", management: language.text("Tissue diagnosis", "Histologische Abklärung"), color: Color(red: 0.95, green: 0.53, blue: 0.20)),
            .init(id: "4C", assessment: language.text("High suspicion", "Hoher Verdacht"), likelihood: "> 50% – < 95%", management: language.text("Tissue diagnosis", "Histologische Abklärung"), color: Color(red: 0.96, green: 0.39, blue: 0.23)),
            .init(id: "5", assessment: language.text("Highly suggestive of malignancy", "Hochgradig malignitätsverdächtig"), likelihood: "≥ 95%", management: language.text("Tissue diagnosis", "Histologische Abklärung"), color: coral),
            .init(id: "6", assessment: language.text("Known biopsy-proven malignancy", "Bioptisch gesicherte Malignität"), likelihood: "—", management: language.text("Surgical excision when clinically appropriate", "Operative Entfernung, wenn klinisch angemessen"), color: Color(red: 0.68, green: 0.43, blue: 0.87)),
        ]
    }

    private var biradsTableSheet: some View {
        NavigationStack {
            ZStack {
                background.ignoresSafeArea()
                ScrollView(.vertical) {
                    VStack(alignment: .leading, spacing: 18) {
                        VStack(alignment: .leading, spacing: 6) {
                            Text("ACR BI-RADS v2025")
                                .font(.system(size: 28, weight: .bold, design: .serif))
                            Text(language.text("Classic assessment, malignancy likelihood and management table", "Klassische Tabelle zu Kategorie, Malignitätswahrscheinlichkeit und Management"))
                                .font(.caption).foregroundStyle(muted)
                        }

                        HStack {
                            Text(language.text("CATEGORY · ASSESSMENT", "KATEGORIE · BEURTEILUNG"))
                            Spacer()
                            Text(language.text("MALIGNANCY", "MALIGNITÄT"))
                        }
                        .font(.system(size: 8, weight: .bold)).tracking(0.9).foregroundStyle(muted)
                        .padding(.horizontal, 5)

                        VStack(spacing: 10) {
                            ForEach(biradsTableRows) { row in biradsReferenceRow(row) }
                        }

                        Link(destination: URL(string: "https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/BI-RADS")!) {
                            Label(language.text("Source: ACR BI-RADS v2025 Manual", "Quelle: ACR BI-RADS v2025 Manual"), systemImage: "arrow.up.right.square")
                        }
                        .font(.caption.bold()).foregroundStyle(tealBright)
                    }
                    .padding(20)
                }
            }
            .navigationTitle(language.text("BI-RADS reference", "BI-RADS-Referenz"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar { ToolbarItem(placement: .topBarTrailing) { Button(language.text("Close", "Schließen")) { showBiradsTable = false } } }
        }
        .presentationBackground(background)
    }

    private func biradsReferenceRow(_ row: BiradsTableRow) -> some View {
        VStack(alignment: .leading, spacing: 13) {
            HStack(spacing: 13) {
                Text(row.id)
                    .font(.system(size: row.id.count > 1 ? 18 : 22, weight: .black, design: .serif))
                    .foregroundStyle(row.color)
                    .frame(width: 52, height: 52)
                    .background(row.color.opacity(0.11), in: RoundedRectangle(cornerRadius: 14))
                    .overlay(RoundedRectangle(cornerRadius: 14).stroke(row.color.opacity(0.34)))
                Text(row.assessment)
                    .font(.system(size: 16, weight: .bold, design: .serif))
                    .fixedSize(horizontal: false, vertical: true)
                Spacer(minLength: 8)
                Text(row.likelihood)
                    .font(.system(size: 10, weight: .black, design: .rounded))
                    .foregroundStyle(row.color)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 9).padding(.vertical, 7)
                    .background(row.color.opacity(0.10), in: Capsule())
            }
            Rectangle().fill(line).frame(height: 1)
            HStack(alignment: .top, spacing: 9) {
                Image(systemName: "arrow.turn.down.right").font(.caption.bold()).foregroundStyle(row.color)
                VStack(alignment: .leading, spacing: 3) {
                    Text(language.text("MANAGEMENT", "VORGEHEN"))
                        .font(.system(size: 8, weight: .bold)).tracking(0.9).foregroundStyle(muted)
                    Text(row.management).font(.system(size: 12, weight: .semibold)).lineSpacing(2)
                }
            }
        }
        .padding(15)
        .background(surface.opacity(0.88), in: RoundedRectangle(cornerRadius: 17))
        .overlay(RoundedRectangle(cornerRadius: 17).stroke(row.color.opacity(0.24)))
        .shadow(color: .black.opacity(0.10), radius: 12, y: 6)
    }

    private var developerSheet: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 12) {
                Text("Dr. Hamed Zia").font(.title3.bold()); Text("RadYar").foregroundStyle(muted)
                Link("Dr.hamedzia@outlook.de", destination: URL(string: "mailto:Dr.hamedzia@outlook.de")!).foregroundStyle(tealBright); Spacer()
            }
            .frame(maxWidth: .infinity, alignment: .leading).padding(24).background(background)
            .navigationTitle(language.text("Developer", "Entwickler"))
            .toolbar { ToolbarItem(placement: .topBarTrailing) { Button(language.text("Close", "Schließen")) { showDeveloper = false } } }
        }.presentationBackground(background)
    }

    private func back() {
        guard let last = history.popLast() else { return }
        selection = answers.removeValue(forKey: last)
        adcChoice = nil
        measuredADC = nil
        adcResult = nil
        adcSliderValue = 1.50
    }

    private func reset() {
        answers = [:]
        history = []
        selection = nil
        adcChoice = nil
        measuredADC = nil
        adcResult = nil
        adcSliderValue = 1.50
        started = false
    }
}

private struct OptionSchematicView: View {
    let question: String
    let option: String
    let color: Color

    var body: some View {
        Canvas { context, size in
            let sx = size.width / 96
            let sy = size.height / 68
            func point(_ x: CGFloat, _ y: CGFloat) -> CGPoint { CGPoint(x: x * sx, y: y * sy) }
            func stroke(_ path: Path, opacity: Double = 1, width: CGFloat = 2) {
                context.stroke(path, with: .color(color.opacity(opacity)), style: StrokeStyle(lineWidth: width, lineCap: .round, lineJoin: .round))
            }
            func ellipse(_ rect: CGRect, opacity: Double = 1, width: CGFloat = 2) {
                stroke(Path(ellipseIn: CGRect(x: rect.minX * sx, y: rect.minY * sy, width: rect.width * sx, height: rect.height * sy)), opacity: opacity, width: width)
            }

            if question == "curve" {
                var guide = Path(); guide.move(to: point(10, 8)); guide.addLine(to: point(10, 58)); guide.addLine(to: point(88, 58)); stroke(guide, opacity: 0.24, width: 1.2)
                var curve = Path(); curve.move(to: point(13, 54))
                if option == "persistent" {
                    curve.addCurve(to: point(43, 31), control1: point(27, 51), control2: point(30, 35))
                    curve.addCurve(to: point(83, 12), control1: point(54, 27), control2: point(66, 16))
                } else if option == "plateau" {
                    curve.addCurve(to: point(44, 22), control1: point(27, 49), control2: point(29, 26))
                    curve.addCurve(to: point(83, 22), control1: point(56, 20), control2: point(68, 23))
                } else {
                    curve.addCurve(to: point(45, 18), control1: point(26, 49), control2: point(30, 22))
                    curve.addCurve(to: point(83, 39), control1: point(59, 19), control2: point(68, 31))
                }
                stroke(curve, width: 2.2)
                context.fill(Path(ellipseIn: CGRect(x: 10 * sx, y: 51 * sy, width: 6 * sx, height: 6 * sy)), with: .color(color))
                let endY: CGFloat = option == "persistent" ? 12 : option == "plateau" ? 22 : 39
                context.fill(Path(ellipseIn: CGRect(x: 80 * sx, y: (endY - 3) * sy, width: 6 * sx, height: 6 * sy)), with: .color(color))
            } else if question == "root" {
                if option == "yes" {
                    var rays = Path()
                    [(31,21,24,12),(29,29,14,27),(33,39,22,50),(43,44,42,60),(54,42,65,54),(60,33,78,35),(57,23,70,12)].forEach { a,b,c,d in rays.move(to: point(CGFloat(a),CGFloat(b))); rays.addLine(to: point(CGFloat(c),CGFloat(d))) }
                    stroke(rays, opacity: 0.5, width: 1.3)
                    var lesion = Path(); lesion.move(to: point(31,21)); lesion.addCurve(to: point(59,22), control1: point(38,12), control2: point(52,12)); lesion.addCurve(to: point(54,46), control1: point(66,31), control2: point(63,42)); lesion.addCurve(to: point(28,37), control1: point(44,51), control2: point(32,47)); lesion.addCurve(to: point(31,21), control1: point(26,31), control2: point(27,25)); stroke(lesion, width: 2.1)
                    context.fill(Path(ellipseIn: CGRect(x: 36 * sx, y: 24 * sy, width: 16 * sx, height: 16 * sy)), with: .color(color.opacity(0.20)))
                } else {
                    ellipse(CGRect(x: 19, y: 13, width: 58, height: 42), opacity: 0.4, width: 1.3); ellipse(CGRect(x: 26, y: 18, width: 44, height: 32), width: 2.1)
                    context.fill(Path(ellipseIn: CGRect(x: 40 * sx, y: 26 * sy, width: 16 * sx, height: 16 * sy)), with: .color(color.opacity(0.20)))
                }
            } else if question == "margin" {
                ellipse(CGRect(x: 23, y: 9, width: 50, height: 50), opacity: 0.32, width: 1.2)
                if option == "circumscribed" { ellipse(CGRect(x: 27, y: 17, width: 42, height: 34), width: 2.1) }
                else {
                    var p = Path(); [(27,30),(34,22),(41,23),(47,16),(54,23),(63,21),(66,30),(72,36),(64,43),(61,51),(51,49),(43,53),(36,47),(27,45),(29,37)].enumerated().forEach { index, pair in index == 0 ? p.move(to: point(CGFloat(pair.0),CGFloat(pair.1))) : p.addLine(to: point(CGFloat(pair.0),CGFloat(pair.1))) }; p.closeSubpath(); stroke(p, width: 2.1)
                }
            } else if question == "enhancement" {
                ellipse(CGRect(x: 23, y: 9, width: 50, height: 50), opacity: 0.32, width: 1.2); ellipse(CGRect(x: 28, y: 14, width: 40, height: 40), width: 2.1)
                if option == "homogeneous" { context.fill(Path(ellipseIn: CGRect(x: 35 * sx, y: 21 * sy, width: 26 * sx, height: 26 * sy)), with: .color(color.opacity(0.22))) }
                else {
                    ellipse(CGRect(x: 34, y: 20, width: 28, height: 28), opacity: 0.42, width: 5)
                    [(39.0, 29.0, 6.0), (53.0, 24.0, 5.0), (55.0, 38.0, 7.0), (41.0, 41.0, 4.0)].forEach { x, y, diameter in
                        context.fill(Path(ellipseIn: CGRect(x: CGFloat(x) * sx, y: CGFloat(y) * sy, width: CGFloat(diameter) * sx, height: CGFloat(diameter) * sy)), with: .color(color.opacity(0.85)))
                    }
                }
            } else {
                if option == "present" { ellipse(CGRect(x: 20, y: 6, width: 56, height: 56), opacity: 0.28, width: 1.2); ellipse(CGRect(x: 26, y: 12, width: 44, height: 44), opacity: 0.42, width: 4) }
                ellipse(CGRect(x: 36, y: 22, width: 24, height: 24), width: 2.1)
                context.fill(Path(ellipseIn: CGRect(x: 41 * sx, y: 27 * sy, width: 14 * sx, height: 14 * sy)), with: .color(color.opacity(0.22)))
            }
        }
        .accessibilityHidden(true)
    }
}

private struct RiskScaleView: View {
    let score: Int
    let color: Color
    let muted: Color
    var body: some View {
        VStack(spacing: 11) {
            GeometryReader { proxy in
                let inset: CGFloat = 27
                let fraction = CGFloat(score - 1) / 10
                let markerX = inset + fraction * (proxy.size.width - inset * 2)
                ZStack(alignment: .leading) {
                    ArrowBarShape().fill(LinearGradient(colors: [Color(red: 0.13, green: 0.72, blue: 0.46), Color(red: 0.91, green: 0.75, blue: 0.22), Color(red: 0.94, green: 0.31, blue: 0.30)], startPoint: .leading, endPoint: .trailing)).frame(height: 38)
                    VStack(spacing: 0) {
                        Text("KAISER").font(.system(size: 6, weight: .black)).tracking(0.7)
                        Text("\(score)").font(.system(size: 25, weight: .black, design: .serif))
                    }
                    .frame(width: 57, height: 57).background(color, in: RoundedRectangle(cornerRadius: 15))
                    .overlay(RoundedRectangle(cornerRadius: 15).stroke(Color(red: 0.043, green: 0.102, blue: 0.153), lineWidth: 4))
                    .shadow(color: color.opacity(0.40), radius: 12, y: 6).position(x: markerX, y: 29)
                }
            }.frame(height: 59)
            HStack(spacing: 0) {
                ForEach(1...11, id: \.self) { number in
                    Text("\(number)").font(.system(size: number == score ? 11 : 8, weight: number == score ? .black : .bold))
                        .foregroundStyle(number == score ? color : muted).frame(maxWidth: .infinity)
                }
            }
            HStack {
                Text("LOW").foregroundStyle(score <= 4 ? color : muted); Spacer()
                Text("INTERMEDIATE").foregroundStyle((5...7).contains(score) ? color : muted); Spacer()
                Text("HIGH").foregroundStyle(score >= 8 ? color : muted)
            }.font(.system(size: 8, weight: .black)).tracking(0.8)
        }
    }
}

private struct ArrowBarShape: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path(); let tip = min(24, rect.width * 0.08)
        path.move(to: CGPoint(x: 0, y: 0)); path.addLine(to: CGPoint(x: rect.maxX - tip, y: 0))
        path.addLine(to: CGPoint(x: rect.maxX, y: rect.midY)); path.addLine(to: CGPoint(x: rect.maxX - tip, y: rect.maxY))
        path.addLine(to: CGPoint(x: 0, y: rect.maxY)); path.closeSubpath(); return path
    }
}

private struct PrimaryButtonStyle: ButtonStyle {
    let color: Color
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 16, weight: .bold, design: .rounded))
            .frame(maxWidth: .infinity)
            .padding(.leading, 17)
            .padding(.trailing, 7)
            .frame(height: 64)
            .foregroundStyle(.white)
            .background(
                LinearGradient(
                    colors: [Color(red: 0.060, green: 0.151, blue: 0.205), Color(red: 0.035, green: 0.098, blue: 0.148)],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                ),
                in: RoundedRectangle(cornerRadius: 16, style: .continuous)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .stroke(color.opacity(0.42), lineWidth: 1)
            )
            .shadow(color: .black.opacity(0.25), radius: 15, y: 8)
            .scaleEffect(configuration.isPressed ? 0.975 : 1)
            .brightness(configuration.isPressed ? -0.05 : 0)
            .animation(.spring(response: 0.24, dampingFraction: 0.78), value: configuration.isPressed)
    }
}

private struct CompactPrimaryButtonStyle: ButtonStyle {
    let color: Color
    @Environment(\.isEnabled) private var isEnabled

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 15, weight: .bold, design: .rounded))
            .padding(.horizontal, 23)
            .frame(minWidth: 142)
            .frame(height: 52)
            .foregroundStyle(Color(red: 0.024, green: 0.067, blue: 0.106))
            .background(
                Color.white.opacity(0.96),
                in: Capsule()
            )
            .shadow(color: isEnabled ? .black.opacity(0.24) : .clear, radius: 13, y: 7)
            .opacity(isEnabled ? 1 : 0.24)
            .scaleEffect(configuration.isPressed ? 0.96 : 1)
            .animation(.spring(response: 0.22, dampingFraction: 0.76), value: configuration.isPressed)
    }
}

private struct QuietButtonStyle: ButtonStyle {
    @Environment(\.isEnabled) private var isEnabled

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .foregroundStyle(.white.opacity(isEnabled ? 0.82 : 0.25))
            .frame(width: 52, height: 52)
            .background(
                Color.white.opacity(isEnabled ? 0.07 : 0.025),
                in: Circle()
            )
            .overlay(
                Circle().stroke(.white.opacity(isEnabled ? 0.18 : 0.06), lineWidth: 1)
            )
            .shadow(color: isEnabled ? .black.opacity(0.18) : .clear, radius: 9, y: 4)
            .scaleEffect(configuration.isPressed ? 0.92 : 1)
            .animation(.spring(response: 0.2, dampingFraction: 0.74), value: configuration.isPressed)
    }
}

private struct OutlinedButtonStyle: ButtonStyle {
    let color: Color
    func makeBody(configuration: Configuration) -> some View {
        configuration.label.font(.subheadline.bold()).frame(maxWidth: .infinity).padding(15).foregroundStyle(color)
            .background(color.opacity(0.07), in: RoundedRectangle(cornerRadius: 14))
            .overlay(RoundedRectangle(cornerRadius: 14).stroke(color.opacity(0.72))).opacity(configuration.isPressed ? 0.68 : 1)
    }
}
