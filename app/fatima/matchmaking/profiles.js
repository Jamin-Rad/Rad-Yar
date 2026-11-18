import 'server-only'
import { gunzipSync } from 'node:zlib'

// Personal profiles live in private server configuration, never in the public repository.
// Call only after checking the Fatima session.
export function getProfiles() {
  const encoded = process.env.FATIMA_MATCHMAKING_DATA
  if (!encoded) return null
  const profiles = JSON.parse(gunzipSync(Buffer.from(encoded, 'base64')).toString('utf8'))
  if (!Array.isArray(profiles) || profiles.length !== 6 || new Set(profiles.map(p => p.id)).size !== 6) {
    throw new Error('Invalid private matchmaking configuration')
  }
  return profiles
}
