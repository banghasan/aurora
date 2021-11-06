import useSWR from "swr";
import { fetcher } from "../fetcher";

export function useAuth() {
  const { data, error } = useSWR("/api/me", fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
