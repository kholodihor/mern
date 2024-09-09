"use client";

import { usePathname } from "@/navigation";

const SubHeader = () => {
  const pathname = usePathname();

  if (
    pathname.split("/").includes("admin") ||
    pathname.split("/").includes("login")
  )
    return null;

  return (
    <ul
      className={`absolute top-0 left-0 w-full hidden h-[7vh] py-4 px-6 lg:flex justify-around items-center z-50 bg-black text-xs md:text-sm`}
    >
      <li>Niezależny serwis BMW, Rolls-Royce i MINI</li>
      <li>ul.Przyszłość 2A Stanisławów Pierwszy</li>
      <li>mern.serwis@gmail.com</li>
      <li>509 158 159</li>
      <li>509 159 158</li>
    </ul>
  );
};

export default SubHeader;
