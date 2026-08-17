import type { Metadata } from "next";

import LoginPageContent from "@/components/auth/LoginPageContent";

export const metadata: Metadata = {
  title: "Login | Sofa N More",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginPageContent />;
}
