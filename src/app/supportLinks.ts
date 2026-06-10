import { iApp } from "./app";

/**
 * Single source of truth for the Apple Support articles shown for an app —
 * used by the app page ([app]/page.tsx), the per-app support page
 * (support/[appid]) and the support browser (/support).
 */

export interface iSupportCard {
  key: string;
  url: string;
  fallbackTitle: string;
}

const STICKER_SUPPORT_URL = "https://support.apple.com/en-us/104969";
const STICKER_SUPPORT_TITLE =
  "How to use iMessage apps on your iPhone and iPad";
const STICKER_SEND_SUPPORT_URL =
  "https://support.apple.com/guide/iphone/send-stickers-iph37b0bfe7b";
const STICKER_SEND_SUPPORT_TITLE = "Send stickers in Messages on iPhone";
const SUBSCRIPTION_SUPPORT_URL = "https://support.apple.com/en-us/HT202039";
const SUBSCRIPTION_SUPPORT_TITLE =
  "View, change, or cancel your subscriptions";
const WATCH_SUPPORT_URL = "https://support.apple.com/en-us/109023";
const WATCH_SUPPORT_TITLE = "Set up and use Apple Watch";
const PIP_SUPPORT_URL =
  "https://support.apple.com/guide/iphone/multitask-with-picture-in-picture-iphcc3587b5d/ios";
const PIP_SUPPORT_TITLE = "Use Picture in Picture on iPhone";
const PURCHASE_SUPPORT_URLS = [
  "https://support.apple.com/en-us/118223",
  "https://support.apple.com/en-us/118212",
];
const PURCHASE_SUPPORT_TITLE = "Check your purchase history in the App Store";

const STICKER_CARDS: iSupportCard[] = [
  { key: "sticker", url: STICKER_SUPPORT_URL, fallbackTitle: STICKER_SUPPORT_TITLE },
  {
    key: "sticker-send",
    url: STICKER_SEND_SUPPORT_URL,
    fallbackTitle: STICKER_SEND_SUPPORT_TITLE,
  },
];
const PIP_CARD: iSupportCard = {
  key: "pip",
  url: PIP_SUPPORT_URL,
  fallbackTitle: PIP_SUPPORT_TITLE,
};
const WATCH_CARD: iSupportCard = {
  key: "watch",
  url: WATCH_SUPPORT_URL,
  fallbackTitle: WATCH_SUPPORT_TITLE,
};
const PURCHASE_CARDS: iSupportCard[] = PURCHASE_SUPPORT_URLS.map((url, i) => ({
  key: `purchase-${i}`,
  url,
  fallbackTitle: PURCHASE_SUPPORT_TITLE,
}));
const SUBSCRIPTION_CARD: iSupportCard = {
  key: "subscription",
  url: SUBSCRIPTION_SUPPORT_URL,
  fallbackTitle: SUBSCRIPTION_SUPPORT_TITLE,
};

/** Every generic card, in display order — the unfiltered /support list. */
export const ALL_SUPPORT_CARDS: iSupportCard[] = [
  ...STICKER_CARDS,
  PIP_CARD,
  WATCH_CARD,
  ...PURCHASE_CARDS,
  SUBSCRIPTION_CARD,
];

/** A support.apple.com link mentioned in the app's own description. */
const descriptionSupportCard = (app: iApp): iSupportCard | undefined => {
  const match = app.description
    .match(/(?:https?:\/\/)?support\.apple\.com\/\S+/i)?.[0]
    ?.replace(/[.,;)]+$/, "");
  if (!match) return undefined;
  const url = match.startsWith("http") ? match : `https://${match}`;
  return { key: "description", url, fallbackTitle: "Support" };
};

/**
 * The support cards relevant to a resolved app, deduped by URL.
 *
 * Flags are taken from apps.json, with two inferences on top: sticker apps
 * are also detected by their App Store genre, and the watch card is shown
 * whenever the app has watchOS screenshots. A subscription implies the
 * purchase cards too.
 */
export const getSupportCards = (app: iApp): iSupportCard[] => {
  const cards: iSupportCard[] = [];

  if (app.sticker || /sticker/i.test(app.genre || ""))
    cards.push(...STICKER_CARDS);
  if (app.pip) cards.push(PIP_CARD);
  if (app.watch || app.screenshotGroups.some((g) => g.platform === "watchOS"))
    cards.push(WATCH_CARD);
  if (app.purchase || app.subscription) cards.push(...PURCHASE_CARDS);
  if (app.subscription) cards.push(SUBSCRIPTION_CARD);

  const desc = descriptionSupportCard(app);
  if (desc) cards.push(desc);

  const seen = new Set<string>();
  return cards.filter((c) => !seen.has(c.url) && seen.add(c.url));
};
