export interface KnowledgeChunk {
  id: string;
  section: string;
  title: string;
  snippet: string;
  href?: string;
}

export const knowledgeChunks: KnowledgeChunk[] = [
  {
    id: "profile-bio",
    section: "About Me",
    title: "Pranav Pant Bio",
    snippet: "Pranav Pant is an AI & ML Engineer based in Arizona. He builds reliable AI systems across NLP, retrieval, and agentic workflows, with a strong focus on grounded outputs, evaluation, and production-minded engineering. He is currently open to ML, AI platform, and applied research roles.",
    href: "mailto:pantpranav3@gmail.com"
  },
  {
    id: "profile-relocation",
    section: "About Me",
    title: "Relocation & Remote Work",
    snippet: "Pranav Pant is open to remote work and is open to relocation as well for ML, AI platform, and applied research engineering roles.",
  },
  {
    id: "profile-hobbies",
    section: "About Me",
    title: "Hobbies & Sports",
    snippet: "Outside of technology, Pranav is an active badminton player (a 2-time intramural winner at Arizona State University / ASU) and a golfer with an impressive handicap of 3.",
  },
  {
    id: "profile-contact",
    section: "Contact Info",
    title: "Contact Details & Form",
    snippet: "You can reach Pranav via email at pantpranav3@gmail.com, find his professional profile on LinkedIn at https://www.linkedin.com/in/pranav-pant-ds, or see his code on GitHub at https://github.com/PranavDS-codes. You can also send him a message directly using the interactive contact form on the left sidebar of this site.",
    href: "mailto:pantpranav3@gmail.com"
  },
  {
    id: "experience-jhf",
    section: "Experience",
    title: "Brown Heart Assistant at Joshi Health Foundation",
    snippet: "Pranav worked as an AI/Data Engineering Intern and Volunteer at Joshi Health Foundation / Brown Heart. He built and deployed the Brown Heart Assistant from scratch as a full-stack, citation-grounded health education platform serving 5,000+ users. He developed FAQ and MASALA Study RAG agents using source-grounded prompts, citations, confidence gating, and medical-safety refusals.",
    href: "https://brown-heart-assistant.onrender.com/"
  },
  {
    id: "experience-jhf-tech",
    section: "Experience",
    title: "Brown Heart Technical Stack",
    snippet: "For the Brown Heart Assistant, Pranav implemented a hybrid retrieval pipeline using BM25, FastEmbed/NVIDIA embeddings, reciprocal rank fusion (RRF), reranking, and streamed cited responses. The production backend includes artifact hydration with Azure Blob artifacts, Azure PostgreSQL row/chunk hydration, checksum validation, and environment-based model configs.",
    href: "https://brown-heart-assistant.onrender.com/"
  },
  {
    id: "experience-rocket-lawyer",
    section: "Experience",
    title: "Rocket Lawyer Data Engineering",
    snippet: "Pranav was a Data Engineering Intern (ML/NLP Focus) at Rocket Lawyer in San Francisco, CA (Remote). He built a modular NLP data-quality pipeline for legal Q&A content, combining anonymization, semantic deduplication, and LLM-based validation. He fine-tuned a BERT-based NER model for PII anonymization across 600K+ tagged samples, achieving 99.9% NER accuracy, and reduced data redundancy by 59.5% with embedding-based deduplication.",
  },
  {
    id: "experience-ongc",
    section: "Experience",
    title: "Oil and Natural Gas Corporation (ONGC)",
    snippet: "Pranav worked as a Summer Intern at ONGC in Uttarakhand, India. He designed CNN and Spark-based intrusion detection workflows and built a semi-supervised lithofacies classification system using Bayesian optimization. His research outcomes on security ML and facies classification were published across conference and journal venues.",
  },
  {
    id: "publication-spark-lithofacies",
    section: "Publications",
    title: "Spark-Driven Intrusion Detection & Lithofacies Classification",
    snippet: "Pranav published a paper titled 'Applied Machine Learning and Spark-Driven Workflows for Industrial Intrusion Detection and Lithofacies Classification' in the International Conference on Cybernetics and Machine Learning (2023). The paper details distributed Spark threat identification and lithofacies mapping optimized using Bayesian optimization over semi-supervised data. It received the Best Paper Award and Best Presentation Recognition.",
    href: "https://doi.org/10.1109/ICML.2023.102345"
  },
  {
    id: "project-graph-rag",
    section: "Projects",
    title: "Agentic Graph-RAG: The Brain",
    snippet: "Pranav built 'Agentic Graph-RAG: The Brain', a self-correcting retrieval system that audits evidence sufficiency, expands searches to web/Wikipedia when needed, verifies supporting snippets, and refines failed queries before answering. It utilizes hybrid retrieval with FAISS, BM25, Neo4j, and reranking, improving the retrieval hit rate from 82% to 92% on a judged benchmark.",
    href: "https://github.com/PranavDS-codes/RAG"
  },
  {
    id: "project-legal-sentinel",
    section: "Projects",
    title: "Legal Sentinel",
    snippet: "Legal Sentinel is a deployed contract analysis app built by Pranav. It parses legal PDFs using a dual-parser with heuristic quality routing and transforms them into structured sections, clause graphs, risk-ranked reviews, and executive summaries. It features a run-local retrieval setup that prevents cross-document chat leaks and supports streamed grounded Q&A.",
    href: "https://bored26-legal-sentinel.hf.space/"
  },
  {
    id: "project-llm-council",
    section: "Projects",
    title: "LLM Council",
    snippet: "LLM Council is a multi-agent debate system built with FastAPI, asyncio, and Pydantic. It allows five concurrent AI personas to evaluate a problem space. It enforces strict Pydantic schemas for inter-agent communication and provides tracing for reasoning flow, token usage, and recovery paths to make LLM outputs inspection-friendly.",
    href: "https://llm-council-three.vercel.app/"
  },
  {
    id: "project-stylegan",
    section: "Projects",
    title: "StyleGAN Anime Face Generation",
    snippet: "Pranav implemented a StyleGAN training pipeline from scratch in PyTorch, tuned for stable generation under constrained compute. Trained on 36K images with progressive growing, custom mapping networks, and style modulation, it delivered diverse anime faces using 2x T4 GPUs.",
  },
  {
    id: "skills-ai-systems",
    section: "Skills",
    title: "AI & ML System Skills",
    snippet: "Pranav's AI and ML Systems skillset includes RAG, LLM Agents, Multi-Agent Systems, Prompt Engineering, Transformers, NER, PyTorch, TensorFlow, FAISS, BM25, LLM evaluation, Codex (OpenAI), Antigravity (Google), and Claude Code (Anthropic).",
  },
  {
    id: "skills-engineering-cloud",
    section: "Skills",
    title: "Software Engineering & Cloud Skills",
    snippet: "Pranav's software engineering and deployment stack includes Python, SQL, FastAPI, Pydantic, Docker, Linux, Git, GCP, Azure Blob, Azure PostgreSQL, Hugging Face, Vercel, and Render.",
  },
  {
    id: "profile-rag-reliability",
    section: "Projects",
    title: "RAG Reliability & Audits",
    snippet: "Pranav approaches RAG reliability by building self-correcting architectures. In projects like Agentic Graph-RAG (The Brain) and Brown Heart Assistant, he ensures high reliability using query analysis, hybrid retrieval (BM25 + vector matching), Neo4j knowledge graphs, multi-step evidence sufficiency audits, confidence gating thresholds, and medical-safety refusal filters to prevent hallucinations."
  }
];
