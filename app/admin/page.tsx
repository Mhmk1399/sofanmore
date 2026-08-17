import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";

import LeadAdminDashboard from "@/components/admin/LeadAdminDashboard";
import {
  AUTH_COOKIE_NAME,
  verifyAuthSessionToken,
} from "@/lib/auth-session";
import { getUserById } from "@/lib/user-repository";

export const metadata: Metadata = {
  title: "Lead Admin | Sofa N More",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = verifyAuthSessionToken(
    cookieStore.get(AUTH_COOKIE_NAME)?.value || "",
  );

  if (!session) {
    redirect("/login?next=%2Fadmin");
  }

  const user = await getUserById(new ObjectId(session.userId));

  if (!user?.isActive || user.role !== "ADMIN") {
    redirect("/login?next=%2Fadmin");
  }

  return <LeadAdminDashboard initialUser={user} />;
}
