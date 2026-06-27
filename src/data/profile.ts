export const profile = {
  name: "Pranav Pant",
  role: "AI & ML Engineer",
  location: "Arizona",
  status: "Open to ML, AI platform, and applied research roles",
  email: "pantpranav3@gmail.com",
  resumeUrl: "https://drive.google.com/file/d/1obwNsO6gPpH4kzMLkmSUhBozXEpxUHAa/view?usp=sharing",
  headshot: "/images/headshot.jpeg",
  bio: "I build reliable AI systems across NLP, retrieval, and agentic workflows, with an emphasis on grounded outputs, evaluation, and production-minded engineering.",
  focus: ["retrieval systems", "multi-agent workflows", "applied NLP"],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/PranavDS-codes",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/pranav-pant-ds",
    },
    {
      label: "Email",
      href: "mailto:pantpranav3@gmail.com",
    },
  ],
};

export const navItems = [
  { label: "Experience", href: "#experience" },
  { label: "Publications", href: "#publications" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Writing", href: "#writing" },
];

export const metrics = [
  {
    value: "5,000+",
    label: "users served through Brown Heart Assistant",
    tone: "teal",
  },
  {
    value: "99.9%",
    label: "NER accuracy on a 600K-sample anonymization pipeline",
    tone: "violet",
  },
  {
    value: "92%",
    label: "retrieval hit rate on my agentic Graph-RAG benchmark",
    tone: "amber",
  },
];

export const experience = [
  {
    company: "Joshi Health Foundation / Brown Heart",
    role: "AI/Data Engineering Intern / Volunteer",
    dates: "Jun 2026 - Present",
    location: "Remote",
    featured: true,
    summary:
      "Building and deploying Brown Heart Assistant from scratch as a full-stack, citation-grounded health education platform serving 5,000+ users with specialized FAQ and MASALA Study agents.",
    bullets: [
      "Developed FAQ and MASALA Study RAG agents with source-grounded prompts, citations, confidence gating, unsupported-answer handling, and medical-safety refusals.",
      "Implemented hybrid retrieval with BM25, FastEmbed/NVIDIA embeddings, reciprocal rank fusion, reranking, and streamed cited responses.",
      "Built production artifact hydration with Azure Blob artifacts, Azure PostgreSQL row/chunk hydration, checksum validation, manifest parsing, and environment-based model config.",
      "Planning Instagram reels, YouTube timestamped video, and Brown Heart movie timestamp agents as future knowledge-source expansions.",
    ],
    links: [
      {
        label: "Try Brown Heart Assistant",
        href: "https://brown-heart-assistant.onrender.com/",
      },
    ],
    tags: ["FastAPI", "RAG", "BM25", "Azure Blob", "Azure PostgreSQL", "Python"],
  },
  {
    company: "Rocket Lawyer",
    role: "Data Engineering Intern (ML/NLP Focus)",
    dates: "Jun 2025 - Aug 2025",
    location: "San Francisco, CA · Remote",
    summary:
      "Built a modular NLP data-quality pipeline for legal Q&A content, combining anonymization, semantic deduplication, and LLM-based validation to improve downstream training data.",
    bullets: [
      "Fine-tuned BERT-based NER for PII anonymization across 600K+ tagged samples.",
      "Reduced redundancy by 59.5% with embedding-based duplicate consolidation.",
      "Improved compliance/content assessment accuracy by 31% with LLM-as-a-judge validation.",
    ],
    tags: ["Transformers", "NER", "GCP", "FAISS", "LLM Agents", "Python"],
  },
  {
    company: "Oil and Natural Gas Corporation (ONGC)",
    role: "Summer Intern",
    dates: "May 2023 - Aug 2023",
    location: "Uttarakhand, India",
    summary:
      "Worked on applied machine learning systems for intrusion detection, malware detection, and facies classification, with research outcomes published across conference and journal venues.",
    bullets: [
      "Designed CNN and Spark-based intrusion detection workflows.",
      "Built semi-supervised facies classification with Bayesian optimization.",
      "Published related findings with Best Paper recognition.",
    ],
    tags: ["PyTorch", "Apache Spark", "SQL", "Python"],
  },
];

export const publications = [
  {
    title: "Applied Machine Learning and Spark-Driven Workflows for Industrial Intrusion Detection and Lithofacies Classification",
    authors: "Pranav Pant, et al.",
    venue: "International Conference on Cybernetics and Machine Learning",
    year: "2023",
    note: "Best Paper Award / Best Presentation Recognition",
    abstract: "Developed distributed Spark pipelines to identify security threats and optimized facies mapping algorithms using Bayesian optimization over semi-supervised data distributions.",
    doi: "https://doi.org/10.1109/ICML.2023.102345",
    tags: ["Apache Spark", "PyTorch", "SQL"],
  }
];

export const projects = [
  {
    title: "Agentic Graph-RAG: The Brain",
    meta: "Graph-RAG · LangGraph · Retrieval",
    summary:
      "A self-correcting retrieval system that audits evidence sufficiency, expands to web and Wikipedia when needed, verifies supporting snippets, and refines failed searches before answering.",
    bullets: [
      "Improved hit rate from 82% to 92% on a judged benchmark.",
      "Hybrid retrieval with FAISS, BM25, Neo4j, and reranking.",
      "Audit, verification, and refinement loops reduce unsupported answers.",
    ],
    links: [{ label: "Repository", href: "https://github.com/PranavDS-codes/RAG" }],
    tags: ["LLM Agents", "FAISS", "BM25", "RAG", "Multi-Agent Systems"],
  },
  {
    title: "Legal Sentinel",
    meta: "Legal AI · FastAPI · Document Intelligence",
    summary:
      "A deployed contract analysis app that turns legal PDFs into structured sections, clause graphs, risk-ranked review outputs, executive summaries, and grounded follow-up chat.",
    bullets: [
      "Dual-parser PDF extraction with heuristic quality routing.",
      "Interactive clause graph and guided review workspace.",
      "Run-local retrieval prevents cross-document chat leakage.",
    ],
    links: [
      { label: "Live App", href: "https://bored26-legal-sentinel.hf.space/" },
      { label: "GitHub", href: "https://github.com/PranavDS-codes/DSE_CAPSTONE" },
    ],
    tags: ["FastAPI", "Pydantic", "RAG", "Python", "GCP"],
  },
  {
    title: "LLM Council",
    meta: "Agents · FastAPI · Orchestration",
    summary:
      "A multi-agent debate system with structured schemas, concurrency, and tracing to make model outputs easier to inspect and trust.",
    bullets: [
      "Five concurrent AI personas evaluate the same problem space.",
      "Strict Pydantic contracts for inter-agent communication.",
      "Tracing for reasoning flow, token usage, and recovery paths.",
    ],
    links: [
      { label: "Live App", href: "https://llm-council-three.vercel.app/" },
      { label: "GitHub", href: "https://github.com/PranavDS-codes/LLM-Council" },
    ],
    tags: ["FastAPI", "Pydantic", "Multi-Agent Systems", "Python", "LLM Agents"],
  },
  {
    title: "StyleGAN for Anime Face Generation",
    meta: "Deep Learning · Vision · Research",
    summary:
      "A StyleGAN training pipeline implemented from scratch and tuned for stable generation under constrained compute.",
    bullets: [
      "Trained on 36K images with progressive growing.",
      "Custom mapping network and style modulation workflow.",
      "Delivered diverse samples using 2x T4 GPUs.",
    ],
    links: [],
    tags: ["PyTorch", "TensorFlow", "Python"],
  },
];

export const skillGroups = [
  {
    title: "AI Systems",
    skills: ["RAG", "LLM Agents", "Multi-Agent Systems", "Prompt Engineering", "Transformers", "NER", "Codex", "Antigravity", "Claude Code"],
  },
  {
    title: "Engineering",
    skills: ["Python", "SQL", "FastAPI", "Pydantic", "Docker", "Linux", "Git"],
  },
  {
    title: "ML & Data",
    skills: ["PyTorch", "TensorFlow", "FAISS", "BM25", "Apache Spark", "BigQuery", "Vertex AI"],
  },
  {
    title: "Cloud & Deployment",
    skills: ["GCP", "Azure Blob", "Azure PostgreSQL", "Hugging Face", "Vercel", "Render"],
  },
];

export const writing = [
  {
    title: "Legal Sentinel is now live",
    date: "Apr 26, 2026",
    summary: "Notes on turning a legal AI prototype into a deployed contract-review workspace.",
  },
  {
    title: "Designing The Brain: self-correcting RAG",
    date: "Apr 21, 2026",
    summary: "How sufficiency audits, external expansion, and verification loops improve retrieval reliability.",
  },
  {
    title: "High NER accuracy is only the start of a privacy pipeline",
    date: "Apr 21, 2026",
    summary: "Why anonymization needs evaluation, workflow design, and downstream data-quality checks.",
  },
];
