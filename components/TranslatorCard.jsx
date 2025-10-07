import { motion } from "framer-motion";

export default function TranslatorCard({
  inputText, setInputText,
  translatedText, loading, onTranslate,
  sourceLang, setSourceLang, targetLang, setTargetLang,
  onSwap,
  children
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white/3 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-200">Source</div>
            <div className="text-xs text-slate-400">Auto-detect or choose</div>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={8}
            className="w-full p-3 rounded-md bg-white/5 border border-white/6 text-slate-100 resize-none"
            placeholder="Type or paste text (or use voice)..."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-200">Target</div>
            <div className="text-xs text-slate-400">High-quality translation</div>
          </div>

          <div className="min-h-[160px] p-3 rounded-md bg-white/5 border border-white/6 text-slate-100">
            {loading ? <div className="text-slate-300">Translating…</div>
              : (translatedText ? <div className="whitespace-pre-wrap">{translatedText}</div>
                : <div className="text-slate-400">Translation will appear here.</div>)}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 flex gap-3">
          <button
            onClick={onTranslate}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-[#00f5d4] to-[#6a5cff] text-slate-900 font-semibold"
          >
            {loading ? "Translating…" : "Translate"}
          </button>

          <button
            onClick={() => { navigator.clipboard?.writeText(translatedText || ""); }}
            className="px-3 py-2 rounded-md border border-white/10"
          >
            Copy
          </button>

          <button onClick={onSwap} className="px-3 py-2 rounded-md border border-white/10">
            Swap ↔
          </button>
        </div>

        <div className="w-60 text-right text-sm text-slate-300">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
