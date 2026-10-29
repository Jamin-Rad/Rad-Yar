// Read only the requested translation: a translation cannot pass on another language's copy.
export function localizedText(value, lang) {
 if (typeof value === 'string') return value
 if (Array.isArray(value)) return value.map(item=>localizedText(item,lang)).join(' ')
 if (!value || typeof value !== 'object') return ''
 if (Object.hasOwn(value,'de')) return value[lang] || ''
 return Object.entries(value).filter(([key])=>!['id','type','src','target','href'].includes(key)).map(([,item])=>localizedText(item,lang)).join(' ')
}
