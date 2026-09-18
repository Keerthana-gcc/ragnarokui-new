"use client";

import {
  Bell,
  Search,
  GitBranch,
  UserCircle,
} from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold">
          AI Engineering Assistant
        </h1>
        <p className="text-sm text-gray-500">
          Knowledge Repository & Debugging Copilot
        </p>
      </div>

      {/* Center Search */}
      <div className="relative w-[500px]">
        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search repositories, incidents, documentation..."
          className="w-full border rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
          <GitBranch size={16} />
          Connect Repo
        </button>

        <Bell
          size={22}
          className="cursor-pointer text-gray-600"
        />

        <UserCircle
          size={32}
          className="text-gray-700 cursor-pointer"
        />
      </div>
    </header>
  );
}