import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

export const alt = 'RadYar - Learn Radiology'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const bodyAnatomyBuffer = await readFile(
    path.join(process.cwd(), 'public', 'body-anatomy.png'),
  )
  const bodyAnatomy = bodyAnatomyBuffer.buffer.slice(
    bodyAnatomyBuffer.byteOffset,
    bodyAnatomyBuffer.byteOffset + bodyAnatomyBuffer.byteLength,
  )

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
            width: 750,
            padding: '72px 0 72px 78px',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 44 }}>
            <div
              style={{
                width: 82,
                height: 82,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid rgba(255, 255, 255, 0.72)',
                borderRadius: 999,
                marginRight: 25,
                fontSize: 38,
                fontWeight: 900,
                background: 'linear-gradient(145deg, #102a44, #020617)',
                boxShadow: '0 0 34px rgba(249, 115, 22, 0.22)',
              }}
            >
              <span>R</span>
              <span style={{ color: '#f97316' }}>Y</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 65, fontWeight: 900, letterSpacing: -4 }}>
                <span>RAD</span>
                <span style={{ color: '#f97316' }}>YAR</span>
              </div>
              <div style={{ color: '#fb923c', fontSize: 17, fontWeight: 700, letterSpacing: 6 }}>
                RADIOLOGY EDUCATION
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', width: 72, height: 7, borderRadius: 9, background: '#f97316' }} />
          <div style={{ display: 'flex', marginTop: 25, fontSize: 39, fontWeight: 700, lineHeight: 1.18 }}>
            Learn radiology, step by step.
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 17,
              color: 'rgba(226, 232, 240, 0.72)',
              fontSize: 22,
              lineHeight: 1.45,
              maxWidth: 620,
            }}
          >
            Structured knowledge, clinical cases, and exam preparation.
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            right: 12,
            bottom: -70,
            width: 455,
            height: 700,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bodyAnatomy}
            alt=""
            width="400"
            height="700"
            style={{
              width: 400,
              height: 700,
              objectFit: 'contain',
              objectPosition: 'center top',
              filter: 'drop-shadow(0 0 24px rgba(59, 130, 246, 0.35))',
            }}
          />
        </div>
      </div>
    ),
    size,
  )
}
