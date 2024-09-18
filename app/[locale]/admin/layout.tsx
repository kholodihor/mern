"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUsers } from "@/hooks/swr/useUsers";
import SideBar from "@/components/admin/SideBar";
import Spiral from "@/components/spiral/Spiral";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const session = useSession();
  const users = useUsers().users;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      session.data &&
      users &&
      session?.status === "authenticated" &&
      users?.[0].email === session.data.user?.email
    ) {
      router.replace("/admin/applications");
      setLoading(false);
    } else {
      router.replace("/login");
    }
  }, [session, router, users]);

  if (loading) return <Spiral />;

  return (
    <div className="flex bg-black text-white pt-[5vh]">
      <SideBar />
      <div className="flex-1 max-h-[95vh] overflow-auto">{children}</div>
    </div>
  );
}
