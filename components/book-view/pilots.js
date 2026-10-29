// Presentation flags and reviewed ID mappings only. No lesson or question copy.
// A future lesson opts in here and wraps its existing live content in BookView.
export const BOOK_VIEW_PILOTS = new Set([
  'caa', 'kontrastmittel-roentgen', 'kontrastmittel-mrt',
  'kontrastmittel-nierenfunktion', 'kontrastmittel-schwangerschaft', 'ref-kontrastmittel-ultraschall',
])
export const BOOK_QUESTION_MAPPINGS = {
  caa: {
    grundlagen: ['caa-01'], // Lobar distribution / affected vessels.
    klinik: ['caa-04'], // Existing TFNE clinical question.
    'mrt-diagnostik': ['caa-02', 'caa-03', 'caa-05'], // Boston, cSS, PVS.
    differenzial: ['caa-16', 'caa-17'], // Existing RCVS / cavernoma cases.
  },
  'kontrastmittel-roentgen': {
    arten: ['km-jod-typen-{lang}-1'],
    applikation: ['km-jod-typen-{lang}-2', 'km-jod-typen-{lang}-3'],
    reaktionen: ['km-jod-reaktionen-{lang}-2', 'km-jod-reaktionen-{lang}-3', 'km-jod-reaktionen-{lang}-4'],
    schilddruese: ['km-schilddruese-{lang}-1', 'km-schilddruese-{lang}-2', 'km-schilddruese-{lang}-3'],
    gastrointestinal: ['km-gastrointestinal-{lang}-1', 'km-gastrointestinal-{lang}-2'],
  },
  'kontrastmittel-mrt': {
    gadolinium: ['km-gadolinium-{lang}-1', 'km-gadolinium-{lang}-3'],
    nsf: ['km-gadolinium-retention-nsf-{lang}-1'],
    retention: ['km-gadolinium-retention-nsf-{lang}-2', 'km-gadolinium-retention-nsf-{lang}-3'],
    leber: ['km-gadolinium-{lang}-2'],
    buscopan: ['km-buscopan-{lang}-1', 'km-buscopan-{lang}-2'],
  },
  'kontrastmittel-nierenfunktion': {
    schutz: ['km-niereninsuffizienz-{lang}-1'],
    dialyse: ['km-niereninsuffizienz-{lang}-2'],
    metformin: ['km-niereninsuffizienz-{lang}-3'],
  },
  'kontrastmittel-schwangerschaft': {
    jod: ['km-schwangerschaft-stillzeit-{lang}-3'],
    gadolinium: ['km-schwangerschaft-stillzeit-{lang}-2'],
    stillzeit: ['km-schwangerschaft-stillzeit-{lang}-1'],
  },
  'ref-kontrastmittel-ultraschall': {
    content: ['km-ultraschall-{lang}-1', 'km-ultraschall-{lang}-3'],
    anwendungen: ['km-ultraschall-{lang}-2'],
  },
}
export function questionIdsForSection(lessonId, sectionId, lang) {
  if (!BOOK_VIEW_PILOTS.has(lessonId)) return []
  return (BOOK_QUESTION_MAPPINGS[lessonId]?.[sectionId] || []).map(id => id.includes('{lang}') ? id.replace('{lang}', lang) : `${lessonId}-${lang}-${id}`)
}
