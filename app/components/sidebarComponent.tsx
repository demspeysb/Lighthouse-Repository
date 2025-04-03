"use client";

import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Map, FileText, Settings, Menu, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';

export default function Sidebar() {
  /**
   * Sidebar component with collapsible functionality.
   * This component provides navigation links and a toggle button
   * to expand or collapse the sidebar.
   */
  const [collapsed, setCollapsed] = useState(true); // State to track sidebar collapse status

  return (
    <div className={`fixed top-0 left-0 h-screen bg-gray-900 text-white transition-all duration-300 z-50 ${collapsed ? "w-11" : "w-40"}`}>
      {/* Sidebar Content */}
      <div className="flex flex-col h-full">
        {/* Toggle Button to expand/collapse the sidebar */}
        <button
          className="p-2 text-gray-400 hover:text-white self-end"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu size={24} /> : <ChevronLeft size={24} />}
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2 mt-4">
          <SidebarItem icon={Map} label="Dashboard" href="/" collapsed={collapsed} />
          <SidebarItem icon={FileText} label="Documents" href="/pages/docManager" collapsed={collapsed} />
          <SidebarItem icon={Settings} label="Settings" href="/settings" collapsed={collapsed} />
        </nav>

        {/* Logo Display */}
        <div className="mt-auto flex justify-center items-center pb-4">
          <Image
            src="/images/OsageLogo.png"
            width={collapsed ? 80 : 200} // Adjust width based on collapse state
            height={collapsed ? 80 : 200}
            alt="Osage County Logo"
          />
        </div>
      </div>
    </div>
  );
}

// Type definition for SidebarItem component props
type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
  collapsed: boolean;
};

/**
 * SidebarItem Component - Represents an individual navigation link inside the sidebar.
 * @param {object} props - SidebarItemProps including icon, label, href, and collapsed state.
 */
const SidebarItem = ({ icon: Icon, label, href, collapsed }: SidebarItemProps) => (
  <Link href={href} className="flex items-center p-2 hover:bg-gray-700 rounded-md">
    <Icon size={24} />
    {!collapsed && <span className="ml-3">{label}</span>}
  </Link>
);
