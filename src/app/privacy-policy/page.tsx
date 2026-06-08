import type { Metadata } from "next";
import { PrivacyPolicyPage, getPrivacyPolicyMetadata } from "./shared";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Promise<{ app?: string }>;
}): Promise<Metadata> => {
  const { app } = await searchParams;
  return getPrivacyPolicyMetadata(app);
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ app?: string }>;
}) => {
  const { app } = await searchParams;
  return <PrivacyPolicyPage id={app} />;
};

export default page;
