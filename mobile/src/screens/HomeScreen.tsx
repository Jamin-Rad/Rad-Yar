import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppBackground, ModuleRow, SyncBanner } from '../ui/components'
import { colors, rtlText } from '../ui/theme'
import { loadProfileSettings } from '../data/medications'
import type { ScreenName } from '../types'

const modules: Array<{ screen: ScreenName; title: string; subtitle: string; icon: Parameters<typeof ModuleRow>[0]['icon'] }> = [
  { screen: 'medications', title: 'داروهای Maman', subtitle: 'برنامه امروز، ثبت مصرف و مدیریت داروها', icon: 'pill-multiple' },
]

export function HomeScreen({ navigate, online, pending, syncError }: {
  navigate: (screen: ScreenName) => void
  online: boolean
  pending: number
  syncError?: string
}) {
  const [personName, setPersonName] = useState('')

  useEffect(() => {
    void loadProfileSettings().then(settings => setPersonName(settings.personName))
  }, [pending])

  const date = new Intl.DateTimeFormat('fa-IR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())

  return (
    <AppBackground scroll>
      <View style={styles.hero}>
        <Text style={styles.title}>سلام {personName || 'دوست من'}</Text>
        <SyncBanner online={online} pending={pending} error={syncError} />
        <Text style={styles.today}>امروز</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.modules}>
        {modules.map(module => <ModuleRow key={module.screen} {...module} onPress={() => navigate(module.screen)} />)}
      </View>

      <View style={styles.focusCard}>
        <Text style={styles.focusLabel}>حساب شخصی Maman</Text>
        <Text style={styles.focusValue}>اطلاعات روی گوشی می‌ماند و هنگام اتصال، آنلاین هم ذخیره می‌شود.</Text>
      </View>
    </AppBackground>
  )
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingTop: 28, paddingBottom: 18 },
  title: { ...rtlText, color: colors.text, textAlign: 'center', fontSize: 34, fontWeight: '900', marginBottom: 8 },
  today: { ...rtlText, color: colors.gold, fontSize: 23, fontWeight: '700', marginTop: 10 },
  date: { ...rtlText, color: colors.muted, fontSize: 15, marginTop: 5 },
  modules: { paddingTop: 8 },
  focusCard: { marginHorizontal: 18, marginTop: 10, padding: 18, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'flex-end' },
  focusLabel: { ...rtlText, color: colors.gold, fontSize: 14, fontWeight: '700' },
  focusValue: { ...rtlText, fontSize: 18, marginTop: 6 },
})
