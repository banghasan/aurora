import useSWR from "swr";
import { fetcher } from "../fetcher";

export const useStatistics = (filters) => {
  const qs = new URLSearchParams(filters).toString();
  const { data, error } = useSWR(
    qs ? `/api/metrics/statistics?${qs}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
