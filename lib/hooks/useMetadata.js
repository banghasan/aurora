import useSWR from "swr";
import { fetcher } from "../fetcher";

export const useMetadata = (metadata, filters) => {
  const qs = new URLSearchParams(filters).toString();
  const { data, error } = useSWR(
    qs ? `/api/metrics/metadata?type=${metadata}&${qs}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
