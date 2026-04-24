import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import AIAssistant from "../components/AIAssistant";

export default function AdminLayout() {
  const [ai, setAi] = useState(false);
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onOpenAI={() => setAi(true)} />
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
      <AIAssistant open={ai} onClose={() => setAi(false)} />
      {!ai && (
        <button
          onClick={() => setAi(true)}
          className="fixed bottom-6 right-6 btn-primary !rounded-full !px-5 !py-3 shadow-glow"
        >
          Ask BM
        </button>
      )}
    </div>
  );
}
