import { useTranslations } from "next-intl"
const LoadingError = () => {
  const t = useTranslations("Error")
  return (
    <section className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[17vh] lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-red-500">{t("error")}</p>
        </div>
      </div>
    </section>
  )
}

export default LoadingError
