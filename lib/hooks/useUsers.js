import useSWR from "swr";
import { fetcher } from "../fetcher";

export function useUsers() {
  const { data, error } = useSWR("/api/users", fetcher);

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  };
}
