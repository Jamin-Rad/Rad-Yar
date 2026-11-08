import SwiftUI

private struct Region: Identifiable {
    let id: String
    let de: String
    let en: String
    let threshold: Int
    var name: String { name(for: .english) }
    func name(for language: AppLanguage) -> String { language == .german ? de : en }
}

private let specialRegions: [Region] = [
    .init(id: "inguinal", de: "Inguinal", en: "Inguinal", threshold: 15),
    .init(id: "facial", de: "Fazial", en: "Facial", threshold: 5),
    .init(id: "parotid", de: "Parotideal", en: "Parotid", threshold: 5),
    .init(id: "retroauricular", de: "Retroaurikulär", en: "Retroauricular", threshold: 5),
    .init(id: "occipital", de: "Okzipital", en: "Occipital", threshold: 5),
    .init(id: "retropharyngeal", de: "Retropharyngeal", en: "Retropharyngeal", threshold: 5),
    .init(id: "anterior-jugular", de: "Anterior-jugulär", en: "Anterior jugular", threshold: 5),
    .init(id: "retrocrural", de: "Retrokrural", en: "Retrocrural", threshold: 5),
    .init(id: "cardiophrenic", de: "Kardiophrenisch", en: "Cardiophrenic", threshold: 5),
    .init(id: "mesenteric", de: "Mesenterial", en: "Mesenteric", threshold: 5),
    .init(id: "obturator", de: "Obturatorisch", en: "Obturator", threshold: 5),
    .init(id: "mesorectal", de: "Mesorektal", en: "Mesorectal", threshold: 5)
]

private enum AppLanguage: String, CaseIterable {
    case german = "DE", english = "EN"
    func text(_ de: String, _ en: String) -> String { self == .german ? de : en }
}

private enum LandingInfo: String, Identifiable {
    case references, developer
    var id: String { rawValue }
}

private enum MRIFeature {
    case texture, border, shape

    func imageName(for variant: Int) -> String {
        switch self {
        case .texture: return "MRITexture\(variant)"
        case .border: return "MRIBorder\(variant)"
        case .shape: return "MRIShape\(variant)"
        }
    }
}

private struct FindingArrow: Shape {
    func path(in rect: CGRect) -> Path {
        let tail = CGPoint(x: rect.width * 0.94, y: rect.height * 0.10)
        let tip = CGPoint(x: rect.width * 0.80, y: rect.height * 0.34)
        let dx = tip.x - tail.x
        let dy = tip.y - tail.y
        let length = sqrt(dx * dx + dy * dy)
        let ux = dx / length
        let uy = dy / length
        let headLength: CGFloat = 11
        let headWidth: CGFloat = 6

        var path = Path()
        path.move(to: tail)
        path.addLine(to: tip)
        path.move(to: CGPoint(x: tip.x - ux * headLength - uy * headWidth,
                              y: tip.y - uy * headLength + ux * headWidth))
        path.addLine(to: tip)
        path.addLine(to: CGPoint(x: tip.x - ux * headLength + uy * headWidth,
                                 y: tip.y - uy * headLength - ux * headWidth))
        return path
    }
}

private struct MRIPreview: View {
    let feature: MRIFeature
    let variant: Int
    let language: AppLanguage

    var body: some View {
        VStack(alignment: .leading, spacing: 7) {
            GeometryReader { geometry in
                ZStack {
                    Image(feature.imageName(for: variant))
                        .resizable()
                        .scaledToFill()
                        .frame(width: geometry.size.width, height: geometry.size.height)
                        .scaleEffect(1.35, anchor: .trailing)

                    FindingArrow()
                        .stroke(.black.opacity(0.85), style: StrokeStyle(lineWidth: 5.5, lineCap: .round, lineJoin: .round))
                    FindingArrow()
                        .stroke(Color(red: 1, green: 0.16, blue: 0.18), style: StrokeStyle(lineWidth: 3, lineCap: .round, lineJoin: .round))
                }
                .frame(width: geometry.size.width, height: geometry.size.height)
                .clipped()
                .allowsHitTesting(false)
            }
            .frame(height: 175)
            .clipShape(RoundedRectangle(cornerRadius: 10))
            .overlay(RoundedRectangle(cornerRadius: 10).stroke(.white.opacity(0.18)))
            Text(language.text("Synthetisches Beispiel · T1 nach Kontrastmittel · kein Patientenbild", "Synthetic example · post-contrast T1 MRI · not a patient image"))
                .font(.system(size: 11))
                .foregroundStyle(.white.opacity(0.55))
        }
        .accessibilityElement(children: .combine)
    }
}

struct CalculatorView: View {
    @State private var language: AppLanguage = .english
    @State private var step = 0
    @State private var completed = 0
    @State private var special = false
    @State private var regionID = ""
    @State private var shortAxis = 0
    @State private var longAxis = 0
    @State private var growth = false
    @State private var texture: Int? = nil
    @State private var border: Int? = nil
    @State private var shape: Int? = nil
    @State private var showRequired = false
    @State private var showLanding = true
    @State private var showStartConfirmation = false
    @State private var landingInfo: LandingInfo?
    @State private var showNodeRADSTable = false

    private let violet = Color(red: 0.67, green: 0.46, blue: 1)
    private let panel = Color(red: 0.055, green: 0.075, blue: 0.12)
    private var selectedRegion: Region? { specialRegions.first { $0.id == regionID } }
    private var threshold: Int { special ? selectedRegion?.threshold ?? 10 : 10 }
    private var size: NodeSize? { NodeRADSModel.size(short: shortAxis, long: longAxis, threshold: threshold, growth: growth) }
    private var configuration: Int? {
        guard let texture, let border, let shape else { return nil }
        return NodeRADSModel.configuration(texture: texture, border: border, shape: shape)
    }
    private var score: Int? { size.map { NodeRADSModel.score(size: $0, configuration: configuration ?? 0) } }
    private var canContinue: Bool {
        switch step {
        case 0: return !special || selectedRegion != nil
        case 1: return size != nil
        case 2: return configuration != nil
        default: return true
        }
    }

    var body: some View {
        VStack(spacing: 0) {
            header
            if showLanding {
                landingPage
            } else {
                ScrollViewReader { scrollProxy in
                ScrollView {
                    VStack(alignment: .leading, spacing: 22) {
                        progress
                        Group {
                            switch step {
                            case 0: regionStep
                            case 1: sizeStep
                            case 2: configurationStep(scrollProxy: scrollProxy)
                            default: resultStep
                            }
                        }
                    }
                    .frame(maxWidth: 620)
                    .frame(maxWidth: .infinity)
                    .padding(20)
                }
                .scrollIndicators(.visible)
                .background(alignment: .top) {
                    GeometryReader { geometry in
                        Image("LymphaticNetwork")
                            .resizable()
                            .scaledToFill()
                            .frame(width: geometry.size.width, height: 690, alignment: .top)
                            .clipped()
                            .opacity(0.34)
                            .mask(LinearGradient(colors: [.white, .white.opacity(0.7), .clear], startPoint: .top, endPoint: .bottom))
                            .accessibilityHidden(true)
                    }
                }
                .id(step)
                }
                actionBar
            }
        }
        .background(Color(red: 0.012, green: 0.04, blue: 0.07))
        .foregroundStyle(.white)
        .preferredColorScheme(.dark)
        .alert(language.text("Hinweis zur Lern- und Referenznutzung", "Educational reference notice"), isPresented: $showStartConfirmation) {
            Button(language.text("Abbrechen", "Cancel"), role: .cancel) { }
            Button(language.text("Bestätigen und starten", "Confirm and start")) { showLanding = false }
        } message: {
            Text(educationalNotice)
        }
        .sheet(item: $landingInfo) { info in
            landingInfoSheet(info)
                .presentationDetents([.medium])
                .presentationDragIndicator(.visible)
        }
        .sheet(isPresented: $showNodeRADSTable) {
            nodeRADSTableSheet
        }
    }

    private var educationalNotice: String {
        language.text(
            "Node-RADS ist eine Lern- und Referenzdarstellung der veröffentlichten Node-RADS-1.0-Kriterien. Die App analysiert keine Bilder, stellt keine Diagnose und gibt keine Therapieempfehlung. Bitte bestätigen Sie diesen Hinweis, um fortzufahren.",
            "Node-RADS is an educational reference to the published Node-RADS 1.0 criteria. The app does not analyse images, diagnose disease, or recommend treatment. Please confirm this notice to continue."
        )
    }

    private var landingPage: some View {
        GeometryReader { geometry in
            VStack(alignment: .leading, spacing: 20) {
                Spacer(minLength: 20)

                    VStack(alignment: .leading, spacing: 10) {
                        Text("NODE-RADS")
                            .font(.system(size: 43, weight: .black, design: .rounded))
                            .tracking(1.5)
                            .foregroundStyle(
                                LinearGradient(
                                    colors: [.white, Color(red: 0.72, green: 0.82, blue: 1)],
                                    startPoint: .leading,
                                    endPoint: .trailing
                                )
                            )
                        Text(language.text("Node-RADS-1.0-Kriterien interaktiv erkunden", "Explore the published Node-RADS 1.0 criteria"))
                            .font(.system(size: 15, weight: .regular, design: .rounded))
                            .foregroundStyle(.white.opacity(0.68))
                            .fixedSize(horizontal: false, vertical: true)
                    }

                    Button {
                        showStartConfirmation = true
                    } label: {
                        HStack(spacing: 12) {
                            Text(language.text("Kriterien erkunden", "Explore criteria"))
                            Spacer()
                            Image(systemName: "arrow.right")
                                .font(.system(size: 15, weight: .bold))
                                .frame(width: 34, height: 34)
                                .background(.white.opacity(0.16), in: Circle())
                        }
                        .font(.system(size: 17, weight: .bold))
                        .padding(.leading, 20)
                        .padding(.trailing, 12)
                        .frame(height: 62)
                        .frame(maxWidth: .infinity)
                        .background(
                            LinearGradient(
                                colors: [violet, Color(red: 0.42, green: 0.48, blue: 0.98)],
                                startPoint: .leading,
                                endPoint: .trailing
                            ),
                            in: RoundedRectangle(cornerRadius: 14, style: .continuous)
                        )
                        .overlay(RoundedRectangle(cornerRadius: 14, style: .continuous).stroke(.white.opacity(0.3), lineWidth: 1))
                        .shadow(color: violet.opacity(0.28), radius: 22, y: 10)
                    }
                    .buttonStyle(.plain)

                    Label(language.text("FÜR LERNEN UND REFERENZ", "FOR EDUCATION AND REFERENCE"), systemImage: "books.vertical.fill")
                        .font(.system(size: 11, weight: .bold))
                        .tracking(0.65)
                        .foregroundStyle(Color(red: 0.70, green: 0.84, blue: 1))
                        .padding(.horizontal, 13)
                        .padding(.vertical, 9)
                        .background(.ultraThinMaterial, in: Capsule())
                        .overlay(Capsule().stroke(.white.opacity(0.16), lineWidth: 1))

                Spacer(minLength: 16)
                landingLinks
            }
            .frame(maxWidth: 520, alignment: .leading)
            .frame(maxWidth: .infinity, minHeight: geometry.size.height, alignment: .top)
            .padding(.horizontal, 26)
            .padding(.bottom, 20)
        }
        .background(alignment: .top) {
            GeometryReader { geometry in
                Image("LymphaticNetwork")
                    .resizable().scaledToFill()
                    .frame(width: geometry.size.width, height: 800, alignment: .top)
                    .clipped()
                    .opacity(0.30)
                    .saturation(1.12)
                    .mask(LinearGradient(colors: [.white, .white.opacity(0.58), .clear], startPoint: .top, endPoint: .bottom))
                    .accessibilityHidden(true)
            }
        }
    }

    private var header: some View {
        HStack {
            HStack(spacing: 9) {
                Circle().fill(violet).frame(width: 9, height: 9)
                Text("NODE-RADS").font(.system(size: 16, weight: .heavy, design: .rounded)).tracking(2)
            }
            Spacer()
            Picker("Language", selection: $language) {
                ForEach(AppLanguage.allCases, id: \.self) { Text($0.rawValue).tag($0) }
            }
            .pickerStyle(.segmented)
            .frame(width: 114)
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 14)
        .background(panel)
    }

    private var progress: some View {
        HStack(spacing: 3) {
            ForEach(0..<4) { index in
                Button {
                    showRequired = false
                    step = index
                } label: {
                VStack(spacing: 6) {
                    Circle()
                        .fill(index <= step ? violet : .white.opacity(0.16))
                        .frame(width: 25, height: 25)
                        .overlay(Text(index < step ? "✓" : "\(index + 1)").font(.caption.bold()))
                    Text([language.text("Region", "Region"), language.text("Größe", "Size"), language.text("Konfiguration", "Configuration"), language.text("Kategorie", "Category")][index])
                        .font(.system(size: 10)).foregroundStyle(index <= step ? .white : .gray)
                }
                .frame(maxWidth: .infinity)
                }
                .buttonStyle(.plain)
                .disabled(index > completed)
            }
        }
        .accessibilityElement(children: .combine)
    }

    private var regionStep: some View {
        VStack(alignment: .leading, spacing: 16) {
            stepHeading(
                number: "01",
                icon: "mappin.and.ellipse",
                title: language.text("Beispielregion auswählen", "Select an example region"),
                detail: language.text("Die veröffentlichten Kriterien verwenden regionsspezifische Kurzachsengrenzen.", "The published criteria use region-specific short-axis thresholds.")
            )
            selectionCard(language.text("Allgemeine Region", "General region"), detail: language.text("Die meisten Lymphknotenstationen", "Most lymph-node stations"), badge: language.text("< 10 mm", "< 10 mm"), icon: "scope", selected: !special) {
                special = false; regionID = ""
            }
            selectionCard(language.text("Besondere Region", "Special region"), detail: language.text("Inguinal oder regionsspezifische 5-mm-Grenze", "Inguinal or a region-specific 5 mm threshold"), badge: language.text("Auswählen", "Select"), icon: "point.3.connected.trianglepath.dotted", selected: special) { special = true }
            if special {
                Text(language.text("Besondere Region auswählen", "Select the special region"))
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(.white.opacity(0.62))
                    .padding(.top, 6)
                ForEach(specialRegions) { region in
                    selectionCard(region.name(for: language), detail: language.text("Regionsspezifischer Schwellenwert", "Region-specific threshold"), badge: "< \(region.threshold) mm", icon: "circle.hexagongrid", selected: regionID == region.id) { regionID = region.id }
                }
            }
        }
    }

    private var sizeStep: some View {
        VStack(alignment: .leading, spacing: 18) {
            stepHeading(
                number: "02",
                icon: "ruler",
                title: language.text("Beispielmaße eingeben", "Enter example measurements"),
                detail: language.text("Erkunden Sie die Größenkategorien mit hypothetischen Werten in Millimetern.", "Explore the size categories using hypothetical values in millimetres.")
            )
            HStack(spacing: 9) {
                Image(systemName: "scope")
                Text(language.text("Grenzwert der Kurzachse", "Short-axis threshold"))
                Spacer()
                Text("\(threshold) mm").fontWeight(.bold).monospacedDigit()
            }
            .font(.system(size: 13, weight: .semibold))
            .foregroundStyle(.white.opacity(0.82))
            .padding(.horizontal, 14)
            .frame(height: 46)
            .background(violet.opacity(0.12), in: RoundedRectangle(cornerRadius: 12, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 12, style: .continuous).stroke(violet.opacity(0.32), lineWidth: 1))

            measurement(language.text("Kurze Achse", "Short axis"), caption: language.text("Kleinster transversaler Durchmesser", "Smallest transverse diameter"), icon: "arrow.left.and.right", value: $shortAxis)
            measurement(language.text("Längste Achse", "Longest axis"), caption: language.text("Maximaler Durchmesser", "Maximum diameter"), icon: "arrow.up.left.and.arrow.down.right", value: $longAxis)
            Toggle(isOn: $growth) {
                HStack(spacing: 12) {
                    Image(systemName: "chart.line.uptrend.xyaxis")
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundStyle(Color(red: 0.66, green: 0.82, blue: 1))
                        .frame(width: 38, height: 38)
                        .background(violet.opacity(0.15), in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                    VStack(alignment: .leading, spacing: 4) {
                    Text(language.text("Zunahme ≥ 2 mm im Verlauf", "Interval increase ≥ 2 mm")).fontWeight(.semibold)
                    Text(language.text("Gilt auch unterhalb des Grenzwerts als vergrößert.", "Counts as enlarged even below the threshold.")).font(.caption).foregroundStyle(.gray)
                    }
                }
            }
            .tint(violet)
            .padding(15)
            .background {
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(.ultraThinMaterial)
                    .overlay(RoundedRectangle(cornerRadius: 16, style: .continuous).fill(Color(red: 0.025, green: 0.055, blue: 0.095).opacity(0.72)))
            }
            .overlay(RoundedRectangle(cornerRadius: 16, style: .continuous).stroke(.white.opacity(0.16), lineWidth: 1))
            if let size {
                Label("\(language.text("Größenkategorie", "Size category")): \(sizeLabel(size))", systemImage: "checkmark.circle.fill")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundStyle(Color(red: 0.61, green: 0.87, blue: 0.76))
                    .padding(.horizontal, 15)
                    .frame(height: 48)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color(red: 0.35, green: 0.78, blue: 0.61).opacity(0.10), in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 12, style: .continuous).stroke(Color(red: 0.35, green: 0.78, blue: 0.61).opacity(0.28), lineWidth: 1))
            }
        }
    }

    private func configurationStep(scrollProxy: ScrollViewProxy) -> some View {
        VStack(alignment: .leading, spacing: 22) {
            stepHeading(
                number: "03",
                icon: "slider.horizontal.3",
                title: language.text("Beispielmerkmale auswählen", "Select example features"),
                detail: language.text("Erkunden Sie, wie Textur, Rand und Form den veröffentlichten Score verändern.", "Explore how texture, border, and shape affect the published score.")
            )
            HStack(spacing: 7) {
                configurationMarker(1, language.text("Textur", "Texture"), selected: texture != nil) { withAnimation { scrollProxy.scrollTo("texture", anchor: .top) } }
                configurationMarker(2, language.text("Rand", "Border"), selected: border != nil) { withAnimation { scrollProxy.scrollTo("border", anchor: .top) } }
                configurationMarker(3, language.text("Form", "Shape"), selected: shape != nil) { withAnimation { scrollProxy.scrollTo("shape", anchor: .top) } }
            }
            choiceGroup(
                1,
                language.text("Textur", "Texture"),
                options: language == .german
                    ? ["Homogen", "Heterogen", "Fokale Nekrose", "Grobe oder neue Nekrose", "Entitätsspezifischer Befund"]
                    : ["Homogeneous", "Heterogeneous", "Focal necrosis", "Gross or new necrosis", "Entity-specific finding"],
                scores: NodeRADSModel.textureScores,
                selection: $texture,
                imageFeature: .texture,
                scrollProxy: scrollProxy,
                previewExcludedIndices: [4],
                detailItems: [
                    4: language == .german
                        ? [
                            "Zystische Erscheinung beim Plattenepithelkarzinom",
                            "Verkalkung beim Schilddrüsenkarzinom",
                            "Muzinöse Textur"
                        ]
                        : [
                            "Cystic appearance in squamous cell carcinoma",
                            "Calcification in thyroid carcinoma",
                            "Mucinous texture"
                        ]
                ]
            )
                .id("texture")
            choiceGroup(2, language.text("Rand", "Border"), options: language == .german ? ["Glatt", "Unregelmäßig oder unscharf"] : ["Smooth", "Irregular or ill-defined"], scores: [0, 1], selection: $border, imageFeature: .border, scrollProxy: scrollProxy)
                .id("border")
            choiceGroup(3, language.text("Form", "Shape"), options: language == .german ? ["Jede Form bei erhaltenem Fetthilus", "Nierenförmig / oval ohne Fetthilus", "Rund ohne Fetthilus"] : ["Any shape with preserved fatty hilum", "Kidney-bean / oval without fatty hilum", "Spherical without fatty hilum"], scores: [0, 0, 1], selection: $shape, imageFeature: .shape, scrollProxy: scrollProxy)
                .id("shape")
            if let configuration { info("\(language.text("Konfigurationsscore", "Configuration score")): \(configuration) / 5") }
        }
    }

    private func configurationMarker(_ number: Int, _ heading: String, selected: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            HStack(spacing: 5) {
                Text(selected ? "✓" : "\(number)")
                    .font(.system(size: 11, weight: .bold, design: .monospaced))
                    .foregroundStyle(selected ? Color(red: 0.49, green: 0.82, blue: 0.96) : violet)
                Text(heading).font(.system(size: 11, weight: .semibold))
                    .lineLimit(1).minimumScaleFactor(0.8)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 9)
            .background(selected ? violet.opacity(0.18) : panel.opacity(0.88), in: RoundedRectangle(cornerRadius: 9))
            .overlay(RoundedRectangle(cornerRadius: 9).stroke(selected ? violet.opacity(0.6) : .white.opacity(0.16)))
        }
        .buttonStyle(.plain)
        .accessibilityLabel("\(number) \(heading) \(selected ? language.text("ausgewählt", "selected") : language.text("offen", "pending"))")
    }

    private var resultStep: some View {
        VStack(alignment: .leading, spacing: 18) {
            if let size, let score {
                let color = scoreColor(score)
                HStack(spacing: 18) {
                    VStack(spacing: 2) {
                        Text("NODE-RADS")
                            .font(.system(size: 10, weight: .bold, design: .rounded))
                            .tracking(1.6)
                            .foregroundStyle(.white.opacity(0.62))
                        Text("\(score)")
                            .font(.system(size: 68, weight: .semibold, design: .rounded))
                            .monospacedDigit()
                            .foregroundStyle(color)
                            .contentTransition(.numericText())
                    }
                    .frame(width: 122, height: 132)
                    .background {
                        RoundedRectangle(cornerRadius: 22, style: .continuous)
                            .fill(color.opacity(0.11))
                            .overlay {
                                RoundedRectangle(cornerRadius: 22, style: .continuous)
                                    .stroke(LinearGradient(colors: [color.opacity(0.75), color.opacity(0.14)], startPoint: .topLeading, endPoint: .bottomTrailing), lineWidth: 1.3)
                            }
                    }

                    VStack(alignment: .leading, spacing: 10) {
                        Label(language.text("REFERENZKATEGORIE", "REFERENCE CATEGORY"), systemImage: "book.closed.fill")
                            .font(.system(size: 11, weight: .bold))
                            .tracking(1.1)
                            .foregroundStyle(color)
                        Text("Node-RADS \(score)")
                            .font(.system(size: 22, weight: .bold, design: .rounded))
                            .foregroundStyle(.white)
                            .fixedSize(horizontal: false, vertical: true)
                        Text(levelLabel(score))
                            .font(.system(size: 15, weight: .bold, design: .rounded))
                            .foregroundStyle(color)
                            .padding(.horizontal, 11)
                            .padding(.vertical, 6)
                            .background(color.opacity(0.13), in: Capsule())
                            .overlay(Capsule().stroke(color.opacity(0.30), lineWidth: 1))
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                }
                .padding(18)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background {
                    RoundedRectangle(cornerRadius: 24, style: .continuous)
                        .fill(.ultraThinMaterial)
                        .overlay {
                            LinearGradient(
                                colors: [color.opacity(0.13), Color(red: 0.025, green: 0.055, blue: 0.095).opacity(0.76)],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                            .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
                        }
                }
                .overlay {
                    RoundedRectangle(cornerRadius: 24, style: .continuous)
                        .stroke(LinearGradient(colors: [color.opacity(0.62), .white.opacity(0.08)], startPoint: .topLeading, endPoint: .bottomTrailing), lineWidth: 1)
                }
                .shadow(color: color.opacity(0.12), radius: 20, y: 8)
                referenceSummary(size: size, score: score, color: color)
                nodeRADSTableButton
            }
        }
    }

    private func scoreColor(_ score: Int) -> Color {
        let colors: [Color] = [
            Color(red: 0x59 / 255.0, green: 0xC6 / 255.0, blue: 0x9A / 255.0),
            Color(red: 0x63 / 255.0, green: 0xC7 / 255.0, blue: 0xDD / 255.0),
            Color(red: 0xE2 / 255.0, green: 0xBD / 255.0, blue: 0x5F / 255.0),
            Color(red: 0xED / 255.0, green: 0x8A / 255.0, blue: 0x50 / 255.0),
            Color(red: 0xEF / 255.0, green: 0x5F / 255.0, blue: 0x65 / 255.0)
        ]
        return colors[max(0, min(score - 1, 4))]
    }

    private func referenceSummary(size: NodeSize, score: Int, color: Color) -> some View {
        let short = min(shortAxis, longAxis)
        let long = max(shortAxis, longAxis)
        let sizeCriterion: String
        let morphologyCriterion: String?
        if size == .bulk {
            sizeCriterion = language.text(
                "Bulk-Grenzwert: ≥ 30 mm in einer beliebigen Achse. Gewählte längste Achse: \(long) mm → Bulk.",
                "Bulk threshold: ≥ 30 mm in any axis. Selected longest axis: \(long) mm → Bulk."
            )
            morphologyCriterion = nil
        } else {
            let textures = language == .german ? ["homogen", "heterogen", "mit fokaler Nekrose", "mit grober oder neu aufgetretener Nekrose", "mit entitätsspezifischem Befund"] : ["homogeneous", "heterogeneous", "with focal necrosis", "with gross or newly developed necrosis", "with an entity-specific finding"]
            let borders = language == .german ? ["glatt", "unregelmäßig bzw. unscharf"] : ["with a smooth margin", "with an irregular or ill-defined margin"]
            let shapes = language == .german ? ["bei erhaltenem Fetthilus", "nierenförmig / oval ohne erhaltenen Fetthilus", "rund ohne erhaltenen Fetthilus"] : ["with preserved fatty hilum", "kidney-bean / oval without preserved fatty hilum", "spherical without preserved fatty hilum"]
            sizeCriterion = growth
                ? language.text("Regionsspezifischer Kurzachsengrenzwert: < \(threshold) mm. Gewählte Verlaufszunahme: ≥ 2 mm → Vergrößert.", "Regional short-axis threshold: < \(threshold) mm. Selected interval increase: ≥ 2 mm → Enlarged.")
                : size == .enlarged
                    ? language.text("Regionsspezifischer Kurzachsengrenzwert: < \(threshold) mm. Gewählte Kurzachse: \(short) mm → Vergrößert.", "Regional short-axis threshold: < \(threshold) mm. Selected short axis: \(short) mm → Enlarged.")
                    : language.text("Regionsspezifischer Kurzachsengrenzwert: < \(threshold) mm. Gewählte Kurzachse: \(short) mm → Normal.", "Regional short-axis threshold: < \(threshold) mm. Selected short axis: \(short) mm → Normal.")
            morphologyCriterion = language.text(
                "\(textures[texture ?? 0]), \(borders[border ?? 0]) begrenzt und \(shapes[shape ?? 0]).",
                "\(textures[texture ?? 0]), \(borders[border ?? 0]) and \(shapes[shape ?? 0])."
            )
        }
        let statementsDE = ["Ein maligner Lymphknotenbefall ist sehr unwahrscheinlich.", "Ein maligner Lymphknotenbefall ist eher unwahrscheinlich.", "Ein maligner Lymphknotenbefall bleibt unklar beziehungsweise äquivokal.", "Es besteht eine hohe Wahrscheinlichkeit für einen malignen Lymphknotenbefall.", "Es besteht eine sehr hohe Wahrscheinlichkeit für einen malignen Lymphknotenbefall."]
        let statementsEN = ["Malignant lymph-node involvement is very unlikely.", "Malignant lymph-node involvement is considered unlikely.", "Malignant lymph-node involvement remains indeterminate or equivocal.", "There is a high likelihood of malignant lymph-node involvement.", "There is a very high likelihood of malignant lymph-node involvement."]
        let assessment = language.text(
            "In der veröffentlichten Node-RADS-1.0-Tabelle entspricht diese Kriterienkombination der Kategorie \(score) (\(signalLabel(score))). \(statementsDE[score - 1])",
            "In the published Node-RADS 1.0 table, this combination of criteria corresponds to category \(score) (\(signalLabel(score))). \(statementsEN[score - 1])"
        )
        return VStack(alignment: .leading, spacing: 15) {
            VStack(alignment: .leading, spacing: 6) {
                Text(language.text("AUSGEWÄHLTE KRITERIEN", "SELECTED CRITERIA"))
                    .font(.system(size: 10, weight: .bold))
                    .tracking(1)
                    .foregroundStyle(color)
                VStack(alignment: .leading, spacing: 11) {
                    criterionRow(language.text("GRÖSSE / GRENZWERT", "SIZE / THRESHOLD"), sizeCriterion, color: color)
                    if let morphologyCriterion {
                        criterionRow(language.text("MORPHOLOGIE", "MORPHOLOGY"), morphologyCriterion, color: color)
                    }
                }
            }
            Divider().overlay(.white.opacity(0.12))
            VStack(alignment: .leading, spacing: 6) {
                Text(language.text("INTERPRETATION", "INTERPRETATION"))
                    .font(.system(size: 10, weight: .bold))
                    .tracking(1)
                    .foregroundStyle(color)
                Text(assessment)
            }
            Text(language.text("Lern- und Referenzausgabe · keine Diagnose oder Therapieempfehlung", "Educational reference output · not a diagnosis or treatment recommendation"))
                .font(.caption)
                .foregroundStyle(.white.opacity(0.52))
        }
        .padding().frame(maxWidth: .infinity, alignment: .leading)
        .background(panel, in: RoundedRectangle(cornerRadius: 16))
        .overlay(RoundedRectangle(cornerRadius: 16).stroke(color.opacity(0.42)))
    }

    private func criterionRow(_ label: String, _ value: String, color: Color) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(label)
                .font(.system(size: 9, weight: .bold))
                .tracking(0.8)
                .foregroundStyle(color.opacity(0.82))
            Text(value)
        }
        .padding(.leading, 11)
        .overlay(alignment: .leading) {
            Capsule().fill(color.opacity(0.50)).frame(width: 2)
        }
    }

    private func signalLabel(_ score: Int) -> String {
        let signals = language == .german
            ? ["LK−", "eher LK−", "LK±", "LK+", "LK+"]
            : ["LN−", "likely LN−", "LN±", "LN+", "LN+"]
        return signals[max(0, min(score - 1, 4))]
    }

    private var nodeRADSTableButton: some View {
        Button {
            showNodeRADSTable = true
        } label: {
            HStack(spacing: 14) {
                Image(systemName: "tablecells")
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundStyle(Color(red: 0.66, green: 0.82, blue: 1))
                    .frame(width: 46, height: 46)
                    .background(violet.opacity(0.18), in: RoundedRectangle(cornerRadius: 12, style: .continuous))

                VStack(alignment: .leading, spacing: 4) {
                    Text(language.text("Vollständige Node-RADS-Tabelle", "Complete Node-RADS table"))
                        .font(.system(size: 16, weight: .bold, design: .rounded))
                    Text(language.text("Klassifikation, Bedeutung und Referenz", "Classification, interpretation and reference"))
                        .font(.system(size: 12))
                        .foregroundStyle(.white.opacity(0.58))
                        .multilineTextAlignment(.leading)
                }

                Spacer(minLength: 8)
                Image(systemName: "chevron.right")
                    .font(.system(size: 14, weight: .bold))
                    .foregroundStyle(.white.opacity(0.54))
            }
            .padding(16)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background {
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(.ultraThinMaterial)
                    .overlay(RoundedRectangle(cornerRadius: 16, style: .continuous).fill(Color(red: 0.025, green: 0.055, blue: 0.095).opacity(0.72)))
            }
            .overlay {
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .stroke(LinearGradient(colors: [.white.opacity(0.24), .white.opacity(0.07)], startPoint: .topLeading, endPoint: .bottomTrailing), lineWidth: 1)
            }
        }
        .buttonStyle(.plain)
    }

    private var nodeRADSTableSheet: some View {
        NavigationStack {
            ScrollView {
                nodeRADSTableContent
                    .padding(20)
            }
            .background(Color(red: 0.012, green: 0.04, blue: 0.07))
            .navigationTitle(language.text("Node-RADS-Tabelle", "Node-RADS table"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button(language.text("Schließen", "Close")) {
                        showNodeRADSTable = false
                    }
                }
            }
        }
        .tint(violet)
        .preferredColorScheme(.dark)
    }

    private var nodeRADSTableContent: some View {
        VStack(alignment: .leading, spacing: 22) {
            HStack(spacing: 12) {
                Image(systemName: "tablecells")
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundStyle(Color(red: 0.66, green: 0.82, blue: 1))
                    .frame(width: 42, height: 42)
                    .background(violet.opacity(0.16), in: RoundedRectangle(cornerRadius: 11, style: .continuous))
                VStack(alignment: .leading, spacing: 3) {
                    Text(language.text("Vollständige Node-RADS-Tabelle", "Complete Node-RADS table"))
                        .font(.system(size: 18, weight: .bold, design: .rounded))
                    Text(language.text("Klassifikation und Bedeutung", "Classification and interpretation"))
                        .font(.system(size: 12))
                        .foregroundStyle(.white.opacity(0.52))
                }
            }

                    tableSectionTitle(language.text("Größenkategorien", "Size categories"))
                    VStack(spacing: 0) {
                        definitionRow(
                            language.text("Normal groß", "Normal size"),
                            language.text("Kurzachse unter dem regionsspezifischen Grenzwert und keine Zunahme im Verlauf.", "Short axis below the region-specific threshold and no interval growth.")
                        )
                        definitionRow(
                            language.text("Vergrößert", "Enlarged"),
                            language.text("Kurzachse am oder über dem Grenzwert oder Zunahme der Kurzachse um mindestens 2 mm.", "Short axis at or above the threshold, or an interval short-axis increase of at least 2 mm.")
                        )
                        definitionRow(
                            "Bulk",
                            language.text("Maximale Langachse mindestens 30 mm.", "Maximum long-axis diameter of at least 30 mm.")
                        )
                    }
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))

                    tableSectionTitle(language.text("Konfigurationsscore", "Configuration score"))
                    VStack(spacing: 0) {
                        scoreRow(language.text("Textur: homogen", "Texture: homogeneous"), "0")
                        scoreRow(language.text("Textur: heterogen", "Texture: heterogeneous"), "+1")
                        scoreRow(language.text("Textur: fokale Nekrose", "Texture: focal necrosis"), "+2")
                        scoreRow(language.text("Textur: grobe oder neue Nekrose", "Texture: gross or new necrosis"), "+3")
                        scoreRow(language.text("Textur: entitätsspezifischer Befund", "Texture: entity-specific finding"), "+3")
                        scoreRow(language.text("Rand: glatt", "Border: smooth"), "0")
                        scoreRow(language.text("Rand: unregelmäßig oder unscharf", "Border: irregular or ill-defined"), "+1")
                        scoreRow(language.text("Form: mit erhaltenem Fetthilus", "Shape: preserved fatty hilum"), "0")
                        scoreRow(language.text("Form: nierenförmig / oval ohne Fetthilus", "Shape: kidney-bean / oval without fatty hilum"), "0")
                        scoreRow(language.text("Form: rund ohne Fetthilus", "Shape: spherical without fatty hilum"), "+1")
                    }
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))

                    tableSectionTitle(language.text("Node-RADS-Einstufung", "Node-RADS classification"))
            ViewThatFits(in: .horizontal) {
                classificationMatrix(labelWidth: 86, cellWidth: 39)
                ScrollView(.horizontal, showsIndicators: true) {
                    classificationMatrix(labelWidth: 100, cellWidth: 45)
                }
            }
            Text(language.text("C0–C5 bezeichnet den addierten Konfigurationsscore.", "C0–C5 denotes the summed configuration score."))
                .font(.caption)
                .foregroundStyle(.white.opacity(0.54))

            tableSectionTitle(language.text("Bedeutung der Scores", "Score interpretation"))
            VStack(spacing: 0) {
                meaningRow(score: 1, signal: language.text("LK−", "LN−"), meaning: language.text("Sehr geringe Wahrscheinlichkeit eines malignen Lymphknotenbefalls", "Very low likelihood of malignant lymph-node involvement"))
                meaningRow(score: 2, signal: language.text("eher LK−", "likely LN−"), meaning: language.text("Maligner Lymphknotenbefall eher unwahrscheinlich", "Malignant lymph-node involvement considered unlikely"))
                meaningRow(score: 3, signal: language.text("LK±", "LN±"), meaning: language.text("Unklar beziehungsweise äquivokal", "Indeterminate or equivocal"))
                meaningRow(score: 4, signal: language.text("LK+", "LN+"), meaning: language.text("Hohe Wahrscheinlichkeit eines malignen Lymphknotenbefalls", "High likelihood of malignant lymph-node involvement"))
                meaningRow(score: 5, signal: language.text("LK+", "LN+"), meaning: language.text("Sehr hohe Wahrscheinlichkeit eines malignen Lymphknotenbefalls", "Very high likelihood of malignant lymph-node involvement"))
            }
            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))

            tableSectionTitle(language.text("Referenz", "Reference"))
            referenceLink("Elsholtz et al. · European Radiology (2021)\nNode-RADS 1.0", doi: "10.1007/s00330-020-07572-4")
            Text(language.text("Interaktive Lern- und Referenzdarstellung nach Node-RADS 1.0. Keine Diagnose oder Therapieempfehlung.", "Interactive educational reference adapted from Node-RADS 1.0. Not a diagnosis or treatment recommendation."))
                .font(.caption)
                .foregroundStyle(.white.opacity(0.52))
        }
        .padding(18)
        .background {
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .fill(.ultraThinMaterial)
                .overlay(RoundedRectangle(cornerRadius: 18, style: .continuous).fill(Color(red: 0.025, green: 0.055, blue: 0.095).opacity(0.74)))
        }
        .overlay {
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .stroke(LinearGradient(colors: [.white.opacity(0.25), .white.opacity(0.07)], startPoint: .topLeading, endPoint: .bottomTrailing), lineWidth: 1)
        }
        .shadow(color: .black.opacity(0.16), radius: 18, y: 8)
    }

    private func classificationMatrix(labelWidth: CGFloat, cellWidth: CGFloat) -> some View {
        Grid(horizontalSpacing: 0, verticalSpacing: 0) {
            GridRow {
                matrixCell(language.text("Größe", "Size"), width: labelWidth, emphasized: true)
                ForEach(0..<6) { value in
                    matrixCell("C\(value)", width: cellWidth, emphasized: true)
                }
            }
            matrixRow(language.text("Normal", "Normal"), scores: [1, 2, 3, 4, 4, 4], labelWidth: labelWidth, cellWidth: cellWidth)
            matrixRow(language.text("Vergrößert", "Enlarged"), scores: [2, 3, 4, 5, 5, 5], labelWidth: labelWidth, cellWidth: cellWidth)
            matrixRow("Bulk", scores: [5, 5, 5, 5, 5, 5], labelWidth: labelWidth, cellWidth: cellWidth)
        }
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
    }

    private func meaningRow(score: Int, signal: String, meaning: String) -> some View {
        HStack(alignment: .top, spacing: 12) {
            Text("\(score)")
                .font(.system(size: 17, weight: .bold, design: .rounded))
                .foregroundStyle(scoreColor(score))
                .frame(width: 30, height: 30)
                .background(scoreColor(score).opacity(0.12), in: RoundedRectangle(cornerRadius: 8, style: .continuous))
            VStack(alignment: .leading, spacing: 3) {
                Text(signal).font(.system(size: 13, weight: .bold))
                Text(meaning)
                    .font(.system(size: 11))
                    .foregroundStyle(.white.opacity(0.58))
                    .fixedSize(horizontal: false, vertical: true)
            }
            Spacer(minLength: 0)
        }
        .padding(12)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(panel.opacity(0.86))
        .overlay(alignment: .bottom) { Rectangle().fill(.white.opacity(0.08)).frame(height: 1) }
    }

    private func tableSectionTitle(_ text: String) -> some View {
        Text(text)
            .font(.title3.bold())
    }

    private func definitionRow(_ title: String, _ detail: String) -> some View {
        VStack(alignment: .leading, spacing: 5) {
            Text(title).font(.subheadline.bold())
            Text(detail).font(.caption).foregroundStyle(.white.opacity(0.65))
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(panel)
        .overlay(alignment: .bottom) { Rectangle().fill(.white.opacity(0.08)).frame(height: 1) }
    }

    private func scoreRow(_ title: String, _ score: String) -> some View {
        HStack(spacing: 12) {
            Text(title).font(.subheadline)
            Spacer(minLength: 8)
            Text(score).font(.subheadline.bold().monospacedDigit()).foregroundStyle(violet)
        }
        .padding(13)
        .background(panel)
        .overlay(alignment: .bottom) { Rectangle().fill(.white.opacity(0.08)).frame(height: 1) }
    }

    @ViewBuilder
    private func matrixRow(_ title: String, scores: [Int], labelWidth: CGFloat, cellWidth: CGFloat) -> some View {
        GridRow {
            matrixCell(title, width: labelWidth, emphasized: true)
            ForEach(Array(scores.enumerated()), id: \.offset) { _, score in
                matrixCell("\(score)", width: cellWidth, emphasized: false)
            }
        }
    }

    private func matrixCell(_ text: String, width: CGFloat, emphasized: Bool) -> some View {
        Text(text)
            .font(.system(size: 12, weight: emphasized ? .semibold : .bold, design: emphasized ? .default : .rounded))
            .foregroundStyle(emphasized ? .white.opacity(0.82) : .white)
            .frame(width: width, height: 44)
            .background(emphasized ? panel : violet.opacity(0.16))
            .overlay { Rectangle().stroke(.white.opacity(0.08), lineWidth: 0.5) }
    }

    private var landingLinks: some View {
        HStack(spacing: 16) {
            Button(language.text("Referenzen", "References")) { landingInfo = .references }
            Button(language.text("Entwickler", "Developer")) { landingInfo = .developer }
            Link(destination: URL(string: "https://www.rad-yar.com/node-rads/privacy")!) {
                Label(language.text("Datenschutz", "Privacy Policy"), systemImage: "hand.raised.fill")
            }
        }
        .font(.system(size: 12))
        .foregroundStyle(.white.opacity(0.62))
        .buttonStyle(.plain)
        .padding(.top, 12)
    }

    private func landingInfoSheet(_ info: LandingInfo) -> some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    if info == .references {
                        referenceLink("Elsholtz et al. · European Radiology (2021)\nNode-RADS 1.0", doi: "10.1007/s00330-020-07572-4")
                        referenceLink("Zhong et al. · European Radiology (2025)\nSystematic review and meta-analysis", doi: "10.1007/s00330-024-11160-1")
                        referenceLink("Parillo & Quattrocchi · Journal of Clinical Medicine (2025)\nReview", doi: "10.3390/jcm14010263")
                    } else {
                        Text("Dr. Hamed Zia").font(.headline)
                        Text("RadYar").foregroundStyle(.secondary)
                        Link("Dr.hamedzia@outlook.de", destination: URL(string: "mailto:Dr.hamedzia@outlook.de")!)
                            .foregroundStyle(violet)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(24)
            }
            .navigationTitle(info == .references ? language.text("Referenzen", "References") : language.text("Entwickler", "Developer"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button(language.text("Schließen", "Close")) { landingInfo = nil }
                }
            }
        }
        .tint(violet)
        .preferredColorScheme(.dark)
    }

    private func referenceLink(_ label: String, doi: String) -> some View {
        Link(destination: URL(string: "https://doi.org/\(doi)")!) {
            HStack(alignment: .top, spacing: 12) {
                Text(label)
                    .font(.subheadline)
                    .multilineTextAlignment(.leading)
                Spacer(minLength: 0)
                Image(systemName: "arrow.up.right")
                    .font(.caption)
            }
        }
    }

    private var actionBar: some View {
        HStack(spacing: 14) {
            if step > 0 {
                Button(language.text("Zurück", "Back")) {
                    showRequired = false
                    step = step == 3 && size == .bulk ? 1 : step - 1
                }
                .font(.system(size: 16, weight: .semibold))
                .padding(.horizontal, 22)
                .frame(minHeight: 56)
                .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                .overlay {
                    RoundedRectangle(cornerRadius: 10, style: .continuous)
                        .stroke(.white.opacity(0.24), lineWidth: 1)
                }
            }
            Spacer()
            if showRequired { Text(language.text("Bitte Auswahl treffen.", "Please make a selection.")).font(.caption).foregroundStyle(.orange) }
            Button(step == 3 ? language.text("Neu beginnen", "Start again") : language.text("Weiter", "Continue")) {
                if step == 3 { reset(); return }
                guard canContinue else { showRequired = true; return }
                showRequired = false
                let next = step == 1 && size == .bulk ? 3 : step + 1
                completed = max(completed, next)
                step = next
            }
            .font(.system(size: 16, weight: .bold))
            .padding(.horizontal, 24)
            .frame(minHeight: 56)
            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
            .background(violet.opacity(0.42), in: RoundedRectangle(cornerRadius: 10, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .stroke(.white.opacity(0.34), lineWidth: 1)
            }
            .shadow(color: violet.opacity(0.18), radius: 12, y: 5)
        }
        .buttonStyle(.plain)
        .padding(.horizontal, 18)
        .padding(.vertical, 14)
    }

    private func reset() {
        step = 0; completed = 0; special = false; regionID = ""; shortAxis = 0; longAxis = 0
        growth = false; texture = nil; border = nil; shape = nil; showRequired = false
    }

    private func title(_ heading: String, _ detail: String) -> some View {
        VStack(alignment: .leading, spacing: 7) {
            Text(heading).font(.system(size: 27, weight: .bold, design: .rounded))
            Text(detail).font(.subheadline).foregroundStyle(.gray)
        }
    }

    private func stepHeading(number: String, icon: String, title: String, detail: String) -> some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack(spacing: 10) {
                Text(number)
                    .font(.system(size: 11, weight: .bold, design: .monospaced))
                    .foregroundStyle(violet)
                    .frame(width: 34, height: 34)
                    .background(violet.opacity(0.14), in: RoundedRectangle(cornerRadius: 9, style: .continuous))
                Image(systemName: icon)
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundStyle(Color(red: 0.64, green: 0.82, blue: 1))
            }
            Text(title)
                .font(.system(size: 28, weight: .bold, design: .rounded))
                .fixedSize(horizontal: false, vertical: true)
            Text(detail)
                .font(.system(size: 14))
                .foregroundStyle(.white.opacity(0.58))
                .lineSpacing(3)
        }
        .padding(.bottom, 3)
    }

    private func selectionCard(_ title: String, detail: String, badge: String, icon: String, selected: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            HStack(spacing: 14) {
                Image(systemName: icon)
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundStyle(selected ? .white : Color(red: 0.66, green: 0.82, blue: 1))
                    .frame(width: 44, height: 44)
                    .background(selected ? violet.opacity(0.42) : violet.opacity(0.12), in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                VStack(alignment: .leading, spacing: 4) {
                    Text(title).font(.system(size: 15, weight: .semibold))
                    Text(detail)
                        .font(.system(size: 12))
                        .foregroundStyle(.white.opacity(0.54))
                        .multilineTextAlignment(.leading)
                }
                Spacer(minLength: 8)
                VStack(alignment: .trailing, spacing: 8) {
                    Image(systemName: selected ? "checkmark.circle.fill" : "circle")
                        .font(.system(size: 19, weight: .semibold))
                        .foregroundStyle(selected ? violet : .white.opacity(0.30))
                    Text(badge)
                        .font(.system(size: 10, weight: .bold))
                        .foregroundStyle(selected ? .white.opacity(0.82) : .white.opacity(0.50))
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(.white.opacity(0.07), in: Capsule())
                }
            }
            .padding(15)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background {
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(.ultraThinMaterial)
                    .overlay {
                        RoundedRectangle(cornerRadius: 16, style: .continuous)
                            .fill(Color(red: 0.025, green: 0.055, blue: 0.095).opacity(0.72))
                        if selected {
                            RoundedRectangle(cornerRadius: 16, style: .continuous)
                                .fill(violet.opacity(0.10))
                        }
                    }
            }
            .overlay {
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .stroke(
                        selected
                            ? LinearGradient(colors: [violet.opacity(0.95), Color(red: 0.45, green: 0.75, blue: 1).opacity(0.55)], startPoint: .topLeading, endPoint: .bottomTrailing)
                            : LinearGradient(colors: [.white.opacity(0.22), .white.opacity(0.08)], startPoint: .topLeading, endPoint: .bottomTrailing),
                        lineWidth: selected ? 1.4 : 1
                    )
            }
            .shadow(color: selected ? violet.opacity(0.12) : .black.opacity(0.08), radius: 14, y: 7)
        }
        .buttonStyle(.plain)
    }

    private func measurement(_ label: String, caption: String, icon: String, value: Binding<Int>) -> some View {
        VStack(alignment: .leading, spacing: 18) {
            HStack(spacing: 12) {
                Image(systemName: icon)
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundStyle(Color(red: 0.66, green: 0.82, blue: 1))
                    .frame(width: 40, height: 40)
                    .background(violet.opacity(0.14), in: RoundedRectangle(cornerRadius: 11, style: .continuous))
                VStack(alignment: .leading, spacing: 3) {
                    Text(label).font(.system(size: 15, weight: .semibold))
                    Text(caption).font(.system(size: 11)).foregroundStyle(.white.opacity(0.48))
                }
                Spacer()
                Text(value.wrappedValue == 0 ? "—" : "\(value.wrappedValue)")
                    .font(.system(size: 29, weight: .bold, design: .rounded))
                    .monospacedDigit()
                    .foregroundStyle(.white)
                Text("mm")
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundStyle(.white.opacity(0.46))
                    .padding(.top, 10)
            }
            HStack(spacing: 12) {
                measurementButton("minus", disabled: value.wrappedValue < 2) {
                    value.wrappedValue = max(2, value.wrappedValue - 1)
                }
                Slider(
                    value: Binding(get: { Double(max(2, value.wrappedValue)) }, set: { value.wrappedValue = Int($0) }),
                    in: 2...35,
                    step: 1
                )
                .tint(violet)
                measurementButton("plus", disabled: value.wrappedValue >= 35) {
                    value.wrappedValue = min(35, value.wrappedValue == 0 ? 2 : value.wrappedValue + 1)
                }
            }
        }
        .padding(16)
        .background {
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .fill(.ultraThinMaterial)
                .overlay(RoundedRectangle(cornerRadius: 18, style: .continuous).fill(Color(red: 0.025, green: 0.055, blue: 0.095).opacity(0.72)))
        }
        .overlay {
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .stroke(LinearGradient(colors: [.white.opacity(0.24), .white.opacity(0.07)], startPoint: .topLeading, endPoint: .bottomTrailing), lineWidth: 1)
        }
        .shadow(color: .black.opacity(0.10), radius: 16, y: 8)
    }

    private func measurementButton(_ icon: String, disabled: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Image(systemName: icon)
                .font(.system(size: 13, weight: .bold))
                .frame(width: 38, height: 38)
                .background(.white.opacity(disabled ? 0.04 : 0.10), in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 10, style: .continuous).stroke(.white.opacity(disabled ? 0.06 : 0.15), lineWidth: 1))
        }
        .buttonStyle(.plain)
        .disabled(disabled)
    }

    private func choiceGroup(
        _ number: Int,
        _ heading: String,
        options: [String],
        scores: [Int],
        selection: Binding<Int?>,
        imageFeature: MRIFeature,
        scrollProxy: ScrollViewProxy,
        previewExcludedIndices: Set<Int> = [],
        detailItems: [Int: [String]] = [:]
    ) -> some View {
        VStack(alignment: .leading, spacing: 13) {
            HStack(spacing: 11) {
                Text(String(format: "%02d", number))
                    .font(.system(size: 13, weight: .bold, design: .monospaced))
                    .foregroundStyle(violet)
                    .frame(width: 37, height: 37)
                    .background(violet.opacity(0.14), in: RoundedRectangle(cornerRadius: 9))
                VStack(alignment: .leading, spacing: 2) {
                    Text(heading).font(.title3.bold())
                    Text(language.text("Eine Eigenschaft auswählen", "Choose one feature"))
                        .font(.caption).foregroundStyle(.white.opacity(0.55))
                }
                Spacer()
                if selection.wrappedValue != nil {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundStyle(Color(red: 0.49, green: 0.82, blue: 0.96))
                }
            }
            Rectangle().fill(.white.opacity(0.1)).frame(height: 1)
            ForEach(options.indices, id: \.self) { index in
                Button {
                    selection.wrappedValue = index
                    if number < 3 {
                        let nextSection = number == 1 ? "border" : "shape"
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.22) {
                            withAnimation(.easeInOut(duration: 0.38)) {
                                scrollProxy.scrollTo(nextSection, anchor: .top)
                            }
                        }
                    }
                } label: {
                    HStack(spacing: 12) {
                        Image(systemName: selection.wrappedValue == index ? "checkmark.circle.fill" : "circle")
                            .foregroundStyle(selection.wrappedValue == index ? violet : .white.opacity(0.45))
                        Text(options[index])
                            .font(.system(size: 14, weight: .medium))
                            .multilineTextAlignment(.leading)
                        Spacer(minLength: 4)
                        Text(scores[index] == 0 ? "0" : "+\(scores[index])")
                            .font(.caption.bold().monospacedDigit())
                            .foregroundStyle(Color(red: 0.49, green: 0.82, blue: 0.96))
                            .padding(.horizontal, 9).padding(.vertical, 5)
                            .background(Color(red: 0.49, green: 0.82, blue: 0.96).opacity(0.10), in: Capsule())
                    }
                    .padding(.horizontal, 13).padding(.vertical, 12)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(selection.wrappedValue == index ? violet.opacity(0.13) : .white.opacity(0.035), in: RoundedRectangle(cornerRadius: 10))
                    .overlay(RoundedRectangle(cornerRadius: 10).stroke(selection.wrappedValue == index ? violet.opacity(0.85) : .white.opacity(0.09)))
                }
                .buttonStyle(.plain)
                .id("choice-\(number)-\(index)")
                if selection.wrappedValue == index, let details = detailItems[index] {
                    VStack(alignment: .leading, spacing: 10) {
                        Text(language.text("Dazu gehören zum Beispiel:", "Examples include:"))
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundStyle(.white.opacity(0.82))
                        ForEach(details, id: \.self) { detail in
                            HStack(alignment: .firstTextBaseline, spacing: 10) {
                                Circle()
                                    .fill(violet)
                                    .frame(width: 5, height: 5)
                                Text(detail)
                                    .font(.system(size: 13, weight: .medium))
                                    .foregroundStyle(.white.opacity(0.76))
                                    .fixedSize(horizontal: false, vertical: true)
                            }
                        }
                    }
                    .padding(14)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(violet.opacity(0.10), in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                    .overlay {
                        RoundedRectangle(cornerRadius: 10, style: .continuous)
                            .stroke(violet.opacity(0.28), lineWidth: 1)
                    }
                    .padding(.horizontal, 4)
                    .transition(.opacity.combined(with: .move(edge: .top)))
                }
                if selection.wrappedValue == index && !previewExcludedIndices.contains(index) {
                    MRIPreview(feature: imageFeature, variant: index, language: language)
                        .padding(.horizontal, 4)
                        .transition(.opacity.combined(with: .move(edge: .top)))
                }
            }
        }
        .padding(16)
        .background(Color(red: 0.025, green: 0.055, blue: 0.095).opacity(0.94), in: RoundedRectangle(cornerRadius: 18))
        .overlay(RoundedRectangle(cornerRadius: 18).stroke(.white.opacity(0.18)))
        .shadow(color: .black.opacity(0.16), radius: 18, y: 8)
    }

    private func info(_ message: String) -> some View {
        Label(message, systemImage: "info.circle")
            .font(.subheadline).foregroundStyle(.white.opacity(0.8))
            .padding().frame(maxWidth: .infinity, alignment: .leading)
            .background(violet.opacity(0.12), in: RoundedRectangle(cornerRadius: 12))
    }

    private func sizeLabel(_ size: NodeSize) -> String {
        switch size {
        case .normal: return language.text("Normal groß", "Normal size")
        case .enlarged: return language.text("Vergrößert", "Enlarged")
        case .bulk: return "Bulk"
        }
    }

    private func levelLabel(_ score: Int) -> String {
        let de = ["Sehr geringe Wahrscheinlichkeit", "Geringe Wahrscheinlichkeit", "Unklar / äquivokal", "Hohe Wahrscheinlichkeit", "Sehr hohe Wahrscheinlichkeit"]
        let en = ["Very low likelihood", "Low likelihood", "Equivocal", "High likelihood", "Very high likelihood"]
        return (language == .german ? de : en)[score - 1]
    }
}
