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

export default async function LearningAccessGate({ children, checkLessonStatus = true, showContentBehind = false }) {
  const requestHeaders = await headers()
  const pathname = requestHeaders.get('x-radyar-pathname') || ''
  const lessonStatus = checkLessonStatus ? getLessonStatus(pathname) : 'complete'

  if (lessonStatus === 'public') return children

  const user = await currentUser()
  if (!user) {
    return (
      <LearningAccessPanel kind="sign_in" pathname={pathname} showContentBehind={showContentBehind}>
        {showContentBehind ? children : null}
      </LearningAccessPanel>
    )
  }

  const proAccess = getProAccess(user)
  const access = getLearningAccess(user)
  if (!proAccess.active) {
    return (
      <LearningAccessPanel
        kind="pro"
        pathname={pathname}
        requestKind={getProRequestKind(user)}
        requestStatus={access.proRequest?.status || null}
        showContentBehind={showContentBehind}
      >
        {showContentBehind ? children : null}
      </LearningAccessPanel>
    )
  }

  if (checkLessonStatus && lessonStatus === 'in_progress' && !hasEarlyAccess(user, pathname)) {
    return (
      <LearningAccessPanel
        kind="early_access"
        pathname={pathname}
        requestStatus={access.earlyAccessRequests[pathname]?.status || null}
        showContentBehind={showContentBehind}
      >
        {showContentBehind ? children : null}
      </LearningAccessPanel>
    )
  }

  return children
}
