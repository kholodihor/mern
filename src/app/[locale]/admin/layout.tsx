import SideBar from "@/components/pages/admin/SideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-black pt-[5vh] text-white">
      <SideBar />
      <div className="max-h-[95vh] flex-1 overflow-auto">{children}</div>
    </div>
  );
}
