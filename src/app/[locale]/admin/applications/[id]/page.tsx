import { Locale } from "@/i18n/routing";
import ApplicationById from "@/components/pages/admin/applications/application-by-id";

type ApplicationPageParams = {
  params: Promise<{
    locale: Locale;
    id: string;
  }>;
};

const ApplicationByIdPage = async ({ params }: ApplicationPageParams) => {
  const resolvedParams = await params;
  return <ApplicationById id={resolvedParams.id} />;
};

export default ApplicationByIdPage;
