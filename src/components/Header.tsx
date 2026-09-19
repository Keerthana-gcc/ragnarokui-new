"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  UserCircle,
} from "lucide-react";
import { checkBackendHealth } from "../lib/api";

const HEALTH_CHECK_INTERVAL_MS = 15000;

export default function Header() {
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      const online = await checkBackendHealth();
      if (!cancelled) setBackendOnline(online);
    }

    poll();
    const id = setInterval(poll, HEALTH_CHECK_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-indigo-50 via-purple-50 to-amber-50 border-b px-6 py-4 flex items-center justify-between text-slate-800 shadow-sm">
      {/* Left Section */}
      <div>
        <h1 className="text-xl font-bold">
          Ragnarok Codex - Your Engineering Memory
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-sm text-slate-500">
            Ask Once, Know Everything
          </p>
          <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
            <span
              className={`h-2 w-2 rounded-full ${
                backendOnline === null
                  ? "bg-slate-300"
                  : backendOnline
                  ? "bg-emerald-400"
                  : "bg-red-400"
              }`}
            />
            {backendOnline === null
              ? "Checking backend..."
              : backendOnline
              ? "Backend connected"
              : "Backend offline"}
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell
            size={22}
            className="cursor-pointer text-amber-400 hover:text-amber-500"
          />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-400" />
        </div>

        <UserCircle
          size={32}
          className="text-slate-400 cursor-pointer hover:text-slate-600"
        />
      </div>
    </header>
  );
}