import Link from "next/link";

export const PolicyLinks = ({ appKey }: { appKey: string }) => (
  <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-medium text-gray-500 dark:text-gray-400">
    <Link
      href={`/privacy-policy/${appKey}`}
      className="text-indigo-500 hover:underline underline-offset-2"
    >
      Privacy Policy
    </Link>
    <span aria-hidden>·</span>
    <Link
      href={`/privacy-policy/${appKey}#terms`}
      className="text-indigo-500 hover:underline underline-offset-2"
    >
      Terms of Use
    </Link>
  </div>
);
