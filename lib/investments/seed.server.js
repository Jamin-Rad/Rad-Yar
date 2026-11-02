import 'server-only'

// Personal holdings live only in the private database/browser backup, never Git.
export function initialInvestmentState() {
  return { version: 1, account: { complete: false, snapshotDate: null }, positions: [], watchlist: [] }
}
