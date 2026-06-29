interface ITitleProps {
  title: string;
  id: string;
  as?: "h1" | "h2" | "h3";
  titleWithLocation?: string;
}

const SectionTitle = ({ title, id, as: Tag = "h2", titleWithLocation }: ITitleProps) => {
  return (
    <Tag
      id={id}
      className="mx-auto w-full max-w-[800px] text-center text-3xl font-semibold uppercase tracking-wide text-white sm:mb-12 sm:text-4xl md:mb-10 lg:text-5xl xl:text-6xl"
    >
      {title}
      {titleWithLocation && (
        <span className="sr-only">{titleWithLocation}</span>
      )}
    </Tag>
  );
};

export default SectionTitle;
