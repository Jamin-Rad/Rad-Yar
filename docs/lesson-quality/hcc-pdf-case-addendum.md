# HCC PDF case addendum

Date: 2026-10-19  
Route: /abdomen/leber/hcc · curriculum ID: hcc  
Scope: integrate the teaching case on Abdomen.pdf p. 19 into the existing HCC lesson. This is a scoped addition, not a full audit of the existing HCC lesson or all LI-RADS content.

## Source coverage

| Unit | Source | Disposition |
|---|---|---|
| CT native attenuation can vary and may be low | Abdomen.pdf p. 19 | Already represented in the route's multiphasic CT section; no duplicate added |
| Early arterial enhancement and relative wash-out on later phases | Abdomen.pdf p. 19 | Existing route covers the dynamic pattern; retained as a pattern description |
| The illustrated lesion remains indeterminate by its enhancement; HCC, metastasis and cholangiocarcinoma are listed in the PDF differential | Abdomen.pdf p. 19, page image visually inspected | Added as a counterexample case with a four-phase CT crop and an explicit source caveat |
| Biopsy subsequently confirmed HCC in the PDF case | Abdomen.pdf p. 19 caption | Added as source-reported outcome; wording distinguishes histologic confirmation from imaging specificity |
| Older LI-RADS categories, size bands and threshold-growth criterion | Abdomen.pdf p. 20, page image visually inspected | Not copied. The route has current LI-RADS wording; the exact current criteria remain a primary-source review item |
| MRI T1/T2/DWI/hepatobiliary-phase features | Abdomen.pdf p. 20 | Not expanded in this addendum; existing route content is outside this case-level change |

The source is the user-supplied Abdomen.pdf; the user authorized reuse of images from the supplied PDFs. The displayed crop is from PDF p. 19 (printed page 18), preserving the source's arterial, portal-venous and delayed-phase labels and the circled lesion. It is not represented as a classic or diagnostic HCC image.

## Learner-facing addition

Added in the existing German, English and Persian case section:

- **DE:** “Abdomen.pdf, Seite 19, beschreibt im Mehrphasen-CT einen malignitätsverdächtigen Herd mit Differenzialdiagnosen HCC, Metastase und CCC. Die charakteristische HCC-Kontrastmitteldynamik war laut Quelle nicht eindeutig; die im PDF berichtete Biopsie bestätigte HCC. Der Fall zeigt: Ein später bestätigter HCC-Befund macht das vorherige Bildmuster nicht rückwirkend spezifisch.”
- **EN:** “Abdomen.pdf page 19 describes a suspicious lesion on multiphasic CT, with HCC, metastasis and cholangiocarcinoma in the differential. The source says the characteristic HCC enhancement pattern was not definitive; the biopsy reported in the PDF confirmed HCC. A later confirmed diagnosis does not make the preceding imaging pattern specific in retrospect.”
- **FA:** “صفحه ۱۹ Abdomen.pdf در CT چندفازی ضایعه‌ای مشکوک به بدخیمی را توصیف می‌کند و HCC، متاستاز و کلانژیوکارسینوم را در افتراق می‌گذارد. طبق منبع، الگوی تیپیک جذب HCC قطعی نبود؛ بیوپسی گزارش‌شده در PDF، HCC را تأیید کرد. تشخیص نهایی، الگوی تصویری پیشین را به‌طور پس‌نگر اختصاصی نمی‌کند.”

The semantic units preserved in all three versions are: suspicious malignant lesion; same differential; non-definitive characteristic enhancement; biopsy-reported HCC; histology does not retroactively make the imaging pattern specific. Alt text names the phase sequence and says the lesion is outlined in one delayed image. Attribution is shown beside the figure.

## QA notes and open gates

- **SRC:** pages 19–20 rendered and visually inspected. The new figure uses p. 19; p. 20's older LI-RADS numbers were excluded pending verification. No claim is made that all PDF HCC content is covered.
- **EDU:** the case is a counterexample placed inside the existing case section; it reinforces why a non-classic image should not be called diagnostic from the outcome alone.
- **VIS:** the four-phase crop is legible and phase-labeled. Source is recorded as user-supplied Abdomen.pdf p. 19 (printed p. 18); user authorization covers PDF image reuse. Browser display and responsive crop behavior remain untested.
- **LNG:** parallel semantic units are present in DE/EN/FA; independent native-language review and RTL browser verification remain open.
- **ASM:** no new quiz item or flashcard was added.
- **UX / build:** not run; the shared worktree has concurrent changes and .next is shared.
- Existing HCC assertions, current LI-RADS criteria and the two existing Radiopaedia cases were not independently re-reviewed here. Scientific sign-off remains open.
