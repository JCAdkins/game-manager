import { SidebarMenuButton, useSidebar } from "./ui/sidebar";

const SidebarToggleButton = () => {
  const { toggleSidebar, state } = useSidebar();

  return (
    <SidebarMenuButton
      onClick={toggleSidebar}
      isActive={state === "collapsed"}
      tooltip="Toggle Sidebar"
    >
      <span>{state === "collapsed" ? "Expand" : "Collapse"}</span>
    </SidebarMenuButton>
  );
};

export default SidebarToggleButton;
