interface ITitleProps {
  title: string;
  id: string;
}

const SectionTitle = ({ title, id }: ITitleProps) => {
  return (
    <h2
      id={id}
      className="uppercace mx-auto w-full max-w-[50vw] text-center text-[40px] font-[600] uppercase text-white md:text-[66px]"
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
