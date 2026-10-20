# MRCP — Technik.pdf p.117 (printed p.116)

Status: bounded lesson unit added to `/technik/grundlagen#mrcp-protokoll`; exact existing curriculum topic is linked and remains `inProgress`. Independent source/content/visual/language/assessment review and corrective-delta retest passed. This is an editorial/technical draft, not clinical protocol approval.

## Learning task and scope

Explain why routine MRCP can outline fluid-filled biliary and pancreatic ducts without intravenous contrast, how MPR/MIP overviews are made from acquired data, and why the reader must return to thin-section source images when small filling defects remain possible. The page is a text-only technique summary; it contains no patient scan or case image. A new code-native workflow schematic is used to show the interpretation sequence, not diagnostic anatomy.

The lesson does not prescribe a scanner-specific sequence, fasting duration, oral agent, or patient preparation. It does not teach biliary disease diagnosis, MRCP sensitivity/specificity, ERCP indications, secretin MRCP, or a complete abdominal MRI protocol.

## Source coverage ledger

| ID | PDF source statement | Importance | Lesson location / disposition |
|---|---|---|---|
| MRCP-SRC-01 | Physical p.117 / printed p.116 calls MRCP non-invasive and depicts intra-/extrahepatic bile ducts and pancreatic duct without routine IV contrast. | Essential principle | Lead + `Signal principle`; qualified as usual T2-based MRCP, distinguishing hepatobiliary contrast methods. |
| MRCP-SRC-02 | Heavily T2-weighted sequence: fluid signal appears bright against background. | Essential principle | Lead + `Signal principle`; externally corroborated by Griffin et al. and Al-Dhuhli. |
| MRCP-SRC-03 | HASTE with fat suppression described as frequently used. | Supporting technique | `Sequence choice`; retained as the PDF’s description, explicitly not a universal/current protocol requirement. |
| MRCP-SRC-04 | MPR and MIP processing provide duct overview. | Essential workflow | `Reformat and overview` + visual workflow. MIP is defined as projecting highest-signal pixels along a view. |
| MRCP-SRC-05 | Small concretions may be missed; motion/peristalsis and bowel fluid may interfere. | Essential limitation | `Important limitation` + MIP/source-image self-check; supplemented with current RSNA 2024 guidance to inspect source/thin-section T2 images. |
| MRCP-SRC-06 | Fruit juice may suppress overlapping gastric/duodenal fluid signal; the PDF attributes its paramagnetic effect to manganese. | Optional source-specific tip | `Oral negative contrast`; summarized as optional at some centres, not universal routine. The lesson does not repeat the PDF’s specific food choice or mechanism as a recommendation. |

## Learning path and visual plan

1. Start with the signal contrast: long-T2 fluid bright, surrounding tissue relatively low signal.
2. Identify that routine T2-based MRCP is non-ionizing and usually does not need IV contrast; keep hepatobiliary contrast-enhanced approaches distinct.
3. Relate the PDF’s HASTE example to the broader existence of varied 2D/3D approaches.
4. Explain how MPR/MIP provides an overview and why MIP is not a substitute for source review.
5. Retrieve the key action when a small filling defect remains possible: inspect thin-section source images and relevant T2 images.

`public/technik/mrcp-workflow.svg` shows four conceptual stages: heavily T2-weighted acquisition, a 3D dataset, MPR/MIP overview, then source-image review. It contains no patient image or diagnostic claim. DE/EN/FA alt and captions explain the same order.

## Assessment

The embedded question gives a scenario where MIP provides a clear overview but a small filling defect is still possible. The keyed response is to inspect thin-section source and relevant T2 images; accepting only MIP or regenerating the same projection are plausible but insufficient distractors. Localized feedback explains partial-volume/overlap limits in DE/EN/FA.

## References checked on 20 Oct 2026

- Al-Dhuhli H. *Role of Magnetic Resonance Cholangiopancreatography in the Evaluation of Biliary Disease.* Sultan Qaboos Univ Med J. 2009;9(3):341–352. [PMC3074788](https://pmc.ncbi.nlm.nih.gov/articles/PMC3074788/) — heavily T2-weighted signal, routine lack of IV contrast, HASTE/3D and source-image review.
- Griffin N, Charles-Edwards G, Grant LA. *Magnetic resonance cholangiopancreatography: the ABC of MRCP.* Insights Imaging. 2012;3(1):11–21. doi:10.1007/s13244-011-0129-9. [PMC3292642](https://pmc.ncbi.nlm.nih.gov/articles/PMC3292642/) — 2D/3D approaches, MIP, optional negative oral agents at some centres, motion/partial-volume pitfalls and source-image review.
- Vendrami CL et al. *Imaging of Biliary Tree Abnormalities.* RadioGraphics. 2024;44(8):e230174. doi:10.1148/rg.230174. [RSNA](https://pubs.rsna.org/doi/10.1148/rg.230174) — current teaching point that MIP may obscure small filling defects and source/thin-section T2 images should also be reviewed.

## Verification and limits

- The exact source page was rendered and visually inspected: headings cover CINE and MRCP; the MRCP block includes principles, HASTE, MPR/MIP, oral negative contrast, advantages and limitations. No diagnostic patient image appears on this page.
- Focused actual-route SSR and localized-data checks are in `scripts/test-technik-mrcp-ssr.mjs`.
- Exact curriculum entry now links to `/technik/grundlagen#mrcp-protokoll` and remains `inProgress`.
- Independent review confirmed the three-language non-invasive wording and removed the untranslated `SRC` label.
- Browser RTL/responsive/interactions, integrated build and specialist protocol review remain open. Passing SSR does not imply scientific or publication approval.
