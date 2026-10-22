# Monteggia and Galeazzi patterns: bounded source check

Source: `MSK.pdf`, PDF p. 16 (printed p. 15), visually inspected at full page.
Target: `/msk/trauma/unterarmschaftfrakturen` (`data/unterarmschaftfrakturen.js`).
This check establishes only the overlap on this source page. It is not a full
review of the forearm lesson or clinical approval.

| Source point on p.16 | Existing lesson evidence | Status / boundary |
|---|---|---|
| Monteggia: proximal ulnar fracture plus radial-head dislocation | `monteggia.lead`; chapter table and radiocapitellar-line caveat | Covered; wording also includes plastic ulnar deformation beyond the page's short definition. |
| Bado I–IV by radial-head dislocation direction | `monteggia.rows`; Bado schematic and key | Covered. PDF page's four direction labels can be matched to the route's table. |
| Galeazzi: distal radial shaft fracture with dorsal ulnar-head dislocation at the DRUJ | `galeazzi.lead`, signs on DRUJ width and true-lateral ulnar-head position, case report | Core pattern covered; route also discusses volar displacement and other suspicion signs. |
| Paired wrist radiographs illustrating Galeazzi | Route contains a separate, attributed Radiopaedia rID 15484 case, not these PDF frames | No claim that the route reuses or depicts the source PDF's exact radiographs. The existing case is an additional example. |

The route has linked MCQs and flashcards for the Monteggia and Galeazzi patterns;
this bounded linkage test checks their presence and multilingual content. Exact
curriculum IDs `monteggia-fraktur` and `galeazzi-fraktur` point to the shared
route and remain `inProgress` while broader source mapping, browser QA and
scientific review remain open.

| Gate | Result |
|---|---|
| Source page visual check | Complete for PDF p.16 / printed p.15 |
| Route and assessment match | Confirmed for the two patterns named on this page |
| Full forearm-course coverage | Open |
| Independent editorial review | Bounded review completed: SRC/EDU/VIS/LNG/ASM pass for the PDF p.16 scope; UX finding FK-UX-UF-01 corrected in the section/TOC behavior. This does not approve the whole route. |
| Browser QA | Not performed; rendered behavior still needs browser confirmation |
| Clinical approval | Not performed |

## Independent review delta

The independent reviewer found `FK-UX-UF-01`: each section initialized open but
an effect immediately collapsed it, while the table of contents only scrolled
and did not reopen a collapsed destination. The route now leaves sections open
on mount, and TOC navigation expands a collapsed destination before scrolling.
The focused structural test asserts both behaviors and this recorded finding.
This is a code-level correction; browser behavior has not been verified.
