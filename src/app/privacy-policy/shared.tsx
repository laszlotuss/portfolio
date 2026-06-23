import { getApp } from "@/app/app";
import type { Metadata } from "next";
import PrivacyPolicy from "@/privacy-policy/PrivacyPolicy";

export const getPrivacyPolicyMetadata = async (
  id?: string
): Promise<Metadata> => {
  const app = id ? await getApp(id) : undefined;

  return {
    title: app
      ? `Privacy Policy | ${app.name} | László Tuss`
      : "Privacy Policy | László Tuss",
    ...(app?.icon
      ? {
          openGraph: {
            images: app.icon,
          },
        }
      : {}),
  };
};

export const PrivacyPolicyPage = async ({ id }: { id?: string }) => {
  const app = id ? await getApp(id) : undefined;
  return <PrivacyPolicy app={app?.name} />;
};
