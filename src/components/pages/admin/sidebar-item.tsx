import { Link } from "@/i18n/routing";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

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
        className={clsx(
          "border-gray flex h-16 w-full flex-1 cursor-pointer items-center gap-3 border-b border-t pl-[32px] font-bold",
          {
            "border-white bg-white text-black": isHovered || isActive,
          },
          className
        )}
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
