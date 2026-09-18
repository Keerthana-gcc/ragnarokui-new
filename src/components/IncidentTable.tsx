import { incidents } from "../data/mockData";

export default function IncidentTable() {
  return (
    <div className="bg-white border rounded-2xl p-5 mt-6">
      <h2 className="font-bold text-xl">
        Recent Incidents
      </h2>

      <table className="w-full mt-5">
        <thead>
          <tr>
            <th className="text-left">ID</th>
            <th className="text-left">Issue</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id}>
              <td>{incident.id}</td>
              <td>{incident.title}</td>
              <td>{incident.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}