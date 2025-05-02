"use client";

import { useRouter } from "@/i18n/routing";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { CiLogout } from "react-icons/ci";
import { IoMdPhotos } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import { SideBarItem } from "./sidebar-item";

const SideBar = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("User signed out successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <aside className="relative flex h-[80vh] w-[250px] flex-col overflow-auto border-r border-gray-800 bg-black">
      {/* <div className="mb-[2rem] flex items-center justify-center p-2">
        <Link href="/">
          <Image src="/logo.png" alt="MERN logo" width={150} height={150} />
        </Link>
      </div> */}
      <div className="mb-[5rem]">
        <SideBarItem
          className=""
          icon={<TiMessages />}
          iconClassName="text-xl"
          href="/admin/applications"
        >
          Заявки на сервіс
        </SideBarItem>
        <SideBarItem
          className=""
          icon={<IoMdPhotos />}
          iconClassName="text-xl"
          href="/admin/gallery"
        >
          Галерея
        </SideBarItem>
        {/* <SideBarItem
          className=""
          icon={<IoMdPhotos />}
          iconClassName="text-xl"
          href="/admin/testimonials"
        >
          Відгуки
        </SideBarItem> */}
        <SideBarItem
          className=""
          icon={<IoMdPhotos />}
          iconClassName="text-xl"
          href="/admin/news"
        >
          Актуальності
        </SideBarItem>
      </div>
      <button
        onClick={handleSignOut}
        className={`absolute bottom-4 left-[50%] mx-auto mt-[2rem] flex w-[220px] -translate-x-[50%] items-center justify-center gap-2 rounded-md border border-white px-4 py-2 text-xl hover:border-red-700`}
      >
        <CiLogout />
        Вийти
      </button>
    </aside>
  );
};

export default SideBar;
