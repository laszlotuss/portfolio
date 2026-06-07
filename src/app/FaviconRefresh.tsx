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

const faviconFor = (pathname: string) => {
  const app = appSegment(pathname);
  if (app) return { href: `/${app}/icon`, type: "image/png" };
  return { href: "/profile.jpg", type: "image/jpeg" };
};

/**
 * Safari often won't repaint the tab favicon on client-side navigation. Mirror
 * the route-appropriate icon into our own <link> (profile.jpg on home/about,
 * /:id/icon on app pages) without touching Next's metadata links.
 */
export const FaviconRefresh = () => {
  const pathname = usePathname();

  useEffect(() => {
    const apply = () => {
      const { href, type } = faviconFor(pathname);
      const target = new URL(href, window.location.origin).href;

      const existing = document.getElementById(
        "dynamic-favicon"
      ) as HTMLLinkElement | null;
      if (existing?.href === target && existing.type === type) return;

      const link = document.createElement("link");
      link.id = "dynamic-favicon";
      link.rel = "icon";
      link.type = type;
      link.href = target;
      document.head.appendChild(link);
      existing?.remove();
    };

    const t1 = setTimeout(apply, 0);
    const t2 = setTimeout(apply, 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return null;
};
