import { redirect } from "next/navigation";
import { getApp } from "../../app";

const index = async ({ params }: { params: Promise<{ app: string }> }) => {
  const { app: id } = await params;
  const app = await getApp(id);
  if (app?.appid) {
    redirect(`https://catnip.media/privacypolicy?appid=${app.appid}`);
  }
  redirect("https://catnip.media/privacypolicy");
};

export default index;
