// A draft edited while GET is in flight must never be replaced by that GET.
export function choosePortfolioVersion(remote, local, current, localVersion, currentRevision) {
  const changedDuringLoad=localVersion>0
  const modified=!!(changedDuringLoad||(local&&(local.dirty||local.localOnly||!remote.cloud)))
  return {
    state:changedDuringLoad?current:modified?local.state:remote.state,
    revision:changedDuringLoad?currentRevision:modified?local.baseRevision??null:remote.revision,
    modified,
    conflict:!!(modified&&remote.cloud&&(changedDuringLoad?currentRevision:local.baseRevision??null)!==remote.revision),
  }
}
