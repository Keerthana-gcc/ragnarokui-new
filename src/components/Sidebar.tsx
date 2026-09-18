"use client";

import {
  Home,
  Bot,
  FolderGit2,
  Bug,
  ShieldAlert,
  Network,
} from "lucide-react";

const menu = [
  { icon: Home, label: "Dashboard" },
  { icon: Bot, label: "AI Assistant" },
  { icon: FolderGit2, label: "Repositories" },
  { icon: Bug, label: "Debugging" },
  { icon: ShieldAlert, label: "Incidents" },
  { icon: Network, label: "Knowledge Graph" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-950 text-white h-screen p-6">
      <h1 className="font-bold text-2xl mb-10">
        Ragnarok AI
      </h1>

      <div className="space-y-3">
        {menu.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <item.icon size={18} />
            {item.label}
          </div>
        ))}
      </div>
    </aside>
  );
}
