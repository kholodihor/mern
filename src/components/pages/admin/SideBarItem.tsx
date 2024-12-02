import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { Link } from "@/i18n/routing";

interface SideBarItemProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  iconClassName?: string;
  className: string;
}

export const SideBarItem: React.FC<SideBarItemProps> = ({
  href,
  children,
  icon,
  iconClassName = "",
  className = "",
}) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const hrefArr = href.split("/");

  const realHref = hrefArr[hrefArr.length - 1];

  const isActive = pathname.split("/").includes(realHref);

  return (
    <Link className="flex w-full" href={href}>
      <li
        className={`border-gray flex h-16 w-full flex-1 cursor-pointer items-center gap-3 border-b border-t pl-[32px] font-bold ${
          isHovered || isActive ? "border-white bg-white text-black" : ""
        } ${className} `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {icon &&
          React.cloneElement(icon as React.ReactElement, {
            className: `${iconClassName} ${isHovered ? "text-black" : ""}`,
          })}
        {children}
      </li>
    </Link>
  );
};
