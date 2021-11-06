import useSWR from "swr";
import { fetcher } from "../fetcher";

export const useMeWebsite = (id) => {
  const { data, error } = useSWR(id ? `/api/websites/${id}` : null, fetcher);

  return {
    website: data,
    isLoading: !error && !data,
    isError: error,
  };
};
