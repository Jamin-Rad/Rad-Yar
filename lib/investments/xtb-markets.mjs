export const xtbMarkets = [
  { symbol:'US100', reference:'NQ=F', name:'نزدک ۱۰۰' },
  { symbol:'GOLD', reference:'GC=F', name:'طلا' },
  { symbol:'OIL', reference:'BZ=F', name:'نفت برنت' },
  { symbol:'SILVER', reference:'SI=F', name:'نقره' },
  { symbol:'COPPER', reference:'HG=F', name:'مس' },
]

export const xtbReferences = xtbMarkets.map(market=>market.reference)
