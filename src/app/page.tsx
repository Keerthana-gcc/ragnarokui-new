"use client";

import Header from "../components/Header";
import ChatPanel from "../components/ChatPanel";
import { askAssistant, AskResponse } from "../lib/api";

async function handleAsk(query: string): Promise<AskResponse> {
  return askAssistant(query);
}

export default function Home() {
  return (
    <main className="flex min-h-screen bg-slate-50">
      <div className="flex-1">
        <Header />

        <div className="p-8">
          <ChatPanel onAsk={handleAsk} />
        </div>
      </div>
    </main>
  );
}