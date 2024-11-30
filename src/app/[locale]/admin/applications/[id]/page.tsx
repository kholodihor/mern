import ApplicationById from "@/components/pages/admin/applications/application-by-id";

const ApplicationByIdPage = ({ params }: { params: { id: string } }) => {
  return <ApplicationById id={params.id} />;
};

export default ApplicationByIdPage;
