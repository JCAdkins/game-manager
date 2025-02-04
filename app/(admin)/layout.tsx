import { cookies } from "next/headers";
import { AdminSidebar } from "@/components/admin-sidebar";
import { auth } from "../(auth)/auth";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, /*cookieStore*/ _] = await Promise.all([auth(), cookies()]);
  console.log(_);
  // const isCollapsed = cookieStore.get("sidebar:state")?.value !== "true";

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar user={session?.user} />
      <SidebarInset>
        <SidebarTrigger className="block md:hidden" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
