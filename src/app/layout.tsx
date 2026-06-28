import type { Metadata } from "next";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "Pranav Pant | AI & ML Engineer",
  description:
    "AI & ML Engineer building reliable NLP, retrieval, RAG, and multi-agent systems with production-minded engineering.",
  metadataBase: new URL("https://pranavpant.vercel.app"),
  icons: {
    icon: "/images/headshot.jpeg",
  },
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'light') {
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-ink font-sans text-slate-200 antialiased">{children}</body>
    </html>
  );
}
