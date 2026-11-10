import SwiftUI

enum CalendarStyle {
    static let ink = Color(red: 0.19, green: 0.10, blue: 0.22)
    static let muted = Color(red: 0.43, green: 0.35, blue: 0.44)
    static let olive = Color(red: 0.40, green: 0.43, blue: 0.26)
    static let lilac = Color(red: 0.66, green: 0.48, blue: 0.70)
    static let canvas = Color(red: 0.95, green: 0.91, blue: 0.92)
    static let line = Color(red: 0.52, green: 0.41, blue: 0.48).opacity(0.14)
    static func serif(_ size: CGFloat) -> Font { .custom("Georgia-BoldItalic", size: size, relativeTo: .largeTitle) }
}

struct CalendarBackdrop: View {
    @Environment(\.accessibilityReduceTransparency) private var reduceTransparency
    var body: some View {
        GeometryReader { geometry in
            ZStack {
                CalendarStyle.canvas
                if !reduceTransparency {
                    Image("PearlMist").resizable().scaledToFill()
                        .frame(width: geometry.size.width, height: geometry.size.height)
                        .clipped().opacity(0.37)
                }
            }
        }.ignoresSafeArea().accessibilityHidden(true)
    }
}

struct PearlSurface: ViewModifier {
    @Environment(\.accessibilityReduceTransparency) private var reduceTransparency
    var radius: CGFloat
    func body(content: Content) -> some View {
        content.background(reduceTransparency ? CalendarStyle.canvas : Color.white.opacity(0.20), in: RoundedRectangle(cornerRadius: radius))
            .overlay { RoundedRectangle(cornerRadius: radius).strokeBorder(.white.opacity(0.65), lineWidth: 1).allowsHitTesting(false) }
    }
}
extension View {
    func pearlSurface(_ radius: CGFloat = 24) -> some View { modifier(PearlSurface(radius: radius)) }
}

struct BrandWordmark: View {
    var compact = false
    var body: some View {
        Group {
            if compact {
                HStack(alignment: .firstTextBaseline, spacing: 8) {
                    Text("Jaminova").font(CalendarStyle.serif(33))
                    Text("Kalender").font(.system(size: 21))
                }
            } else {
                VStack(alignment: .leading, spacing: -3) {
                    Text("Jaminova").font(CalendarStyle.serif(32))
                    Text("Kalender").font(.system(size: 19))
                }
            }
        }.foregroundStyle(CalendarStyle.ink).accessibilityElement(children: .combine)
    }
}

struct AddEventButton: View {
    var action: () -> Void
    var body: some View {
        Button(action: action) {
            Label("Termin", systemImage: "plus").font(.system(size: 18, weight: .medium))
                .padding(.horizontal, 22).frame(height: 46)
                .foregroundStyle(.white).background(CalendarStyle.olive, in: Capsule())
                .overlay { Capsule().strokeBorder(.white.opacity(0.65), lineWidth: 1) }
        }.buttonStyle(.plain).accessibilityLabel("Termin hinzufügen").accessibilityIdentifier("add-event")
            .keyboardShortcut("n", modifiers: .command)
    }
}

struct AvatarButton: View {
    var action: () -> Void
    var body: some View {
        Button(action: action) {
            Text("J").font(.system(size: 18, weight: .semibold)).foregroundStyle(CalendarStyle.olive)
                .frame(width: 48, height: 48).background(CalendarStyle.olive.opacity(0.09), in: Circle())
                .overlay { Circle().strokeBorder(.white.opacity(0.7)) }
        }.buttonStyle(.plain).accessibilityLabel("Profil").accessibilityIdentifier("profile")
    }
}
