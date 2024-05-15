import useSWR from "swr";
import { AxiosError } from "axios";
import {
  fetchApplications,
  deleteApplicationFetcher,
} from "@/utils/api/applications";
import { IApplicationResponse } from "@/types";

export const useApplications = () => {
  const { data, error, isLoading, mutate } = useSWR<
    IApplicationResponse[],
    AxiosError
  >("/applications", fetchApplications, {});

  const getApplicationById = (id: string) => {
    if (Array.isArray(data) && data.length) {
      return data?.find((item: IApplicationResponse) => item.id === id);
    }
  };

  const deleteApplication = async (id: string) => {
    try {
      const updatedApplications = data?.filter((item) => item.id !== id);
      await deleteApplicationFetcher(id);
      mutate(updatedApplications);
    } catch (error) {
      throw Promise.reject();
    }
  };

  return {
    applications: data,
    isLoading,
    isError: error,
    getApplicationById,
    deleteApplication,
  };
};
