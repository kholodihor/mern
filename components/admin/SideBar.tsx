"use client";

import { signOut } from "next-auth/react";
import { TiMessages } from "react-icons/ti";
import { CiLogout } from "react-icons/ci";
import { SideBarItem } from "./SideBarItem";

const SideBar = () => {
  return (
    <aside className="min-h-[100vh] w-[250px] overflow-auto border-r border-gray-800 bg-black pt-[2rem] flex flex-col">
      <div className="mb-[5rem]">
        <SideBarItem
          className=""
          icon={<TiMessages />}
          iconClassName="text-xl"
          href="/admin/applications"
        >
          Заявки на сервіс
        </SideBarItem>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className={`flex gap-2 justify-center items-center text-xl rounded-md border border-white hover:border-red-700 py-2 px-4 w-[220px] mt-[2rem] mx-auto`}
      >
        <CiLogout />
        Вийти
      </button>
    </aside>
  );
};

export default SideBar;
