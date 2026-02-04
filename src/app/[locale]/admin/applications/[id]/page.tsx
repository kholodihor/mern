import ApplicationById from "@/components/admin/applications/application-by-id";
import type { Locale } from "@/i18n/routing";

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
