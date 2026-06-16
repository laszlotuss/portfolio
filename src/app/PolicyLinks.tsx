export const PolicyLinks = ({ appid }: { appid: string }) => (
  <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-medium text-gray-500 dark:text-gray-400">
    <a
      href={`https://catnip.media/privacypolicy?appid=${appid}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-500 hover:underline underline-offset-2"
    >
      Privacy Policy
    </a>
    <span aria-hidden>·</span>
    <a
      href={`https://catnip.media/privacypolicy?appid=${appid}#EULA`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-500 hover:underline underline-offset-2"
    >
      Terms of Use
    </a>
  </div>
);
