'use client';

const Footer = () => {
  const getCurrentYear = new Date().getFullYear().toString();
  return (
    <div className="w-full p-[2rem] flex flex-col justify-center items-center border-t border-[#666]">
      <p>Copyright &copy;{getCurrentYear} byCold</p>
    </div>
  );
};

export default Footer;
