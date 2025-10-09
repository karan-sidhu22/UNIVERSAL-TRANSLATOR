"use client";

export default function LanguageSelector({ label, value, onChange }) {
  const languages = [
    { code: "auto", name: "Auto detect" },
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "hi", name: "Hindi" },
    { code: "pa", name: "Punjabi" },
  ];

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-slate-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white/10 border border-white/10 rounded-md text-sm p-2 focus:ring-2 focus:ring-accent outline-none text-white"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-bg">
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
