import { useTranslation } from "next-i18next";
import { Panel } from "./Panel";

const ProgressListItem = ({ percentage, children }) => (
  <div className="space-y-3">
    {children}
    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-lg">
      <div className="rounded-lg bg-blue-500 h-1 sm:h-2" style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

export const ProgressList = ({ title, data }) => {
  const { t } = useTranslation("common");

  return (
    <Panel>
      <div className="space-y-7">
        <div className="text-black dark:text-white font-medium">
          <div className="grid grid-cols-4 text-black dark:text-white text-sm">
            <div className="col-span-2 truncate">{title}</div>
            <div className="col-span-1 text-right">{t("progress-list-views")}</div>
            <div className="col-span-1 text-right">{t("progress-list-unique-views")}</div>
          </div>
        </div>
        <div className="space-y-5">
          {data.length ? (
            data.map((row, rowKey) => (
              <div key={rowKey} className="space-y-3">
                <ProgressListItem percentage={row.percentage}>
                  <div className="grid grid-cols-4 text-black dark:text-white text-sm">
                    {configuration.header &&
                      configuration.header.columns.map((rowColumn, rowColumnKey) => (
                        <div key={rowColumnKey} className={rowColumn.className}>
                          {row[rowColumn.accessor]}
                        </div>
                      ))}
                  </div>
                </ProgressListItem>
              </div>
            ))
          ) : (
            <div className="text-sm text-black dark:text-white">{t("progress-list-no-data")}</div>
          )}
        </div>
      </div>
    </Panel>
  );
};
