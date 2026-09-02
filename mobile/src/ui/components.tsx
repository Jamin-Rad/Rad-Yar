import type { ComponentProps, ReactNode } from 'react'
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import type { ScreenName } from '../types'
import { colors, rtlText } from './theme'

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name']

export function AppBackground({ children, scroll = false }: { children: ReactNode; scroll?: boolean }) {
  const content = scroll
    ? <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">{children}</ScrollView>
    : <View style={styles.fill}>{children}</View>

  return (
    <ImageBackground source={require('../../assets/andarun-bg.png')} style={styles.fill} resizeMode="cover">
      <SafeAreaView style={styles.safe}>{content}</SafeAreaView>
    </ImageBackground>
  )
}

export function ScreenHeader({ title, onBack, right }: { title: string; onBack?: () => void; right?: ReactNode }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerSide}>{right}</View>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerSide}>
        {onBack ? (
          <Pressable accessibilityRole="button" accessibilityLabel="بازگشت" onPress={onBack} hitSlop={12}>
            <MaterialCommunityIcons name="chevron-left" size={34} color={colors.gold} />
          </Pressable>
        ) : null}
      </View>
    </View>
  )
}

export function SyncBanner({ online, pending, error }: { online: boolean; pending: number; error?: string }) {
  const label = error
    ? error
    : !online
      ? 'آفلاین — تغییرات روی گوشی ذخیره می‌شوند'
      : pending > 0
        ? `${pending.toLocaleString('fa-IR')} تغییر در انتظار همگام‌سازی`
        : 'همگام‌سازی شد'
  const color = error ? colors.danger : !online || pending > 0 ? colors.amber : colors.green

  return (
    <View style={styles.syncBanner}>
      <Text style={[styles.syncText, { color }]}>{label}</Text>
      <MaterialCommunityIcons name={online ? (pending ? 'sync' : 'check-circle-outline') : 'cloud-off-outline'} size={19} color={color} />
    </View>
  )
}

export function Field(props: ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      placeholderTextColor={colors.muted}
      selectionColor={colors.gold}
      {...props}
      style={[styles.field, props.style]}
    />
  )
}

export function PrimaryButton({ label, onPress, disabled, icon = 'plus' }: {
  label: string
  onPress: () => void
  disabled?: boolean
  icon?: IconName
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.primaryButton, disabled && styles.disabled, pressed && !disabled && styles.pressed]}
    >
      <Text style={styles.primaryButtonText}>{label}</Text>
      <MaterialCommunityIcons name={icon} size={20} color={colors.background} />
    </Pressable>
  )
}

export function ModuleRow({ title, icon, onPress, subtitle }: {
  title: string
  icon: IconName
  onPress: () => void
  subtitle?: string
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.moduleRow, pressed && styles.pressed]}
    >
      <MaterialCommunityIcons name="chevron-left" size={28} color={colors.muted} />
      <View style={styles.moduleCopy}>
        <Text style={styles.moduleTitle}>{title}</Text>
        {subtitle ? <Text style={styles.moduleSubtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.moduleIcon}>
        <MaterialCommunityIcons name={icon} size={26} color={colors.gold} />
      </View>
    </Pressable>
  )
}

const NAV_ITEMS: Array<{ screen: ScreenName; label: string; icon: IconName }> = [
  { screen: 'profile', label: 'من', icon: 'account-outline' },
  { screen: 'reports', label: 'گزارش‌ها', icon: 'chart-donut' },
  { screen: 'todos', label: 'کارها', icon: 'check-circle-outline' },
  { screen: 'home', label: 'خانه', icon: 'home-outline' },
]

export function BottomNav({ active, navigate }: { active: ScreenName; navigate: (screen: ScreenName) => void }) {
  return (
    <View style={styles.bottomNav}>
      {NAV_ITEMS.map(item => {
        const selected = active === item.screen
        return (
          <Pressable
            key={item.screen}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => navigate(item.screen)}
            style={[styles.navItem, selected && styles.navItemSelected]}
          >
            <MaterialCommunityIcons name={selected ? item.icon.replace('-outline', '') as IconName : item.icon} size={25} color={selected ? colors.gold : colors.muted} />
            <Text style={[styles.navLabel, selected && styles.navLabelSelected]}>{item.label}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}

export function EmptyState({ icon, title, text }: { icon: IconName; title: string; text: string }) {
  return (
    <View style={styles.emptyState}>
      <MaterialCommunityIcons name={icon} size={38} color={colors.gold} />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  safe: { flex: 1, backgroundColor: 'rgba(3, 9, 18, 0.22)' },
  scrollContent: { paddingBottom: 112, flexGrow: 1 },
  header: {
    minHeight: 66,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSide: { width: 48, alignItems: 'center' },
  headerTitle: { ...rtlText, color: colors.gold, fontSize: 28, fontWeight: '700' },
  syncBanner: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, paddingHorizontal: 18, paddingBottom: 14 },
  syncText: { ...rtlText, fontSize: 13, fontWeight: '600' },
  field: {
    ...rtlText,
    minHeight: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  primaryButton: {
    minHeight: 52,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: colors.gold,
    flexDirection: 'row-reverse',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: { color: colors.background, fontSize: 16, fontWeight: '800', writingDirection: 'rtl' },
  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
  moduleRow: {
    minHeight: 78,
    marginHorizontal: 18,
    marginBottom: 9,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  moduleCopy: { flex: 1, alignItems: 'flex-end' },
  moduleTitle: { ...rtlText, fontSize: 20, fontWeight: '700' },
  moduleSubtitle: { ...rtlText, color: colors.muted, fontSize: 12, marginTop: 3 },
  moduleIcon: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 82,
    paddingHorizontal: 12,
    paddingBottom: 9,
    paddingTop: 8,
    backgroundColor: 'rgba(6, 16, 31, 0.98)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: { minWidth: 66, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 3 },
  navItemSelected: { backgroundColor: 'rgba(226, 185, 102, 0.10)' },
  navLabel: { color: colors.muted, fontSize: 11, writingDirection: 'rtl' },
  navLabelSelected: { color: colors.gold, fontWeight: '700' },
  emptyState: { margin: 22, padding: 28, alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 22, backgroundColor: colors.surface },
  emptyTitle: { ...rtlText, fontSize: 18, fontWeight: '700', marginTop: 12 },
  emptyText: { ...rtlText, color: colors.muted, fontSize: 14, marginTop: 6, textAlign: 'center', lineHeight: 22 },
})
