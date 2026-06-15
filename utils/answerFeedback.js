function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function extractOptionParagraph(explanation, optionId, lang) {
  if (!explanation) return ''
  const paragraphs = explanation.split(/\n\s*\n/).map(part => part.trim()).filter(Boolean)
  const id = escapeRegExp(optionId)
  const patterns = {
    de: new RegExp(`^${id}\\s+ist\\s+falsch\\s*:\\s*`, 'i'),
    en: new RegExp(`^${id}\\s+is\\s+incorrect\\s*:\\s*`, 'i'),
    fa: new RegExp(`^(?:گزینه\\s*)?${id}\\s*[:：-]?.*(?:نادرست|اشتباه)\\s*[:：-]?\\s*`, 'i'),
  }
  const pattern = patterns[lang]
  const paragraph = pattern && paragraphs.find(part => pattern.test(part))
  return paragraph ? paragraph.replace(pattern, '').trim() : ''
}

export function getWrongAnswerExplanation(item, selectedId, lang) {
  if (!item || !selectedId || selectedId === item.correct) return ''
  if (item.wrongExplanations?.[selectedId]) return item.wrongExplanations[selectedId]

  const extracted = extractOptionParagraph(item.explanation, selectedId, lang)
  if (extracted) return extracted

  const selectedText = item.options.find(option => option.id === selectedId)?.text || selectedId
  const correctText = item.options.find(option => option.id === item.correct)?.text || item.correct
  const fallback = {
    de: `„${selectedText}“ ist hier falsch, weil diese Aussage nicht zum beschriebenen Befund oder zum gefragten Kriterium passt. Entscheidend ist stattdessen „${correctText}“; die Erklärung oben nennt das maßgebliche Merkmal.`,
    en: `“${selectedText}” is incorrect here because it does not fit the described finding or the criterion being tested. The decisive answer is “${correctText}”; the explanation above gives the key feature.`,
    fa: `«${selectedText}» در این سؤال نادرست است، زیرا با یافته توصیف‌شده یا معیار مورد سؤال تطابق ندارد. پاسخ تعیین‌کننده «${correctText}» است و توضیح بالا ویژگی اصلی را بیان می‌کند.`,
  }
  return fallback[lang] || fallback.de
}
