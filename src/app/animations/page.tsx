"use client";

import { Award, Home, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
// Import all animation components
import { PixelBlurText } from "@/components/ui/pixel/animations/pixel-blur-text";
import { PixelCircularText } from "@/components/ui/pixel/animations/pixel-circular-text";
import { PixelCountUp } from "@/components/ui/pixel/animations/pixel-count-up";
import { PixelGlareCard } from "@/components/ui/pixel/animations/pixel-glare-card";
import { PixelGlitchText } from "@/components/ui/pixel/animations/pixel-glitch-text";
import { PixelGradientText } from "@/components/ui/pixel/animations/pixel-gradient-text";
import { PixelShinyText } from "@/components/ui/pixel/animations/pixel-shiny-text";
import { PixelSpotlightCard } from "@/components/ui/pixel/animations/pixel-spotlight-card";
import { PixelBadge } from "@/components/ui/pixel/pixel-badge";
import { PixelButton } from "@/components/ui/pixel/pixel-button";
import {
  PixelCard,
  PixelCardContent,
  PixelCardDescription,
  PixelCardHeader,
  PixelCardTitle,
} from "@/components/ui/pixel/pixel-card";
import { PixelSeparator } from "@/components/ui/pixel/pixel-separator";
import {
  PixelTabs,
  PixelTabsContent,
  PixelTabsList,
  PixelTabsTrigger,
} from "@/components/ui/pixel/pixel-tabs";

export default function AnimationsShowcase() {
  return (
    <div className="min-h-screen bg-[#f5f5dc] dark:bg-[#000000] p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold uppercase tracking-wider font-[family-name:var(--font-pixel)] dark:text-[#ffd700] mb-2">
                Animations
              </h1>
              <p className="text-lg dark:text-white/80">
                Retro-style pixel animation components
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/docs/components">
                <PixelButton variant="secondary">📖 Documentation</PixelButton>
              </Link>
              <Link href="/">
                <PixelButton>
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </PixelButton>
              </Link>
            </div>
          </div>
          <div className="flex gap-2">
            <PixelBadge variant="default">
              <Sparkles className="mr-1 h-3 w-3" />
              New
            </PixelBadge>
            <PixelBadge variant="success">10 Components</PixelBadge>
          </div>
        </header>

        <PixelTabs defaultValue="text" className="w-full">
          <PixelTabsList className="mb-8">
            <PixelTabsTrigger value="text">Text Effects</PixelTabsTrigger>
            <PixelTabsTrigger value="cards">Card Effects</PixelTabsTrigger>
            <PixelTabsTrigger value="counters">Counters</PixelTabsTrigger>
          </PixelTabsList>

          {/* Text Effects Tab */}
          <PixelTabsContent value="text" className="space-y-8">
            {/* Blur Text */}
            <section>
              <PixelCard>
                <PixelCardHeader>
                  <PixelCardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Blur Text
                  </PixelCardTitle>
                  <PixelCardDescription>
                    Animated text that fades in from blur on scroll or hover
                  </PixelCardDescription>
                </PixelCardHeader>
                <PixelCardContent className="space-y-6">
                  <div className="p-8 bg-black/5 dark:bg-white/5 rounded pixel-borders">
                    <PixelBlurText
                      text="Pixel Perfect!"
                      variant="primary"
                      size="lg"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-black/5 dark:bg-white/5 rounded pixel-borders">
                      <p className="text-xs mb-2 dark:text-white/60">
                        Hover Triggered
                      </p>
                      <PixelBlurText
                        text="Hover Me"
                        variant="secondary"
                        size="md"
                        animateOnHover={true}
                      />
                    </div>
                    <div className="p-6 bg-black/5 dark:bg-white/5 rounded pixel-borders">
                      <p className="text-xs mb-2 dark:text-white/60">
                        Accent Variant
                      </p>
                      <PixelBlurText
                        text="Retro Style"
                        variant="accent"
                        size="md"
                      />
                    </div>
                  </div>
                </PixelCardContent>
              </PixelCard>
            </section>

            {/* Glitch Text */}
            <section>
              <PixelCard>
                <PixelCardHeader>
                  <PixelCardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Glitch Text
                  </PixelCardTitle>
                  <PixelCardDescription>
                    Retro glitch effect with cyber aesthetics
                  </PixelCardDescription>
                </PixelCardHeader>
                <PixelCardContent className="space-y-6">
                  <div className="p-8 bg-black/5 dark:bg-white/5 rounded pixel-borders">
                    <PixelGlitchText
                      text="SYSTEM ERROR"
                      variant="cyber"
                      size="xl"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-black/5 dark:bg-white/5 rounded pixel-borders">
                      <p className="text-xs mb-2 dark:text-white/60">
                        Hover to Glitch
                      </p>
                      <PixelGlitchText
                        text="CLICK ME"
                        variant="primary"
                        enableOnHover={true}
                      />
                    </div>
                    <div className="p-6 bg-black/5 dark:bg-white/5 rounded pixel-borders">
                      <p className="text-xs mb-2 dark:text-white/60">
                        No Shadows
                      </p>
                      <PixelGlitchText
                        text="CLEAN"
                        variant="default"
                        enableShadows={false}
                      />
                    </div>
                  </div>
                </PixelCardContent>
              </PixelCard>
            </section>

            {/* Gradient Text */}
            <section>
              <PixelCard>
                <PixelCardHeader>
                  <PixelCardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Gradient Text
                  </PixelCardTitle>
                  <PixelCardDescription>
                    Animated gradient text with smooth color transitions
                  </PixelCardDescription>
                </PixelCardHeader>
                <PixelCardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-black/5 dark:bg-white/5 rounded pixel-borders">
                      <p className="text-xs mb-2 dark:text-white/60">Sunset</p>
                      <PixelGradientText
                        text="SUNSET"
                        variant="sunset"
                        size="lg"
                      />
                    </div>
                    <div className="p-6 bg-black/5 dark:bg-white/5 rounded pixel-borders">
                      <p className="text-xs mb-2 dark:text-white/60">Ocean</p>
                      <PixelGradientText
                        text="OCEAN"
                        variant="ocean"
                        size="lg"
                      />
                    </div>
                    <div className="p-6 bg-black/5 dark:bg-white/5 rounded pixel-borders">
                      <p className="text-xs mb-2 dark:text-white/60">Forest</p>
                      <PixelGradientText
                        text="FOREST"
                        variant="forest"
                        size="lg"
                      />
                    </div>
                    <div className="p-6 bg-black/5 dark:bg-white/5 rounded pixel-borders">
                      <p className="text-xs mb-2 dark:text-white/60">Cyber</p>
                      <PixelGradientText
                        text="CYBER"
                        variant="cyber"
                        size="lg"
                      />
                    </div>
                  </div>
                </PixelCardContent>
              </PixelCard>
            </section>

            {/* Shiny Text */}
            <section>
              <PixelCard>
                <PixelCardHeader>
                  <PixelCardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Shiny Text
                  </PixelCardTitle>
                  <PixelCardDescription>
                    Metallic sheen effect sweeping across text
                  </PixelCardDescription>
                </PixelCardHeader>
                <PixelCardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-black/5 dark:bg-white/5 rounded pixel-borders">
                      <p className="text-xs mb-2 dark:text-white/60">Gold</p>
                      <PixelShinyText
                        text="LEGENDARY"
                        variant="gold"
                        size="lg"
                      />
                    </div>
                    <div className="p-6 bg-black/5 dark:bg-white/5 rounded pixel-borders">
                      <p className="text-xs mb-2 dark:text-white/60">Silver</p>
                      <PixelShinyText
                        text="PREMIUM"
                        variant="silver"
                        size="lg"
                      />
                    </div>
                    <div className="p-6 bg-black/5 dark:bg-white/5 rounded pixel-borders">
                      <p className="text-xs mb-2 dark:text-white/60">Rainbow</p>
                      <PixelShinyText
                        text="RAINBOW"
                        variant="rainbow"
                        size="lg"
                      />
                    </div>
                    <div className="p-6 bg-black/5 dark:bg-white/5 rounded pixel-borders">
                      <p className="text-xs mb-2 dark:text-white/60">Fire</p>
                      <PixelShinyText text="BLAZING" variant="fire" size="lg" />
                    </div>
                  </div>
                </PixelCardContent>
              </PixelCard>
            </section>

            {/* Circular Text */}
            <section>
              <PixelCard>
                <PixelCardHeader>
                  <PixelCardTitle>Circular Text</PixelCardTitle>
                  <PixelCardDescription>
                    Text arranged in a circle with rotation animation
                  </PixelCardDescription>
                </PixelCardHeader>
                <PixelCardContent>
                  <div className="flex justify-center items-center p-12 bg-black/5 dark:bg-white/5 rounded pixel-borders">
                    <PixelCircularText
                      text="ROUND AND ROUND WE GO"
                      spinDuration={15}
                      variant="primary"
                      size="lg"
                    />
                  </div>
                </PixelCardContent>
              </PixelCard>
            </section>
          </PixelTabsContent>

          {/* Card Effects Tab */}
          <PixelTabsContent value="cards" className="space-y-8">
            <section>
              <PixelCard>
                <PixelCardHeader>
                  <PixelCardTitle>Spotlight Card</PixelCardTitle>
                  <PixelCardDescription>
                    Card with animated spotlight effect following cursor
                  </PixelCardDescription>
                </PixelCardHeader>
                <PixelCardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PixelSpotlightCard variant="primary" size="lg">
                      <h3 className="text-xl font-bold mb-2 dark:text-white">
                        Primary Card
                      </h3>
                      <p className="dark:text-white/80">
                        Hover over this card to see the spotlight effect!
                      </p>
                    </PixelSpotlightCard>
                    <PixelSpotlightCard
                      variant="accent"
                      size="lg"
                      spotlightColor="rgba(82, 39, 255, 0.4)"
                      spotlightSize={300}
                    >
                      <h3 className="text-xl font-bold mb-2 dark:text-white">
                        Accent Card
                      </h3>
                      <p className="dark:text-white/80">
                        Larger spotlight with custom color!
                      </p>
                    </PixelSpotlightCard>
                  </div>
                </PixelCardContent>
              </PixelCard>
            </section>

            <section>
              <PixelCard>
                <PixelCardHeader>
                  <PixelCardTitle>Glare Card</PixelCardTitle>
                  <PixelCardDescription>
                    Card with glare/shine effect on hover
                  </PixelCardDescription>
                </PixelCardHeader>
                <PixelCardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PixelGlareCard
                      variant="glass"
                      size="lg"
                      glareColor="#ffd700"
                    >
                      <h3 className="text-xl font-bold mb-2 dark:text-white">
                        Glass Effect
                      </h3>
                      <p className="dark:text-white/80">
                        Beautiful glassmorphism with golden glare!
                      </p>
                    </PixelGlareCard>
                    <PixelGlareCard variant="primary" size="lg" playOnce={true}>
                      <h3 className="text-xl font-bold mb-2 dark:text-white">
                        Play Once
                      </h3>
                      <p className="dark:text-white/80">
                        Glare effect plays only once per page load!
                      </p>
                    </PixelGlareCard>
                  </div>
                </PixelCardContent>
              </PixelCard>
            </section>
          </PixelTabsContent>

          {/* Counters Tab */}
          <PixelTabsContent value="counters" className="space-y-8">
            <section>
              <PixelCard>
                <PixelCardHeader>
                  <PixelCardTitle>Count Up Animation</PixelCardTitle>
                  <PixelCardDescription>
                    Animated number counters with formatting
                  </PixelCardDescription>
                </PixelCardHeader>
                <PixelCardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-black/5 dark:bg-white/5 rounded pixel-borders text-center">
                      <p className="text-xs mb-2 dark:text-white/60 uppercase">
                        Total Users
                      </p>
                      <PixelCountUp
                        to={9999}
                        separator=","
                        variant="success"
                        size="xl"
                      />
                    </div>
                    <div className="p-6 bg-black/5 dark:bg-white/5 rounded pixel-borders text-center">
                      <p className="text-xs mb-2 dark:text-white/60 uppercase">
                        Revenue
                      </p>
                      <PixelCountUp
                        to={1234567}
                        prefix="$"
                        separator=","
                        variant="primary"
                        size="xl"
                        duration={3}
                      />
                    </div>
                    <div className="p-6 bg-black/5 dark:bg-white/5 rounded pixel-borders text-center">
                      <p className="text-xs mb-2 dark:text-white/60 uppercase">
                        Score
                      </p>
                      <PixelCountUp
                        to={1000000}
                        suffix="pts"
                        separator=","
                        variant="secondary"
                        size="xl"
                        duration={2.5}
                      />
                    </div>
                  </div>
                </PixelCardContent>
              </PixelCard>
            </section>
          </PixelTabsContent>
        </PixelTabs>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t-4 border-black dark:border-white">
          <div className="text-center">
            <p className="text-sm dark:text-white/60 mb-4">
              All components are customizable and production-ready
            </p>
            <Link href="/docs/components">
              <PixelButton size="lg">View Full Documentation →</PixelButton>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
