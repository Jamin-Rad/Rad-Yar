const L = (de, en, fa) => ({ de, en, fa })

export const RENAL_CYST_FLASHCARD_TOPIC = {
  id: 'nierenzysten', area: 'Abdomen', chapter: 'Niere', icon: 'CT', color: '#0f766e', href: '/flashcards/nierenzysten',
  title: L('Nierenzysten · Bosniak v2019', 'Renal cysts · Bosniak v2019', 'کیست‌های کلیوی · Bosniak v2019'),
  subtitle: L('Enhancement · Wand · Septen · Nodulus', 'Enhancement · wall · septa · nodule', 'تقویت · دیواره · سپتا · ندول'),
}

export const RENAL_CYST_FLASHCARDS = [
  {
    id: 'nierenzysten-bosniak-ii-septa', topicId: 'nierenzysten', category: 'Abdomen',
    front: L('Können bis zu drei dünne Septen bei Bosniak v2019 anreichern und trotzdem zu Kategorie II passen?', 'Can up to three thin septa enhance and still fit Bosniak v2019 category II?', 'آیا ممکن است تا سه سپتای نازک در Bosniak v2019 تقویت شوند و همچنان با طبقهٔ II سازگار باشند؟'),
    answer: L('Ja. Wenige (bis zu drei) dünne Septen können anreichern und weiterhin Kategorie II entsprechen.', 'Yes. A few (up to three) thin septa may enhance and still fit category II.', 'بله. چند سپتای نازک (حداکثر سه عدد) ممکن است تقویت شوند و همچنان با طبقهٔ II سازگار باشند.'),
    explanation: L('Nicht jedes Enhancement verschiebt eine Läsion automatisch in eine höhere Kategorie; Anzahl und Morphologie der Septen zählen. Grundlage: Bosniak v2019.', 'Enhancement alone does not automatically move a lesion into a higher category; the number and morphology of septa matter. Based on Bosniak v2019.', 'صرف تقویت، ضایعه را خودبه‌خود به طبقهٔ بالاتر نمی‌برد؛ تعداد و مورفولوژی سپتا اهمیت دارند. بر پایهٔ Bosniak v2019.'),
    source: 'Silverman et al. Bosniak Classification v2019, Radiology 2019;292:475–488. DOI 10.1148/radiol.2019182646; Abdomen.pdf p.46.',
  },
]
