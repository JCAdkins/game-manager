import { cookies } from "next/headers";
import { AppSidebar } from "@/components/app-sidebar";
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
  const session = await auth();
  // const isCollapsed = cookieStore.get("sidebar:state")?.value !== "true";

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar user={session?.user} />
      <SidebarTrigger />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
