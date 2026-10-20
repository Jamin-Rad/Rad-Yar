const L = (de, en, fa) => ({ de, en, fa })

export const TECHNIK_BOLD_TOPIC_GROUP = {
  fachId: 'technik', kapitelId: 'technik-mrt', title: L('MRT-Spezialtechniken', 'Special MRI techniques', 'تکنیک‌های ویژهٔ MRI'),
  topics: [{ id: 'fmri-bold', title: L('Funktionelle MRT · BOLD', 'Functional MRI · BOLD', 'MRI عملکردی · BOLD') }],
}

export const TECHNIK_BOLD_QUESTIONS = ['de','en','fa'].map(lang => ({
  id: `fmri-bold-${lang}-mechanism`, fach: 'technik', tags: ['fmri-bold'], source: 'Technik.pdf, PDF p.118 (printed p.117); Ogawa et al. 1990; Logothetis et al. 2001',
  question: L('Was misst eine typische positive BOLD-Antwort bei einer Aufgabe am ehesten?', 'What does a typical positive BOLD response during a task most directly reflect?', 'پاسخ مثبت معمول BOLD هنگام انجام یک تکلیف بیشتر چه چیزی را بازتاب می‌دهد؟')[lang],
  options: [
    L('Eine T2*-gewichtete Signaländerung, die über Veränderungen von Blutfluss und Deoxy-Hb indirekt mit neuronaler Aktivität zusammenhängt.', 'A T2*-weighted signal change indirectly related to neural activity through changes in blood flow and deoxy-Hb.', 'تغییر سیگنال با وزن‌دهی T2* که از راه تغییر جریان خون و هموگلوبین بدون اکسیژن به‌طور غیرمستقیم با فعالیت عصبی مرتبط است.')[lang],
    L('Eine direkte Zählung der Aktionspotenziale jeder Nervenzelle im Voxel.', 'A direct count of action potentials from every neuron in the voxel.', 'شمارش مستقیم پتانسیل‌های عمل هر نورون در وکسل.')[lang],
    L('Eine Messung der absoluten Sauerstoffaufnahme jedes einzelnen Neurons.', 'A measurement of absolute oxygen consumption by each individual neuron.', 'اندازه‌گیری مصرف مطلق اکسیژن هر نورون به‌صورت جداگانه.')[lang],
    L('Ein anatomischer Nachweis, dass die aktivierte Region die Aufgabe ausschließlich ausführt.', 'An anatomical proof that the activated region performs the task exclusively.', 'اثبات آناتومیک اینکه ناحیهٔ فعال‌شده آن تکلیف را به‌تنهایی انجام می‌دهد.')[lang],
  ].map((text,index)=>({id:String.fromCharCode(65+index),text})),
  correct:'A',
  explanation: L('BOLD entsteht durch sauerstoffabhängige Suszeptibilitätsänderungen und wird über die hämodynamische Antwort vermittelt. Es misst neuronale Aktivität nicht direkt und begründet allein keine exklusive funktionelle Zuordnung.', 'BOLD arises from oxygenation-dependent susceptibility changes and is mediated by a haemodynamic response. It does not directly measure neural activity or by itself establish an exclusive functional assignment.', 'BOLD از تغییرات susceptibility وابسته به اکسیژن‌رسانی پدید می‌آید و از راه پاسخ همودینامیک منتقل می‌شود. فعالیت عصبی را مستقیماً نمی‌سنجد و به‌تنهایی نقش انحصاری یک ناحیه را ثابت نمی‌کند.')[lang],
  wrongExplanations: {
    B: L('BOLD ist eine vaskulär vermittelte MR-Signaländerung, keine Aufzeichnung einzelner Aktionspotenziale.', 'BOLD is a vascularly mediated MR signal change, not a recording of individual action potentials.', 'BOLD تغییر سیگنال MR با واسطهٔ عروق است، نه ثبت پتانسیل‌های عمل منفرد.')[lang],
    C: L('Das BOLD-Signal quantifiziert nicht den absoluten Sauerstoffverbrauch jedes Neurons.', 'BOLD does not quantify absolute oxygen consumption by each neuron.', 'BOLD مصرف مطلق اکسیژن هر نورون را کمّی نمی‌کند.')[lang],
    D: L('Ein Aktivierungsmuster zeigt eine aufgabenbezogene Signaländerung; die Interpretation ist nicht exklusiv und bleibt kontextabhängig.', 'An activation pattern shows task-related signal change; interpretation is not exclusive and remains context-dependent.', 'الگوی فعال‌سازی تغییر سیگنال مرتبط با تکلیف را نشان می‌دهد؛ تفسیر انحصاری نیست و به زمینه وابسته است.')[lang],
  },
}))
