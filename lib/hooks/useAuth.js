import axios from "axios";
import useSWR from "swr";
import { fetcher } from "../fetcher";

export function useAuth() {
  const { data, error } = useSWR("/api/me", fetcher);

  // TODO: FIND A BETTER WAY TO DO THIS, I WANT TO ENCAPSULATE ONLY IN ONE FETCHER AND NO MORE USING AXIOS
  const signIn = async (data) => {
    // TODO: change to signin
    return axios.post("/api/auth/login", data);
  };

  const signOut = async () => {
    // TODO: change to signout
    return axios.post("/api/auth/logout");
  };

  const setUp = async (data) => {
    return axios.post("/api/setup", data);
  };

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    signIn,
    signOut,
    setUp,
  };
}
