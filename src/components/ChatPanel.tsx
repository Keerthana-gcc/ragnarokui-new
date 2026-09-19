"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Check,
  Copy,
  Gauge,
  GitBranch,
  ListChecks,
  Plus,
  Send,
  Sparkles,
  Ticket,
  TrendingUp,
} from "lucide-react";
import { AskResponse, AskSources } from "../lib/api";

interface ChatPanelProps {
  onAsk: (query: string) => Promise<AskResponse>;
}

interface ChatTurn {
  query: string;
  answer: string;
  sources: AskSources | null;
  error: string | null;
}

interface AnswerSection {
  title: string;
  body: string;
}

const SECTION_ICONS: Record<string, React.ElementType> = {
  "Executive Summary": Sparkles,
  "Confluence Information": BookOpen,
  "Jira Information": Ticket,
  "Repository Information": GitBranch,
  "Technical Analysis": Gauge,
  Recommendations: ListChecks,
  Risks: AlertTriangle,
  "Confidence Score": Gauge,
  "Sources Used": BookOpen,
};

function parseSections(answer: string): AnswerSection[] {
  const lines = answer.split("\n");
  const sections: AnswerSection[] = [];
  let current: AnswerSection | null = null;

  for (const line of lines) {
    const heading = line.match(/^#{1,2}\s+(.*)/);
    if (heading) {
      if (current) sections.push(current);
      current = { title: heading[1].trim(), body: "" };
    } else if (current) {
      current.body += `${line}\n`;
    }
  }
  if (current) sections.push(current);

  return sections.length > 0 ? sections : [{ title: "Answer", body: answer }];
}

const URL_SPLIT_REGEX = /(https?:\/\/[^\s<>()[\]"']+)/g;
const URL_TEST_REGEX = /^https?:\/\//;

function InlineLinks({ text }: { text: string }) {
  const parts = text.split(URL_SPLIT_REGEX);
  return (
    <>
      {parts.map((part, i) =>
        URL_TEST_REGEX.test(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline break-all hover:text-indigo-800"
          >
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-slate-800">
            <InlineLinks text={part.slice(2, -2)} />
          </strong>
        ) : (
          <InlineLinks key={i} text={part} />
        )
      )}
    </>
  );
}

function SectionBody({ body }: { body: string }) {
  const trimmed = body.trim();
  if (!trimmed) return null;

  const blocks = trimmed.split(/\n{2,}/);

  return (
    <div className="space-y-2 text-sm text-slate-600 leading-relaxed">
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        const isList = lines.length > 0 && lines.every((l) => /^[-*]\s+/.test(l) || /^\d+\.\s+/.test(l));

        if (isList) {
          return (
            <ul key={i} className="list-disc pl-5 space-y-1">
              {lines.map((l, j) => (
                <li key={j}>
                  <InlineText text={l.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "")} />
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="whitespace-pre-wrap">
            <InlineText text={block} />
          </p>
        );
      })}
    </div>
  );
}

function AnswerCard({ answer }: { answer: string }) {
  const sections = parseSections(answer);

  return (
    <div className="space-y-3">
      {sections.map((section, i) => {
        const Icon = SECTION_ICONS[section.title] ?? Sparkles;
        return (
          <div key={i} className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700 mb-2">
              <Icon size={15} />
              {section.title}
            </div>
            <SectionBody body={section.body} />
          </div>
        );
      })}
    </div>
  );
}

function SourcesPanel({ sources }: { sources: AskSources }) {
  const hasSources =
    sources.confluence_pages.length > 0 ||
    sources.jira_tickets.length > 0 ||
    sources.repositories.length > 0;

  if (!hasSources) return null;

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
      <div className="text-sm font-semibold text-slate-700">Sources</div>

      {sources.confluence_pages.length > 0 && (
        <div>
          <div className="text-xs font-medium text-emerald-600 mb-1">Confluence Pages</div>
          <div className="flex flex-wrap gap-1.5">
            {sources.confluence_pages.map((page) => (
              <a
                key={page.page_id}
                href={page.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-emerald-50 text-emerald-800 rounded-full px-2.5 py-1 hover:bg-emerald-100"
              >
                {page.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {sources.jira_tickets.length > 0 && (
        <div>
          <div className="text-xs font-medium text-amber-600 mb-1">Jira Tickets</div>
          <div className="flex flex-wrap gap-1.5">
            {sources.jira_tickets.map((key) => (
              <span
                key={key}
                className="text-xs bg-amber-50 text-amber-800 font-mono rounded-full px-2.5 py-1"
              >
                {key}
              </span>
            ))}
          </div>
        </div>
      )}

      {sources.repositories.length > 0 && (
        <div>
          <div className="text-xs font-medium text-purple-600 mb-1">Repositories</div>
          <div className="flex flex-wrap gap-1.5">
            {sources.repositories.map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-purple-50 text-purple-800 rounded-full px-2.5 py-1 hover:bg-purple-100"
              >
                {repo.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface ChatSession {
  id: string;
  title: string;
  turns: ChatTurn[];
  pendingQuery: string | null;
}

function createSession(): ChatSession {
  return { id: crypto.randomUUID(), title: "New chat", turns: [], pendingQuery: null };
}

export default function ChatPanel({ onAsk }: ChatPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [sessions, setSessions] = useState<ChatSession[]>([createSession()]);
  const [activeSessionId, setActiveSessionId] = useState(sessions[0].id);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find((s) => s.id === activeSessionId) ?? sessions[0];
  const loading = activeSession.pendingQuery !== null;

  useEffect(() => {
    historyRef.current?.scrollTo({ top: historyRef.current.scrollHeight, behavior: "smooth" });
  }, [activeSession.turns.length, activeSession.pendingQuery, activeSessionId]);

  function getTurnText(turn: ChatTurn): string {
    if (turn.error) return `Error: ${turn.error}`;
    return turn.answer;
  }

  async function handleCopy(key: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((current) => (current === key ? null : current));
    }, 1500);
  }

  function handleNewChat() {
    const session = createSession();
    setSessions((prev) => [session, ...prev]);
    setActiveSessionId(session.id);
    setPrompt("");
  }

  async function handleSend() {
    const query = prompt.trim();
    const sessionId = activeSession.id;
    if (!query || activeSession.pendingQuery !== null) return;

    setPrompt("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId ? { ...session, pendingQuery: query } : session
      )
    );

    let turn: ChatTurn;

    try {
      const response = await onAsk(query);
      turn = { query, answer: response.answer, sources: response.sources, error: null };
    } catch (err) {
      turn = {
        query,
        answer: "",
        sources: null,
        error: err instanceof Error ? err.message : "Request failed",
      };
    }

    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              title: session.turns.length === 0 ? query.slice(0, 40) : session.title,
              turns: [...session.turns, turn],
              pendingQuery: null,
            }
          : session
      )
    );
  }

  function handlePromptChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPrompt(e.target.value);

    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }

  return (
    <div className="bg-white rounded-2xl border h-[600px] flex overflow-hidden shadow-lg">
      <div className="w-64 border-r flex flex-col shrink-0 bg-gradient-to-b from-indigo-50/60 to-white">
        <div className="p-4 border-b">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100"
          >
            <Plus size={16} />
            New chat
          </button>
        </div>

        <div className="flex-1 overflow-auto p-2 space-y-1">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setActiveSessionId(session.id)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg truncate ${
                session.id === activeSession.id
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-gray-600 hover:bg-slate-50"
              }`}
              title={session.title}
            >
              {session.title}
            </button>
          ))}
        </div>

        <div className="m-3 rounded-xl border bg-gradient-to-br from-white to-slate-50 p-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
            <TrendingUp size={14} className="text-indigo-500" />
            How answers are built
          </div>

          <div className="mt-2 space-y-1.5">
            <div className="flex items-center gap-2">
              <BookOpen size={12} className="shrink-0 text-emerald-500" />
              <span className="text-[11px] text-slate-500 leading-tight">Confluence semantic search</span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket size={12} className="shrink-0 text-amber-500" />
              <span className="text-[11px] text-slate-500 leading-tight">Jira ticket lookup</span>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch size={12} className="shrink-0 text-purple-500" />
              <span className="text-[11px] text-slate-500 leading-tight">GitHub repository search</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={12} className="shrink-0 text-indigo-500" />
              <span className="text-[11px] text-slate-500 leading-tight">AI-generated structured answer</span>
            </div>
          </div>

          <p className="mt-2 text-[11px] text-slate-400">Every answer cites the sources it used.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-6 border-b bg-gradient-to-r from-indigo-50 via-purple-50 to-amber-50">
          <h2 className="font-bold text-xl text-slate-800">
            AI Engineering Assistant
          </h2>
        </div>

        <div ref={historyRef} className="flex-1 p-6 overflow-auto">
          {activeSession.turns.length === 0 && !activeSession.pendingQuery && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-semibold text-slate-800">How can I help you?</h3>
              <div className="bg-indigo-50 rounded-xl p-4 mt-2 text-indigo-600">
                Ask about code, architecture, or information and I'll search Confluence, Jira, and
                GitHub to build a structured answer.
              </div>
            </div>
          )}

          {activeSession.turns.map((turn, i) => {
            const copyKey = `${activeSession.id}-${i}`;
            const isCopied = copiedKey === copyKey;

            return (
              <div key={i} className="mt-4 first:mt-0">
                <div className="bg-indigo-50 text-slate-800 rounded-xl p-4 max-w-2xl">
                  {turn.query}
                </div>

                <div className="relative max-w-3xl mt-4">
                  <button
                    onClick={() => handleCopy(copyKey, getTurnText(turn))}
                    className="absolute top-2 right-2 p-1.5 rounded-md text-slate-500 hover:bg-slate-200/70 hover:text-slate-700"
                    aria-label="Copy response"
                    title="Copy response"
                  >
                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                  </button>

                  {turn.error && (
                    <div className="bg-red-50 text-red-700 border border-red-100 rounded-xl p-4 pr-10">
                      Error: {turn.error}
                    </div>
                  )}

                  {!turn.error && (
                    <div className="space-y-3">
                      <AnswerCard answer={turn.answer} />
                      {turn.sources && <SourcesPanel sources={turn.sources} />}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {activeSession.pendingQuery && (
            <div className="mt-4 first:mt-0">
              <div className="bg-indigo-50 text-slate-800 rounded-xl p-4 max-w-2xl">
                {activeSession.pendingQuery}
              </div>

              <div className="bg-indigo-50 rounded-xl p-4 max-w-2xl mt-4 text-indigo-500 animate-pulse">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex items-end gap-2 border rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-fuchsia-500">
            <textarea
              ref={textareaRef}
              className="flex-1 resize-none border-0 outline-none py-1 max-h-[200px]"
              rows={1}
              value={prompt}
              onChange={handlePromptChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about code, architecture or incidents..."
            />

            <button
              className="shrink-0 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 p-2 rounded-full disabled:opacity-50"
              onClick={handleSend}
              disabled={loading || !prompt.trim()}
              aria-label="Send"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}