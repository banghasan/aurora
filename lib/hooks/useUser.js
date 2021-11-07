import useSWR from "swr";
import { fetcher } from "../fetcher";

export const useUser = (id) => {
  const { data, error } = useSWR(id ? `/api/users/${id}` : null, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
