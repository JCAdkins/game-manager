import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export const Sidebar = () => {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <div className="flex rounded-lg bg-white text-black">
              This is a game.
            </div>
            <div className="flex rounded-lg bg-white text-black">
              This is a different game.
            </div>
            <div className="flex rounded-lg bg-white text-black">
              This is a different game.
            </div>
            <div className="flex rounded-lg bg-white text-black">
              This is a different game.
            </div>
            <div className="flex rounded-lg bg-white text-black">
              This is a different game.
            </div>
            <div className="flex rounded-lg bg-white text-black">
              This is a different game.
            </div>
            <div className="flex rounded-lg bg-white text-black">
              This is a different game.
            </div>
            <div className="flex rounded-lg bg-white text-black">
              This is a different game.
            </div>
            <div className="flex rounded-lg bg-white text-black">
              This is a different game.
            </div>
            <div className="flex rounded-lg bg-white text-black">
              This is a different game.
            </div>
            <div className="flex rounded-lg bg-white text-black">
              This is a different game.
            </div>
            <div className="flex rounded-lg bg-white text-black">
              This is a different game.
            </div>
            <div className="flex rounded-lg bg-white text-black">
              This is a different game.
            </div>
            <div className="flex rounded-lg bg-white text-black">
              This is a different game. This is a different game. This is a
              different game. This is a different game. This is a different
              game. This is a different game.
            </div>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};
