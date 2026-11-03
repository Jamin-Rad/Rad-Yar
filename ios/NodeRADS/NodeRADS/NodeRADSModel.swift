import Foundation

enum NodeSize: String {
    case normal, enlarged, bulk
}

enum NodeRADSModel {
    static let textureScores = [0, 1, 2, 3, 3]

    static func size(short: Int, long: Int, threshold: Int, growth: Bool) -> NodeSize? {
        guard short > 0, long > 0 else { return nil }
        if max(short, long) >= 30 { return .bulk }
        if growth || min(short, long) >= threshold { return .enlarged }
        return .normal
    }

    static func configuration(texture: Int, border: Int, shape: Int) -> Int {
        textureScores[texture] + border + (shape == 2 ? 1 : 0)
    }

    static func score(size: NodeSize, configuration: Int) -> Int {
        if size == .bulk { return 5 }
        if size == .normal { return min(configuration + 1, 4) }
        return min(configuration + 2, 5)
    }
}
