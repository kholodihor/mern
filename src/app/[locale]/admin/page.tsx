'use client'
import { useRouter } from "@/i18n/routing";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const AdminPage = () => {
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/admin/applications");
    } else {
      router.push("/login");
    }
  }, [user, router]);

  return null
}

export default AdminPage
