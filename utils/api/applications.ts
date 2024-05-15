import axios from "@/config/axios";
import { IApplication, IApplicationResponse } from "@/types";

export const fetchApplications = () =>
  axios.get("/applications").then((res) => res.data);

export const deleteApplicationFetcher = (id: string) =>
  axios.delete(`/applications/${id}`).then((res) => res.data);

export const createApplication = async (application: IApplication) => {
  try {
    const response = await axios.post<IApplicationResponse>(
      "/applications",
      application,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
