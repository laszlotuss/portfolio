import Link from "next/link";
import { socials, appStore } from "./socials";

const iconClasses =
  "w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-gray-600 hover:text-indigo-500 dark:bg-gray-700 dark:text-indigo-300";

const CreditLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-indigo-500 hover:underline underline-offset-2"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="max-w-4xl mx-auto w-full px-4 mb-12 pt-8 border-t border-gray-300 dark:border-gray-600">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h2 className="text-xl font-black text-indigo-500">László Tuss</h2>
          <p className="text-md font-medium text-gray-500 dark:text-gray-400">
            Budapest, Hungary
          </p>
          <div className="mt-2 flex items-center gap-3">
            <Link
              href="/about"
              className="inline-block text-sm font-semibold text-indigo-500 hover:underline underline-offset-2"
            >
              About
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-500 hover:underline underline-offset-2"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>Support</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {[appStore, ...socials].map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={iconClasses}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d={social.icon} />
              </svg>
            </a>
          ))}
        </div>
      </div>
      <p className="mt-8 text-sm font-medium text-gray-400 dark:text-gray-500">
        Made by{" "}
        <CreditLink href="https://laszlotuss.com">László Tuss</CreditLink> @{" "}
        <CreditLink href="https://catnip.media">Catnip Media</CreditLink> and{" "}
        <CreditLink href="https://szalay.me">Balázs Szalay</CreditLink> @{" "}
        <CreditLink href="https://actegon.com">Actegon</CreditLink> · 2026
      </p>
    </footer>
  );
};

export default Footer;
