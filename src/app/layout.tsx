import type { Metadata } from "next";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "Pranav Pant | AI & ML Engineer",
  description:
    "AI & ML Engineer building reliable NLP, retrieval, RAG, and multi-agent systems with production-minded engineering.",
  metadataBase: new URL("https://pranavpant.vercel.app"),
  openGraph: {
    title: "Pranav Pant | AI & ML Engineer",
    description:
      "Reliable AI systems across NLP, retrieval, agentic workflows, and production engineering.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-ink font-sans text-slate-200 antialiased">{children}</body>
    </html>
  );
}
