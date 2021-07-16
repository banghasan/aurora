import { default as NextLink } from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useMeWebsites } from "../hooks/useMeWebsites";

const WebsiteCard = ({ item: website }) => {
  const { t } = useTranslation("common");

  return (
    <div className="w-full border border-gray-200 dark:border-gray-800 rounded-lg p-4 sm:p-6 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
      <div className="flex items-center justify-between space-x-3.5 sm:space-x-5 lg:space-x-3.5 xl:space-x-5">
        <div className="min-w-0 flex-auto space-y-3">
          <div>
            <p className="text-blue-600 dark:text-blue-400 text-xs sm:text-base lg:text-sm xl:text-base font-semibold font-mono">
              {website.url}
            </p>
            <h2 className="text-black dark:text-white text-sm sm:text-xl lg:text-base xl:text-xl font-semibold truncate">
              {website.name}
            </h2>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium space-x-5">
            <NextLink href={`/websites/${website.seed}/edit`}>
              <a>{t("edit-website")}</a>
            </NextLink>
            <NextLink href={`/websites/${website.seed}`}>
              <a>{t("dashboard-website")}</a>
            </NextLink>
          </div>
        </div>
        <div className="text-black dark:text-white text-xs sm:text-base font-medium">
          {website.shared ? t("public-website") : t("private-website")}
        </div>
      </div>
    </div>
  );
};

export const Websites = () => {
  const { websites, isLoading, isError } = useMeWebsites();

  if (isLoading) return <div>Loading..</div>;
  if (isError) return <div>failed to load</div>;

  return (
    <div className="grid sm:grid-cols-2 gap-4 w-full">
      {websites.map((website) => (
        <WebsiteCard key={website.seed} item={website} />
      ))}
    </div>
  );
};
