import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, AppState, StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import NetInfo from '@react-native-community/netinfo'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BottomNav } from './src/ui/components'
import { colors } from './src/ui/theme'
import { initDatabase, pendingCount, clearLocalData } from './src/data/database'
import { flushQueue } from './src/data/sync'
import { hasToken, logout } from './src/data/api'
import type { ScreenName } from './src/types'
import { LoginScreen } from './src/screens/LoginScreen'
import { HomeScreen } from './src/screens/HomeScreen'
import { TodosScreen } from './src/screens/TodosScreen'
import {
  DeutschScreen,
  FinanceScreen,
  FindingsScreen,
  HealthScreen,
  ProfileScreen,
  ReportsScreen,
  RoutinesScreen,
  WorkScreen,
} from './src/screens/ModuleScreens'

export default function App() {
  const [ready, setReady] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [screen, setScreen] = useState<ScreenName>('home')
  const [online, setOnline] = useState(true)
  const [pending, setPending] = useState(0)
  const [syncError, setSyncError] = useState('')

  const updatePending = useCallback((count: number) => setPending(count), [])

  const synchronize = useCallback(async () => {
    if (!authenticated || !online) return
    try {
      setPending(await flushQueue())
      setSyncError('')
    } catch (error) {
      setSyncError(error instanceof Error ? error.message : 'همگام‌سازی انجام نشد.')
      setPending(await pendingCount())
    }
  }, [authenticated, online])

  useEffect(() => {
    void (async () => {
      await initDatabase()
      setPending(await pendingCount())
      setAuthenticated(await hasToken())
      setReady(true)
    })()
  }, [])

  useEffect(() => NetInfo.addEventListener(state => {
    setOnline(Boolean(state.isConnected && state.isInternetReachable !== false))
  }), [])

  useEffect(() => { void synchronize() }, [synchronize])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') void synchronize()
    })
    return () => subscription.remove()
  }, [synchronize])

  function completeLogin() {
    setAuthenticated(true)
    setScreen('home')
  }

  function confirmLogout() {
    Alert.alert('خروج از اندرون', 'توکن ورود و تمام داده‌های ذخیره‌شده روی این گوشی پاک شوند؟', [
      { text: 'انصراف', style: 'cancel' },
      {
        text: 'خروج و پاک‌کردن',
        style: 'destructive',
        onPress: () => {
          void (async () => {
            await logout()
            await clearLocalData()
            setAuthenticated(false)
            setPending(0)
            setScreen('home')
          })()
        },
      },
    ])
  }

  if (!ready) {
    return (
      <SafeAreaProvider>
        <View style={styles.loading}><ActivityIndicator color={colors.gold} size="large" /></View>
      </SafeAreaProvider>
    )
  }

  if (!authenticated) {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <LoginScreen onSuccess={completeLogin} />
      </SafeAreaProvider>
    )
  }

  const common = { online, pending, onBack: () => setScreen('home'), onPendingChange: updatePending }
  let content
  switch (screen) {
    case 'todos': content = <TodosScreen {...common} />; break
    case 'events': content = <TodosScreen {...common} mode="events" />; break
    case 'routines': content = <RoutinesScreen {...common} />; break
    case 'work': content = <WorkScreen {...common} />; break
    case 'health': content = <HealthScreen {...common} />; break
    case 'deutsch': content = <DeutschScreen {...common} />; break
    case 'findings': content = <FindingsScreen {...common} />; break
    case 'finance': content = <FinanceScreen {...common} />; break
    case 'reports': content = <ReportsScreen {...common} />; break
    case 'profile': content = <ProfileScreen {...common} onLogout={confirmLogout} />; break
    default: content = <HomeScreen navigate={setScreen} online={online} pending={pending} syncError={syncError} />
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={styles.app}>
        {content}
        <BottomNav active={screen} navigate={setScreen} />
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.background },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
})
