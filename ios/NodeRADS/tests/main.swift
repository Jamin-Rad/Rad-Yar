import Foundation

func check(_ condition: @autoclosure () -> Bool, _ message: String) {
    precondition(condition(), message)
}

check(NodeRADSModel.size(short: 9, long: 20, threshold: 10, growth: false) == .normal, "normal below threshold")
check(NodeRADSModel.size(short: 10, long: 20, threshold: 10, growth: false) == .enlarged, "enlarged at threshold")
check(NodeRADSModel.size(short: 14, long: 20, threshold: 15, growth: false) == .normal, "inguinal threshold")
check(NodeRADSModel.size(short: 5, long: 20, threshold: 5, growth: false) == .enlarged, "special region threshold")
check(NodeRADSModel.size(short: 4, long: 20, threshold: 10, growth: true) == .enlarged, "growth overrides size")
check(NodeRADSModel.size(short: 8, long: 30, threshold: 10, growth: false) == .bulk, "bulk at 30 mm")
check(NodeRADSModel.size(short: 20, long: 8, threshold: 10, growth: false) == .normal, "reversed axes are normalized")
check(NodeRADSModel.size(short: 0, long: 20, threshold: 10, growth: false) == nil, "missing axis")
check(NodeRADSModel.configuration(texture: 4, border: 1, shape: 2) == 5, "maximum configuration")
for configuration in 0...5 {
    check(NodeRADSModel.score(size: .normal, configuration: configuration) == min(configuration + 1, 4), "normal score \(configuration)")
    check(NodeRADSModel.score(size: .enlarged, configuration: configuration) == min(configuration + 2, 5), "enlarged score \(configuration)")
    check(NodeRADSModel.score(size: .bulk, configuration: configuration) == 5, "bulk score \(configuration)")
}
print("Node-RADS scoring checks passed")
