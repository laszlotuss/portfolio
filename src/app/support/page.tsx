import { Metadata } from "next";
import { fetchLinkPreview } from "../linkPreview";
import { getApps } from "../app";
import {
  ALL_SUPPORT_CARDS,
  getSupportCards,
  iSupportCard,
} from "../supportLinks";
import { SupportBrowser } from "./SupportBrowser";

export type { iSupportCard };

export interface iSupportApp {
  id: string;
  appid?: string;
  name: string;
  icon: string;
  policyKey?: string;
  supportCards: iSupportCard[];
}

export const metadata: Metadata = {
  title: "Support",
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ app?: string; appid?: string; id?: string }>;
}) => {
  const { app: appParam, appid, id } = await searchParams;
  const apps = await getApps();

  // Apps that have at least one support article (shared logic with the app
  // pages — flags plus genre/watchOS inference).
  const supportApps: iSupportApp[] = apps
    .filter((app) => app.role === "indie")
    .map((app) => ({
      id: app.id,
      appid: app.appid,
      name: app.name,
      icon: app.icon,
      policyKey: app.appid ? app.appid : undefined,
      supportCards: getSupportCards(app),
    }))
    .filter((app) => app.supportCards.length > 0);

  // ?app= / ?appid= / ?id= preselects an app, matching its appid or id.
  const param = appParam || appid || id;
  const initialApp = param
    ? supportApps.find((a) => a.appid === param || a.id === param)
    : undefined;

  // Pre-fetch previews for every URL that can appear (generic + per-app).
  const urls = new Set<string>(ALL_SUPPORT_CARDS.map((c) => c.url));
  supportApps.forEach((a) => a.supportCards.forEach((c) => urls.add(c.url)));
  const urlList = Array.from(urls);
  const fetched = await Promise.all(urlList.map((u) => fetchLinkPreview(u)));
  const previews = Object.fromEntries(urlList.map((u, i) => [u, fetched[i]]));

  return (
    <div className="flex-1 px-4 max-w-2xl w-full mx-auto mt-16 mb-12">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Support
      </h1>

      <SupportBrowser
        supportApps={supportApps}
        allCards={ALL_SUPPORT_CARDS}
        previews={previews}
        initialAppId={initialApp?.id ?? null}
      />
    </div>
  );
};

export default page;
