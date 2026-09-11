// Shared artwork only; the existing wordmarks and their typography stay separate.
export default function RadYarIcon({ size = 32 }) {
  return (
    <img
      src="/radyar/radyar-galaxy-icon-192.png"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      decoding="async"
      style={{ display: 'block', flexShrink: 0, borderRadius: '22%' }}
    />
  )
}
