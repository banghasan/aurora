import useSWR from "swr";
import { fetcher } from "../fetcher";

export const useMe = () => {
  const { data, error } = useSWR("/api/me", fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
