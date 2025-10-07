export default function Navbar() {
  return (
    <header className="border-b border-white/6">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#00f5d4] to-[#6a5cff] flex items-center justify-center text-slate-900 font-extrabold">
            UT
          </div>
          <div>
            <div className="text-lg font-semibold">Universal Translator</div>
            <div className="text-xs text-slate-400">Translate with context & style</div>
          </div>
        </div>
        <nav className="text-sm text-slate-300">
          <a className="mr-6 hover:text-white" href="#">Home</a>
          <a className="mr-6 hover:text-white" href="#">Docs</a>
          <a className="hover:text-white" href="#">Pricing</a>
        </nav>
      </div>
    </header>
  );
}
