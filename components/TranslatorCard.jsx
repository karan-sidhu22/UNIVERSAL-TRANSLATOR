"use client";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

export default function TranslatorCard({
  inputText,
  setInputText,
  translatedText,
  loading,
  onTranslate,
  onSwap,
  children,
}) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 📝 Source Input */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Source</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste text..."
          className="w-full h-36 p-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder-slate-400
                     focus:ring-2 focus:ring-accent/60 outline-none resize-none transition-all duration-300
                     hover:border-accent/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]"
        />
      </div>

      {/* 🎯 Translation Output */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Target</label>
        <div
          className="min-h-[100px] p-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-slate-100
                     backdrop-blur-md transition-all duration-300 hover:border-accent2/40"
        >
          {loading ? (
            <div className="animate-pulse text-slate-400">Translating...</div>
          ) : (
            translatedText || "Translation will appear here."
          )}
        </div>
      </div>

      {/* 🚀 Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {/* Translate */}
        <motion.button
          onClick={onTranslate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="px-4 py-2 rounded-lg text-sm font-medium
                     bg-gradient-to-r from-accent2 to-accent text-white
                     shadow-[0_0_15px_rgba(139,92,246,0.4)]
                     hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]
                     transition-all duration-300 hover:-translate-y-0.5 active:scale-95
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Translating..." : "Translate"}
        </motion.button>

        {/* Swap */}
        <motion.button
          onClick={onSwap}
          whileHover={{ rotate: 180, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 
                     text-slate-200 hover:text-accent2 shadow-inner backdrop-blur-md
                     transition-all duration-300 hover:-translate-y-0.5"
          title="Swap languages"
        >
          <RefreshCw size={16} />
        </motion.button>

        {/* Divider */}
        <div className="h-5 border-l border-white/10 mx-2" />

        {/* Children (Quick Actions, etc.) */}
        <div className="flex flex-wrap items-center gap-2">{children}</div>
      </div>
    </motion.div>
  );
}
