"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { categories, componentRegistry } from "@/lib/component-registry";
import { cn } from "@/lib/utils";

const SCROLL_POSITION_KEY = "docs-sidebar-scroll";

export function DocsSidebar() {
  const pathname = usePathname();
  const sidebarRef = React.useRef<HTMLElement>(null);

  // Save scroll position to sessionStorage on scroll
  React.useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const handleScroll = () => {
      sessionStorage.setItem(SCROLL_POSITION_KEY, sidebar.scrollTop.toString());
    };

    sidebar.addEventListener("scroll", handleScroll, { passive: true });
    return () => sidebar.removeEventListener("scroll", handleScroll);
  }, []);

  // Restore scroll position on mount and after navigation
  React.useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
    if (savedPosition) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        sidebar.scrollTop = parseInt(savedPosition, 10);
      });
    }
  }, [pathname]);

  return (
    <aside
      ref={sidebarRef}
      className="w-64 pixel-borders border-4 border-black bg-[#fffacd] p-6 dark:border-[#ff8c00] dark:bg-[#1a1a1a] h-fit sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto"
    >
      <div className="mb-6">
        <Link href="/">
          <h2 className="text-lg font-bold uppercase tracking-wider font-[family-name:var(--font-pixel)] dark:text-[#ffd700] hover:text-[#ff8c00] cursor-pointer">
            Pixel UI
          </h2>
        </Link>
      </div>

      <Link href="/docs/components">
        <div className="mb-6 px-3 py-2 text-sm font-medium border-2 border-black dark:border-[#ff8c00] bg-[#ff8c00] text-white hover:bg-[#ff6b00] transition-none duration-0">
          All Components
        </div>
      </Link>

      <nav className="space-y-4">
        {categories.map((category) => {
          const categoryComponents = componentRegistry.filter(
            (c) => c.category === category,
          );
          const hasActiveComponent = categoryComponents.some(
            (c) => pathname === `/docs/components/${c.slug}`,
          );

          return (
            <div key={category}>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2 dark:text-[#ffd700] px-1">
                {category}
              </h3>
              <div className="space-y-1">
                {categoryComponents.map((component) => {
                  const href = `/docs/components/${component.slug}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={component.slug}
                      href={href}
                      className={cn(
                        "block px-3 py-2 text-xs font-medium transition-none duration-0 pixel-borders border-2",
                        isActive
                          ? "bg-[#ff8c00] text-white border-black dark:border-[#ff8c00]"
                          : "bg-white border-black hover:bg-black/5 dark:bg-[#1a1a1a] dark:border-[#ff8c00] dark:hover:bg-white/5",
                      )}
                    >
                      {component.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
