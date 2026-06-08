import { Metadata } from "next";
import { fetchLinkPreview } from "../linkPreview";

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

const ALL_SUPPORT_LINKS = [
  { url: STICKER_SUPPORT_URL, fallbackTitle: STICKER_SUPPORT_TITLE },
  { url: SUBSCRIPTION_SUPPORT_URL, fallbackTitle: SUBSCRIPTION_SUPPORT_TITLE },
  { url: WATCH_SUPPORT_URL, fallbackTitle: WATCH_SUPPORT_TITLE },
  { url: PIP_SUPPORT_URL, fallbackTitle: PIP_SUPPORT_TITLE },
];

export const metadata: Metadata = {
  title: "Support | László Tuss",
};

const ArrowOut = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const page = async () => {
  const previews = await Promise.all(
    ALL_SUPPORT_LINKS.map((l) => fetchLinkPreview(l.url))
  );

  return (
    <div className="flex-1 px-4 max-w-2xl w-full mx-auto mt-16 mb-12">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Support
      </h1>
      <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
        General help articles for common iOS features.
      </p>

      <div className="flex flex-col gap-3">
        {ALL_SUPPORT_LINKS.map((card, i) => {
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
    </div>
  );
};

export default page;