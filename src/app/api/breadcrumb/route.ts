export async function GET() {
  const websiteUrl = "https://pixel-art-8-bit.mishrashardendu22.is-a.dev";

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: websiteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Components",
        item: `${websiteUrl}/docs/components`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Examples",
        item: `${websiteUrl}/examples`,
      },
    ],
  };

  return Response.json(breadcrumbList);
}
