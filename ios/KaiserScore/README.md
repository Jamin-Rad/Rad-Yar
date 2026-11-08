# Kaiser Score for iOS

Native, offline SwiftUI decision aid for iPhone, modeled on the separate Node-RADS app. The scoring tree matches `app/kaiser-score/page.js`. The app asks for diagnostic image quality, shows an explicit clinical-use notice, and translates the result using the published mapping: Kaiser Score 1–4 to BI-RADS 2/3, 5–7 to BI-RADS 4, and 8–11 to BI-RADS 5. The result also explains the meaning of each category and keeps the choice between BI-RADS 2 and 3 dependent on the complete clinical and imaging context.

An optional ADC supplement is available for middle-range scores. It uses the published global cutoff **≥ 1.5 × 10⁻³ mm²/s** only after the user confirms adequate DWI/ADC and an independent BI-RADS 4 assessment. The ADC result does not change the Kaiser Score. No unpublished lesion-specific thresholds or pathology ADC-range graphic are included.

## Build and release

Open `KaiserScore.xcodeproj` in Xcode. Select the `KaiserScore` scheme and set the publishing team in Signing & Capabilities. The bundle identifier is `com.radyar.kaiserscore`; confirm it is available to that team. The deployment target is iOS 17.0, iPhone. For App Store Connect, use `https://www.rad-yar.com/kaiser-score/privacy` as the privacy URL and `https://www.rad-yar.com/kaiser-score` as the support URL after deploying those routes.

The app does not use sign-in, ads, analytics, a backend, or patient record storage. Inputs exist in memory only. External reference links open the browser. Clinical wording and the use of the decision aid should be reviewed by a breast-imaging clinician before distribution.

## Model check

```sh
CLANG_MODULE_CACHE_PATH=/tmp/kaiser-clang-cache swiftc KaiserScore/KaiserScoreModel.swift tests/main.swift -o /tmp/kaiser-score-tests
/tmp/kaiser-score-tests
```
