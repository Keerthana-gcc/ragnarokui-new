import { metrics } from "../data/mockData";

export default function MetricsCards() {
  return (
    <div className="grid grid-cols-4 gap-5">
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className="rounded-2xl border p-5 bg-white"
        >
          <div className="text-gray-500">
            {metric.title}
          </div>

          <div className="text-3xl font-bold mt-2">
            {metric.value}
          </div>
        </div>
      ))}
    </div>
  );
}