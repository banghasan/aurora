import useSWR from "swr";
import { fetcher } from "../fetcher";

export function useMeWebsites() {
  const { data, error } = useSWR("/api/me/websites", fetcher);

  return {
    websites: data,
    isLoading: !error && !data,
    isError: error,
  };
}
