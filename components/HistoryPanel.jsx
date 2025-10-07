export default function HistoryPanel({ history, onSelect }) {
  return (
    <aside className="w-full max-w-xs">
      <div className="bg-white/3 backdrop-blur-sm rounded-2xl p-4 shadow">
        <h4 className="text-sm font-semibold text-slate-100 mb-3">History</h4>
        <div className="space-y-3 max-h-[52vh] overflow-auto scrollbar-hidden">
          {history.length === 0 && <div className="text-slate-400 text-sm">No history yet.</div>}
          {history.map((h) => (
            <button
              key={h.id}
              onClick={() => onSelect(h)}
              className="w-full text-left p-2 rounded-md hover:bg-white/5 transition"
            >
              <div className="text-xs text-slate-300">{h.source} → {h.target}</div>
              <div className="text-sm text-slate-100 truncate">{h.input}</div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
