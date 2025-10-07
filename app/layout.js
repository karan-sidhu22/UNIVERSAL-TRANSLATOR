import "./globals.css";

export const metadata = {
  title: "Universal Translator",
  description: "Translate anything — pro quality, gorgeous UI"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#041827] to-[#071020] min-h-screen text-slate-100">
        {children}
      </body>
    </html>
  );
}
