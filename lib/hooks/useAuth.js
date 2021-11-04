import useSWR from "swr";

export function useAuth() {
  const fetcher = (url) => {
    return fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  const { data, error } = useSWR("/api/me", fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
