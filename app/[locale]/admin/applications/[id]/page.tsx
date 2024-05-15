import ApplicationById from "@/components/admin/applications/ApplicationById";
import React from "react";

const ApplicationByIdPage = ({ params }: { params: { id: string } }) => {
  return <ApplicationById id={params.id} />;
};

export default ApplicationByIdPage;
