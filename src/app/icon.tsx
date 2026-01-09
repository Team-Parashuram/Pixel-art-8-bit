import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Pixel UI - 8-Bit Retro Component Library";
export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
        border: "8px solid #ff8c00",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Pixel Grid */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <div
              style={{
                width: 64,
                height: 64,
                background: "#ff8c00",
                border: "4px solid #000",
              }}
            />
            <div
              style={{
                width: 64,
                height: 64,
                background: "#ffd700",
                border: "4px solid #000",
              }}
            />
            <div
              style={{
                width: 64,
                height: 64,
                background: "#ff6b35",
                border: "4px solid #000",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <div
              style={{
                width: 64,
                height: 64,
                background: "#ffd700",
                border: "4px solid #000",
              }}
            />
            <div
              style={{
                width: 64,
                height: 64,
                background: "#ff8c00",
                border: "4px solid #000",
              }}
            />
            <div
              style={{
                width: 64,
                height: 64,
                background: "#ffd700",
                border: "4px solid #000",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <div
              style={{
                width: 64,
                height: 64,
                background: "#ff6b35",
                border: "4px solid #000",
              }}
            />
            <div
              style={{
                width: 64,
                height: 64,
                background: "#ffd700",
                border: "4px solid #000",
              }}
            />
            <div
              style={{
                width: 64,
                height: 64,
                background: "#ff8c00",
                border: "4px solid #000",
              }}
            />
          </div>
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: "#ff8c00",
            textShadow: "3px 3px 0px #000",
            letterSpacing: "4px",
          }}
        >
          PUI
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
