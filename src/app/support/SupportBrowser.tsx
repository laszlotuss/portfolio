"use client";

import { useState } from "react";
import { ArrowOut } from "./ArrowOut";
import type { iSupportCard, iSupportApp } from "./page";

interface iSupportBrowserProps {
  supportApps: iSupportApp[];
  allCards: iSupportCard[];
  previews: (iLinkPreview | null)[];
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
      className={`flex flex-col items-center gap-1.5 shrink-0 w-20 transition-all duration-300 ${
        isSelected ? "scale-110" : dimmed ? "opacity-40" : "opacity-70 hover:opacity-100"
      }`}
    >
      <img
        src={app.icon}
        alt={app.name}
        className={`w-14 h-14 rounded-2xl shadow-sm transition-all duration-300 ${
          isSelected ? "ring-3 ring-indigo-500" : ""
        }`}
      />
      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 text-center leading-tight line-clamp-2 max-w-full">
        {app.name}
      </span>
    </button>
  );
};

export const SupportBrowser = ({
  supportApps,
  allCards,
  previews,
}: iSupportBrowserProps) => {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  // When an app is selected, show only its support cards.
  const selectedApp = selectedAppId
    ? supportApps.find((a) => a.id === selectedAppId)
    : null;

  // Build a Set of card keys that are visible for this selection.
  const visibleKeys = selectedApp
    ? new Set(selectedApp.supportCards.map((c) => c.key))
    : null;

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
        <div className="flex gap-4 overflow-x-auto pb-4 px-4 sm:px-0 scrollbar-none">
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

      {/* Description */}
      <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
        {selectedApp
          ? `Help articles for ${selectedApp.name}`
          : `General help articles for common iOS features.`}
      </p>

      {/* Support cards — with transition on filter */}
      <div className="flex flex-col">
        {allCards.map((card, i) => {
          const preview = previews[i];
          const isVisible = !visibleKeys || visibleKeys.has(card.key);

          return (
            <div
              key={card.url}
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isVisible
                  ? "opacity-100 max-h-40 scale-100 mb-3"
                  : "opacity-0 max-h-0 scale-95 mb-0 pointer-events-none"
              }`}
            >
              {isVisible && (
                <SupportCard card={card} preview={preview} />
              )}
            </div>
          );
        })}
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
    </>
  );
};