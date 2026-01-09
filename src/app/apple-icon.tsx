import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ff8c00 0%, #ff6b35 100%)",
        borderRadius: "22%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {/* 3x3 Pixel Grid */}
        <div style={{ display: "flex", gap: "4px" }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "#fff",
              border: "2px solid #000",
            }}
          />
          <div
            style={{
              width: 32,
              height: 32,
              background: "#ffd700",
              border: "2px solid #000",
            }}
          />
          <div
            style={{
              width: 32,
              height: 32,
              background: "#fff",
              border: "2px solid #000",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "#ffd700",
              border: "2px solid #000",
            }}
          />
          <div
            style={{
              width: 32,
              height: 32,
              background: "#fff",
              border: "2px solid #000",
            }}
          />
          <div
            style={{
              width: 32,
              height: 32,
              background: "#ffd700",
              border: "2px solid #000",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "#fff",
              border: "2px solid #000",
            }}
          />
          <div
            style={{
              width: 32,
              height: 32,
              background: "#ffd700",
              border: "2px solid #000",
            }}
          />
          <div
            style={{
              width: 32,
              height: 32,
              background: "#fff",
              border: "2px solid #000",
            }}
          />
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
