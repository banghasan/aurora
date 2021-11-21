import useSWR from "swr";
import { fetcher } from "../fetcher";

export const useStatistics = (wid, filters) => {
  // Todo: filters
  const { data, error } = useSWR(`/api/metrics/statistics?wid=${wid}`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
