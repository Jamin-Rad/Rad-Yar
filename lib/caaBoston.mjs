// Boston v2.0 MRI categories for this educational simulation.
// Charidimou et al., Lancet Neurology 2022: https://pmc.ncbi.nlm.nih.gov/articles/PMC9389452/
// Lobar count includes ICH, CMB and spatially separate cSS/cSAH foci; never double-count a site.
// Cerebellar haemorrhage contributes neither to the lobar count nor to the deep exclusion.
export function evaluateBoston({ age, clinical, lobar, pvs, wmh, deep, alternative }) {
  if (String(age).trim() === '' || !Number.isInteger(Number(age)) || Number(age) <= 0 ||
      !Number.isInteger(lobar) || lobar < 0) return { category: 'incomplete', reason: 'invalid' }
  if (Number(age) < 50) return { category: 'unmet', reason: 'age' }
  if (!clinical) return { category: 'unmet', reason: 'clinical' }
  if (deep) return { category: 'unmet', reason: 'deep' }
  if (alternative) return { category: 'unmet', reason: 'alternative' }
  if (lobar >= 2) return { category: 'probable', reason: 'multiple' }
  if (lobar === 1 && (pvs || wmh)) return { category: 'probable', reason: 'combined' }
  if (lobar === 1) return { category: 'possible', reason: 'single' }
  if (pvs || wmh) return { category: 'possible', reason: 'wm' }
  return { category: 'unmet', reason: 'none' }
}
