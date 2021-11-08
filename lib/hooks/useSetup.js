import useSWR from "swr";
import { fetcher } from "../fetcher";

export const useSetup = () => {
  const { data, error } = useSWR("/api/setup", fetcher);

  return {
    setup: data,
    isLoading: !error && !data,
    isError: error,
  };
};
