import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #FF4500 0%, #FF6B35 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20%',
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: 'white',
            fontWeight: 900,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-1px',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          R
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
