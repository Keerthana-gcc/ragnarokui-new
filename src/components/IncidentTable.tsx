import { incidents } from "../data/mockData";

function statusBadge(status: string) {
  const isResolved = status.toLowerCase() === "resolved";
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
        isResolved
          ? "bg-emerald-50 text-emerald-700"
          : "bg-rose-50 text-rose-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function IncidentTable() {
  return (
    <div className="bg-white border rounded-2xl p-5 mt-6 shadow-sm">
      <h2 className="font-bold text-xl text-indigo-600">
        Recent Incidents
      </h2>

      <table className="w-full mt-5">
        <thead>
          <tr className="text-indigo-400">
            <th className="text-left">ID</th>
            <th className="text-left">Issue</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id} className="border-t hover:bg-indigo-50/50">
              <td className="py-2 font-mono text-sm text-purple-500">{incident.id}</td>
              <td className="py-2">{incident.title}</td>
              <td className="py-2">{statusBadge(incident.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}