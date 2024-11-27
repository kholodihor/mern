interface ITitleProps {
  title: string;
  id: string;
}

const SectionTitle = ({ title, id }: ITitleProps) => {
  return (
    <h2 id={id} className="text-white text-[40px] md:text-[66px] 
    uppercace text-center font-[600] uppercase mx-auto w-full max-w-[50vw]">
      {title}
    </h2>
  )
}

export default SectionTitle
