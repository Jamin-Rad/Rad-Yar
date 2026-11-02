// Entirely synthetic fixtures; no customer portfolio data belongs in Git.
export function initialInvestmentState() {
  const rows = [
    ['alpha', 'Aster Industries', '1.996985', 10000, 1000, 'stock'],
    ['beta', 'Northwind Technology', '2.5', 20000, -2000, 'stock'],
    ['unknown', 'Example Unknown', '0.667', 3500, null, 'stock'],
    ['spin', 'Example Distribution', '0.333333', 250, 250, 'stock'],
    ['fund', 'Example Fund …', '3', 0, 0, 'fund'],
  ]
  return { version: 1, account: { owner: 'من', broker: 'Trade Republic', currency: 'EUR', complete: false, snapshotDate: null }, positions: rows.map(([id,name,quantity,valueCents,gainCents,category])=>({id,name,quantity,valueCents,gainCents,category,note:'',verified:false,source:'synthetic'})), watchlist: [] }
}
