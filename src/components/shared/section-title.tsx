interface ITitleProps {
  title: string;
  id: string;
}

const SectionTitle = ({ title, id }: ITitleProps) => {
  return (
    <h2
      id={id}
      className="mx-auto w-full max-w-[800px] text-center text-3xl font-semibold uppercase tracking-wide text-white sm:mb-12 sm:text-4xl md:mb-10 lg:text-5xl xl:text-6xl"
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
