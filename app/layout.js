export const metadata = {
  title: "Universal Translator",
  description: "Translate anything into any language instantly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", margin: "20px" }}>
        {children}
      </body>
    </html>
  );
}
