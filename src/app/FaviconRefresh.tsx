"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Top-level routes that are not app detail pages.
const STATIC_SEGMENTS = new Set([
  "about",
  "privacy-policy",
  "pp",
  "ppp",
  "pps",
]);

const appSegment = (pathname: string): string | undefined => {
  const match = pathname.match(/^\/([^/]+)/);
  if (!match) return undefined;
  const segment = match[1];
  if (STATIC_SEGMENTS.has(segment)) return undefined;
  return segment;
};

const iconPathname = (pathname: string) => {
  const app = appSegment(pathname);
  return app ? `/${app}/icon` : "/icon";
};

const linkPathname = (href: string) => {
  try {
    return new URL(href, window.location.origin).pathname;
  } catch {
    return undefined;
  }
};

const pickIconHref = (pathname: string, links: HTMLLinkElement[]) => {
  const wanted = iconPathname(pathname);
  return (
    links.find((l) => linkPathname(l.href) === wanted)?.href ??
    links.find((l) => linkPathname(l.href) === "/icon")?.href
  );
};

/**
 * Browsers (Safari especially) often don't repaint the tab favicon when only
 * the <link rel="icon"> href changes during client-side navigation — so going
 * back from an app page can leave the app's icon stuck in the tab. Pick the
 * icon for the current route (profile on home/about, per-app on /:id) and
 * mirror it into our own <link> to force a repaint.
 */
export const FaviconRefresh = () => {
  const pathname = usePathname();

  useEffect(() => {
    const apply = () => {
      const managed = Array.from(
        document.querySelectorAll<HTMLLinkElement>(
          'link[rel="icon"]:not(#dynamic-favicon)'
        )
      );

      const fromNext = pickIconHref(pathname, managed);
      const target =
        fromNext ??
        new URL(iconPathname(pathname), window.location.origin).href;

      // Prune accumulated duplicates, keeping the one that matches this route.
      managed.forEach((l) => {
        if (linkPathname(l.href) !== iconPathname(pathname)) l.remove();
      });

      const existing = document.getElementById(
        "dynamic-favicon"
      ) as HTMLLinkElement | null;
      if (existing?.href === target) return;

      const link = document.createElement("link");
      link.rel = "icon";
      link.href = target;
      document.head.appendChild(link);
      existing?.remove();
      link.id = "dynamic-favicon";
    };

    // Metadata <link> tags can land slightly after paint — retry once.
    const t1 = setTimeout(apply, 0);
    const t2 = setTimeout(apply, 200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return null;
};
