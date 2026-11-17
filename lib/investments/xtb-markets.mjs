export const xtbMarkets = [
  { symbol:'US100', reference:'NQ=F', name:'نزدک ۱۰۰' },
  { symbol:'GOLD', reference:'GC=F', name:'طلا' },
  { symbol:'OIL.WTI', reference:'CL=F', name:'نفت WTI' },
  { symbol:'SILVER', reference:'SI=F', name:'نقره' },
  { symbol:'COPPER', reference:'HG=F', name:'مس' },
]

export const xtbReferences = ['BZ=F',...xtbMarkets.map(market=>market.reference)]
