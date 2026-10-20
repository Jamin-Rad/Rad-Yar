export const STORAGE_KEY = 'jaminova-english-v1'

// A short diagnostic of the sampled skills, not a calibrated CEFR examination.
export const assessmentQuestions = [
  { id: 'since', skill: 'grammar', topic: 'زمان‌ها', prompt: 'I ___ in Germany since 2020.', options: ['live', 'have lived', 'am living'], answer: 1, why: 'برای وضعیتی که از گذشته تا الان ادامه دارد، با since از present perfect استفاده می‌کنیم: have lived.' },
  { id: 'past-perfect', skill: 'grammar', topic: 'زمان‌ها', prompt: 'When I arrived, the meeting ___. Everyone was already discussing the first topic.', options: ['has started', 'had already started', 'starts'], answer: 1, why: 'شروع جلسه قبل از رسیدن تو اتفاق افتاده است؛ گذشتهٔ کامل: had already started.' },
  { id: 'conditional', skill: 'grammar', topic: 'شرطی و افعال وجهی', prompt: 'If I ___ more free time, I would practise English every day.', options: ['have', 'had', 'will have'], answer: 1, why: 'برای موقعیت فرضی در زمان حال: if + past simple و would + فعل ساده.' },
  { id: 'gerund', skill: 'grammar', topic: 'ساختار جمله', prompt: 'I’m looking forward to ___ you again.', options: ['see', 'seeing', 'saw'], answer: 1, why: 'در look forward to، کلمهٔ to حرف اضافه است و بعد از آن شکل ing می‌آید.' },
  { id: 'modal', skill: 'grammar', topic: 'شرطی و افعال وجهی', prompt: 'You ___ have bought milk. We already had plenty in the fridge.', options: ['mustn’t', 'couldn’t', 'needn’t'], answer: 2, why: 'needn’t have + قسمت سوم فعل یعنی کاری انجام شده، اما ضرورتی نداشته است.' },
  { id: 'future', skill: 'grammar', topic: 'زمان‌ها', prompt: 'By the time we get to the station, the train ___.', options: ['will have left', 'has left', 'had left'], answer: 0, why: 'کاری که تا یک نقطه در آینده تمام خواهد شد: will have + قسمت سوم فعل.' },
  { id: 'decision', skill: 'vocabulary', topic: 'ترکیب‌های کاربردی', prompt: 'We need to ___ a decision before Friday.', options: ['do', 'make', 'take up'], answer: 1, why: 'ترکیب رایج make a decision است: تصمیم گرفتن.' },
  { id: 'reliable', skill: 'vocabulary', topic: 'معنی در بافت', prompt: 'Sara always keeps her promises. She is very ___.', options: ['reliable', 'reluctant', 'temporary'], answer: 0, why: 'reliable یعنی قابل اعتماد؛ کسی که می‌توان روی قولش حساب کرد.' },
  { id: 'run-out', skill: 'vocabulary', topic: 'افعال عبارتی', prompt: 'We’ve run out of coffee. What does this mean?', options: ['We have ordered coffee.', 'We don’t like coffee.', 'We have no coffee left.'], answer: 2, why: 'run out of یعنی موجودی چیزی تمام شود.' },
  { id: 'despite', skill: 'grammar', topic: 'ساختار جمله', prompt: '___ feeling tired, she finished the report.', options: ['Although', 'Despite', 'Because'], answer: 1, why: 'بعد از despite اسم یا شکل ing می‌آید؛ although به جملهٔ کامل نیاز دارد.' },
  { id: 'put-off', skill: 'vocabulary', topic: 'افعال عبارتی', prompt: 'Let’s put off the meeting until Monday.', options: ['Let’s cancel it forever.', 'Let’s postpone it.', 'Let’s finish it early.'], answer: 1, why: 'put off یعنی به تعویق انداختن؛ postpone.' },
  { id: 'raise', skill: 'vocabulary', topic: 'ترکیب‌های کاربردی', prompt: 'If you disagree, please ___ your concerns at the meeting.', options: ['rise', 'grow', 'raise'], answer: 2, why: 'raise a concern یعنی مطرح کردن نگرانی. rise معمولاً مفعول مستقیم نمی‌گیرد.' },
]

export const writingPrompts = [
  { id: 'phrase', title: 'یک جمله از خودت', prompt: 'Write a sentence about your own life using “run out of”.', hint: 'یک جمله کافی است.' },
  { id: 'repair', title: 'اصلاح جمله', prompt: 'Correct both sentences: “I am agree with you.” / “She suggested me to apply for the job.”', hint: 'هر دو جمله را به شکل درست بازنویسی کن.' },
  { id: 'story', title: 'تجربهٔ واقعی تو', prompt: 'Tell me about a situation when you wanted to express something in English but couldn’t say it the way you wanted. What happened, how did you handle it, and what would you like to do better next time?', hint: 'حدود ۸۰ تا ۱۲۰ کلمه؛ با زبان خودت و بدون مترجم.' },
]

export const vocabulary = [
  { id: 'clarify', term: 'clarify', meaning: 'روشن‌تر توضیح دادن', example: 'Could you clarify what you mean?', cue: 'از کسی بخواه منظورش را روشن‌تر توضیح بدهد.' },
  { id: 'figure-out', term: 'figure out', meaning: 'فهمیدن یا راه‌حل پیدا کردن', example: 'I need to figure out how this works.', cue: 'بگو باید بفهمی این وسیله چطور کار می‌کند.' },
  { id: 'keep-up', term: 'keep up with', meaning: 'همگام ماندن با', example: 'It’s hard to keep up with all the messages.', cue: 'بگو رسیدگی به همهٔ پیام‌ها سخت است.' },
  { id: 'used-to', term: 'get used to', meaning: 'عادت کردن به', example: 'I’m getting used to speaking English at work.', cue: 'بگو داری به صحبت کردن انگلیسی در محل کار عادت می‌کنی.' },
  { id: 'point', term: 'make a point', meaning: 'نکته‌ای را مطرح کردن', example: 'You made a good point about the schedule.', cue: 'به همکارت بگو نکتهٔ خوبی دربارهٔ برنامه مطرح کرد.' },
  { id: 'available', term: 'available', meaning: 'در دسترس؛ وقت داشتن', example: 'Are you available for a quick call tomorrow?', cue: 'بپرس فردا برای یک تماس کوتاه وقت دارد یا نه.' },
  { id: 'confident', term: 'confident', meaning: 'بااعتمادبه‌نفس؛ مطمئن', example: 'I feel more confident when I prepare first.', cue: 'بگو وقتی از قبل آماده می‌شوی اعتمادبه‌نفس بیشتری داری.' },
  { id: 'approach', term: 'approach', meaning: 'روش برخورد با یک مسئله', example: 'Let’s try a different approach.', cue: 'پیشنهاد بده روش دیگری را امتحان کنید.' },
  { id: 'come-up', term: 'come up with', meaning: 'ایده یا راه‌حلی پیدا کردن', example: 'We came up with a simpler solution.', cue: 'بگو راه‌حل ساده‌تری پیدا کردید.' },
  { id: 'rather', term: 'would rather', meaning: 'ترجیح دادن', example: 'I would rather discuss this in person.', cue: 'بگو ترجیح می‌دهی حضوری درباره‌اش صحبت کنی.' },
  { id: 'aware', term: 'be aware of', meaning: 'از چیزی آگاه بودن', example: 'I wasn’t aware of the change.', cue: 'بگو از تغییر ایجادشده خبر نداشتی.' },
  { id: 'manage', term: 'manage to', meaning: 'موفق شدن به انجام کاری', example: 'I managed to finish the report on time.', cue: 'بگو توانستی گزارش را به‌موقع تمام کنی.' },
  { id: 'depend', term: 'depend on', meaning: 'بستگی داشتن به', example: 'It depends on how much time we have.', cue: 'بگو بستگی دارد چقدر وقت داشته باشید.' },
  { id: 'deal', term: 'deal with', meaning: 'رسیدگی کردن به؛ کنار آمدن با', example: 'How do you deal with a busy day?', cue: 'بپرس با یک روز شلوغ چطور کنار می‌آید.' },
  { id: 'worth', term: 'be worth', meaning: 'ارزش داشتن', example: 'This book is worth reading.', cue: 'بگو این کتاب ارزش خواندن دارد.' },
  { id: 'turn-out', term: 'turn out', meaning: 'در نهایت مشخص شدن؛ از آب درآمدن', example: 'The task turned out to be easier than I expected.', cue: 'بگو کار آسان‌تر از چیزی بود که انتظار داشتی.' },
]

export const grammarQuestions = [
  { id: 'g1', topic: 'گذشته یا حال کامل؟', prompt: 'I ___ my colleague yesterday.', options: ['have called', 'called', 'call'], answer: 1, why: 'yesterday زمان مشخص و تمام‌شده در گذشته است؛ past simple می‌خواهیم: called.', pattern: 'Finished time → past simple', task: 'یک جمله دربارهٔ کاری که دیروز انجام دادی بنویس.' },
  { id: 'g2', topic: 'جملهٔ غیرمستقیم', prompt: 'Could you tell me where ___?', options: ['is the station', 'the station is', 'does the station be'], answer: 1, why: 'در سؤال غیرمستقیم، ترتیب جمله خبری است: subject + verb.', pattern: 'Could you tell me + subject + verb?', task: 'محترمانه بپرس جلسه چه ساعتی شروع می‌شود.' },
  { id: 'g3', topic: 'حرف اضافه + ing', prompt: 'I’m interested in ___ more about this.', options: ['learn', 'to learn', 'learning'], answer: 2, why: 'بعد از حرف اضافهٔ in شکل ing می‌آید: interested in learning.', pattern: 'interested in + verb-ing', task: 'با interested in دربارهٔ یکی از علاقه‌هایت بنویس.' },
  { id: 'g4', topic: 'شرطی دوم', prompt: 'If I knew the answer, I ___ you.', options: ['will tell', 'would tell', 'told'], answer: 1, why: 'موقعیت فرضی در زمان حال: if + past simple / would + فعل ساده.', pattern: 'If + past simple, would + verb', task: 'بگو اگر وقت بیشتری داشتی چه کاری می‌کردی.' },
  { id: 'g5', topic: 'جملهٔ موصولی', prompt: 'The person ___ helped me was very kind.', options: ['which', 'who', 'where'], answer: 1, why: 'برای شخص، در این جمله از who استفاده می‌کنیم.', pattern: 'a person who + verb', task: 'با who یکی از همکارها یا دوستانت را توصیف کن.' },
  { id: 'g6', topic: 'a / an / the', prompt: 'She gave me ___ useful piece of advice.', options: ['a', 'an', 'the one'], answer: 0, why: 'useful با صدای /j/ مثل you شروع می‌شود؛ بنابراین a می‌گیرد. خود advice غیرقابل شمارش است.', pattern: 'a useful piece of advice', task: 'یک توصیهٔ مفید را با این عبارت در یک جمله بنویس.' },
]

export const speakingPrompts = [
  { title: 'یک روز واقعی', prompt: 'Tell me about a busy day you had recently. What happened, and how did you feel?', helpers: ['At first…', 'What made it difficult was…', 'In the end…'], checks: ['رویدادها را به ترتیب توضیح دادم.', 'برای گذشته از زمان مناسب استفاده کردم.', 'وقتی کلمه‌ای یادم نیامد، منظورم را جور دیگری گفتم.'] },
  { title: 'نظر تو چیست؟', prompt: 'Is it better to learn a language alone or with other people? Explain your opinion and give an example.', helpers: ['In my experience…', 'One advantage is…', 'On the other hand…'], checks: ['نظرم را واضح گفتم.', 'حداقل یک دلیل و مثال آوردم.', 'از عبارت‌های ربط‌دهنده استفاده کردم.'] },
  { title: 'یک درخواست محترمانه', prompt: 'You need to change a meeting time. Explain why, suggest another time, and check whether it works for the other person.', helpers: ['Would it be possible to…?', 'Something has come up…', 'Would that work for you?'], checks: ['دلیل را کوتاه و روشن توضیح دادم.', 'یک زمان جایگزین پیشنهاد دادم.', 'لحن درخواست مؤدبانه بود.'] },
  { title: 'توضیح با کلمه‌های خودت', prompt: 'Describe a useful app to someone who has never used it. Explain what it does and why you like it.', helpers: ['It allows you to…', 'The main reason I use it is…', 'For example…'], checks: ['کاربرد برنامه را توضیح دادم.', 'از مثال واقعی استفاده کردم.', 'با جمله‌های کامل صحبت کردم.'] },
]

export function emptyProgress() {
  return { version: 1, answers: {}, writing: {}, step: 0, submittedAt: null, words: {}, grammar: {}, sentences: {}, speakingNotes: {}, speakingChecks: {}, sessions: [] }
}

export function readProgress(raw) {
  const base = emptyProgress()
  if (!raw || typeof raw !== 'object' || raw.version !== 1) return base
  const result = { ...base }
  for (const key of ['writing', 'sentences', 'speakingNotes']) {
    if (raw[key] && typeof raw[key] === 'object') {
      result[key] = Object.fromEntries(Object.entries(raw[key]).filter(([, value]) => typeof value === 'string').map(([id, value]) => [id, value.slice(0, 12000)]))
    }
  }
  for (const q of assessmentQuestions) if (Number.isInteger(raw.answers?.[q.id]) && raw.answers[q.id] >= -1 && raw.answers[q.id] < q.options.length) result.answers[q.id] = raw.answers[q.id]
  for (const q of grammarQuestions) if (Number.isInteger(raw.grammar?.[q.id]) && raw.grammar[q.id] >= -1 && raw.grammar[q.id] < q.options.length) result.grammar[q.id] = raw.grammar[q.id]
  for (const word of vocabulary) {
    const entry = raw.words?.[word.id]
    if (entry && Number.isFinite(entry.due) && Number.isInteger(entry.box) && entry.box >= 0 && entry.box <= 4) result.words[word.id] = { due: entry.due, box: entry.box }
  }
  for (let i = 0; i < speakingPrompts.length; i++) result.speakingChecks[i] = Array.isArray(raw.speakingChecks?.[i]) ? raw.speakingChecks[i].filter(n => Number.isInteger(n) && n >= 0 && n < 3) : []
  result.step = Number.isInteger(raw.step) ? Math.max(0, Math.min(assessmentQuestions.length, raw.step)) : 0
  result.submittedAt = typeof raw.submittedAt === 'string' && Number.isFinite(Date.parse(raw.submittedAt)) ? raw.submittedAt : null
  result.sessions = Array.isArray(raw.sessions) ? raw.sessions.filter(s => Number.isInteger(s.prompt) && s.prompt >= 0 && s.prompt < speakingPrompts.length && typeof s.date === 'string' && Number.isFinite(Date.parse(s.date))).slice(-100) : []
  return result
}

export function getResults(answers) {
  return ['grammar', 'vocabulary'].map(skill => {
    const questions = assessmentQuestions.filter(q => q.skill === skill)
    return { skill, total: questions.length, correct: questions.filter(q => answers[q.id] === q.answer).length }
  })
}

export function scheduleReview(previous, remembered, now = Date.now()) {
  const box = remembered ? Math.min((previous?.box || 0) + 1, 4) : 0
  return { box, due: now + [10 * 60 * 1000, 86400000, 3 * 86400000, 7 * 86400000, 14 * 86400000][box] }
}

export function createReport(progress) {
  const scores = getResults(progress.answers).map(r => `${r.skill}: ${r.correct}/${r.total}`).join('\n')
  return ['Jaminova English — learning report', 'Previous B1: self-reported. No current CEFR level has been assigned.', progress.submittedAt ? `Diagnostic completed: ${progress.submittedAt}\n${scores}` : 'Diagnostic: not completed.', '\nDiagnostic answers:', ...assessmentQuestions.map((q, i) => `${i + 1}. ${q.prompt}\nAnswer: ${progress.answers[q.id] === -1 ? 'I don’t know' : q.options[progress.answers[q.id]] || '(unanswered)'}`), '\nWriting for feedback:', ...writingPrompts.map(q => `${q.prompt}\n${progress.writing[q.id] || '(not written)'}`), '\nVocabulary sentences:', ...vocabulary.filter(w => progress.sentences[w.id]).map(w => `${w.term}: ${progress.sentences[w.id]}`), '\nGrammar sentences:', ...grammarQuestions.filter(q => progress.sentences[q.id]).map(q => `${q.topic}: ${progress.sentences[q.id]}`), '\nSpeaking notes (typed by the learner, not automatic transcription):', ...speakingPrompts.flatMap((q, i) => progress.speakingNotes[i] ? [`${q.prompt}\n${progress.speakingNotes[i]}`] : []), '\nPlease give feedback on vocabulary, grammar and natural phrasing. Assess speaking/listening only if actual audio is provided.'].join('\n\n')
}
