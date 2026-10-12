export const ANDARUN_HOME_GROUPS = [
  { id: 'alltag', title: 'Alltag', tone: 'blue', items: [
    { title: 'Routine', href: '/andarun/routine', icon: 'sun' },
    { title: 'ToDos', href: '/andarun/todo', icon: 'check', tone: 'coral' },
    { title: 'Termine', href: '/andarun/termine', icon: 'calendar' },
    { title: 'Dienste', href: '/andarun/dienste', icon: 'briefcase' },
  ] },
  { id: 'gesundheit', title: 'Gesundheit', tone: 'mint', items: [
    { title: 'Gesundheit', href: '/andarun/gesundheit', icon: 'heart' },
    { title: 'Medikamente', href: '/andarun/medikamente', icon: 'pill' },
  ] },
  { id: 'lernen', title: 'Lernen', tone: 'blue', items: [
    { title: 'Deutsch', href: '/andarun/deutsch', icon: 'book' },
    { title: 'Befunde', href: '/andarun/befunde', icon: 'file' },
    { title: 'Test', href: '/andarun/test', icon: 'test' },
  ] },
  { id: 'finanzen', title: 'Finanzen', tone: 'coral', items: [
    { title: 'Finanzen', action: 'finance', icon: 'coins' },
  ] },
]

export const ANDARUN_DAILY_ACTIONS = [
  { title: 'Termine', description: 'Deine Zeit im Blick.', label: 'Termine ansehen', href: '/andarun/termine', icon: 'calendar', tone: 'blue' },
  { title: 'ToDos', description: 'Alles Schritt für Schritt.', label: 'ToDos öffnen', href: '/andarun/todo', icon: 'check', tone: 'coral' },
  { title: 'Routine', description: 'Gute Gewohnheiten. Jeden Tag.', label: 'Routine fortsetzen', href: '/andarun/routine', icon: 'sun', tone: 'mint' },
]
