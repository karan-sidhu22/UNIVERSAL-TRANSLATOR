"use client";
import { motion } from "framer-motion";

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
      {/* Input Section */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Source</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste text..."
          className="w-full h-40 p-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-accent outline-none resize-none"
        />
      </div>

      {/* Output Section */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Target</label>
        <div className="min-h-[100px] p-3 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-100">
          {loading ? (
            <div className="animate-pulse text-slate-400">Translating...</div>
          ) : (
            translatedText || "Translation will appear here."
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <motion.button
          onClick={onTranslate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-accent hover:bg-accent2 text-white rounded-lg shadow-glow transition text-sm"
        >
          Translate
        </motion.button>

        <button
          onClick={onSwap}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm"
        >
          Swap ↔
        </button>

        {children}
      </div>
    </motion.div>
  );
}
