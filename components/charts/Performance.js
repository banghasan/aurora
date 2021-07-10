import dynamic from "next/dynamic";
import { range } from "lodash";
import { Jumbo } from "./Jumbo";
import { useGraph } from "../../hooks/useGraph";
import { useTranslation } from "next-i18next";

const Loader = dynamic(() => import("../Loader").then((mod) => mod.Loader), { ssr: false });

const LoaderWrapper = () => (
  <dl className="grid grid-cols-2 gap-5 sm:grid-cols-4 sm:divide-x divide-gray-200 dark:divide-gray-800">
    {range(4).map((el, key) => (
      <Loader key={key} width={200} height={116} />
    ))}
  </dl>
);

export const Performance = ({ url, timeRange }) => {
  const { t } = useTranslation("common");
  const { graph, isLoading, isError } = useGraph(url, timeRange);

  if (isLoading) return <LoaderWrapper />;
  if (isError) return <div>failed to load</div>;

  return (
    <dl className="grid grid-cols-2 gap-5 sm:grid-cols-4 sm:divide-x divide-gray-200 dark:divide-gray-800">
      <Jumbo title={t("jumbo-total-views")} value={graph.pageViews.cp} />
      <Jumbo title={t("jumbo-unique-visitors")} value={graph.uniqueVisitors.cp} />
      <Jumbo title={t("jumbo-bounces")} value={graph.bounceRate.cp} />
      <Jumbo title={t("jumbo-avg-visit-time")} value={`${graph.visitDuration.cp}s`} />
    </dl>
  );
};
