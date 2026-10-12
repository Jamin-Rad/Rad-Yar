export const ANDARUN_HOME_GROUPS = [
  { id: 'alltag', title: 'Alltag', tone: 'blue', items: [
    { title: 'Routine', href: '/andarun/routine', icon: 'sun' },
    { title: 'Aufgaben', href: '/andarun/todo', icon: 'check', tone: 'coral' },
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
    { title: 'Monatliche Ausgaben', href: '/andarun/finanz', icon: 'coins' },
    { title: 'Hilfe für Gefangene', icon: 'people', disabled: true },
    { title: 'Reisen & Urlaub', href: '/andarun/urlaub', icon: 'plane', tone: 'blue' },
    { title: 'Konten mit Freunden', href: '/andarun/finanz/freunde', icon: 'people', tone: 'blue' },
    { title: 'DigitDA Unternehmen', href: '/digitda', icon: 'building', tone: 'blue' },
  ] },
]
