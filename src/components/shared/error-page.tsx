import { useTranslations } from "next-intl";
import { MdErrorOutline } from "react-icons/md";

const ErrorPage = ({ reset }: { reset: () => void }) => {
  const t = useTranslations("error");
  return (
    <div className="flex min-h-[100vh] w-full flex-col items-center justify-center text-white">
      <span className="mb-[24px] text-[60px] text-red-700 md:text-[180px]">
        <MdErrorOutline />
      </span>
      <p className="font-tahoma mb-[48px] text-center text-[20px] font-semibold xl:text-[24px]">
        {t("error")}
      </p>
      <button
        onClick={reset}
        className="h-[54px] min-w-[272px] whitespace-nowrap rounded-[5px] border border-gray-700 bg-black px-4 py-2 text-[20px] font-bold text-white hover:border-green-700"
      >
        {t("tryagain")}
      </button>
    </div>
  );
};

export default ErrorPage;
