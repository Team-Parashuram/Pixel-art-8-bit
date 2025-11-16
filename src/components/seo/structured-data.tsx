export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://pixel-art-8-bit.mishrashardendu22.is-a.dev/#website",
        url: "https://pixel-art-8-bit.mishrashardendu22.is-a.dev/",
        name: "Pixel UI - 8-Bit Retro Component Library",
        description:
          "Build nostalgic web experiences with Pixel UI - A complete 8-bit retro component library for React and Next.js. 50+ pixel-perfect components with TypeScript, Tailwind CSS, and Radix UI.",
        publisher: {
          "@id":
            "https://pixel-art-8-bit.mishrashardendu22.is-a.dev/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://pixel-art-8-bit.mishrashardendu22.is-a.dev/docs/components?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id":
          "https://pixel-art-8-bit.mishrashardendu22.is-a.dev/#organization",
        name: "Team Parashuram",
        url: "https://pixel-art-8-bit.mishrashardendu22.is-a.dev/",
        logo: {
          "@type": "ImageObject",
          url: "https://pixel-art-8-bit.mishrashardendu22.is-a.dev/logo.png",
          width: 512,
          height: 512,
        },
        founder: {
          "@type": "Person",
          name: "Shardendu Mishra",
          url: "https://mishrashardendu22.is-a.dev/",
          sameAs: [
            "https://github.com/MishraShardendu22/",
            "https://www.linkedin.com/in/shardendumishra22/",
            "https://x.com/Shardendu_M",
          ],
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Developer Support",
          url: "https://github.com/Team-Parashuram/Pixel-art-8-bit/issues",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "Pixel UI",
        applicationCategory: "DeveloperApplication",
        applicationSubCategory: "UI Component Library",
        description:
          "8-Bit Retro Component Library for React and Next.js with 50+ pixel-perfect, accessible components",
        operatingSystem: "Web Browser",
        url: "https://pixel-art-8-bit.mishrashardendu22.is-a.dev/",
        screenshot:
          "https://pixel-art-8-bit.mishrashardendu22.is-a.dev/og-image.png",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Person",
          name: "Shardendu Mishra",
          url: "https://mishrashardendu22.is-a.dev/",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          ratingCount: "1",
        },
        softwareVersion: "1.0",
        datePublished: "2024-01-01",
        dateModified: "2025-11-14",
        keywords:
          "pixel art, 8-bit, retro UI, React components, Next.js, TypeScript, Tailwind CSS",
      },
      {
        "@type": "SoftwareSourceCode",
        name: "Pixel UI",
        description:
          "8-Bit Retro Component Library for React and Next.js - Open Source",
        codeRepository: "https://github.com/Team-Parashuram/Pixel-art-8-bit",
        programmingLanguage: ["TypeScript", "JavaScript", "React", "CSS"],
        runtimePlatform: "Web Browser",
        targetProduct: {
          "@type": "SoftwareApplication",
          name: "React",
          applicationCategory: "DeveloperApplication",
        },
        license:
          "https://github.com/Team-Parashuram/Pixel-art-8-bit/blob/main/LICENSE",
        codeSampleType: "full solution",
        author: {
          "@type": "Person",
          name: "Shardendu Mishra",
          url: "https://mishrashardendu22.is-a.dev/",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://pixel-art-8-bit.mishrashardendu22.is-a.dev/#webpage",
        url: "https://pixel-art-8-bit.mishrashardendu22.is-a.dev/",
        name: "Pixel UI - 8-Bit Retro Component Library for React & Next.js",
        isPartOf: {
          "@id": "https://pixel-art-8-bit.mishrashardendu22.is-a.dev/#website",
        },
        about: {
          "@type": "Thing",
          name: "UI Component Library",
          description: "Pixel-perfect 8-bit retro design system",
        },
        description:
          "Build nostalgic web experiences with pixel-perfect components inspired by classic 8-bit games. Free, open-source, and fully accessible.",
        inLanguage: "en-US",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://pixel-art-8-bit.mishrashardendu22.is-a.dev/og-image.png",
        },
      },
      {
        "@type": "ItemList",
        name: "Component Categories",
        description: "Categories of components available in Pixel UI",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Forms",
            description:
              "Pixel-perfect form components including buttons, inputs, and selects",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Display",
            description: "Display components like cards, badges, and tables",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Navigation",
            description:
              "Navigation components including tabs, menus, and breadcrumbs",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Feedback",
            description:
              "User feedback components like alerts, toasts, and progress bars",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Overlays",
            description: "Modal dialogs, popovers, and tooltips",
          },
          {
            "@type": "ListItem",
            position: 6,
            name: "Animations",
            description: "8-bit style animations and transitions",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Pixel UI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pixel UI is a free, open-source 8-bit retro component library for React and Next.js with 50+ pixel-perfect components built with TypeScript, Tailwind CSS, and Radix UI.",
            },
          },
          {
            "@type": "Question",
            name: "Is Pixel UI free to use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, Pixel UI is completely free and open-source. You can use it in personal and commercial projects.",
            },
          },
          {
            "@type": "Question",
            name: "What technologies does Pixel UI use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pixel UI is built with TypeScript, React, Next.js, Tailwind CSS, and Radix UI primitives for accessibility.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
