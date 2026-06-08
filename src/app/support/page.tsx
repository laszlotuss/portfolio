import { Metadata } from "next";
import { fetchLinkPreview } from "../linkPreview";
import { getApps } from "../app";
import { SupportBrowser } from "./SupportBrowser";

const STICKER_SUPPORT_URL = "https://support.apple.com/en-us/104969";
const STICKER_SUPPORT_TITLE =
  "How to use iMessage apps on your iPhone and iPad";
const SUBSCRIPTION_SUPPORT_URL = "https://support.apple.com/en-us/HT202039";
const SUBSCRIPTION_SUPPORT_TITLE =
  "View, change, or cancel your subscriptions";
const WATCH_SUPPORT_URL = "https://support.apple.com/en-us/109023";
const WATCH_SUPPORT_TITLE = "Set up and use Apple Watch";
const PIP_SUPPORT_URL =
  "https://support.apple.com/guide/iphone/multitask-with-picture-in-picture-iphcc3587b5d/ios";
const PIP_SUPPORT_TITLE = "Use Picture in Picture on iPhone";
const PURCHASE_SUPPORT_URLS = [
  "https://support.apple.com/en-us/118212",
  "https://support.apple.com/en-us/118223",
];
const PURCHASE_SUPPORT_TITLE = "Check your purchase history in the App Store";

export interface iSupportCard {
  key: string;
  url: string;
  fallbackTitle: string;
}

export interface iSupportApp {
  id: string;
  appid?: string;
  name: string;
  icon: string;
  supportCards: iSupportCard[];
}

// Keyed support cards so they can be looked up by key for filtering.
const ALL_SUPPORT_LINKS: iSupportCard[] = [
  { key: "sticker", url: STICKER_SUPPORT_URL, fallbackTitle: STICKER_SUPPORT_TITLE },
  { key: "pip", url: PIP_SUPPORT_URL, fallbackTitle: PIP_SUPPORT_TITLE },
  { key: "watch", url: WATCH_SUPPORT_URL, fallbackTitle: WATCH_SUPPORT_TITLE },
  ...PURCHASE_SUPPORT_URLS.map((url, i) => ({
    key: `purchase-${i}`,
    url,
    fallbackTitle: PURCHASE_SUPPORT_TITLE,
  })),
  { key: "subscription", url: SUBSCRIPTION_SUPPORT_URL, fallbackTitle: SUBSCRIPTION_SUPPORT_TITLE },
];

export const metadata: Metadata = {
  title: "Support | László Tuss",
};

const page = async () => {
  const apps = await getApps();

  // Collect apps that have at least one support flag.
  const supportApps: iSupportApp[] = apps
    .filter((app) => {
      if (app.sticker) return true;
      if (app.pip) return true;
      if (app.watch) return true;
      if (app.subscription) return true;
      if (app.purchase) return true;
      return false;
    })
    .map((app) => {
      const keys: string[] = [];
      if (app.sticker) keys.push("sticker");
      if (app.pip) keys.push("pip");
      if (app.watch) keys.push("watch");
      if (app.subscription) keys.push("subscription");
      if (app.purchase) keys.push("purchase-0", "purchase-1");
      return {
        id: app.id,
        appid: app.appid,
        name: app.name,
        icon: app.icon,
        supportCards: keys
          .map((k) => ALL_SUPPORT_LINKS.find((c) => c.key === k))
          .filter((c): c is iSupportCard => c !== undefined),
      };
    });

  // Pre-fetch link previews server-side for all support URLs.
  const previews = await Promise.all(
    ALL_SUPPORT_LINKS.map((l) => fetchLinkPreview(l.url))
  );

  return (
    <div className="flex-1 px-4 max-w-2xl w-full mx-auto mt-16 mb-12">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Support
      </h1>

      <SupportBrowser
        supportApps={supportApps}
        allCards={ALL_SUPPORT_LINKS}
        previews={previews}
      />
    </div>
  );
};

export default page;