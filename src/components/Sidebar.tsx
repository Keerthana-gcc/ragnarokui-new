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
  { icon: Home, label: "Dashboard", color: "text-sky-500" },
  { icon: Bot, label: "AI Assistant", color: "text-fuchsia-500" },
  { icon: FolderGit2, label: "Repositories", color: "text-emerald-500" },
  { icon: Bug, label: "Debugging", color: "text-amber-500" },
  { icon: ShieldAlert, label: "Incidents", color: "text-rose-500" },
  { icon: Network, label: "Knowledge Graph", color: "text-violet-500" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-gradient-to-b from-indigo-50 via-white to-purple-50 text-slate-700 h-screen p-6 border-r">
      <h1 className="font-bold text-2xl mb-10 text-indigo-600">
        Ragnarok AI
      </h1>

      <div className="space-y-3">
        {menu.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-white cursor-pointer transition-colors ${
              item.label === "Incidents" ? "bg-red-50 ring-1 ring-red-100" : ""
            }`}
          >
            <item.icon size={18} className={item.color} />
            {item.label}
          </div>
        ))}
      </div>
    </aside>
  );
}
