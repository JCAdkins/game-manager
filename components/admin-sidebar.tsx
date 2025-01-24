"use client";

import type { User } from "next-auth";
import { useRouter } from "next/navigation";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  //   SidebarGroup,
  //   SidebarGroupContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";

export function AdminSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar
      /*className="group-data-[side=left]:border-r-0*/ side="left"
      collapsible="icon"
      variant="sidebar"
      className="md:w-[300px]"
    >
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex flex-row justify-between items-center">
            <span className="text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer">
              Admin Dashboard
            </span>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div>Games</div>
        <div>Something else for admin.</div>
      </SidebarContent>
      <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
