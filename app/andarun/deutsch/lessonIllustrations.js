const directory = '/andarun/deutsch/lessons/'
export const lessonIllustrations = {
  'deutsch-2026-10-27-reklamation-im-geschaeft': 'reklamation',
  'deutsch-2026-10-27-reparaturtermin-vereinbaren': 'reparatur',
  'deutsch-2026-07-15-gesundheit-arbeitsbelastung': 'gesundheit',
  'deutsch-2026-07-12-homeoffice-entscheidung': 'homeoffice',
  'deutsch-001-digitale-erreichbarkeit': 'feierabend',
  'deutsch-001-arzttermin': 'arzttermin',
}

export function lessonIllustration(lesson) {
  // Imported lessons may supply their own local, prepared illustration.
  if (/^\/andarun\/deutsch\/lessons\/[a-z0-9-]+\.(webp|png|jpg)$/.test(lesson?.illustration || '')) return lesson.illustration
  const name = lessonIllustrations[lesson?.id]
  if (name) return `${directory}${name}.webp`
  const topic = `${lesson?.title || ''} ${lesson?.topic || ''}`.toLocaleLowerCase('de')
  const fallback = /reklam|geschäft|kauf|erstatt/.test(topic) ? 'reklamation'
    : /repar|heiz|hausverwalt/.test(topic) ? 'reparatur'
    : /arzt|termin|praxis/.test(topic) ? 'arzttermin'
    : /gesund|erschöpf|belastung/.test(topic) ? 'gesundheit'
    : /homeoffice|büro|pendel/.test(topic) ? 'homeoffice' : 'feierabend'
  return `${directory}${fallback}.webp`
}
