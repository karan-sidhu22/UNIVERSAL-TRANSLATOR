"use client";

export default function HistoryPanel({ history, onSelect }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-accent">History</h2>
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {history.length === 0 && (
          <p className="text-sm text-slate-400">No history yet.</p>
        )}
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full text-left p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition"
          >
            <div className="text-xs text-slate-400 mb-1">
              {item.source} → {item.target}
            </div>
            <div className="text-sm text-slate-100 truncate">{item.input}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
