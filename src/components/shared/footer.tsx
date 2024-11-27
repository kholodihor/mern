"use client";

import { usePathname } from "next/navigation";
import { FaGithub, FaTelegram } from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();

  if (
    pathname.split("/").includes("admin") ||
    pathname.split("/").includes("login")
  )
    return null;

  const getCurrentYear = new Date().getFullYear();
  return (
    <div className="w-full p-[1rem] flex flex-col justify-center items-center border-t border-[#666]">
      <p>&copy; {getCurrentYear} Kholod Ihor. All rights reserved.</p>
      <div className="flex gap-2 ">
        <a href="https://github.com/kholodihor?tab=repositories" target="_blank"
          rel="noopener noreferrer"><FaGithub /></a>
        <a href="https://t.me/kholodihor" target="_blank"
          rel="noopener noreferrer"><FaTelegram /></a>
      </div>
    </div>
  );
};

export default Footer;
