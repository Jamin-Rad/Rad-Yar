// Compare keyboard-friendly German spellings without weakening case rules.
export function expandGermanLetters(value) {
  return String(value ?? '').normalize('NFC').replace(/[äöüÄÖÜßẞ]/g, letter => ({
    ä: 'ae', ö: 'oe', ü: 'ue', Ä: 'Ae', Ö: 'Oe', Ü: 'Ue', ß: 'ss', ẞ: 'SS',
  })[letter])
}
