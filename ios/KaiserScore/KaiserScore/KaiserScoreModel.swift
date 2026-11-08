import Foundation

enum KaiserBiradsGroup: Equatable {
    case twoOrThree
    case four
    case five

    var label: String {
        switch self {
        case .twoOrThree: return "BI-RADS 2/3"
        case .four: return "BI-RADS 4"
        case .five: return "BI-RADS 5"
        }
    }
}

enum KaiserScoreModel {
    static let adcThreshold = 1.5

    static func next(answers: [String: String]) -> String? {
        if answers["quality"] == nil { return "quality" }
        if answers["quality"] == "no" { return nil }
        if answers["root"] == nil { return "root" }
        if answers["curve"] == nil { return "curve" }
        if answers["root"] == "no" {
            if answers["curve"] == "washout" {
                return answers["enhancement"] == nil ? "enhancement" : nil
            }
            return answers["margin"] == nil ? "margin" : nil
        }
        if answers["curve"] == "persistent" { return nil }
        return answers["edema"] == nil ? "edema" : nil
    }

    static func score(answers: [String: String]) -> Int? {
        guard answers["quality"] == "yes", next(answers: answers) == nil,
              let root = answers["root"], let curve = answers["curve"] else { return nil }
        if root == "no" {
            switch curve {
            case "persistent": return answers["margin"] == "irregular" ? 3 : 1
            case "plateau": return answers["margin"] == "irregular" ? 5 : 2
            default: return answers["enhancement"] == "heterogeneous" ? 8 : 4
            }
        }
        if curve == "persistent" { return 6 }
        if curve == "plateau" { return answers["edema"] == "present" ? 10 : 7 }
        return answers["edema"] == "present" ? 11 : 9
    }

    static func adcSupportsDowngrade(_ value: Double) -> Bool? {
        guard value > 0, value <= 5 else { return nil }
        return value >= adcThreshold
    }

    static func birads(for score: Int) -> KaiserBiradsGroup? {
        guard (1...11).contains(score) else { return nil }
        if score <= 4 { return .twoOrThree }
        if score <= 7 { return .four }
        return .five
    }
}
