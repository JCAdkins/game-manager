"use client";

import type { User } from "next-auth";
import { SidebarHistory } from "@/components/sidebar-history";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  // SidebarMenuButton,
  SidebarMenu,
} from "@/components/ui/sidebar";

export function AppSidebar({ user }: { user: User | undefined }) {
  return (
    <Sidebar
      className="group-data-[side=left]:border-r-0 md:w-[300px]"
      // side="left"
      collapsible="icon"
      variant="sidebar"
      // className="md:w-[300px]"
    >
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex flex-row justify-between items-center">
            <span className="text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer">
              Game History
            </span>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarHistory user={user} />
      </SidebarContent>
      <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
