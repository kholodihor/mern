import SideBar from "@/components/admin/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-black pt-[15vh] text-white">
      <SideBar />
      <div className="max-h-[80vh] flex-1 overflow-auto">{children}</div>
    </div>
  );
}
