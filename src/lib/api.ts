export interface SearchMatch {
  title: string;
  page_id: string;
  page_url: string;
  score: number;
  summary: string;
  repository_names: string[];
  repository_urls: string[];
  jira_keys: string[];
  jira_links: string[];
}

export interface SearchResponse {
  query: string;
  matches: SearchMatch[];
}

export interface ConfluenceSource {
  title: string;
  page_id: string;
  url: string;
}

export interface RepositorySource {
  name: string;
  url: string;
}

export interface AskSources {
  confluence_pages: ConfluenceSource[];
  jira_tickets: string[];
  repositories: RepositorySource[];
}

export interface AskResponse {
  query: string;
  answer: string;
  sources: AskSources;
}

export interface HealthResponse {
  status: string;
  ai_assistant?: boolean;
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/health`);
    if (!res.ok) return false;
    const body: HealthResponse = await res.json();
    return body.status === "ok";
  } catch {
    return false;
  }
}

export async function searchKnowledge(query: string): Promise<SearchResponse> {
  const res = await fetch(`${BACKEND_URL}/api/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Search failed with status ${res.status}`);
  }

  return res.json();
}

export async function askAssistant(query: string): Promise<AskResponse> {
  const res = await fetch(`${BACKEND_URL}/api/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Ask failed with status ${res.status}`);
  }

  return res.json();
}
