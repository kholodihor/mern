"use client";

import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    router.replace("/admin/applications");
  }, [router]);

  return null;
};

export default AdminPage;
