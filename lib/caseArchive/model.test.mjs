import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeCase, summarizeCase, publicTextPackage, caseSearchText, radiopaediaUrl, validDate } from './model.mjs'
import { createArchiveToken, verifyArchiveToken } from './token.mjs'

const now = '2026-11-08T12:00:00.000Z'
function fixture() {
  return normalizeCase({
    id: 'synthetic-case', title: 'Synthetischer Testfall', diagnosis: 'Testdiagnose', diagnosisEn: 'Synthetic test diagnosis',
    certainty: 'suspected', organ: 'Lunge', region: 'Thorax', patient: { name: 'Erika Musterfrau', birthDate: '1980-02-29' },
    historyOriginal: '  Originalanamnese\n',
    studies: [
      { id: 'ct-1', date: '2026-10-01', modality: 'CT', reportOriginal: '  Originalbefund\n\n', reportDe: 'Synthetischer Testbefund.', reportEn: 'Synthetic test findings.', localPath: 'D:\\Fallarchiv\\synthetic-case\\ct-1', radiopaediaUrl: 'https://radiopaedia.org/cases/12345', publicationStatus: 'draft' },
      { id: 'mr-1', date: '2026-11-01', modality: 'MRT', reportEn: 'Synthetic follow-up findings.' },
    ], followUps: [{ id: 'follow-1', date: '2026-11-08', text: 'Synthetischer Verlauf.' }],
  }, { now })
}

test('original text is retained verbatim alongside separate rewritten reports', () => {
  const record = fixture()
  assert.equal(record.historyOriginal, '  Originalanamnese\n')
  assert.equal(record.studies[0].reportOriginal, '  Originalbefund\n\n')
  assert.notEqual(record.studies[0].reportOriginal, record.studies[0].reportDe)
})

test('one case retains multiple dated studies, local paths and follow-up', () => {
  const record = fixture(), summary = summarizeCase(record)
  assert.equal(summary.studyCount, 2)
  assert.equal(summary.latestDate, '2026-11-01')
  assert.deepEqual(summary.modalities, ['MRT', 'CT'])
  assert.equal(summary.hasLocalFiles, true)
  assert.equal(record.followUps[0].text, 'Synthetischer Verlauf.')
  assert.ok(!('reportOriginal' in summary))
  assert.ok(!('studies' in summary))
})

test('editing cannot rewrite provenance, server ID or the retained legacy snapshot', () => {
  const existing = { ...fixture(), source: 'fallsammlung', sourceKey: 'fallsammlung:original', legacyOriginal: { untouched: 'original' }, radiopaediaOriginal: { status: 'draft' } }
  const edited = normalizeCase({ ...existing, id: 'forged', createdAt: '2000-01-01', source: 'manual', legacyOriginal: { changed: true }, diagnosis: 'Updated diagnosis' }, { existing, now: '2026-11-09T12:00:00Z' })
  assert.equal(edited.id, existing.id)
  assert.equal(edited.createdAt, existing.createdAt)
  assert.equal(edited.sourceKey, existing.sourceKey)
  assert.deepEqual(edited.legacyOriginal, { untouched: 'original' })
  assert.deepEqual(edited.radiopaediaOriginal, { status: 'draft' })
  assert.equal(edited.diagnosis, 'Updated diagnosis')
})

test('invalid dates, duplicate study IDs and unsafe paths are rejected', () => {
  assert.throws(() => validDate('2025-02-29'))
  assert.equal(validDate('2024-02-29'), '2024-02-29')
  const record = fixture()
  assert.throws(() => normalizeCase({ ...record, studies: [record.studies[0], record.studies[0]] }))
  assert.throws(() => normalizeCase({ ...record, studies: [{ ...record.studies[0], localPath: 'javascript:alert(1)' }] }))
})

test('Radiopaedia links reject lookalike hosts, executable protocols and embedded credentials', () => {
  for (const value of ['https://radiopaedia.org.evil.test/cases/123', 'https://evil-radiopaedia.org/cases/123', 'javascript:alert(1)', 'https://user:password@radiopaedia.org/cases/123', 'https://radiopaedia.org/articles/example']) assert.throws(() => radiopaediaUrl(value))
  assert.equal(radiopaediaUrl('https://radiopaedia.org/cases/example'), 'https://radiopaedia.org/cases/example')
  assert.equal(radiopaediaUrl('https://radiopaedia.org/cases/12345/studies/67890'), 'https://radiopaedia.org/cases/12345/studies/67890')
})

test('patient names and both birth-date formats are searchable without original reports', () => {
  const value = caseSearchText(fixture())
  assert.ok(value.includes('erika musterfrau'))
  assert.ok(value.includes('1980-02-29'))
  assert.ok(value.includes('29.02.1980'))
  assert.ok(!value.includes('originalbefund'))
})

test('public text export uses only rewritten English text and explicit uncertainty', () => {
  const record = fixture(), result = publicTextPackage(record), output = JSON.stringify(result)
  assert.equal(result.diagnosticCertainty, 'suspected')
  for (const value of ['Musterfrau', '1980', 'D:', 'Originalbefund', 'Originalanamnese', '2026-10-01']) assert.ok(!output.includes(value), value)
  assert.equal(result.studies[0].findings, record.studies[0].reportEn)
  assert.throws(() => publicTextPackage({ ...record, studies: [{ ...record.studies[0], reportEn: 'Erika Musterfrau: synthetic test.' }] }))
  assert.throws(() => publicTextPackage({ ...record, studies: [{ ...record.studies[0], reportEn: 'DOB: 29.02.1980.' }] }))
  assert.throws(() => publicTextPackage({ ...record, studies: [{ ...record.studies[0], reportEn: '' }] }))
})

test('archive agent tokens expire, cannot be tampered with, and are scoped', () => {
  const token = createArchiveToken('synthetic-test-secret', { now: 1000, ttl: 60 })
  assert.equal(verifyArchiveToken(token, 'synthetic-test-secret', 1001), true)
  assert.equal(verifyArchiveToken(token, 'synthetic-test-secret', 1060), false)
  assert.equal(verifyArchiveToken(token, 'different-secret', 1001), false)
  assert.equal(verifyArchiveToken(token + 'x', 'synthetic-test-secret', 1001), false)
  assert.equal(verifyArchiveToken(token + '.extra', 'synthetic-test-secret', 1001), false)
  assert.equal(verifyArchiveToken('invalid', 'synthetic-test-secret', 1001), false)
})
