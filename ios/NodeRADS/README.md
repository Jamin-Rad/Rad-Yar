# Node-RADS for iOS

Native SwiftUI educational reference for the published Node-RADS 1.0 criteria. It works offline and does not collect user data. The scoring logic matches `app/node-rads/page.js`, including the 15 mm inguinal threshold, 5 mm special-region thresholds, 30 mm bulk threshold, interval growth, configuration scoring, and automatic swapping of reversed axes.

## Build

Open `NodeRADS.xcodeproj` in Xcode. Select the `NodeRADS` scheme. For a device or App Store archive, set the Signing & Capabilities team to the Apple Developer Program account that will publish the app. Confirm the bundle ID `com.radyar.noderads` is available to that team. The deployment target is iOS 17.0, iPhone.

The app's App Store price should be **Free**. There are no in-app purchases. The App Store privacy policy URL is `https://www.rad-yar.com/node-rads/privacy`; deploy the web route before submission. The support URL can be `https://www.rad-yar.com/node-rads`.

## Submission checklist

1. Enroll in the Apple Developer Program and complete App Store Connect agreements.
2. In Xcode, set the publishing team and check the bundle identifier. Archive the Release build and upload it to App Store Connect.
3. Create the iOS app record in App Store Connect, select Free pricing, and add name, subtitle, description, category, screenshots, support URL, and privacy URL.
4. In App Privacy, declare that this standalone iOS app does not collect data. Verify the declaration if the app's code or dependencies change.
5. Complete age rating, export compliance, and any medical/regulatory questions shown for the selected regions. In review notes, identify the scientific source and explain that the app is an interactive educational reference, not a healthcare service, diagnosis, or treatment recommendation.
6. Test on a physical iPhone or simulator, then submit for App Review. Publication is subject to Apple's approval.

The app contains no sign-in, ads, analytics SDK, backend dependency, or patient record storage. Exploring example measurements is local only, and the app instructs users not to enter patient-identifying information. Each launch begins on an educational reference page and opens an educational-use notice before the criteria explorer. References, Developer, and Privacy Policy links are directly accessible from the start page. Selecting a texture, border, or shape option displays one of ten distinct synthetic axial post-contrast T1 MRI teaching images. These are marked as synthetic examples, not patient scans; a red arrow points to the feature. The final screen keeps the published Node-RADS category and interpretation while presenting them as a reference result rather than a clinical report. It does not create or copy findings, diagnoses, or treatment recommendations. The iOS app icon uses the existing `public/node-rads/app-icon.png` artwork. External reference and privacy links open the browser.
