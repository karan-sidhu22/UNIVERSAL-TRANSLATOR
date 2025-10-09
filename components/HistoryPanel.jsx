"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function HistoryPanel({ history, onSelect }) {
  return (
    <div className="relative">
      <h2 className="text-lg font-semibold mb-5 bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
      </h2>

      <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2 scrollbar-hidden">
        {history.length === 0 ? (
          <p className="text-sm text-slate-400 italic">No history yet.</p>
        ) : (
          <AnimatePresence>
            {history.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => onSelect(item)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05, duration: 0.25 }}
                className="w-full text-left p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] 
                           border border-white/10 hover:border-accent/40
                           hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]
                           transition-all duration-300 backdrop-blur-md group relative overflow-hidden"
              >
                {/* glowing border animation */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 
                                bg-gradient-to-r from-accent/20 to-accent2/20 blur-2xl rounded-xl"></span>

                {/* Text content */}
                <div className="relative z-10">
                  <div className="text-xs text-slate-400 mb-1 tracking-wide">
                    {item.source} → {item.target}
                  </div>
                  <div className="text-sm text-slate-100 truncate group-hover:text-accent2 transition-colors duration-300">
                    {item.input}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
