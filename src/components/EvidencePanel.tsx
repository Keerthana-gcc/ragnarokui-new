export default function EvidencePanel() {
  return (
    <div className="bg-white border rounded-2xl p-5">
      <h2 className="font-bold text-lg">
        Evidence
      </h2>

      <div className="mt-5">
        <h3 className="font-semibold">
          Sources
        </h3>

        <ul className="text-sm mt-2 space-y-2">
          <li>payment-service.md</li>
          <li>architecture.pdf</li>
          <li>INC-101 RCA</li>
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">
          Confidence
        </h3>

        <div className="text-green-600 text-2xl font-bold mt-2">
          87%
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">
          Recommendation
        </h3>

        <p className="text-sm mt-2">
          Check Redis pool configuration.
        </p>
      </div>
    </div>
  );
}