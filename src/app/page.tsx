"use client";

import Link from "next/link";
import { categories } from "@/lib/component-registry";
import { PixelBadge } from "@/components/ui/pixel/pixel-badge";
import { PixelButton } from "@/components/ui/pixel/pixel-button";
import { ModeToggle } from "@/components/theme/theme-button";
import { ArrowRight, Gamepad2, Sparkles, Code, Zap, Copy, Palette, Layers } from "lucide-react";
import { PixelCard, PixelCardContent, PixelCardDescription, PixelCardFooter, PixelCardHeader, PixelCardTitle } from "@/components/ui/pixel/pixel-card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f5dc] dark:bg-[#000000]">
                <ModeToggle />
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <PixelBadge variant="warning">New Release v1.0</PixelBadge>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wider font-[family-name:var(--font-pixel)] mb-6 leading-tight dark:text-[#ffd700]">
          Pixel UI
        </h1>
        
        <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto dark:text-white">
          8-Bit Retro Component Library
        </p>
        
        <p className="text-base mb-12 max-w-2xl mx-auto text-black/80 dark:text-white/80">
          Build nostalgic web experiences with our pixel-perfect component library. 
          Inspired by classic 8-bit games and retro computing aesthetics.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/docs/components/pixel-button">
            <PixelButton size="lg">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </PixelButton>
          </Link>
          <Link href="#components">
            <PixelButton size="lg" variant="secondary">
              Browse Components
            </PixelButton>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold uppercase tracking-wider font-[family-name:var(--font-pixel)] mb-12 text-center dark:text-[#ffd700]">
          Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PixelCard>
            <PixelCardHeader>
              <div className="mb-4">
                <Gamepad2 className="h-8 w-8" />
              </div>
              <PixelCardTitle>Retro Design</PixelCardTitle>
            </PixelCardHeader>
            <PixelCardContent>
              <PixelCardDescription>
                Authentic 8-bit styling with pixel-perfect borders and no smooth animations
              </PixelCardDescription>
            </PixelCardContent>
          </PixelCard>

          <PixelCard>
            <PixelCardHeader>
              <div className="mb-4">
                <Code className="h-8 w-8" />
              </div>
              <PixelCardTitle>TypeScript</PixelCardTitle>
            </PixelCardHeader>
            <PixelCardContent>
              <PixelCardDescription>
                Fully typed components with excellent IDE support and autocomplete
              </PixelCardDescription>
            </PixelCardContent>
          </PixelCard>

          <PixelCard>
            <PixelCardHeader>
              <div className="mb-4">
                <Zap className="h-8 w-8" />
              </div>
              <PixelCardTitle>Instant Actions</PixelCardTitle>
            </PixelCardHeader>
            <PixelCardContent>
              <PixelCardDescription>
                Zero transition delays for authentic retro feel with instant state changes
              </PixelCardDescription>
            </PixelCardContent>
          </PixelCard>

          <PixelCard>
            <PixelCardHeader>
              <div className="mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <PixelCardTitle>Accessible</PixelCardTitle>
            </PixelCardHeader>
            <PixelCardContent>
              <PixelCardDescription>
                Built on Radix UI primitives with proper ARIA attributes and keyboard support
              </PixelCardDescription>
            </PixelCardContent>
          </PixelCard>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <PixelCard>
            <PixelCardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Layers className="h-12 w-12" />
              </div>
              <PixelCardTitle className="text-4xl">50+</PixelCardTitle>
              <PixelCardDescription>Components</PixelCardDescription>
            </PixelCardHeader>
          </PixelCard>
          
          <PixelCard>
            <PixelCardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Palette className="h-12 w-12" />
              </div>
              <PixelCardTitle className="text-4xl">6</PixelCardTitle>
              <PixelCardDescription>Categories</PixelCardDescription>
            </PixelCardHeader>
          </PixelCard>
          
          <PixelCard>
            <PixelCardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Copy className="h-12 w-12" />
              </div>
              <PixelCardTitle className="text-4xl">100%</PixelCardTitle>
              <PixelCardDescription>Copy-Paste Ready</PixelCardDescription>
            </PixelCardHeader>
          </PixelCard>
        </div>
      </section>

      <section id="components" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold uppercase tracking-wider font-[family-name:var(--font-pixel)] mb-12 text-center dark:text-[#ffd700]">
          Component Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Link key={category} href={`/docs/components?category=${category.toLowerCase()}`}>
              <PixelCard className="hover:scale-105 transition-transform duration-0 cursor-pointer">
                <PixelCardHeader>
                  <PixelCardTitle className="text-xl">{category}</PixelCardTitle>
                  <PixelCardDescription>
                    {category === "Forms" && "Input, Button, Select, and more"}
                    {category === "Display" && "Card, Badge, Table, Avatar"}
                    {category === "Feedback" && "Alert, Toast, Progress"}
                    {category === "Navigation" && "Tabs, Breadcrumb, Menu"}
                    {category === "Overlays" && "Dialog, Popover, Tooltip"}
                    {category === "Layout" && "Accordion, Separator, Grid"}
                  </PixelCardDescription>
                </PixelCardHeader>
                <PixelCardFooter>
                  <PixelButton className="w-full" size="sm">
                    Browse {category} <ArrowRight className="ml-2 h-3 w-3" />
                  </PixelButton>
                </PixelCardFooter>
              </PixelCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 text-center">
        <PixelCard className="max-w-3xl mx-auto">
          <PixelCardHeader>
            <PixelCardTitle className="text-2xl">Ready to Get Started?</PixelCardTitle>
            <PixelCardDescription className="text-base">
              Start building retro web experiences with Pixel UI today
            </PixelCardDescription>
          </PixelCardHeader>
          <PixelCardContent>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/docs/components/pixel-button">
                <PixelButton size="lg">
                  Browse Components
                </PixelButton>
              </Link>
              <PixelButton size="lg" variant="ghost">
                View on GitHub
              </PixelButton>
            </div>
          </PixelCardContent>
        </PixelCard>
      </section>
    </div>
  );
}
