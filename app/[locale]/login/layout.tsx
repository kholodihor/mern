export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex bg-black text-white">{children}</div>;
}
