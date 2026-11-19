const LIMIT=35000
export function mergeIntradayRows(...series) {
  const rows=new Map()
  for(const bars of series)for(const row of bars??[])if(Number.isFinite(Date.parse(row.date)))rows.set(Date.parse(row.date),row)
  return [...rows].sort(([a],[b])=>a-b).slice(-LIMIT).map(([,row])=>row)
}

async function accessArchive(key,update) {
  const db=await new Promise((resolve,reject)=>{
    const request=indexedDB.open('andarun-chart-archive',1)
    request.onupgradeneeded=()=>request.result.createObjectStore('candles')
    request.onsuccess=()=>resolve(request.result)
    request.onerror=()=>reject(request.error)
  })
  try {
    return await new Promise((resolve,reject)=>{
      const tx=db.transaction('candles',update?'readwrite':'readonly')
      const store=tx.objectStore('candles')
      const request=store.get(key)
      let history
      request.onsuccess=()=>{
        history=request.result??[]
        if(update){history=mergeIntradayRows(history,...update);store.put(history,key)}
      }
      tx.oncomplete=()=>resolve(history)
      tx.onabort=()=>reject(tx.error??Error('archive aborted'))
      tx.onerror=()=>reject(tx.error)
    })
  } finally {db.close()}
}
export const readIntradayArchive=key=>accessArchive(key)
export const extendIntradayArchive=(key,older,incoming)=>accessArchive(key,[older,incoming])
