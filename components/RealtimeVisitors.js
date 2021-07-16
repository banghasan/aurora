import useTranslation from "next-translate/useTranslation";
import { useRealtime } from "../hooks/useRealtime";

export const RealtimeVisitors = ({ seed }) => {
  const { visitors, isLoading, isError } = useRealtime({ seed });
  const { t } = useTranslation("common");

  if (isLoading) return <div>Loading..</div>;
  if (isError) return <div>failed to load</div>;

  return (
    <div className="flex items-center">
      <span className="mr-3 flex relative h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
      </span>
      <div className="text-black dark:text-white text-sm">
        {t("realtime-current-visitors")}: {visitors.visitors}
      </div>
    </div>
  );
};
