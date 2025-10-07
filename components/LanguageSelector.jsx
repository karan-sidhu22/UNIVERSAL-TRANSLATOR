import { languages } from "@/utils/languages";

export default function LanguageSelector({ value, onChange, label }) {
  return (
    <div>
      <label className="text-sm text-slate-300 block mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md bg-transparent border border-white/10 px-3 py-2 text-slate-100"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.name}
          </option>
        ))}
      </select>
    </div>
  );
}
