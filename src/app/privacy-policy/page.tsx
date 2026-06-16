import { redirect } from "next/navigation";
import { getApp } from "../app";

type SearchParams = Promise<{ app?: string; appid?: string; id?: string }>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { app: appParam, appid, id } = await searchParams;
  if (appid) redirect(`https://catnip.media/privacypolicy?appid=${appid}`);
  const slug = appParam || id;
  if (slug) {
    const app = await getApp(slug);
    if (app?.appid) redirect(`https://catnip.media/privacypolicy?appid=${app.appid}`);
  }
  redirect("https://catnip.media/privacypolicy");
};

export default page;
