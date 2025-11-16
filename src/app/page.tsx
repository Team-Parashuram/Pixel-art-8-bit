"use client";

import {
  ArrowRight,
  Code,
  Copy,
  FileText,
  Gamepad2,
  Layers,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PixelBadge } from "@/components/ui/pixel/pixel-badge";
import { PixelButton } from "@/components/ui/pixel/pixel-button";
import {
  PixelCard,
  PixelCardContent,
  PixelCardDescription,
  PixelCardFooter,
  PixelCardHeader,
  PixelCardTitle,
} from "@/components/ui/pixel/pixel-card";
import { categories } from "@/lib/component-registry";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f5dc] dark:bg-[#000000]">
      {/* Hero Section */}
      <section
        className="container mx-auto px-4 py-12 sm:py-16 md:py-20 text-center"
        itemScope
        itemType="https://schema.org/SoftwareApplication"
      >
        <div className="flex justify-center mb-4 sm:mb-6">
          <PixelBadge variant="warning" className="text-xs sm:text-sm">
            New Release v1.0
          </PixelBadge>
        </div>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-wider font-[family-name:var(--font-pixel)] mb-4 sm:mb-6 leading-tight dark:text-[#ffd700] px-2"
          itemProp="name"
        >
          Pixel UI
        </h1>

        <p
          className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 max-w-3xl mx-auto dark:text-white px-4"
          itemProp="applicationCategory"
        >
          8-Bit Retro Component Library
        </p>

        <p
          className="text-sm sm:text-base mb-8 sm:mb-12 max-w-2xl mx-auto text-black/80 dark:text-white/80 px-4"
          itemProp="description"
        >
          Build nostalgic web experiences with our pixel-perfect component
          library. Inspired by classic 8-bit games and retro computing
          aesthetics.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center px-4">
          <Link href="/shop" aria-label="Browse all Pixel UI components" className="w-full sm:w-auto">
            <PixelButton size="lg" className="w-full sm:w-auto">
              Example Shop
            </PixelButton>
          </Link>
          <Link
            href="/docs/components/pixel-blur-text"
            aria-label="Get started with Pixel UI components"
            className="w-full sm:w-auto"
          >
            <PixelButton size="lg" className="w-full sm:w-auto">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </PixelButton>
          </Link>
          <Link href="#components" aria-label="Browse all component categories" className="w-full sm:w-auto">
            <PixelButton size="lg" variant="secondary" className="w-full sm:w-auto">
              Browse Components
            </PixelButton>
          </Link>
        </div>
      </section>

      {/* Featured Patterns Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12 mb-6 sm:mb-8">
        <div className="max-w-5xl mx-auto">
          <PixelCard className="border-4 border-[#ff8c00] dark:border-[#ffd700] bg-linear-to-r from-[#ffd700]/10 to-[#ff8c00]/10">
            <PixelCardHeader className="text-center pb-4">
              <div className="flex justify-center mb-3">
                <PixelBadge variant="warning" className="text-sm sm:text-base md:text-lg px-3 sm:px-4 py-1.5 sm:py-2">
                  FEATURED
                </PixelBadge>
              </div>
              <PixelCardTitle className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 px-2">
                🎮 Retro Game Pattern
              </PixelCardTitle>
              <PixelCardDescription className="text-sm sm:text-base md:text-lg px-4">
                See all 10 special components in action! A complete gaming
                platform showcasing PixelLoader, PixelTerminal, PixelGameUI,
                PixelChat, and more.
              </PixelCardDescription>
            </PixelCardHeader>
            <PixelCardFooter className="flex justify-center pt-2">
              <Link
                href="/patterns"
                aria-label="View the complete Retro Game Pattern demo"
                className="w-full sm:w-auto px-4 sm:px-0"
              >
                <PixelButton size="lg" className="group w-full sm:w-auto">
                  View Live Demo{" "}
                  <Gamepad2 className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </PixelButton>
              </Link>
            </PixelCardFooter>
          </PixelCard>
        </div>
      </section>

      {/* Resume Builder Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12 mb-6 sm:mb-8">
        <div className="max-w-5xl mx-auto">
          <PixelCard className="border-4 border-pixel-dark-primary dark:border-pixel-dark-secondary">
            <PixelCardHeader className="text-center pb-4">
              <div className="flex justify-center mb-3">
                <PixelBadge variant="warning" className="text-sm sm:text-base md:text-lg px-3 sm:px-4 py-1.5 sm:py-2">
                  NEW FEATURE
                </PixelBadge>
              </div>
              <PixelCardTitle className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 px-2">
                <FileText className="inline h-8 w-8 sm:h-10 sm:w-10 mr-2 sm:mr-3" />
                Resume to Portfolio Maker
              </PixelCardTitle>
              <PixelCardDescription className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4">
                Transform your resume PDF into a stunning pixel-perfect
                portfolio website instantly! Upload your resume and get a fully
                styled, retro-themed portfolio with all your experience, skills,
                projects, and education beautifully displayed.
              </PixelCardDescription>
            </PixelCardHeader>
            <PixelCardContent className="space-y-4 sm:space-y-6">
              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                <div className="text-center p-3 sm:p-4 bg-pixel-light-bg dark:bg-pixel-dark-bg/50 border-2 border-black dark:border-pixel-dark-primary">
                  <div className="text-2xl sm:text-3xl mb-2">📄</div>
                  <h3 className="font-bold mb-1 font-pixel text-xs sm:text-sm">
                    PDF Upload
                  </h3>
                  <p className="text-xs">
                    Upload your resume PDF and we'll extract all the data
                  </p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-pixel-light-bg dark:bg-pixel-dark-bg/50 border-2 border-black dark:border-pixel-dark-primary">
                  <div className="text-2xl sm:text-3xl mb-2">✨</div>
                  <h3 className="font-bold mb-1 font-pixel text-xs sm:text-sm">
                    Instant Generation
                  </h3>
                  <p className="text-xs">
                    Get a beautiful portfolio in seconds with pixel-perfect
                    design
                  </p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-pixel-light-bg dark:bg-pixel-dark-bg/50 border-2 border-black dark:border-pixel-dark-primary">
                  <div className="text-2xl sm:text-3xl mb-2">💾</div>
                  <h3 className="font-bold mb-1 font-pixel text-xs sm:text-sm">
                    Download Code
                  </h3>
                  <p className="text-xs">
                    Get the complete TSX code ready to use in your project
                  </p>
                </div>
              </div>

              {/* What We Extract */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white dark:bg-pixel-dark-surface border-2 border-black dark:border-pixel-dark-primary">
                <h3 className="font-bold mb-3 sm:mb-4 text-center font-pixel text-sm sm:text-base">
                  📋 What We Extract From Your Resume
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                  {[
                    "Contact Information",
                    "Skills & Technologies",
                    "Work Experience",
                    "Projects & Links",
                    "Education Details",
                    "Social Profiles",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="text-green-500">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </PixelCardContent>
            <PixelCardFooter className="flex flex-col sm:flex-row justify-center pt-4 gap-4">
              <Link
                href="/resume"
                aria-label="Try the Resume to Portfolio converter"
              >
                <PixelButton size="lg" className="group w-full sm:w-auto">
                  Create Your Portfolio{" "}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </PixelButton>
              </Link>
              <PixelBadge variant="default" className="text-xs px-4 py-2">
                🔒 Your data is secure & never stored
              </PixelBadge>
            </PixelCardFooter>
          </PixelCard>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="container mx-auto px-4 py-12 sm:py-16 md:py-20"
        aria-labelledby="features-heading"
      >
        <h2
          id="features-heading"
          className="text-2xl sm:text-3xl font-bold uppercase tracking-wider font-pixel mb-8 sm:mb-12 text-center dark:text-pixel-dark-secondary"
        >
          Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <PixelCard>
            <PixelCardHeader>
              <div className="mb-4" aria-hidden="true">
                <Gamepad2 className="h-8 w-8" />
              </div>
              <PixelCardTitle>Retro Design</PixelCardTitle>
            </PixelCardHeader>
            <PixelCardContent>
              <PixelCardDescription>
                Authentic 8-bit styling with pixel-perfect borders and no smooth
                animations
              </PixelCardDescription>
            </PixelCardContent>
          </PixelCard>

          <PixelCard>
            <PixelCardHeader>
              <div className="mb-4" aria-hidden="true">
                <Code className="h-8 w-8" />
              </div>
              <PixelCardTitle>TypeScript</PixelCardTitle>
            </PixelCardHeader>
            <PixelCardContent>
              <PixelCardDescription>
                Fully typed components with excellent IDE support and
                autocomplete
              </PixelCardDescription>
            </PixelCardContent>
          </PixelCard>

          <PixelCard>
            <PixelCardHeader>
              <div className="mb-4" aria-hidden="true">
                <Zap className="h-8 w-8" />
              </div>
              <PixelCardTitle>Instant Actions</PixelCardTitle>
            </PixelCardHeader>
            <PixelCardContent>
              <PixelCardDescription>
                Zero transition delays for authentic retro feel with instant
                state changes
              </PixelCardDescription>
            </PixelCardContent>
          </PixelCard>

          <PixelCard>
            <PixelCardHeader>
              <div className="mb-4" aria-hidden="true">
                <Sparkles className="h-8 w-8" />
              </div>
              <PixelCardTitle>Accessible</PixelCardTitle>
            </PixelCardHeader>
            <PixelCardContent>
              <PixelCardDescription>
                Built on Radix UI primitives with proper ARIA attributes and
                keyboard support
              </PixelCardDescription>
            </PixelCardContent>
          </PixelCard>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="container mx-auto px-4 py-12 sm:py-16 md:py-20"
        aria-labelledby="stats-heading"
      >
        <h2 id="stats-heading" className="sr-only">
          Library Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <PixelCard>
            <PixelCardHeader className="text-center">
              <div className="flex justify-center mb-2" aria-hidden="true">
                <Layers className="h-12 w-12" />
              </div>
              <PixelCardTitle className="text-4xl">100+</PixelCardTitle>
              <PixelCardDescription>Components</PixelCardDescription>
            </PixelCardHeader>
          </PixelCard>

          <PixelCard>
            <PixelCardHeader className="text-center">
              <div className="flex justify-center mb-2" aria-hidden="true">
                <Palette className="h-12 w-12" />
              </div>
              <PixelCardTitle className="text-4xl">8</PixelCardTitle>
              <PixelCardDescription>Categories</PixelCardDescription>
            </PixelCardHeader>
          </PixelCard>

          <PixelCard>
            <PixelCardHeader className="text-center">
              <div className="flex justify-center mb-2" aria-hidden="true">
                <Copy className="h-12 w-12" />
              </div>
              <PixelCardTitle className="text-4xl">100%</PixelCardTitle>
              <PixelCardDescription>Copy-Paste Ready</PixelCardDescription>
            </PixelCardHeader>
          </PixelCard>
        </div>
      </section>

      {/* Components Section */}
      <section
        id="components"
        className="container mx-auto px-4 py-12 sm:py-16 md:py-20"
        aria-labelledby="components-heading"
      >
        <h2
          id="components-heading"
          className="text-2xl sm:text-3xl font-bold uppercase tracking-wider font-pixel mb-8 sm:mb-12 text-center dark:text-pixel-dark-secondary"
        >
          Component Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/docs/components?category=${category.toLowerCase()}`}
              aria-label={`Browse ${category} components`}
            >
              <PixelCard className="hover:scale-105 transition-transform duration-0 cursor-pointer">
                <PixelCardHeader>
                  <PixelCardTitle className="text-xl">
                    {category}
                  </PixelCardTitle>
                  <PixelCardDescription>
                    {category === "Forms" && "Input, Button, Select, and more"}
                    {category === "Animations" &&
                      "Gradient, Glitch Text, Shuffle, and more"}
                    {category === "Display" &&
                      "Card, Badge, Table, Avatar and more"}
                    {category === "Feedback" &&
                      "Alert, Toast, Progress and more"}
                    {category === "Navigation" &&
                      "Tabs, Breadcrumb, Menu and more"}
                    {category === "Overlays" &&
                      "Dialog, Popover, Tooltip and more"}
                    {category === "Layout" &&
                      "Hero Section, Bento Grid and more"}
                    {category === "Special" &&
                      "Game UI, Retro Window, Terminal UI and more"}
                  </PixelCardDescription>
                </PixelCardHeader>
                <PixelCardFooter>
                  <PixelButton className="w-full" size="sm">
                    Browse {category}{" "}
                    <ArrowRight className="ml-2 h-3 w-3" aria-hidden="true" />
                  </PixelButton>
                </PixelCardFooter>
              </PixelCard>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="container mx-auto px-4 py-12 sm:py-16 md:py-20 text-center"
        aria-labelledby="cta-heading"
      >
        <PixelCard className="max-w-3xl mx-auto">
          <PixelCardHeader>
            <PixelCardTitle id="cta-heading" className="text-xl sm:text-2xl px-2">
              Ready to Get Started?
            </PixelCardTitle>
            <PixelCardDescription className="text-sm sm:text-base px-4">
              Start building retro web experiences with Pixel UI today
            </PixelCardDescription>
          </PixelCardHeader>
          <PixelCardContent>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center px-4">
              <Link
                href="/docs/components/pixel-button"
                aria-label="Browse all Pixel UI components"
                className="w-full sm:w-auto"
              >
                <PixelButton size="lg" className="w-full sm:w-auto">
                  Browse Components
                </PixelButton>
              </Link>
              <Link href="/shop" aria-label="Browse all Pixel UI components" className="w-full sm:w-auto">
                <PixelButton size="lg" className="w-full sm:w-auto">
                  Example Shop
                </PixelButton>
              </Link>
              <a
                href="https://github.com/Team-Parashuram/Pixel-art-8-bit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Pixel UI source code on GitHub"
                className="w-full sm:w-auto"
              >
                <PixelButton size="lg" variant="ghost" className="w-full sm:w-auto">
                  View on GitHub
                </PixelButton>
              </a>
            </div>
          </PixelCardContent>
        </PixelCard>
      </section>
    </div>
  );
}
