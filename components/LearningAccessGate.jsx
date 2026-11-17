import { currentUser } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { getLessonStatus } from '@/data/lessonStatus'
import {
  getLearningAccess,
  getProAccess,
  getProRequestKind,
  hasEarlyAccess,
} from '@/utils/subscription'
import LearningAccessPanel from './LearningAccessPanel'
import LessonPublicPreview from './LessonPublicPreview'
import { getLessonPreview } from '@/lib/lessonPreviews'

export default async function LearningAccessGate({ children, checkLessonStatus = true, showContentBehind = false }) {
  const requestHeaders = await headers()
  const pathname = requestHeaders.get('x-radyar-pathname') || ''
  const lessonStatus = checkLessonStatus ? getLessonStatus(pathname) : 'complete'

  if (lessonStatus === 'public') return children

  const preview = checkLessonStatus && getLessonPreview(pathname)
  function locked(props) {
    const panel = <LearningAccessPanel {...props} pathname={pathname} embedded={!!preview} showContentBehind={showContentBehind}>
      {showContentBehind ? children : null}
    </LearningAccessPanel>
    return preview ? <LessonPublicPreview preview={preview}>{panel}</LessonPublicPreview> : panel
  }

  const user = await currentUser()
  if (!user) return locked({ kind: 'sign_in' })

  const proAccess = getProAccess(user)
  const access = getLearningAccess(user)
  if (!proAccess.active) {
    return locked({ kind: 'pro', requestKind: getProRequestKind(user), requestStatus: access.proRequest?.status || null })
  }

  if (checkLessonStatus && lessonStatus === 'in_progress' && !hasEarlyAccess(user, pathname)) {
    return locked({ kind: 'early_access', requestStatus: access.earlyAccessRequests[pathname]?.status || null })
  }

  return children
}
