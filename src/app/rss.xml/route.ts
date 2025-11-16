export async function GET() {
  const baseUrl = "https://pixel-art-8-bit.mishrashardendu22.is-a.dev";

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pixel UI - 8-Bit Retro Component Library</title>
    <link>${baseUrl}</link>
    <description>Build nostalgic web experiences with Pixel UI - A complete 8-bit retro component library for React and Next.js</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    
    <item>
      <title>Pixel UI v1.0 Released - 50+ Retro Components</title>
      <link>${baseUrl}</link>
      <description>Introducing Pixel UI - A complete 8-bit retro component library with 50+ pixel-perfect, accessible components for React and Next.js</description>
      <pubDate>${new Date("2025-01-01").toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}</guid>
    </item>
    
    <item>
      <title>Component Library - Forms, Display, Navigation & More</title>
      <link>${baseUrl}/docs/components</link>
      <description>Explore our comprehensive collection of 8-bit styled components including forms, display elements, navigation, and overlays</description>
      <pubDate>${new Date("2025-01-01").toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/docs/components</guid>
    </item>
    
    <item>
      <title>Retro Animations - 8-Bit Style Effects</title>
      <link>${baseUrl}/animations</link>
      <description>Discover authentic 8-bit animations and effects for creating nostalgic gaming experiences</description>
      <pubDate>${new Date("2025-01-01").toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/animations</guid>
    </item>
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
