export default function AllocationRing({ groups, children, className }) {
  let offset = 0
  return <div className={className}>
    <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      {groups.map(group => {
        const start = offset
        offset += group.share * 100
        const gap = groups.length === 1 ? 0 : Math.min(0.7, group.share * 30)
        return <circle key={group.key} cx="100" cy="100" r="81" fill="none"
          pathLength="100" stroke={group.color} strokeWidth="30"
          strokeDasharray={(group.share * 100 - gap) + ' 100'} strokeDashoffset={-start}
          transform="rotate(-90 100 100)" />
      })}
    </svg>
    {children}
  </div>
}
