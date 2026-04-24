import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Send, Sparkles } from "lucide-react";
import { runAssistant, type AIResult } from "../ai/intents";
import { customers, orders, products } from "../data/mock";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Msg {
  role: "user" | "assistant";
  text: string;
  result?: AIResult;
}

const SEED: Msg[] = [
  {
    role: "assistant",
    text: "Hi! I'm the BM Smart Assistant. I work fully offline — ask me about sales, orders, products, or customers.",
    result: {
      text: "",
      suggestions: [
        "today sales",
        "top product",
        "low stock",
        "pending orders",
        "top customers",
        "open pos",
      ],
    },
  },
];

export default function AIAssistant({ open, onClose }: Props) {
  const [msgs, setMsgs] = useState<Msg[]>(SEED);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    const result = runAssistant(q, { products, orders, customers });
    setMsgs((prev) => [
      ...prev,
      { role: "user", text: q },
      { role: "assistant", text: result.text, result },
    ]);
    setInput("");
    if (result.navigate) {
      setTimeout(() => {
        navigate(result.navigate!);
        onClose();
      }, 700);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center sm:p-6 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl h-[80vh] sm:h-[620px] glass flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-bg-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <div className="text-white font-semibold">BM Smart Assistant</div>
              <div className="text-xs text-ink-300">Offline · Rule-based</div>
            </div>
          </div>
          <button className="btn-ghost !px-2" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user" ? "flex justify-end" : "flex justify-start"
              }
            >
              <div
                className={
                  m.role === "user"
                    ? "max-w-[80%] px-4 py-2.5 rounded-2xl bg-brand-gradient text-white shadow-glow"
                    : "max-w-[85%] px-4 py-3 rounded-2xl bg-bg-800 border border-bg-border text-ink-100"
                }
              >
                {m.text && <div>{m.text}</div>}
                {m.result?.table && (
                  <div className="mt-3 overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-ink-300 text-left">
                          {m.result.table.headers.map((h) => (
                            <th key={h} className="py-1.5 pr-4">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {m.result.table.rows.map((r, ri) => (
                          <tr key={ri} className="border-t border-bg-border">
                            {r.map((c, ci) => (
                              <td key={ci} className="py-2 pr-4">
                                {String(c)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {m.result?.suggestions && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.result.suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="chip hover:border-brand-400/60 hover:text-white"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="p-4 border-t border-bg-border flex gap-2"
        >
          <input
            autoFocus
            className="input"
            placeholder="Ask: today sales, top product, pending orders…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn-primary !px-4">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
