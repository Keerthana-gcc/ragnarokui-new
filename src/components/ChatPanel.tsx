"use client";

import { useState } from "react";

export default function ChatPanel() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="bg-white rounded-2xl border h-[600px] flex flex-col">
      <div className="p-6 border-b">
        <h2 className="font-bold text-xl">
          AI Engineering Assistant
        </h2>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-slate-100 rounded-xl p-4 max-w-2xl">
          How does payment service work?
        </div>

        <div className="bg-blue-600 text-white rounded-xl p-4 max-w-3xl mt-4">
          Payment Service processes payments,
          retries failures and emits events
          to Notification Service.
        </div>
      </div>

      <div className="border-t p-4">
        <textarea
          className="w-full border rounded-lg p-3"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask about code, architecture or incidents..."
        />

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg mt-3">
          Send
        </button>
      </div>
    </div>
  );
}