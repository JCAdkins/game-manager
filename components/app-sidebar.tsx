"use client";

import type { User } from "next-auth";
import { useRouter } from "next/navigation";
import { SidebarHistory } from "@/components/sidebar-history";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import SidebarToggleButton from "./sidebar-toggle-button";

export function AppSidebar({ user }: { user: User | undefined }) {
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
              Game History
            </span>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <div className="w-[300px] h-[200px] bg-blue-900 rounded-lg">
          This is an example game.
        </div> */}
        <SidebarHistory user={user} />
      </SidebarContent>
      <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
