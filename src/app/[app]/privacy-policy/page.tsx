import type { Metadata } from "next";
import {
  PrivacyPolicyPage,
  getPrivacyPolicyMetadata,
} from "@/app/privacy-policy/shared";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> => {
  const { app } = await params;
  return getPrivacyPolicyMetadata(app);
};

const index = async ({ params }: { params: Promise<{ app: string }> }) => {
  const { app } = await params;
  return <PrivacyPolicyPage id={app} />;
};

export default index;
