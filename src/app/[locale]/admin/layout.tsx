import SideBar from "@/components/pages/admin/SideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex bg-black text-white pt-[5vh]">
      <SideBar />
      <div className="flex-1 max-h-[95vh] overflow-auto">{children}</div>
    </div>
  );
}
