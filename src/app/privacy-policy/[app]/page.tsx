import type { Metadata } from "next";
import { PrivacyPolicyPage, getPrivacyPolicyMetadata } from "../shared";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> => {
  const { app } = await params;
  return getPrivacyPolicyMetadata(app);
};

const page = async ({ params }: { params: Promise<{ app: string }> }) => {
  const { app } = await params;
  return <PrivacyPolicyPage id={app} />;
};

export default page;
