# Jaminova private case archive

## Agreed scope

- A new, owner-only **Fallarchiv**, at `/andarun/fallarchiv`, within Jaminova.
- Existing **Fallsammlung/Befunde must remain unchanged**. Copy its current records once; do not synchronize later additions or edits between the collections.
- One clinical case may contain several dated examinations and follow-up entries. Each examination has its own original report, rewritten German findings, rewritten English findings, Radiopaedia link and local folder path.
- Preserve the original history and Befund verbatim. Rewrite only the relevant findings; do not add an educational module, differentials, learning points or references.
- Search by diagnosis, modality, organ/body region, patient name and birth date. Provide table and gallery views.
- Private patient identifiers and reports are stored online. All original DICOM files, including their original patient metadata, remain in the Windows PC's local archive. Do not upload original DICOM to the website.
- Only de-identified selected images and de-identified case text go to Radiopaedia. Sharing with others uses the Radiopaedia link, not a public copy of the private page.
- Cases with a suspected diagnosis may also be submitted, explicitly identified as suspected. Never infer certainty from a Radiopaedia title or fabricate missing patient/examination information.
- The user provides files, history and Befund in the Codex chat. The chat assistant prepares the structured record and rewritten text and uses the CLI below. A separate hosted AI agent is not required for this initial chat-driven workflow.
- Copy-path is sufficient initially. Opening a Windows folder directly from the website is optional.
- Continue local file setup on the user's Windows PC; the current working device is a laptop.

## Implemented

- Separate authenticated API and Supabase tables, inaccessible to `anon` and `authenticated` database roles. Private HTTP responses disable caching.
- List responses contain metadata only; full reports are loaded for an opened case. Search terms containing patient information are sent in POST bodies rather than URL query strings.
- Original reports, bilingual rewritten reports, several examinations and follow-up entries, table/gallery, filtering, pagination, editing, local path display and copy.
- Optimistic revisions reject stale writes with HTTP 409; a failed save retains the editor's input.
- A transactional one-time Fallsammlung importer retains every original record in a private `legacyOriginal` snapshot. It never updates `admin_budget_state`.
- The initial source snapshot has been copied in the existing Rad-Yar Supabase project. Source fingerprint equality was verified immediately after copying. Later additions to the old collection intentionally remain separate. Import counts and source provenance are stored privately in the database. SQL migration filename matches hosted migration version `20261108111131`.
- Chat CLI for reading, creating/updating, one-time copying and exporting a text-only public package. The public package excludes original reports, local paths and patient fields, and rejects known patient names/birth dates in rewritten text. It does not anonymize images.
- Read-only Radiopaedia account-list importer, using the official cursor-paginated API contract. It imports titles and links without inventing studies or diagnostic certainty. Existing exact links/source IDs prevent duplicate imports. API authorization is not yet configured.
- The user's existing logged-in Radiopaedia browser session has been verified and the existing own drafts copied through the UI, including actual study links and available findings. The original Radiopaedia drafts were not edited or published. No name, birth date or examination date was inferred. Original hospital Befund and local folders can be attached later.
- Local Python archiver copies studies into `<archive-root>/<case-id>/<study-id>`, checks SHA-256 hashes, retains originals, and refuses to overwrite a differing existing archive. It does not send files over the network.

## Chat operations

The API uses the existing private Jaminova session. For local chat commands, `scripts/case-archive.mjs` can generate a short-lived archive-scoped token from the local `ANDARUN_SESSION_SECRET` (or existing admin fallback), or consume `CASE_ARCHIVE_AGENT_TOKEN`. Tokens, patient input and DICOM must not be committed.

```sh
node scripts/case-archive.mjs --help
node scripts/case-archive.mjs list --url https://YOUR_SITE
node scripts/case-archive.mjs get --id CASE_ID --url https://YOUR_SITE
node scripts/case-archive.mjs save --input /PRIVATE_PATH/case.json --url https://YOUR_SITE
node scripts/case-archive.mjs public-text --id CASE_ID --url https://YOUR_SITE
node scripts/case-archive.mjs import-radiopaedia --url https://YOUR_SITE
```

`save` also accepts stdin. For updates, get the latest case first and retain its `id` and `revision`. A server response of 409 requires reading the current record and reconciling changes, not dropping the revision check. CLI `get` intentionally returns private data; `list` prints only IDs, titles and examination metadata.

The online server needs its existing `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. The current laptop's `.env.local` does not have those database variables or a Clerk secret; full live HTTP/database verification is therefore separate from UI fixture tests and database SQL tests.

The Radiopaedia import command requires an authorized `RADIOPAEDIA_ACCESS_TOKEN` in the local environment. An email address is not an API credential. Tokens are never included in arguments or logs. Gather all remote pages before importing; failures do not silently return a partial listing. Import batches are idempotent and may be retried if a later batch fails.

## Windows file workflow

Choose one dedicated archive root outside this repository on the PC. Assign case and study IDs before copying. A dry run creates no files:

```powershell
python scripts/case-archive-local.py --source "D:\Incoming\Study" --archive-root "D:\Fallarchiv" --case-id CASE_ID --study-id STUDY_ID --dry-run
python scripts/case-archive-local.py --source "D:\Incoming\Study" --archive-root "D:\Fallarchiv" --case-id CASE_ID --study-id STUDY_ID
```

Use the returned `localPath` in that study's private record. Existing cases do not require images immediately: attach the files later to the same case instead of making another case. The archiver is tested on synthetic files locally; actual DICOM and Windows behavior must still be exercised on the PC.

## Remaining connection work

1. The existing browser login is usable for authorized UI actions. A persistent API/OAuth connection is still needed for the API-based importer and write integration; do not ask for a password in chat. Verify that connection with the actual account before treating it as operational.
2. Verify provider access and supported write/publish operations before enabling automatic image upload/publication. The email provided in chat is not sufficient for authorization.
3. Integrate a verified DICOM de-identification pipeline, including pixel identifiers. The local archive script deliberately preserves originals and must never be used as an anonymizer. A public-text export is not an image upload.
4. With real studies on the Windows PC, verify folder organization, prepare selected de-identified series, create/update the Radiopaedia case, and save the returned links to the private study records. The final requested automatic upload/publication workflow is not yet operational.
5. The website source changes still require deployment through the project's normal release workflow. Do not deploy unrelated pre-existing working-tree changes with this feature.

Primary integration references: [RadiopaediaConnect](https://github.com/radiopaedia/RadiopaediaConnect), [account-list client](https://github.com/radiopaedia/RadiopaediaConnect/blob/master/Services/RadiopaediaApiClient.cs), [case-list response schema](https://github.com/radiopaedia/RadiopaediaConnect/blob/master/Models/RadiopaediaCaseModels.cs), [API documentation](https://radiopaedia.org/api-documentation).

## Verification

```sh
node --test lib/caseArchive/model.test.mjs lib/caseArchive/radiopaedia.test.mjs
PYTHONDONTWRITEBYTECODE=1 python3 scripts/case-archive-local.test.py
npm run build
```

`supabase/tests/case_archive.sql` tests import idempotency, preservation of the original source and patient linkage, access restrictions and stale revisions in a rolled-back transaction. Browser fixture scripts/screenshots live outside the repository; never use real patient information in preview fixtures.

## Temporary MRI intake

At the top of the archive, “Vorläufig erfassen” offers Mamma, Knie, Schulter and Prostata presets. Each creates a private case with an MRT examination; no image, final diagnosis or Radiopaedia link is required. Original patient details and findings remain editable. Available modalities are selectable separately and searchable with the modality filter. Prostate intake includes optional PSA in ng/ml and the laboratory date; comma decimals are accepted.

The first successful temporary save allocates a permanent, per-owner image number in a database transaction. Number allocation is serialized via a private counter row and protected by a unique index. Client-supplied numbers are ignored. Completion, report edits and subsequent examinations keep the same number. The number appears in table/gallery/detail, can be copied, and is searchable. Use this number as the local image folder name; allocation does not itself create or move local files. Existing unnumbered archive entries and Fallsammlung are not renumbered or modified. “Erfassung” filters temporary/completed cases; older entries count as completed.

Verification: `node --test lib/caseArchive/*.test.mjs`; run `supabase/tests/case_archive_temporary.sql` transactionally to check allocation, preservation, summary/search and counter access. The SQL test rolls back all synthetic data and its counter.
