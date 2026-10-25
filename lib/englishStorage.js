import { readState } from '../app/andarun/english/courseEngine.js'

// Same private JSON storage used by existing Jaminova tools, in a dedicated namespace.
export const englishStorageKey=ownerId=>'english-b1:'+ownerId
export function makeEnglishStorage(client,available=Boolean(client)) {
 return {
  available,
  async read(ownerId) {
    const {data,error}=await client.from('admin_budget_state').select('store,updated_at').eq('id',englishStorageKey(ownerId)).maybeSingle()
    if(error)throw error
    return {state:readState(data?.store),revision:data?.updated_at||null}
  },
  async write(ownerId,state,revision) {
    const updated_at=new Date(Math.max(Date.now(),Date.parse(revision||'')+1||0)).toISOString()
    const row={id:englishStorageKey(ownerId),store:state,updated_at}
    const query=revision===null?client.from('admin_budget_state').insert(row):client.from('admin_budget_state').update({store:state,updated_at}).eq('id',englishStorageKey(ownerId)).eq('updated_at',revision)
    const {data,error}=await query.select('store,updated_at').maybeSingle()
    if(error?.code==='23505')return null
    if(error)throw error
    return data?{state:readState(data.store),revision:data.updated_at}:null
  }
 }
}
