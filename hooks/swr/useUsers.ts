import useSWR from "swr";
import { AxiosError } from "axios";
import axios from "@/config/axios";
import { IUser } from "@/types";

const fetchUsers = () => axios.get("/users").then((res) => res.data);

export const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR<IUser[], AxiosError>(
    "/user",
    fetchUsers,
    {}
  );
  return {
    users: data,
    isLoading,
    error,
  };
};
