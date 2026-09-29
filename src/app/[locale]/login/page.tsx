import Login from "@/components/login/login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
