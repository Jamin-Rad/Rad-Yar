export function accountActivity(transactions, accountId, {from='',to='',query=''} = {}) {
  const search=query.trim().toLocaleLowerCase()
  const rows=transactions.filter(t=>t.accountId===accountId && (!from||t.date>=from) && (!to||t.date<=to) && (!search||`${t.name||''} ${t.isin||''} ${t.type}`.toLocaleLowerCase().includes(search))).slice().sort((a,b)=>b.datetime.localeCompare(a.datetime)||b.id.localeCompare(a.id))
  const groups=[]
  for (const row of rows) {
    if (groups.at(-1)?.date!==row.date) groups.push({date:row.date,rows:[]})
    groups.at(-1).rows.push(row)
  }
  return {rows,groups}
}
