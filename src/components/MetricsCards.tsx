import { metrics } from "../data/mockData";

const cardStyles = [
  "bg-indigo-50 text-indigo-700",
  "bg-emerald-50 text-emerald-700",
  "bg-rose-50 text-rose-700",
  "bg-amber-50 text-amber-700",
];

export default function MetricsCards() {
  return (
    <div className="grid grid-cols-4 gap-5">
      {metrics.map((metric, i) => (
        <div
          key={metric.title}
          className={`rounded-2xl p-5 border ${cardStyles[i % cardStyles.length]}`}
        >
          <div className="opacity-70">
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