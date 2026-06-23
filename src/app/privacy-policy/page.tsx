import type { Metadata } from "next";
import { PrivacyPolicyPage, getPrivacyPolicyMetadata } from "./shared";

type SearchParams = Promise<{ app?: string; appid?: string; id?: string }>;

const resolveParam = async (searchParams: SearchParams) => {
  const { app, appid, id } = await searchParams;
  return app || appid || id;
};

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> => {
  return getPrivacyPolicyMetadata(await resolveParam(searchParams));
};

const page = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  return <PrivacyPolicyPage id={await resolveParam(searchParams)} />;
};

export default page;
