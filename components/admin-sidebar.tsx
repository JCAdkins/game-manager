"use client";

import type { User } from "next-auth";
import { useRouter } from "next/navigation";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  //   SidebarGroup,
  //   SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

export function AdminSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  const options = [
    { title: "Game List", func: () => console.log("Game List") },
    { title: "More Games", func: () => console.log("More Games") },
    {
      title: "Something else for admin.",
      func: () => console.log("Something else."),
    },
  ];

  return (
    <Sidebar
      className="group-data-[side=left]:border-r-0 md:w-[300px]"
      collapsible="icon"
      variant="sidebar"
    >
      <SidebarHeader>Admin Dashboard</SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup className="text-zinc-400">
            {options.map((option, ind) => {
              return (
                <SidebarMenuItem key={ind}>
                  <SidebarMenuButton onClick={option.func}>
                    {option.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => router.push("/arcade")}>
                Arcade
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
