import { ImageResponse } from 'next/og'

export const alt = 'RadYar - Learn Radiology'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          color: '#f0ece8',
          background: 'linear-gradient(145deg, #060b18 0%, #0b1730 52%, #07101e 100%)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 620,
            height: 620,
            top: -270,
            left: -160,
            borderRadius: 999,
            background: 'radial-gradient(circle, rgba(78, 70, 160, 0.48) 0%, rgba(8, 14, 28, 0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 540,
            height: 540,
            right: -150,
            bottom: -260,
            borderRadius: 999,
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, rgba(8, 14, 28, 0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.22,
            backgroundImage:
              'linear-gradient(rgba(147, 197, 253, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 197, 253, 0.12) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '76px 88px',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 52 }}>
            <div
              style={{
                width: 92,
                height: 92,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid rgba(255, 255, 255, 0.72)',
                borderRadius: 999,
                marginRight: 25,
                fontSize: 43,
                fontWeight: 900,
                background: 'linear-gradient(145deg, #102a44, #020617)',
                boxShadow: '0 0 34px rgba(249, 115, 22, 0.22)',
              }}
            >
              <span>R</span>
              <span style={{ color: '#f97316' }}>Y</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 72, fontWeight: 900, letterSpacing: -4 }}>
                <span>RAD</span>
                <span style={{ color: '#f97316' }}>YAR</span>
              </div>
              <div style={{ color: '#fb923c', fontSize: 17, fontWeight: 700, letterSpacing: 6 }}>
                RADIOLOGY EDUCATION
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', width: 72, height: 7, borderRadius: 9, background: '#f97316' }} />
          <div style={{ display: 'flex', marginTop: 25, fontSize: 42, fontWeight: 700, lineHeight: 1.18 }}>
            Learn radiology, step by step.
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 17,
              color: 'rgba(226, 232, 240, 0.72)',
              fontSize: 24,
              lineHeight: 1.45,
            }}
          >
            Structured knowledge, clinical cases, and exam preparation.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
