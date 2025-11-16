"use client";

import { useState } from "react";
import { PixelAudioVisualizer } from "@/components/ui/pixel/pixel-audio-visualizer";
import { PixelBadge } from "@/components/ui/pixel/pixel-badge";
import { PixelButton } from "@/components/ui/pixel/pixel-button";
import {
  PixelCard,
  PixelCardContent,
  PixelCardHeader,
  PixelCardTitle,
} from "@/components/ui/pixel/pixel-card";
import { PixelChat } from "@/components/ui/pixel/pixel-chat";
import { PixelCodeBlock } from "@/components/ui/pixel/pixel-code-block";
import {
  PixelCountdown,
  PixelTimer,
} from "@/components/ui/pixel/pixel-countdown";
import {
  PixelAchievement,
  PixelHealthBar,
  PixelInventory,
  PixelInventorySlot,
  PixelManaBar,
  PixelXPBar,
} from "@/components/ui/pixel/pixel-game-ui";
import {
  PixelHero,
  PixelHeroActions,
  PixelHeroBadge,
  PixelHeroContent,
  PixelHeroDescription,
  PixelHeroSubtitle,
  PixelHeroTitle,
} from "@/components/ui/pixel/pixel-hero";
import { PixelLoader } from "@/components/ui/pixel/pixel-loader";
import { PixelNotification } from "@/components/ui/pixel/pixel-notification";
import {
  PixelStatItem,
  PixelStatLabel,
  PixelStats,
  PixelStatValue,
} from "@/components/ui/pixel/pixel-stats";
import { PixelTerminal } from "@/components/ui/pixel/pixel-terminal";
import {
  PixelTimeline,
  PixelTimelineCheckpoint,
} from "@/components/ui/pixel/pixel-timeline";
import { PixelWindow } from "@/components/ui/pixel/pixel-window";

export default function PatternsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAchievement, setShowAchievement] = useState(false);

  // Simulate initial loading
  if (isLoading) {
    setTimeout(() => setIsLoading(false), 3000);
    return (
      <div className="min-h-screen bg-pixel-light-bg dark:bg-black flex items-center justify-center">
        <PixelLoader variant="crt" size="lg" text="LOADING RETRO GAME..." />
      </div>
    );
  }

  const chatMessages = [
    {
      id: "1",
      text: "Welcome to Retro Game Central! 👾",
      sender: "other" as const,
      username: "GameMaster",
      timestamp: "10:00 AM",
      avatar: "🎮",
    },
    {
      id: "2",
      text: "Ready to explore the ultimate retro experience?",
      sender: "other" as const,
      username: "GameMaster",
      timestamp: "10:01 AM",
      avatar: "🎮",
    },
  ];

  const timelineEvents = [
    {
      title: "Account Created",
      description: "Welcome to the retro gaming community!",
      date: "Today",
      variant: "success" as const,
      icon: "🎮",
    },
    {
      title: "First Achievement",
      description: "Unlocked 'Retro Explorer' badge",
      date: "5 mins ago",
      variant: "success" as const,
      icon: "🏆",
    },
    {
      title: "Level Up!",
      description: "Reached level 5",
      date: "10 mins ago",
      variant: "warning" as const,
      icon: "⚡",
    },
  ];

  const checkpoints = [
    { label: "Tutorial", completed: true },
    { label: "First Quest", completed: true },
    { label: "Boss Battle", active: true },
    { label: "Hidden Level", completed: false },
    { label: "Final Boss", completed: false },
  ];

  return (
    <div className="min-h-screen bg-pixel-light-bg dark:bg-[#000000] text-black dark:text-white">
      {/* Hero Section - Clean & Aesthetic */}
      <section className="border-b-4 border-[#ff8c00] bg-pixel-light-surface dark:bg-[#000000] py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
            {/* Badge */}
            <div className="flex justify-center">
              <PixelHeroBadge className="text-sm sm:text-base md:text-lg px-4 sm:px-6 py-1.5 sm:py-2">
                🎮 LIVE NOW
              </PixelHeroBadge>
            </div>

            {/* Title */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-pixel text-[#ff8c00] dark:text-pixel-dark-secondary leading-tight px-2">
                RETRO GAME CENTRAL
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#ff8c00] font-pixel px-2">
                Built with Special Components
              </p>

              <p className="text-sm sm:text-base md:text-lg text-black/70 dark:text-gray-400 max-w-2xl mx-auto px-4">
                Experience the ultimate 8-bit gaming platform powered by cutting-edge retro UI components
              </p>
            </div>

            {/* Countdown */}
            <div className="pt-6 sm:pt-8">
              <h3 className="text-base sm:text-lg md:text-xl font-bold font-pixel mb-4 sm:mb-6 text-center text-black dark:text-white px-2">
                ⏰ NEXT EVENT STARTS IN:
              </h3>
              <PixelCountdown
                targetDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)}
                variant="digital"
                size="lg"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center pt-4 px-4">
              <PixelButton size="lg" onClick={() => setShowAchievement(true)} className="w-full sm:w-auto">
                START PLAYING
              </PixelButton>
              <PixelButton size="lg" variant="secondary" className="w-full sm:w-auto">
                VIEW LEADERBOARD
              </PixelButton>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Notification */}
      {showAchievement && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <PixelAchievement
            variant="gold"
            title="Welcome Bonus!"
            description="You've unlocked the Retro Explorer achievement"
            icon="🏆"
            points={100}
          />
        </div>
      )}

      {/* Stats Section */}
      <section className="border-b-4 border-[#ff8c00] bg-[#ffefd5] dark:bg-pixel-dark-surface py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <PixelStats columns={4} className="gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-4">
            <PixelStatItem variant="primary">
              <PixelStatValue>1,337</PixelStatValue>
              <PixelStatLabel>Active Players</PixelStatLabel>
            </PixelStatItem>
            <PixelStatItem variant="secondary">
              <PixelStatValue>420+</PixelStatValue>
              <PixelStatLabel>Games Available</PixelStatLabel>
            </PixelStatItem>
            <PixelStatItem variant="gradient">
              <PixelStatValue>99.9%</PixelStatValue>
              <PixelStatLabel>Uptime</PixelStatLabel>
            </PixelStatItem>
            <PixelStatItem variant="dark">
              <PixelStatValue>24/7</PixelStatValue>
              <PixelStatLabel>Support</PixelStatLabel>
            </PixelStatItem>
          </PixelStats>
        </div>
      </section>

      {/* Player Dashboard - Game UI Components */}
      <section className="border-b-4 border-[#ff8c00] py-8 sm:py-12 md:py-16 bg-pixel-light-bg dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-pixel mb-8 sm:mb-12 text-center text-[#ff8c00] dark:text-pixel-dark-secondary px-2">
            🎮 PLAYER DASHBOARD
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Character Stats */}
            <PixelCard className="lg:col-span-2">
              <PixelCardHeader>
                <PixelCardTitle className="flex items-center gap-3">
                  <span className="text-3xl">🧙‍♂️</span>
                  <div>
                    <div className="text-2xl">PIXEL WIZARD</div>
                    <div className="text-sm text-pixel-dark-secondary">
                      Level 42 • Archmage
                    </div>
                  </div>
                </PixelCardTitle>
              </PixelCardHeader>
              <PixelCardContent className="space-y-6">
                <div className="space-y-4">
                  <PixelHealthBar current={850} max={1000} label="HP" />
                  <PixelManaBar current={650} max={800} label="MP" />
                  <PixelXPBar currentXP={15750} requiredXP={20000} level={42} />
                </div>

                <div>
                  <h3 className="font-bold font-pixel mb-3 text-lg">
                    📦 INVENTORY
                  </h3>
                  <PixelInventory columns={5} title="">
                    <PixelInventorySlot item="⚔️" rarity="legendary" count={1} />
                    <PixelInventorySlot item="🛡️" rarity="epic" count={1} />
                    <PixelInventorySlot item="💊" rarity="common" count={99} />
                    <PixelInventorySlot item="🔮" rarity="rare" count={5} />
                    <PixelInventorySlot
                      item="👑"
                      rarity="legendary"
                      count={1}
                    />
                    <PixelInventorySlot item="🗝️" rarity="rare" count={3} />
                    <PixelInventorySlot item="💎" rarity="epic" count={42} />
                    <PixelInventorySlot item="🧪" rarity="common" count={15} />
                    <PixelInventorySlot isEmpty />
                    <PixelInventorySlot isEmpty />
                  </PixelInventory>
                </div>
              </PixelCardContent>
            </PixelCard>

            {/* Quest Progress */}
            <PixelCard>
              <PixelCardHeader>
                <PixelCardTitle>⭐ QUEST LOG</PixelCardTitle>
              </PixelCardHeader>
              <PixelCardContent>
                <PixelTimelineCheckpoint
                  checkpoints={checkpoints}
                  orientation="vertical"
                />
              </PixelCardContent>
            </PixelCard>
          </div>
        </div>
      </section>

      {/* Terminal & Code Section */}
      <section className="border-b-4 border-[#ff8c00] py-8 sm:py-12 md:py-16 bg-pixel-light-surface dark:bg-[#000000]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-pixel mb-8 sm:mb-12 text-center text-[#00aa00] dark:text-[#00ff00] px-2">
            💻 DEVELOPER TERMINAL
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <PixelTerminal
                variant="matrix"
                size="md"
                prompt="player@retro:~$"
                welcomeMessage="Welcome to Retro Game Terminal v1.0\nType 'help' for available commands"
                commands={{
                  stats: () => "HP: 850/1000 | MP: 650/800 | Level: 42",
                  inventory: () => "You have 8 items in your inventory",
                  quest: () => "Active Quest: Defeat the Boss (50% complete)",
                  arcade: () => "🎮 Loading arcade games...",
                }}
              />
            </div>

            <div>
              <PixelCodeBlock
                code={`// Unlock Achievement
function unlockAchievement(id) {
  const achievement = {
    id: id,
    title: "Retro Master",
    points: 500,
    icon: "🏆"
  };
  
  player.achievements.push(achievement);
  showNotification(achievement);
  playSound("achievement.wav");
  
  return achievement;
}`}
                language="javascript"
                title="achievement.js"
                variant="matrix"
                highlightLines={[8, 9]}
                size="sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Audio Visualizer Section */}
      <section className="border-b-4 border-[#ff8c00] py-8 sm:py-12 md:py-16 bg-pixel-light-bg dark:bg-[#000000]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-pixel mb-8 sm:mb-12 text-center text-[#00aa00] dark:text-[#00ff00] px-2">
            🎵 AUDIO VISUALIZER
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <PixelCard>
              <PixelCardHeader>
                <PixelCardTitle>Bars Mode</PixelCardTitle>
              </PixelCardHeader>
              <PixelCardContent>
                <div className="h-64 flex items-center justify-center bg-black/10 dark:bg-black/50 rounded">
                  <PixelAudioVisualizer variant="bars" animate={true} />
                </div>
              </PixelCardContent>
            </PixelCard>

            <PixelCard>
              <PixelCardHeader>
                <PixelCardTitle>Wave Mode</PixelCardTitle>
              </PixelCardHeader>
              <PixelCardContent>
                <div className="h-64 flex items-center justify-center bg-black/10 dark:bg-black/50 rounded">
                  <PixelAudioVisualizer variant="wave" animate={true} />
                </div>
              </PixelCardContent>
            </PixelCard>
          </div>
        </div>
      </section>

      {/* Activity Timeline */}
      <section className="border-b-4 border-[#ff8c00] py-8 sm:py-12 md:py-16 bg-pixel-light-surface dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-pixel mb-8 sm:mb-12 text-center text-[#ff8c00] px-2">
            📜 RECENT ACTIVITY
          </h2>

          <div className="max-w-4xl mx-auto">
            <PixelTimeline
              items={timelineEvents}
              orientation="vertical"
              markerSize="lg"
              markerShape="circle"
            />
          </div>
        </div>
      </section>

      {/* Live Chat */}
      <section className="border-b-4 border-[#ff8c00] py-8 sm:py-12 md:py-16 bg-pixel-light-bg dark:bg-[#000000]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-pixel mb-8 sm:mb-12 text-center text-[#ff8c00] dark:text-pixel-dark-secondary px-2">
            💬 LIVE GAME CHAT
          </h2>

          <div className="max-w-3xl mx-auto">
            <PixelChat
              messages={chatMessages}
              variant="retro"
              size="md"
              placeholder="Type your message..."
              onSendMessage={(msg) => console.log("Sent:", msg)}
            />
          </div>
        </div>
      </section>

      {/* Retro Windows */}
      <section className="border-b-4 border-[#ff8c00] py-8 sm:py-12 md:py-16 bg-pixel-light-surface dark:bg-pixel-dark-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-pixel mb-8 sm:mb-12 text-center text-[#0088cc] dark:text-[#00ffff] px-2">
            🪟 CLASSIC WINDOWS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <PixelWindow title="Game Settings" icon="⚙️">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-sm">Sound Effects</span>
                  <PixelBadge variant="success">ON</PixelBadge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-sm">Music</span>
                  <PixelBadge variant="success">ON</PixelBadge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-sm">Difficulty</span>
                  <PixelBadge variant="warning">HARD</PixelBadge>
                </div>
                <PixelButton size="sm" className="w-full mt-4">
                  SAVE SETTINGS
                </PixelButton>
              </div>
            </PixelWindow>

            <PixelWindow title="Achievements" icon="🏆">
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 p-2 border-2 border-pixel-dark-secondary bg-pixel-dark-secondary/10">
                  <span className="text-2xl">🏆</span>
                  <div className="flex-1">
                    <div className="font-pixel text-sm">Retro Master</div>
                    <div className="text-xs text-pixel-dark-secondary">
                      500 points
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 border-2 border-gray-500 bg-gray-500/10">
                  <span className="text-2xl">🥇</span>
                  <div className="flex-1">
                    <div className="font-pixel text-sm">Speed Runner</div>
                    <div className="text-xs text-gray-400">250 points</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 border-2 border-orange-500 bg-orange-500/10">
                  <span className="text-2xl">🥉</span>
                  <div className="flex-1">
                    <div className="font-pixel text-sm">Explorer</div>
                    <div className="text-xs text-orange-400">100 points</div>
                  </div>
                </div>
              </div>
            </PixelWindow>
          </div>
        </div>
      </section>

      {/* Timer/Countdown Section */}
      <section className="border-b-4 border-[#ff8c00] py-8 sm:py-12 md:py-16 bg-pixel-light-bg dark:bg-[#000000]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-pixel mb-8 sm:mb-12 text-center text-[#cc0000] dark:text-[#ff0000] px-2">
            ⏱️ GAME TIMERS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-bold font-pixel mb-4 sm:mb-6 text-[#ff8c00] dark:text-pixel-dark-secondary px-2">
                SPEED RUN TIMER
              </h3>
              <PixelTimer
                initialMinutes={5}
                initialSeconds={0}
                variant="digital"
                size="lg"
                showControls={true}
              />
            </div>

            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-bold font-pixel mb-4 sm:mb-6 text-[#00aa00] dark:text-[#00ff00] px-2">
                BOSS BATTLE COUNTDOWN
              </h3>

              <PixelCountdown
                initialSeconds={300}
                variant="flip"
                size="lg"
                showDays={false}
                showHours={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Notifications Bar */}
      <section className="py-6 sm:py-8 bg-pixel-light-surface dark:bg-pixel-dark-surface">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
            <PixelNotification
              title="Quest Complete!"
              description="You've earned 500 XP"
              variant="success"
              icon="✓"
            />
            <PixelNotification
              title="Level Up!"
              description="You've reached Level 43"
              variant="info"
              icon="⚡"
            />
            <PixelNotification
              title="Achievement Unlocked"
              description="Retro Master badge earned"
              variant="warning"
              icon="🏆"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
