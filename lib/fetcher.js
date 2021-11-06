export function fetcher(url) {
  return fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
