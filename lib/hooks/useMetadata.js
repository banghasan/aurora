import useSWR from "swr";
import { fetcher } from "../fetcher";

export const useMetadata = (wid, metadata) => {
  const { data, error } = useSWR(
    `/api/metrics/metadata?wid=${wid}&type=${metadata}`,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
