export function cashPlanStatus(plan, transactions, today){
  const month=today.slice(0,7),lastDay=new Date(Date.UTC(Number(month.slice(0,4)),Number(month.slice(5,7)),0)).getUTCDate()
  const due=month+'-'+String(Math.min(plan.day,lastDay)).padStart(2,'0')
  const recorded=transactions.some(t=>t.accountId===plan.accountId&&t.manual?.planId===plan.id&&t.manual.month===month)
  return {due,month,recorded,ready:plan.active&&month>=plan.startMonth&&today>=due&&!recorded}
}
