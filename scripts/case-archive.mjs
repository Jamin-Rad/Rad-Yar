#!/usr/bin/env node
// Chat-driven archive operations. Patient input comes from stdin or an explicit
// local file; credentials are read only from the environment and never printed.
import { readFile } from 'node:fs/promises'
import { parseArgs } from 'node:util'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import dotenv from 'dotenv'
import { createArchiveToken } from '../lib/caseArchive/token.mjs'
import { publicTextPackage } from '../lib/caseArchive/model.mjs'
import { listRadiopaediaCases } from '../lib/caseArchive/radiopaedia.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
dotenv.config({ path: resolve(root, '.env.local'), quiet: true })
const { values, positionals } = parseArgs({ allowPositionals: true, options: { url: { type: 'string' }, input: { type: 'string' }, id: { type: 'string' }, revision: { type: 'string' }, help: { type: 'boolean' } } })
const command = positionals[0]

if (values.help || !command) {
  console.log(`Private Jaminova case archive

Commands:
  list                 List case IDs and diagnoses; --input accepts JSON filters.
  get --id ID          Read one complete private case.
  save [--input FILE]  Create a case from JSON; stdin is the default input.
                       To update, supply id AND revision from the latest get.
  copy-fallsammlung    Copy the old cases once, without changing their source.
  import-radiopaedia   Import your own cases using RADIOPAEDIA_ACCESS_TOKEN.
  public-text --id ID  Export rewritten English findings without private fields.

Connection: --url https://your-site.example or CASE_ARCHIVE_URL.
Authentication: CASE_ARCHIVE_AGENT_TOKEN, or the local Jaminova session secret.
No credentials belong in command arguments or the repository.`)
  process.exit(0)
}

async function inputJson() {
  let raw
  if (values.input) raw = await readFile(values.input, 'utf8')
  else {
    const chunks = []; let size = 0
    for await (const chunk of process.stdin) {
      size += chunk.length
      if (size > 1500000) throw new Error('Input is too large.')
      chunks.push(chunk)
    }
    raw = Buffer.concat(chunks).toString('utf8')
  }
  if (Buffer.byteLength(raw, 'utf8') > 1500000) throw new Error('Input is too large.')
  return JSON.parse(raw)
}

async function main() {
  if (!['list', 'get', 'save', 'copy-fallsammlung', 'public-text', 'import-radiopaedia'].includes(command)) throw new Error('Unknown command. Use --help.')
  const base = new URL(values.url || process.env.CASE_ARCHIVE_URL || 'http://localhost:3000')
  if (base.username || base.password || (base.protocol !== 'https:' && !(base.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(base.hostname)))) throw new Error('Use HTTPS, or HTTP on localhost only.')
  const secret = process.env.ANDARUN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET
  const token = process.env.CASE_ARCHIVE_AGENT_TOKEN || createArchiveToken(secret)
  async function api(path = '', method = 'GET', body) {
    const response = await fetch(new URL(`/api/andarun/case-archive${path}`, base), {
      method, redirect: 'error', signal: AbortSignal.timeout(30000),
      headers: { 'Content-Type': 'application/json', 'x-case-archive-token': token },
      body: body ? JSON.stringify(body) : undefined,
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || `Archive request failed (${response.status}).`)
    return result
  }
  const get = async () => {
    if (!values.id) throw new Error('--id is required.')
    return (await api(`/${encodeURIComponent(values.id)}`)).record
  }
  if (command === 'list') {
    const filters = values.input ? await inputJson() : {}
    const result = await api('', 'POST', { action: 'search', filters, page: Number(filters.page || 0) })
    return { total: result.total, page: result.page, cases: result.cases.map(item => ({ id: item.id, title: item.title, revision: item.revision, modalities: item.modalities, studyCount: item.studyCount })) }
  }
  if (command === 'get') return get()
  if (command === 'public-text') return publicTextPackage(await get())
  if (command === 'copy-fallsammlung') return api('', 'POST', { action: 'copy-fallsammlung' })
  if (command === 'import-radiopaedia') {
    const remote = await listRadiopaediaCases(process.env.RADIOPAEDIA_ACCESS_TOKEN)
    let copied = 0, alreadyPresent = 0
    for (let start = 0; start < remote.length; start += 100) {
      const result = await api('', 'POST', { action: 'import-radiopaedia', cases: remote.slice(start, start + 100) })
      copied += result.copied; alreadyPresent += result.alreadyPresent
    }
    return { remoteCount: remote.length, copied, alreadyPresent }
  }
  const input = await inputJson()
  const record = input.record || input
  const revision = Number(values.revision || input.revision || record.revision)
  let result
  if (record.id && Number.isSafeInteger(revision) && revision > 0) result = await api(`/${encodeURIComponent(record.id)}`, 'PUT', { record, revision })
  else {
    if (record.revision || input.revision || values.revision) throw new Error('A valid id and revision are required to update a case.')
    result = await api('', 'POST', { action: 'create', record })
  }
  return { saved: true, id: result.record.id, revision: result.record.revision }
}

try { console.log(JSON.stringify(await main(), null, 2)) }
catch (error) { console.error(error.message); process.exitCode = 1 }
