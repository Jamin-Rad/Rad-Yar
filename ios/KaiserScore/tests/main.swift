import Foundation

func check(_ condition: @autoclosure () -> Bool, _ message: String) {
    precondition(condition(), message)
}
let base = ["quality": "yes"]
check(KaiserScoreModel.next(answers: [:]) == "quality", "quality first")
check(KaiserScoreModel.score(answers: ["quality": "no"]) == nil, "invalid quality stops")
let cases: [(String, String, String, String, Int)] = [
    ("no", "persistent", "margin", "circumscribed", 1),
    ("no", "persistent", "margin", "irregular", 3),
    ("no", "plateau", "margin", "circumscribed", 2),
    ("no", "plateau", "margin", "irregular", 5),
    ("no", "washout", "enhancement", "homogeneous", 4),
    ("no", "washout", "enhancement", "heterogeneous", 8),
    ("yes", "plateau", "edema", "absent", 7),
    ("yes", "plateau", "edema", "present", 10),
    ("yes", "washout", "edema", "absent", 9),
    ("yes", "washout", "edema", "present", 11),
]
for (root, curve, key, value, expected) in cases {
    check(KaiserScoreModel.score(answers: base.merging(["root": root, "curve": curve, key: value]) { _, new in new }) == expected, "score \(expected)")
}
check(KaiserScoreModel.score(answers: ["quality": "yes", "root": "yes", "curve": "persistent"]) == 6, "score 6")
check(KaiserScoreModel.birads(for: 1) == .twoOrThree, "score 1 maps to BI-RADS 2/3")
check(KaiserScoreModel.birads(for: 4) == .twoOrThree, "score 4 maps to BI-RADS 2/3")
check(KaiserScoreModel.birads(for: 5) == .four, "score 5 maps to BI-RADS 4")
check(KaiserScoreModel.birads(for: 7) == .four, "score 7 maps to BI-RADS 4")
check(KaiserScoreModel.birads(for: 8) == .five, "score 8 maps to BI-RADS 5")
check(KaiserScoreModel.birads(for: 11) == .five, "score 11 maps to BI-RADS 5")
check(KaiserScoreModel.birads(for: 0) == nil, "out-of-range score rejected")
check(KaiserScoreModel.adcSupportsDowngrade(1.5) == true, "inclusive ADC boundary")
check(KaiserScoreModel.adcSupportsDowngrade(1.49) == false, "below ADC boundary")
check(KaiserScoreModel.adcSupportsDowngrade(0) == nil, "invalid ADC rejected")
check(KaiserScoreModel.adcSupportsDowngrade(5.1) == nil, "implausible ADC rejected")
print("Kaiser Score model checks passed")
