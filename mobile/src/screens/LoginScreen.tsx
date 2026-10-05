import { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AppBackground, Field, PrimaryButton } from '../ui/components'
import { colors, rtlText } from '../ui/theme'
import { login, MAMAN_USERNAME } from '../data/api'

export function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submit() {
    if (!username.trim() || submitting) return
    setSubmitting(true)
    setError('')
    try {
      await login(username)
      setUsername('')
      onSuccess()
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'ورود ناموفق بود.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AppBackground>
      <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.brandMark}>
          <MaterialCommunityIcons name="star-four-points-outline" size={30} color={colors.gold} />
        </View>
        <Text style={styles.title}>اندرون</Text>
        <Text style={styles.subtitle}>برنامهٔ شخصی داروهای Maman</Text>

        <View style={styles.panel}>
          <Text style={styles.label}>نام کاربری</Text>
          <Field
            accessibilityLabel="نام کاربری"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setUsername}
            onSubmitEditing={submit}
            placeholder={MAMAN_USERNAME}
            value={username}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <PrimaryButton label={submitting ? 'در حال ورود…' : 'ورود'} onPress={submit} disabled={!username.trim() || submitting} icon="account-check-outline" />
        </View>

        <Text style={styles.note}>فقط بار اول Maman را وارد کن؛ ورود روی همین گوشی ذخیره می‌شود.</Text>
      </KeyboardAvoidingView>
    </AppBackground>
  )
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingBottom: 42 },
  brandMark: { alignSelf: 'center', width: 66, height: 66, borderRadius: 33, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  title: { ...rtlText, textAlign: 'center', color: colors.gold, fontSize: 52, fontWeight: '800', marginTop: 18 },
  subtitle: { ...rtlText, textAlign: 'center', color: colors.muted, fontSize: 15, marginTop: 4 },
  panel: { marginTop: 36, padding: 18, borderRadius: 24, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, gap: 14 },
  label: { ...rtlText, color: colors.muted, fontSize: 13, fontWeight: '700' },
  error: { ...rtlText, color: colors.danger, fontSize: 13 },
  note: { ...rtlText, color: colors.muted, textAlign: 'center', fontSize: 12, lineHeight: 20, marginTop: 20 },
})
