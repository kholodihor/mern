"use client";

import { usePathname } from "next/navigation";
import { FaGithub, FaTelegram, FaLinkedin } from "react-icons/fa";

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
      <p>&copy; {getCurrentYear} Kholod Ihor. All rights reserved.</p>
      <div className="flex gap-2">
        <a
          href="https://github.com/kholodihor?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://t.me/kholodihor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTelegram />
        </a>
        <a
          href="https://www.linkedin.com/in/ihor-kholod/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Footer;
