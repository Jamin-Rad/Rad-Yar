import { lessonThree, lessonThreeRows } from './lessonThree.js'
import { lessonOneExtra } from './lessonOneExtra.js'
import { lessonTwo, lessonTwoRows } from './lessonTwo.js'
export const lesson = {
  id: 'b1-01', title: 'آشنایی با همکار جدید', subtitle: 'A new colleague, a different week',
  grammar: 'حال ساده و حال استمراری',
  paragraphs: [
    "It is Monday morning, and Maya is meeting her new **colleague**, Sam, in the office kitchen. “Hi, I’m Maya. I **usually** **deal with** customer questions, but this week **I’m helping** the training team,” she says. “What do you do?”",
    "“**I work** in IT,” Sam replies. “I normally **work from home** on Mondays, but today **I’m visiting** this office. I’m trying to **get used to** the new system, so everything takes a little longer.” Maya smiles. “Don’t worry. We all **give each other a hand** here.”",
    "Sam looks at the clock. “Do we have a team meeting this morning?” “Yes, it starts at ten. We usually **catch up** for fifteen minutes and discuss our **schedule**. This week **we’re preparing** for a customer visit, so **we’re meeting** every morning.”",
    "“I see. I have a **deadline** on Thursday. Could we talk about the system after lunch?” Sam asks. “Of course. Does half past one **work for you**?” “Yes, that’s perfect. Thanks.”",
    "At lunch, Maya asks, “What do you usually do after work?” “I **often go** for a walk, but at the moment **I’m taking** an evening English course,” Sam says. “I want to **keep in touch** with friends abroad.” Maya nods. “That sounds great. Let’s get some coffee before we go back.”"
  ],
  words: [
    ['colleague', 'همکار', 'My colleague works in IT.'],
    ['deal with', 'رسیدگی کردن به', 'I deal with customer questions.'],
    ['work from home', 'از خانه کار کردن', 'We work from home on Fridays.'],
    ['get used to', 'عادت کردن به', 'I am getting used to the new system.'],
    ['give someone a hand', 'به کسی کمک کردن', 'Could you give me a hand?'],
    ['catch up', 'از خبرها و کارهای هم باخبر شدن', 'Let’s catch up after lunch.'],
    ['schedule', 'برنامهٔ زمانی', 'Let’s check our schedule.'],
    ['deadline', 'مهلت نهایی انجام کار', 'The deadline is Thursday.'],
    ['work for you', 'برای تو مناسب بودن', 'Does two o’clock work for you?'],
    ['keep in touch', 'در ارتباط ماندن', 'We keep in touch by email.']
  ],
  grammarNotes: [
    ['عادت‌ها، واقعیت‌ها و برنامهٔ زمانی ثابت', 'حال ساده: فعل پایه؛ برای he / she / it معمولاً s اضافه می‌شود. سؤال با do / does و فعل پایه است.', 'I usually work from home. / Does she work here?'],
    ['اتفاق جاری یا وضعیت موقتی', 'حال استمراری: am / is / are + فعل ing. لازم نیست دقیقاً همین لحظه رخ بدهد؛ «این هفته» یا «این روزها» هم می‌تواند موقتی باشد.', 'I am working in the office this week.'],
    ['از معنی موقعیت تصمیم بگیر', 'در متن، کار معمول سام در خانه است؛ حضور امروز او در دفتر موقتی است. کلمه‌های usually و at the moment کمک می‌کنند، اما معنی جمله تعیین‌کننده است.', 'I normally work from home, but today I am visiting the office.']
  ]
}
export const categories = { reading: 'Reading', vocabulary: 'Vocabulary', grammar: 'Grammar', conversation: 'Conversation' }
// Each concept has an independently authored transfer question for mistake review.
const rows = [
  ['reading', 'Why is Maya helping the training team?', ['It is her temporary task this week.', 'She has left her job in IT.', 'She works from home every day.', 'She is taking an English course.'], 'مایا می‌گوید this week؛ کمک به تیم آموزش کار موقتی این هفتهٔ اوست.', 'Which sentence describes Maya’s usual job?', ['She deals with customer questions.', 'She teaches English every evening.', 'She visits customers every Monday.', 'She repairs the office computers.'], 'کار معمول مایا رسیدگی به سؤال‌های مشتریان است؛ کمک به آموزش موقتی است.'],
  ['reading', 'Where does Sam normally work on Mondays?', ['At home.', 'In the office kitchen.', 'At a customer’s office.', 'At his English school.'], 'سام می‌گوید I normally work from home on Mondays؛ امروز استثناست.', 'Which statement about Sam is true?', ['He is visiting the office today.', 'He always works in this office on Mondays.', 'He is leaving IT this week.', 'He is teaching Maya English.'], 'حضور امروز سام در دفتر با روال معمول دوشنبه‌های او متفاوت است.'],
  ['reading', 'Why is the team meeting every morning this week?', ['They are preparing for a customer visit.', 'They are learning English together.', 'They are changing the lunch schedule.', 'They are celebrating Sam’s birthday.'], 'در متن دلیل جلسات روزانه، آماده‌شدن برای بازدید مشتری است.', 'What is different about the meetings this week?', ['They happen every morning.', 'They start after lunch.', 'They are only for the IT team.', 'They have been cancelled.'], 'روال این هفته، جلسه در هر صبح است؛ متن از لغوشدن جلسه حرفی نمی‌زند.'],
  ['reading', 'When do Maya and Sam agree to discuss the system?', ['At 1:30 after lunch.', 'At 10 before the meeting.', 'On Thursday evening.', 'Before work on Monday.'], 'half past one یعنی ۱:۳۰؛ آن‌ها برای بعد از ناهار توافق می‌کنند.', 'Which event is scheduled for ten o’clock?', ['The team meeting.', 'Sam’s English class.', 'The conversation after lunch.', 'The customer visit.'], 'مایا می‌گوید جلسهٔ تیم ساعت ده شروع می‌شود.'],
  ['reading', 'Why is Sam taking an English course?', ['To stay in contact with friends abroad.', 'To become the training manager.', 'To move his deadline to Monday.', 'To teach an evening class.'], 'سام می‌خواهد با دوستان خارج از کشورش در ارتباط بماند.', 'What does Sam often do after work?', ['He goes for a walk.', 'He visits customers.', 'He leads a team meeting.', 'He works in the office kitchen.'], 'سام معمولاً بعد از کار پیاده‌روی می‌کند؛ دورهٔ انگلیسی وضعیت این روزهای اوست.'],
  ['vocabulary', '“Could you give me a hand?” means:', ['Could you help me?', 'Could you call me later?', 'Could you change the deadline?', 'Could you introduce yourself?'], 'give someone a hand یک عبارت برای کمک‌کردن است، نه معنای لفظی دست.', 'Your colleague is carrying heavy boxes. You say:', ['Let me give you a hand.', 'Let me keep in touch.', 'Let me miss the deadline.', 'Let me work for you at two.'], 'برای پیشنهاد کمک می‌گوییم Let me give you a hand.'],
  ['vocabulary', '“I deal with customer questions” means:', ['I handle customer questions.', 'I avoid customer questions.', 'I forget customer questions.', 'I translate every customer question.'], 'deal with در این موقعیت یعنی رسیدگی‌کردن؛ الزاماً ترجمه‌کردن نیست.', 'Who deals with bookings at a hotel?', ['The person who handles reservations.', 'A guest who cancels a holiday.', 'A visitor who asks for directions.', 'A driver who waits outside.'], 'کسی که مسئول رسیدگی به رزروهاست، deals with bookings.'],
  ['vocabulary', 'A “deadline” is:', ['The latest time to finish a task.', 'The first day in a new job.', 'A short break between meetings.', 'A list of office phone numbers.'], 'deadline آخرین مهلت انجام کار است؛ با برنامهٔ زمانی یا استراحت فرق دارد.', '“Please send the report by Friday.” Friday is the:', ['deadline', 'colleague', 'kitchen', 'system'], 'by Friday مهلت نهایی ارسال را مشخص می‌کند، پس Friday همان deadline است.'],
  ['vocabulary', '“Does half past one work for you?” asks:', ['Is 1:30 a suitable time for you?', 'Do you start work at 1:30 every day?', 'Can you finish all your work at 1:30?', 'Do you work for the training team?'], 'work for you در پیشنهاد زمان یعنی برای تو مناسب بودن، نه استخدام‌شدن.', 'Choose the closest meaning of “Would Friday work for you?”', ['Would Friday be convenient for you?', 'Would you work every Friday?', 'Would you hire someone on Friday?', 'Would Friday be your deadline?'], 'در هماهنگی قرار، work for you یعنی مناسب یا راحت بودن آن زمان.'],
  ['vocabulary', 'Which phrase means “stay in contact”?', ['keep in touch', 'get used to', 'work from home', 'deal with'], 'keep in touch یعنی ارتباط را حفظ کردن. سه گزینهٔ دیگر چنین معنایی ندارند.', '“The new software feels unfamiliar, but I’m learning to use it.” You are:', ['getting used to it', 'keeping in touch with it', 'giving it a hand', 'working from home'], 'get used to یعنی کم‌کم به چیزی عادت کردن؛ اینجا نرم‌افزار جدید است.'],
  ['grammar', 'Sam usually ___ from home on Mondays.', ['works', 'is working', 'work', 'working'], 'usually اینجا عادت را توصیف می‌کند؛ برای Sam در حال ساده، works می‌آید.', 'Maya normally ___ customer questions.', ['handles', 'is handling', 'handle', 'handling'], 'normally در این جمله روال معمول است؛ Maya سوم‌شخص مفرد است و handles می‌خواهد.'],
  ['grammar', 'This week, Maya ___ the training team as a temporary task.', ['is helping', 'helps every week', 'help', 'helping'], 'وظیفهٔ موقتی این هفته با is helping بیان می‌شود؛ استمراری به فعل کمکی نیاز دارد.', 'For this week only, I ___ in the city office.', ['am working', 'work every week', 'works', 'working'], 'for this week only موقتی‌بودن را روشن می‌کند؛ برای I از am working استفاده می‌کنیم.'],
  ['grammar', 'Choose the correct question about a usual job.', ['What do you do?', 'What does you do?', 'What you do?', 'What are you do?'], 'برای پرسیدن شغل معمول از What do you do? استفاده می‌شود؛ بعد از do فعل پایه می‌آید.', 'Choose the correct question about Maya’s routine.', ['Does Maya work here?', 'Does Maya works here?', 'Do Maya work here?', 'Is Maya work here?'], 'Maya سوم‌شخص مفرد است: Does + subject + فعل پایه، پس work بدون s است.'],
  ['grammar', 'Right now, Sam ___ to a colleague on the phone.', ['is talking', 'talks every day', 'talk', 'talking'], 'right now اتفاق جاری را مشخص می‌کند؛ ساخت کامل is talking است.', 'Look! Our colleagues ___ into the meeting room.', ['are walking', 'walks', 'is walking', 'walking'], 'اتفاق در حال رخ‌دادن و فاعل جمع است: are walking.'],
  ['grammar', 'The team ___ at ten every Monday. It is the regular schedule.', ['meets', 'is meeting right now', 'meet', 'meeting'], 'برنامهٔ ثابت با حال ساده بیان می‌شود؛ the team اینجا مفرد و فعل آن meets است.', 'The weekly meeting ___ at nine every Tuesday.', ['starts', 'is starting right now', 'start', 'starting'], 'زمان‌بندی منظم جلسه با حال ساده می‌آید؛ meeting مفرد است، پس starts درست است.'],
  ['conversation', 'A new colleague says, “Hi, I’m Sam.” What is the best reply?', ['Hi, Sam. I’m Maya. Nice to meet you.', 'You must finish it by Thursday.', 'No, I never take the bus.', 'It starts at half past one.'], 'برای معرفی اولیه، معرفی خود و Nice to meet you پاسخ مرتبط است.', 'You meet a colleague for the first time. Choose the best opening.', ['Hello, I’m Alex. I’ve just joined the team.', 'The report was due yesterday.', 'It costs fifteen pounds.', 'Yes, the train is delayed.'], 'شروع آشنایی باید معرفی کوتاه و مرتبط باشد؛ باقی گزینه‌ها جواب موقعیت دیگری‌اند.'],
  ['conversation', '“Could we talk after lunch?” Choose the best reply to arrange a time.', ['Of course. Does half past one work for you?', 'Yes, I usually have soup.', 'The kitchen is on the left.', 'I don’t know his surname.'], 'پاسخ مناسب درخواست را می‌پذیرد و زمان مشخص پیشنهاد می‌کند.', '“Can we have a quick chat tomorrow?” You are free at ten. Say:', ['Sure. Would ten o’clock work for you?', 'Sure. I bought it yesterday.', 'No. This is my colleague.', 'Yes. I usually walk home.'], 'برای هماهنگی، زمان آزاد را پیشنهاد می‌دهیم: Would ten o’clock work for you?'],
  ['conversation', '“I’m finding the new system difficult.” Choose a supportive reply.', ['Don’t worry. I can give you a hand.', 'That’s the price of a coffee.', 'The meeting was last year.', 'No, I don’t live nearby.'], 'پیشنهاد کمک پاسخی مرتبط و حمایت‌کننده به دشواری استفاده از سیستم است.', '“I don’t know how to book this room.” Choose the best response.', ['I can show you how it works.', 'I never drink tea.', 'The bus is usually crowded.', 'Yes, it was a sunny weekend.'], 'پیشنهاد نشان‌دادن روش رزرو به مشکل مطرح‌شده پاسخ می‌دهد.'],
  ['conversation', '“What do you usually do after work?” Choose the relevant answer.', ['I often go for a walk.', 'I’m in the kitchen right now.', 'The deadline is Thursday.', 'Yes, half past one is fine.'], 'سؤال دربارهٔ عادت بعد از کار است؛ I often go for a walk همان را پاسخ می‌دهد.', '“Do you normally work from home?” Choose the relevant answer.', ['Yes, on Mondays and Fridays.', 'Yes, the coffee is hot.', 'No, the deadline is tomorrow.', 'No, it costs twenty pounds.'], 'پاسخ، روال کار از خانه و روزهای آن را مشخص می‌کند.'],
  ['conversation', '“Does half past one work for you?” You are free then. Say:', ['Yes, that’s perfect. Thanks.', 'I don’t work in IT.', 'She is my colleague.', 'I often walk after work.'], 'وقتی زمان مناسب است، تأیید مستقیم و تشکر پاسخ طبیعی است.', '“Would two o’clock work for you?” You have a meeting then. Say:', ['Sorry, I’m busy then. Could we meet at three?', 'Yes, that’s perfect. See you at two.', 'I usually deal with customer questions.', 'My colleague works from home.'], 'وقتی آن ساعت آزاد نیستی، مؤدبانه رد کن و زمان جایگزین بده؛ گزینهٔ تأیید با موقعیت ناسازگار است.']
]
const originalQuestions = rows.map((r, i) => ({
  id: `q${i + 1}`, category: r[0],
  variants: [
    { prompt: r[1], options: r[2], explanation: r[3], answer: 0 },
    { prompt: r[4], options: r[5], explanation: r[6], answer: 0 }
  ]
}))


function fromRows(rows, lessonId, prefix) {
 return rows.map((r,i)=>({id:prefix+(i+1),lessonId,category:r[0],variants:[r[1],r[2]].map(v=>({prompt:v[0],options:v.slice(1),answer:0,explanation:r[3]}))}))
}
lesson.goal = 'آشنایی با همکار، هماهنگی زمان و تشخیص کار معمول از وضعیت موقتی.'
lesson.titleEn = 'A new colleague'
lesson.grammarEn = 'Present simple & continuous'
lesson.goalEn = 'Meet a colleague, arrange a chat and talk about everyday routines.'
lessonTwo.titleEn = 'When plans go wrong'
lessonTwo.grammarEn = 'Past simple & continuous'
lessonTwo.goalEn = 'Explain a delay, describe past events and handle a change of plan.'
export const lessons = [lesson, lessonTwo, lessonThree]
export const lessonMap = Object.fromEntries(lessons.map(l=>[l.id,l]))
export const questions = [
 ...originalQuestions.map(q=>({...q,lessonId:lesson.id})),
 ...fromRows(lessonOneExtra,lesson.id,'l1extra'),
 ...fromRows(lessonTwoRows,lessonTwo.id,'l2q'),
 ...fromRows(lessonThreeRows,lessonThree.id,'l3q')
]
export const questionMap = Object.fromEntries(questions.map(q=>[q.id,q]))
export const flashcards = lessons.flatMap(l=>l.words.map(([term,meaning,example],i)=>({id:l.id+'-word-'+i,lessonId:l.id,term,meaning,example})))
export const flashcardMap = Object.fromEntries(flashcards.map(c=>[c.id,c]))
