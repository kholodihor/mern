"use client";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (
    pathname.split("/").includes("admin") ||
    pathname.split("/").includes("login")
  )
    return null;

  const getCurrentYear = new Date().getFullYear().toString();
  return (
    <div className="w-full p-[1rem] flex flex-col justify-center items-center border-t border-[#666]">
      <p>{getCurrentYear} by KholodIhor</p>
    </div>
  );
};

export default Footer;
