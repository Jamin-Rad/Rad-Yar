const prepared = {
  'deutsch-2026-10-27-reklamation-im-geschaeft': [
    ['این دستگاه درست کار نمی‌کند.', ['Dieses Gerät funktioniert nicht richtig.', 'Das Gerät funktioniert nicht richtig.']],
    ['من رسید خرید را همراه دارم.', ['Ich habe den Kassenbon dabei.', 'Den Kassenbon habe ich dabei.']],
    ['می‌خواهم پولم را پس بگیرم.', ['Ich möchte mein Geld zurückbekommen.', 'Ich möchte mein Geld zurück.']],
    ['آیا این مدل موجود است؟', ['Ist dieses Modell vorrätig?', 'Ist dieses Modell auf Lager?']],
    ['لطفاً مبلغ را به من برگردانید.', ['Bitte erstatten Sie mir den Betrag.', 'Erstatten Sie mir bitte den Betrag.']],
  ],
  'deutsch-2026-10-27-reparaturtermin-vereinbaren': [
    ['شوفاژ از دوشنبه سرد است.', ['Der Heizkörper ist seit Montag kalt.', 'Seit Montag ist der Heizkörper kalt.']],
    ['می‌خواهم یک وقت تعیین کنم.', ['Ich möchte einen Termin vereinbaren.', 'Ich würde gern einen Termin vereinbaren.']],
    ['تعمیرکار فردا می‌آید.', ['Der Techniker kommt morgen.', 'Morgen kommt der Techniker.']],
    ['لطفاً کمی قبل از رسیدن با من تماس بگیرید.', ['Bitte rufen Sie mich kurz vorher an.', 'Rufen Sie mich bitte kurz vorher an.']],
    ['کلید پیش همسایهٔ من است.', ['Der Schlüssel ist bei meiner Nachbarin.', 'Der Schlüssel ist bei meinem Nachbarn.']],
  ],
  'deutsch-001-digitale-erreichbarkeit': [
    ['بعد از پایان کار، تلفنم را خاموش می‌کنم.', ['Nach Feierabend schalte ich mein Handy aus.', 'Ich schalte mein Handy nach Feierabend aus.']],
    ['این پیام می‌تواند تا فردا صبر کند.', ['Diese Nachricht kann bis morgen warten.', 'Die Nachricht kann bis morgen warten.']],
    ['ما به مرزهای مشخص نیاز داریم.', ['Wir brauchen klare Grenzen.', 'Wir benötigen klare Grenzen.']],
    ['از ساعت نه در دسترس هستم.', ['Ich bin ab neun Uhr erreichbar.', 'Ab neun Uhr bin ich erreichbar.']],
    ['لطفاً وقت جلسه را تأیید کنید.', ['Bitte bestätigen Sie den Besprechungstermin.', 'Bestätigen Sie bitte den Besprechungstermin.']],
  ],
  'deutsch-2026-07-12-homeoffice-entscheidung': [
    ['امروز از خانه کار می‌کنم.', ['Heute arbeite ich von zu Hause.', 'Ich arbeite heute von zu Hause.']],
    ['رفت‌وآمد هر روز دو ساعت طول می‌کشد.', ['Das Pendeln dauert jeden Tag zwei Stunden.', 'Jeden Tag dauert das Pendeln zwei Stunden.']],
    ['ما به یک راه‌حل مشترک نیاز داریم.', ['Wir brauchen eine gemeinsame Lösung.', 'Wir benötigen eine gemeinsame Lösung.']],
    ['این توافق برای همه معتبر است.', ['Diese Vereinbarung gilt für alle.', 'Für alle gilt diese Vereinbarung.']],
    ['لطفاً نتایج را ثبت کنید.', ['Bitte dokumentieren Sie die Ergebnisse.', 'Dokumentieren Sie bitte die Ergebnisse.']],
  ],
  'deutsch-2026-07-15-gesundheit-arbeitsbelastung': [
    ['امروز خیلی خسته‌ام.', ['Heute bin ich sehr müde.', 'Ich bin heute sehr müde.']],
    ['به کمی استراحت نیاز دارم.', ['Ich brauche etwas Ruhe.', 'Ich brauche eine Pause.', 'Ich benötige etwas Ruhe.']],
    ['پزشک استراحت را به من توصیه می‌کند.', ['Die Ärztin rät mir zur Erholung.', 'Der Arzt rät mir zur Erholung.', 'Die Ärztin empfiehlt mir Ruhe.', 'Der Arzt empfiehlt mir Ruhe.']],
    ['باید مرزهای خودم را جدی بگیرم.', ['Ich muss meine Grenzen ernst nehmen.', 'Meine Grenzen muss ich ernst nehmen.']],
    ['این هفته کار اضافی قبول نمی‌کنم.', ['Diese Woche übernehme ich keine zusätzlichen Aufgaben.', 'Ich übernehme diese Woche keine zusätzlichen Aufgaben.']],
  ],
  'deutsch-001-arzttermin': [
    ['می‌خواهم وقتم را جابه‌جا کنم.', ['Ich möchte meinen Termin verschieben.', 'Ich würde gern meinen Termin verschieben.']],
    ['جمعه وقت دارم.', ['Am Freitag habe ich Zeit.', 'Ich habe am Freitag Zeit.']],
    ['لطفاً ساعت را کتبی تأیید کنید.', ['Bitte bestätigen Sie die Uhrzeit schriftlich.', 'Bestätigen Sie bitte die Uhrzeit schriftlich.']],
    ['امروز باید بیشتر کار کنم.', ['Heute muss ich länger arbeiten.', 'Ich muss heute länger arbeiten.']],
    ['من به مطب زنگ می‌زنم.', ['Ich rufe in der Praxis an.', 'Ich rufe die Praxis an.']],
  ],
}
const fallback = [
  ['به کمک نیاز دارم.', ['Ich brauche Hilfe.', 'Ich benötige Hilfe.']],
  ['می‌توانید لطفاً با من تماس بگیرید؟', ['Können Sie mich bitte anrufen?', 'Könnten Sie mich bitte anrufen?']],
  ['فردا وقت دارم.', ['Morgen habe ich Zeit.', 'Ich habe morgen Zeit.']],
  ['لطفاً برای من یک پیام بفرستید.', ['Bitte schicken Sie mir eine Nachricht.', 'Schicken Sie mir bitte eine Nachricht.']],
  ['من هنوز یک سؤال دارم.', ['Ich habe noch eine Frage.', 'Eine Frage habe ich noch.']],
]
function hash(text) {
  let value = 2166136261
  for (const char of text) value = Math.imul(value ^ char.codePointAt(0), 16777619)
  return (value >>> 0).toString(36)
}
export function normalizeSentence(text = '') {
  return text.normalize('NFKC').toLocaleLowerCase('de').replaceAll('ä', 'ae').replaceAll('ö', 'oe').replaceAll('ü', 'ue').replaceAll('ß', 'ss').replace(/[.,!?;:„“”"']/g, '').replace(/\s+/g, ' ').trim()
}
export function getWritingExercises(lesson) {
  const supplied = lesson.writing?.sentences
  const valid = Array.isArray(supplied) ? supplied.filter(item => typeof item.fa === 'string' && /[\u0600-\u06ff]/.test(item.fa) && Array.isArray(item.answers) && item.answers.length && item.answers.every(answer => typeof answer === 'string' && answer.trim())) : []
  const rows = valid.length >= 5 ? valid.slice(0, 5).map(item => [item.fa, item.answers]) : prepared[lesson.id] || fallback
  return rows.map(([fa, answers]) => ({ id: `${lesson.id}-sentence-${hash(JSON.stringify([fa, answers]))}`, fa, answers }))
}
export function checkTranslation(exercise, text) {
  return exercise.answers.some(answer => normalizeSentence(answer) === normalizeSentence(text))
}

const ordering = {
  'deutsch-2026-10-27-reklamation-im-geschaeft': [
    ['رسید خرید را همراه دارم.', ['Ich habe den Kassenbon dabei.']],
    ['این دستگاه دیگر کار نمی‌کند.', ['Das Gerät funktioniert nicht mehr.']],
    ['آیا می‌توانید مبلغ را برگردانید؟', ['Können Sie den Betrag erstatten?']],
    ['بسته‌بندی را نگه داشته‌ام.', ['Ich habe die Verpackung aufgehoben.']],
    ['این مدل گران‌تر است.', ['Dieses Modell ist teurer.']],
  ],
  'deutsch-2026-10-27-reparaturtermin-vereinbaren': [
    ['تعمیرکار فردا می‌آید.', ['Der Techniker kommt morgen.', 'Morgen kommt der Techniker.']],
    ['شوفاژ از دوشنبه سرد است.', ['Der Heizkörper ist seit Montag kalt.', 'Seit Montag ist der Heizkörper kalt.']],
    ['لطفاً کمی قبل از رسیدن تماس بگیرید.', ['Bitte rufen Sie kurz vorher an.', 'Rufen Sie bitte kurz vorher an.']],
    ['چون کار می‌کنم، نمی‌توانم بیایم.', ['Ich kann nicht kommen, weil ich arbeite.']],
    ['همسایهٔ من می‌تواند در را باز کند.', ['Meine Nachbarin kann die Tür öffnen.']],
  ],
  'deutsch-001-digitale-erreichbarkeit': [
    ['بعد از پایان کار تلفنم را خاموش می‌کنم.', ['Nach Feierabend schalte ich mein Handy aus.']],
    ['ما به مرزهای مشخص نیاز داریم.', ['Wir brauchen klare Grenzen.']],
    ['پیام شما هنوز بی‌پاسخ است.', ['Ihre Nachricht ist noch unbeantwortet.']],
    ['چون جلسه دارم، دیرتر جواب می‌دهم.', ['Ich antworte später, weil ich eine Besprechung habe.']],
    ['لطفاً وقت جلسه را کتبی تأیید کنید.', ['Bitte bestätigen Sie den Termin schriftlich.', 'Bestätigen Sie bitte den Termin schriftlich.']],
  ],
  'deutsch-2026-07-12-homeoffice-entscheidung': [
    ['امروز از خانه کار می‌کنم.', ['Heute arbeite ich von zu Hause.', 'Ich arbeite heute von zu Hause.']],
    ['ما باید توافق‌ها را رعایت کنیم.', ['Wir müssen die Absprachen einhalten.']],
    ['این مقررات برای همه معتبر است.', ['Diese Regelung gilt für alle.']],
    ['چون کار دارم، می‌مانم.', ['Ich bleibe, weil ich Arbeit habe.']],
    ['همه می‌توانند نتایج را ببینند.', ['Alle können die Ergebnisse sehen.']],
  ],
  'deutsch-2026-07-15-gesundheit-arbeitsbelastung': [
    ['یوناس به کمی استراحت نیاز دارد.', ['Jonas braucht etwas Ruhe.']],
    ['او باید مرزهای خودش را جدی بگیرد.', ['Er muss seine Grenzen ernst nehmen.']],
    ['پزشک به او استراحت را توصیه می‌کند.', ['Die Ärztin rät ihm zur Erholung.']],
    ['چون خسته است، در خانه می‌ماند.', ['Er bleibt zu Hause, weil er müde ist.']],
    ['من دیگر کار اضافی قبول نمی‌کنم.', ['Ich übernehme keine zusätzlichen Aufgaben mehr.']],
  ],
  'deutsch-001-arzttermin': [
    ['می‌خواهم وقتم را جابه‌جا کنم.', ['Ich möchte meinen Termin verschieben.']],
    ['آیا جمعه وقت دارید؟', ['Haben Sie am Freitag Zeit?']],
    ['لطفاً ساعت را تأیید کنید.', ['Bitte bestätigen Sie die Uhrzeit.', 'Bestätigen Sie bitte die Uhrzeit.']],
    ['چون کار می‌کنم، نمی‌توانم بیایم.', ['Ich kann nicht kommen, weil ich arbeite.']],
    ['من به مطب زنگ می‌زنم.', ['Ich rufe in der Praxis an.']],
  ],
}
export function getOrderingExercises(lesson) {
  const supplied = lesson.grammar_ordering
  const valid = Array.isArray(supplied) ? supplied.filter(item => typeof item.fa === 'string' && Array.isArray(item.answers) && item.answers.length && item.answers.every(answer => typeof answer === 'string' && answer.trim().split(/\s+/).length >= 3)) : []
  const rows = valid.length >= 5 ? valid.slice(0, 5).map(item => [item.fa, item.answers]) : ordering[lesson.id] || fallback.map(([fa, answers]) => [fa, [answers[0]]])
  return rows.map(([question, solutions]) => ({ type: 'ordering', question, questionLanguage: 'fa', tokens: solutions[0].replace(/[.,!?;:]/g, '').split(/\s+/), solutions, answer: 0 }))
}
export function shuffledTokens(item, random) {
  const result = item.tokens.map((text, id) => ({ text, id }))
  if (!random) {
    // Stable server/client order prevents hydration differences.
    return [...result.slice(1).reverse(), result[0]]
  }
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]] }
  if (result.every((token, index) => token.id === index)) result.push(result.shift())
  return result
}
export function checkWordOrder(item, tokens) {
  const text = tokens.map(token => typeof token === 'string' ? token : token.text).join(' ')
  return item.solutions.some(solution => normalizeSentence(solution) === normalizeSentence(text))
}
