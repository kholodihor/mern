interface ITitleProps {
  title: string;
  id: string;
  as?: "h1" | "h2" | "h3";
}

const SectionTitle = ({ title, id, as: Tag = "h2" }: ITitleProps) => {
  return (
    <Tag
      id={id}
      className="mx-auto w-full max-w-[800px] text-center text-3xl font-semibold uppercase tracking-wide text-white sm:mb-12 sm:text-4xl md:mb-10 lg:text-5xl xl:text-6xl"
    >
      {title}
    </Tag>
  );
};

export default SectionTitle;
