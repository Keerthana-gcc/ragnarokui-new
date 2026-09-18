import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MetricsCards from "../components/MetricsCards";
import ChatPanel from "../components/ChatPanel";
import EvidencePanel from "../components/EvidencePanel";
import IncidentTable from "../components/IncidentTable";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-8">
          <MetricsCards />

          <div className="grid grid-cols-12 gap-6 mt-6">
            <div className="col-span-8">
              <ChatPanel />
            </div>

            <div className="col-span-4">
              <EvidencePanel />
            </div>
          </div>

          <IncidentTable />
        </div>
      </div>
    </main>
  );
}