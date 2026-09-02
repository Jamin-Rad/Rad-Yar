import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppBackground, ModuleRow, SyncBanner } from '../ui/components'
import { colors, rtlText } from '../ui/theme'
import { loadTodos } from '../data/todos'
import type { ScreenName } from '../types'

const modules: Array<{ screen: ScreenName; title: string; subtitle: string; icon: Parameters<typeof ModuleRow>[0]['icon'] }> = [
  { screen: 'todos', title: 'کارها', subtitle: 'کارهای امروز و برنامه‌ها', icon: 'clipboard-check-outline' },
  { screen: 'routines', title: 'روتین', subtitle: 'عادت‌ها و پیگیری روزانه', icon: 'autorenew' },
  { screen: 'events', title: 'قرارها', subtitle: 'تقویم و رویدادها', icon: 'calendar-outline' },
  { screen: 'work', title: 'خدمات', subtitle: 'شیفت‌ها و برنامهٔ کاری', icon: 'briefcase-outline' },
  { screen: 'health', title: 'سلامت', subtitle: 'وزن، ورزش و تغذیه', icon: 'heart-pulse' },
  { screen: 'deutsch', title: 'آلمانی', subtitle: 'درس‌ها و مرور روزانه', icon: 'book-open-page-variant-outline' },
  { screen: 'findings', title: 'گزارش‌ها', subtitle: 'یافته‌ها، موارد و پرسش‌ها', icon: 'file-chart-outline' },
  { screen: 'finance', title: 'امور مالی', subtitle: 'بودجه، هزینه و سفر', icon: 'wallet-outline' },
]

export function HomeScreen({ navigate, online, pending, syncError }: {
  navigate: (screen: ScreenName) => void
  online: boolean
  pending: number
  syncError?: string
}) {
  const [openToday, setOpenToday] = useState(0)

  useEffect(() => {
    void loadTodos().then(items => setOpenToday(items.filter(item => !item.done).length))
  }, [pending])

  const date = new Intl.DateTimeFormat('fa-IR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())

  return (
    <AppBackground scroll>
      <View style={styles.hero}>
        <Text style={styles.title}>اندرون</Text>
        <SyncBanner online={online} pending={pending} error={syncError} />
        <Text style={styles.today}>امروز</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.modules}>
        {modules.map(module => <ModuleRow key={module.screen} {...module} onPress={() => navigate(module.screen)} />)}
      </View>

      <View style={styles.focusCard}>
        <Text style={styles.focusLabel}>تمرکز امروز</Text>
        <Text style={styles.focusValue}>{openToday ? `${openToday.toLocaleString('fa-IR')} کار باز دارید` : 'همهٔ کارها انجام شده‌اند'}</Text>
      </View>
    </AppBackground>
  )
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingTop: 28, paddingBottom: 18 },
  title: { ...rtlText, color: colors.gold, textAlign: 'center', fontSize: 48, fontWeight: '800', marginBottom: 8 },
  today: { ...rtlText, color: colors.gold, fontSize: 23, fontWeight: '700', marginTop: 10 },
  date: { ...rtlText, color: colors.muted, fontSize: 15, marginTop: 5 },
  modules: { paddingTop: 8 },
  focusCard: { marginHorizontal: 18, marginTop: 10, padding: 18, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'flex-end' },
  focusLabel: { ...rtlText, color: colors.gold, fontSize: 14, fontWeight: '700' },
  focusValue: { ...rtlText, fontSize: 18, marginTop: 6 },
})
