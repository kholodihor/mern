interface ITitleProps {
  title: string;
  id: string;
}

const SectionTitle = ({ title, id }: ITitleProps) => {
  return (
    <h2
      id={id}
      className="mx-auto mb-10 sm:mb-12 w-full max-w-[800px] text-center text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold uppercase text-white tracking-wide"
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
