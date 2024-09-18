import axios from "@/config/axios";
import { IApplication, IApplicationResponse } from "@/types";

export const fetchApplications = () =>
  axios.get("/applications").then((res) => res.data);

export const deleteApplicationFetcher = (id: string) =>
  axios.delete(`/applications/${id}`).then((res) => res.data);

export const updateApplication = async (id: string, status: string) => {
  console.log(id, status);
  try {
    const response = await axios.patch<IApplicationResponse>(
      `/applications/${id}`,
      status,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
