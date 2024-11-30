import { Link } from "@/i18n/routing";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

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
        className={`flex h-16 w-full flex-1 cursor-pointer items-center font-bold gap-3 border-t border-b border-gray pl-[32px] ${isHovered || isActive ? "border-white bg-white text-black" : ""
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
