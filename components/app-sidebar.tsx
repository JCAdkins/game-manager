"use client";

import type { User } from "next-auth";
import { SidebarHistory } from "@/components/sidebar-history";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar({ user }: { user: User | undefined }) {
  return (
    <Sidebar
      className="group-data-[side=left]:border-r-0 md:w-[300px]"
      collapsible="icon"
      variant="sidebar"
    >
      <SidebarHeader>
        <span className="truncate">Game History</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarHistory user={user} />
      </SidebarContent>

      <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
