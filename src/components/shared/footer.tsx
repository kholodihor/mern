"use client";

import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();

  if (
    pathname.split("/").includes("admin") ||
    pathname.split("/").includes("login")
  )
    return null;

  const getCurrentYear = new Date().getFullYear();
  return (
    <div className="flex w-full flex-col items-center justify-center border-t border-[#666] p-[1rem]">
      <p className="mb-2">&copy; 2023 - {getCurrentYear} Kholod Ihor</p>
      <div className="flex gap-4">
        <a
          href="https://github.com/kholodihor?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110"
        >
          <FaGithub />
        </a>
        <a
          href="https://t.me/kholodihor"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110"
        >
          <FaTelegram />
        </a>
        <a
          href="https://www.linkedin.com/in/ihor-kholod/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Footer;
