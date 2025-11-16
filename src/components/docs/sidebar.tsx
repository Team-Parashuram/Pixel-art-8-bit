"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { categories, componentRegistry } from "@/lib/component-registry";
import { cn } from "@/lib/utils";

const SCROLL_POSITION_KEY = "docs-sidebar-scroll";

export function DocsSidebar() {
  const pathname = usePathname();
  const sidebarRef = React.useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

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

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const sidebarContent = (
    <>
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
                      onClick={() => setMobileOpen(false)}
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
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 p-3 border-4 border-black bg-[#ff8c00] text-white dark:border-[#ffd700] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,215,0,0.5)] hover:bg-[#ff6b00] transition-colors"
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        ref={sidebarRef}
        className="hidden lg:block w-64 pixel-borders border-4 border-black bg-[#fffacd] p-6 dark:border-[#ff8c00] dark:bg-[#1a1a1a] h-fit sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed left-0 top-0 bottom-0 w-64 pixel-borders border-r-4 border-black bg-[#fffacd] p-6 dark:border-[#ff8c00] dark:bg-[#1a1a1a] overflow-y-auto z-50 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
