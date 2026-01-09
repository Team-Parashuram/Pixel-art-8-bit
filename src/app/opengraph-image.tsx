import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Pixel UI - 8-Bit Retro Component Library for React & Next.js";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        border: "12px solid #ff8c00",
      }}
    >
      {/* Pixel Grid Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(255,140,0,0.1) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255,140,0,0.1) 2px, transparent 2px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          padding: "40px",
        }}
      >
        {/* Pixel Art Style Title */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: 20,
          }}
        >
          {/* Decorative Pixel Squares */}
          <div
            style={{
              width: 40,
              height: 40,
              background: "#ff8c00",
              border: "4px solid #000",
            }}
          />
          <div
            style={{
              width: 40,
              height: 40,
              background: "#ff6b35",
              border: "4px solid #000",
            }}
          />
          <div
            style={{
              width: 40,
              height: 40,
              background: "#f7c873",
              border: "4px solid #000",
            }}
          />
        </div>

        <div
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: "#ff8c00",
            textShadow: "4px 4px 0px #000, 8px 8px 0px rgba(255,140,0,0.3)",
            marginBottom: 16,
            letterSpacing: "4px",
          }}
        >
          PIXEL UI
        </div>

        <div
          style={{
            fontSize: 36,
            color: "#f5f5dc",
            textAlign: "center",
            maxWidth: "80%",
            marginBottom: 20,
            textShadow: "2px 2px 0px #000",
          }}
        >
          8-Bit Retro Component Library
        </div>

        <div
          style={{
            fontSize: 28,
            color: "#ffd700",
            marginTop: 12,
            textAlign: "center",
            textShadow: "2px 2px 0px #000",
          }}
        >
          50+ Pixel-Perfect Components • React • Next.js • TypeScript
        </div>

        <div
          style={{
            fontSize: 22,
            color: "#9ca3af",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          Free • Open Source • Accessible
        </div>

        {/* Bottom Pixel Decoration */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: 32,
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 24,
                height: 24,
                background: i % 2 === 0 ? "#ff8c00" : "#ffd700",
                border: "2px solid #000",
              }}
            />
          ))}
        </div>
      </div>

      {/* Corner Decorations */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          width: 48,
          height: 48,
          background: "#ff8c00",
          border: "4px solid #000",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          width: 48,
          height: 48,
          background: "#ff8c00",
          border: "4px solid #000",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          width: 48,
          height: 48,
          background: "#ff8c00",
          border: "4px solid #000",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          width: 48,
          height: 48,
          background: "#ff8c00",
          border: "4px solid #000",
        }}
      />
    </div>,
    {
      ...size,
    }
  );
}
