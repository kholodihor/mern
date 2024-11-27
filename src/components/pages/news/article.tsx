import { Link } from '@/i18n/routing';
import { news } from './data';
import SectionTitle from "@/components/shared/section-title"
import ChevronLeft from '@/components/icons/chevron-left';

const Article = ({ id }: { id: string }) => {
  // const t = useTranslations("News");
  const article = news.find(item => item.id === parseInt(id))
  return (
    <section
      id={`Article ${article?.title}`}
      className="flex flex-col w-full min-h-screen pt-[18vh] md:pt-[25vh] px-[24px] pb-[100px]"
      aria-labelledby={`Article ${article?.title}-title`}
    >
      <SectionTitle id={`Article ${article?.title}-title`} title={article?.title as string} />

      <div className="flex flex-col md:flex-row items-start mt-[10vh] gap-6 md:gap-10">
        <Link href="/news">
          <button className="text-xl md:text-2xl lg:text-3xl flex items-center gap-2">
            <ChevronLeft />
          </button>
        </Link>

        <p className="text-base md:text-lg lg:text-xl text-gray-500 leading-relaxed md:max-w-[85vw]">
          {article?.full_text
            ?.split(".")
            .slice(0, Math.floor(article?.full_text.split(".").length / 3))
            .map((chunk, index, array) => chunk + (index < array.length - 1 ? "." : ""))
            .join(".")}
          <br /> <br />
          {article?.full_text
            ?.split(".")
            .slice(Math.floor(article?.full_text.split(".").length / 3), Math.floor((article?.full_text.split(".").length * 2) / 3))
            .map((chunk, index, array) => chunk + (index < array.length - 1 ? "." : ""))
            .join(".")}
          <br /> <br />
          {article?.full_text
            ?.split(".")
            .slice(Math.floor((article?.full_text.split(".").length * 2) / 3))
            .map((chunk, index, array) => chunk + (index < array.length - 1 ? "." : ""))
            .join(".")}
        </p>



      </div>
    </section>
  )
}

export default Article
