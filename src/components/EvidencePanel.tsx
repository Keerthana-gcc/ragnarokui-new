import { SearchMatch } from "../lib/api";

interface EvidencePanelProps {
  matches: SearchMatch[];
}

export default function EvidencePanel({ matches }: EvidencePanelProps) {
  const jiraTickets = Array.from(new Set(matches.flatMap((m) => m.jira_keys)));

  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm">
      <h2 className="font-bold text-lg text-indigo-600">
        Evidence
      </h2>

      <div className="mt-5">
        <h3 className="font-semibold text-emerald-600">
          Sources
        </h3>

        {matches.length > 0 ? (
          <ul className="text-sm mt-2 space-y-2">
            {matches.map((m) => (
              <li key={m.page_id} className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-800">
                {m.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 mt-2">
            No sources yet. Ask a question to search.
          </p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-amber-600">
          Jira Tickets
        </h3>

        {jiraTickets.length > 0 ? (
          <ul className="text-sm mt-2 space-y-2">
            {jiraTickets.map((ticket) => (
              <li key={ticket} className="px-2 py-1 rounded-md bg-amber-50 text-amber-800 font-mono">
                {ticket}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 mt-2">
            No Jira information present.
          </p>
        )}
      </div>
    </div>
  );
}