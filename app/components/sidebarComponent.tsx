"use client";

import { useState } from "react";
import { Home, FileText, Settings, Menu, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={`h-screen bg-gray-900 text-white flex transition-all duration-300 ${collapsed ? "w-11" : "w-40"}`}>
      {/* Sidebar Content */}
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <button
          className="p-2 text-gray-400 hover:text-white self-end"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu size={24} /> : <ChevronLeft size={24} />}
        </button>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2 mt-4">
          <SidebarItem icon={Home} label="Dashboard" href="/" collapsed={collapsed} />
          <SidebarItem icon={FileText} label="Documents" href="/docManager" collapsed={collapsed} />
          <SidebarItem icon={Settings} label="Settings" href="/settings" collapsed={collapsed} />
        </nav>
      </div>
    </div>
  );
}

type SidebarItemProps = {
  icon: any;
  label: string;
  href: string;
  collapsed: boolean;
};

const SidebarItem = ({ icon: Icon, label, href, collapsed }: SidebarItemProps) => (
  <Link href={href} className="flex items-center p-2 hover:bg-gray-700 rounded-md">
    <Icon size={24} />
    {!collapsed && <span className="ml-3">{label}</span>}
  </Link>
);
