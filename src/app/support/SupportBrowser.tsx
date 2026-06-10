"use client";

import { useState } from "react";
import { PolicyLinks } from "../PolicyLinks";
import { ArrowOut } from "./ArrowOut";
import type { iSupportCard, iSupportApp } from "./page";

interface iSupportBrowserProps {
  supportApps: iSupportApp[];
  allCards: iSupportCard[];
  previews: Record<string, iLinkPreview | null>;
  initialAppId?: string | null;
}

interface iLinkPreview {
  title: string;
  description?: string;
  image?: string;
}

const SupportCard = ({
  card,
  preview,
}: {
  card: iSupportCard;
  preview: iLinkPreview | null;
}) => (
  <a
    key={card.url}
    href={card.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-4 rounded-3xl border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
  >
    {preview?.image ? (
      <img
        src={preview.image}
        alt=""
        className="w-16 h-16 rounded-2xl object-cover shrink-0"
      />
    ) : (
      <span className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0 text-indigo-500">
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </span>
    )}
    <span className="min-w-0 flex-1">
      <span className="block font-semibold text-gray-800 dark:text-gray-200">
        {preview?.title || card.fallbackTitle}
      </span>
      <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
        {preview?.description || "support.apple.com"}
      </span>
    </span>
    <span className="shrink-0 self-center text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 transition-colors">
      <ArrowOut size={18} />
    </span>
  </a>
);

interface iAppPillProps {
  app: iSupportApp;
  isSelected: boolean;
  isFilterActive: boolean;
  onSelect: () => void;
}

const AppPill = ({ app, isSelected, isFilterActive, onSelect }: iAppPillProps) => {
  const dimmed = isFilterActive && !isSelected;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`shrink-0 w-28 px-2.5 pt-1 pb-2 transition-opacity duration-300 ${
        dimmed ? "opacity-40" : "opacity-100"
      }`}
    >
      <span className="flex h-[4.75rem] items-center justify-center px-1">
        <img
          src={app.icon}
          alt={app.name}
          className={`h-14 w-14 rounded-2xl shadow-sm transition-all duration-300 ${
            isSelected
              ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-800"
              : ""
          }`}
        />
      </span>
      <span className="mt-1 block min-h-[3.25rem] max-w-full text-xs font-medium text-gray-600 dark:text-gray-400 text-center leading-[1.15] line-clamp-3 break-words">
        {app.name}
      </span>
    </button>
  );
};

export const SupportBrowser = ({
  supportApps,
  allCards,
  previews,
  initialAppId = null,
}: iSupportBrowserProps) => {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(
    initialAppId
  );

  // When an app is selected, show its own cards (these can include
  // app-specific links that aren't in the generic list).
  const selectedApp = selectedAppId
    ? supportApps.find((a) => a.id === selectedAppId)
    : null;
  const visibleCards = selectedApp ? selectedApp.supportCards : allCards;

  const isFilterActive = selectedApp !== null;

  const handleClear = () => setSelectedAppId(null);
  const handleSelect = (id: string) =>
    setSelectedAppId((prev) => (prev === id ? null : id));

  return (
    <>
      {/* Horizontal scroll of apps — full bleed on mobile, centered on desktop */}
      <div className="mb-6 -mx-4 sm:mx-0">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 px-4 sm:px-0">
          Select an app to see its support articles:
        </p>
        <div className="relative left-[calc(50%-50vw)] w-screen overflow-x-auto scrollbar-none">
          <div className="flex w-max min-w-full justify-center gap-4 px-5 sm:px-10 py-2">
            {supportApps.map((app) => (
              <AppPill
                key={app.id}
                app={app}
                isSelected={selectedAppId === app.id}
                isFilterActive={isFilterActive}
                onSelect={() => handleSelect(app.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
        {selectedApp
          ? `Help articles for ${selectedApp.name}`
          : `General help articles for common iOS features.`}
      </p>

      {/* Support cards — with transition on filter */}
      <div className="flex flex-col gap-3">
        {visibleCards.map((card) => (
          <SupportCard
            key={card.url}
            card={card}
            preview={previews[card.url] ?? null}
          />
        ))}
      </div>

      {/* Clear filter button */}
      {selectedApp && (
        <button
          type="button"
          onClick={handleClear}
          className="mt-6 text-sm font-semibold text-indigo-500 hover:underline underline-offset-2 transition-colors"
        >
          Show all support articles
        </button>
      )}

      {selectedApp?.policyKey && <PolicyLinks appKey={selectedApp.policyKey} />}
    </>
  );
};
