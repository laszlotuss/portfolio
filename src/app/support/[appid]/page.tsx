import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getApp } from "../../app";
import { PolicyLinks } from "../../PolicyLinks";
import { fetchLinkPreview } from "../../linkPreview";
import {
  ALL_SUPPORT_CARDS,
  getSupportCards,
  iSupportCard,
} from "../../supportLinks";
import { ArrowOut } from "../ArrowOut";

export const metadata: Metadata = {
  title: "Support",
};

const page = async ({
  params,
}: {
  params: Promise<{ appid: string }>;
}) => {
  const { appid } = await params;

  // Resolve by appid or id/slug; unknown values fall back to every article.
  const app = await getApp(appid);
  const supportLinks: iSupportCard[] = app
    ? getSupportCards(app)
    : ALL_SUPPORT_CARDS;

  if (supportLinks.length === 0) {
    notFound();
  }

  // Fetch link previews for each support URL
  const previews = await Promise.all(
    supportLinks.map((l) => fetchLinkPreview(l.url))
  );

  return (
    <div className="flex-1 px-4 max-w-2xl w-full mx-auto mt-16 mb-12">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Support
      </h1>
      <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
        {app
          ? `Help articles and resources relevant to ${app.name}.`
          : `General help articles for common iOS features.`}
      </p>

      <div className="flex flex-col gap-3">
        {supportLinks.map((card, i) => {
          const preview = previews[i];
          return (
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
        })}
      </div>

      {app?.role === "indie" && app.appid && <PolicyLinks appKey={app.id} />}
    </div>
  );
};

export default page;
