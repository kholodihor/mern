"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { TiMessages } from "react-icons/ti";
import { FaRegNewspaper } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { SideBarItem } from "./SideBarItem";

const SideBar = () => {
  return (
    <aside className="relative min-h-[95vh] w-[250px] overflow-auto border-r border-gray-800 bg-black flex flex-col">
      <div className="flex justify-center items-center p-2 mb-[2rem]">
        <Link href="/">
          <Image src="/logo.png" alt="MERN logo" width={150} height={150} />
        </Link>
      </div>
      <div className="mb-[5rem]">
        <SideBarItem
          className=""
          icon={<TiMessages />}
          iconClassName="text-xl"
          href="/admin/applications"
        >
          Заявки на сервіс
        </SideBarItem>
        {/* <SideBarItem
          className=""
          icon={<FaRegNewspaper />}
          iconClassName="text-xl"
          href="/admin/news"
        >
          Новини
        </SideBarItem> */}
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className={`absolute bottom-4 left-[50%] -translate-x-[50%] flex gap-2 justify-center items-center text-xl rounded-md border border-white hover:border-red-700 py-2 px-4 w-[220px] mt-[2rem] mx-auto`}
      >
        <CiLogout />
        Вийти
      </button>
    </aside>
  );
};

export default SideBar;
