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
  scholarUrl: "https://scholar.google.com/citations?user=eToK3kMAAAAJ&hl=en",
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
  { label: "Education", href: "#education" },
  { label: "Publications", href: "#publications" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Case Studies", href: "#case-studies" },
];

export const education = [
  {
    company: "Arizona State University",
    role: "M.S., Data Science",
    dates: "Aug 2024 - May 2026",
    location: "Tempe, AZ",
    summary: "GPA: 4.00/4.00",
    bullets: [],
    tags: [],
  },
  {
    company: "Kalinga Institute of Industrial Technology",
    role: "B.Tech, Computer Science & Engineering",
    dates: "Aug 2020 - Apr 2024",
    location: "Odisha, India",
    summary: "GPA: 9.52/10.00",
    bullets: [],
    tags: [],
  },
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
    dates: "May 2026 - Present",
    location: "Remote",
    featured: true,
    summary:
      "Building and deploying Brown Heart Assistant from scratch as a full-stack, citation-grounded health education platform serving 5,000+ users through a router-orchestrated multi-agent RAG architecture.",
    bullets: [
      "Developed FAQ and MASALA Study RAG agents with source-grounded prompts, citations, confidence gating, unsupported-answer handling, and medical-safety refusals.",
      "Built a router-orchestrated multi-agent architecture spanning FAQ, MASALA Study, Instagram, YouTube, and movie-timestamp agents with source-aware prompts and fallback logic.",
      "Implemented hybrid retrieval with BM25, a pgvector HNSW index on Azure PostgreSQL, NVIDIA embeddings and reranking, reciprocal rank fusion, and streamed cited responses via Azure OpenAI.",
      "Developed MCP-style HITL tool interfaces that trigger on low-confidence medical queries, enabling doctor-specialty matching, clinician contact, or appointment-booking instead of unsupported medical guidance.",
      "Deployed FastAPI retrieval services on Azure with Blob Storage, PostgreSQL row/chunk hydration, signed sessions, admin health checks, environment-based model config, and 420+ passing tests.",
      "Implemented LangSmith tracing across agent runs, retrieval scores, citation generation, refusal triggers, and HITL escalations to monitor production RAG behavior.",
    ],
    links: [
      {
        label: "BHAI",
        href: "https://bhai.thebrownheart.com/",
      },
      {
        label: "FAQ Website",
        href: "https://faq.thebrownheart.com/",
      },
    ],
    tags: ["FastAPI", "RAG", "pgvector", "HITL", "LangSmith", "Azure PostgreSQL", "Python"],
  },
  {
    company: "Rocket Lawyer",
    role: "Data Engineering Intern (ML/NLP Focus)",
    dates: "Jun 2025 - Aug 2025",
    location: "San Francisco, CA · Remote",
    summary:
      "Built a modular NLP data-quality pipeline for Rocket Lawyer's 'Ask a Lawyer' dataset, combining anonymization, semantic deduplication, and LLM-based validation to feed Rocket Copilot.",
    bullets: [
      "Processed 3,000+ Q&A pairs through PII anonymization, LLM-as-a-judge validation, and deduplication, enabling reliable input for Rocket Copilot.",
      "Fine-tuned BERT-based NER for PII anonymization across 600K+ tagged samples.",
      "Reduced redundancy by 59.5% with embedding-based duplicate consolidation.",
      "Improved compliance/content assessment accuracy by 31% with a two-layer LLM-as-a-judge validation framework.",
    ],
    tags: ["Transformers", "NER", "GCP", "Vertex AI", "FAISS", "Python"],
  },
  {
    company: "Oil and Natural Gas Corporation (ONGC)",
    role: "Summer Intern",
    dates: "May 2023 - Aug 2023",
    location: "Uttarakhand, India",
    summary:
      "Worked on applied machine learning systems for intrusion detection, malware detection, and facies classification, with research outcomes published across conference and journal venues.",
    bullets: [
      "Designed CNN and Spark-based intrusion detection workflows, including a CNN-based malware detector achieving 95%+ accuracy.",
      "Built semi-supervised facies classification with Bayesian optimization over well-log data.",
      "Developed scalable feature-engineering workflows for packet-stream and well-log data.",
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
    featured: true,
    note: "Best Paper Award / Best Presentation Recognition",
    abstract: "Developed distributed Spark pipelines to identify security threats and optimized facies mapping algorithms using Bayesian optimization over semi-supervised data distributions.",
    doi: "https://doi.org/10.1109/ICML.2023.102345",
    tags: ["Apache Spark", "PyTorch", "SQL"],
  },
  {
    title: "A Comparative Study of Deep Learning Techniques for Network Intrusion Detection",
    authors: "Pranav Pant, A. Kumar, L. K. Vashishtha, S. Dash, N. K. Ray, S. K. Sahu",
    venue: "International Conference on Emerging Systems and Intelligent Computing",
    year: "2024",
    abstract: "Compared deep learning architectures for network intrusion detection, evaluating generalization and interpretability across cloud-scale traffic datasets.",
    doi: "https://ieeexplore.ieee.org/document/10481540",
    tags: ["Deep Learning", "Intrusion Detection", "Python"],
  },
  {
    title: "Optimising Intrusion Detection Systems: A Hybrid Approach with Ensemble Machine Learning Models",
    authors: "L. K. Vashishtha, K. Chatterjee, Pranav Pant",
    venue: "Cluster Computing",
    year: "2025",
    abstract: "Proposed a hybrid ensemble machine learning approach to improve generalization and interpretability of intrusion detection systems for modern cloud infrastructure.",
    tags: ["Ensemble Learning", "Cloud Security"],
  },
  {
    title: "Empowering Software Security: Leveraging Machine Learning for Anomaly Detection and Threat Prevention",
    authors: "L. K. Vashishtha, K. Chattejee, Pranav Pant, S. K. Sahu, D. P. Mohapatra",
    venue: "Boosting Software Development Using Machine Learning (book chapter)",
    year: "2025",
    abstract: "Examined the integration of software security practices with modern machine-learning techniques for anomaly detection and threat prevention across the development lifecycle.",
    tags: ["Anomaly Detection", "Software Security"],
  },
  {
    title: "Secure Information and Data Centres: An Exploratory Study",
    authors: "Pranav Pant, K. Anand, D. D. Onthoni",
    venue: "Predictive Data Security Using AI (Springer book chapter)",
    year: "2022",
    abstract: "Explored strategies for securing sensitive information and data centre infrastructure against cyber-attack vectors targeting strategic and proprietary data.",
    tags: ["Data Security", "Cybersecurity"],
  },
  {
    title: "Demystifying Intrusion Detection: A Path to Enhanced Model Understanding",
    authors: "S. K. Sahu, Pranav Pant, R. Mallick",
    venue: "Utkal University Journal of Computing & Communication",
    year: "2024",
    abstract: "Investigated interpretability techniques for intrusion detection models to improve trust and diagnostic understanding of model decisions.",
    tags: ["Model Interpretability", "Intrusion Detection"],
  },
  {
    title: "Multi-class Imbalanced Classification on Well Logs Using Categorical Boosting Approach",
    authors: "S. K. Sahu, S. K. Singh, Pranav Pant",
    venue: "14th Biennial International Conference and Exposition (SPG)",
    year: "2024",
    abstract: "Applied categorical boosting to multi-class imbalanced well-log classification, improving lithofacies prediction accuracy on skewed subsurface datasets.",
    tags: ["CatBoost", "Well Logs", "Facies Classification"],
  },
  {
    title: "From Pixels to Insights: Image Datasets for AI/ML in Software-Defined Networking",
    authors: "Pranav Pant, R. Mallick, S. K. Sahu, L. K. Vashishtha",
    venue: "OITS International Conference on Information Technology (OCIT)",
    year: "2023",
    featured: true,
    note: "Best Paper Award",
    abstract: "Surveyed image dataset construction and applications for AI/ML-driven intrusion detection in software-defined networking environments.",
    doi: "https://ieeexplore.ieee.org/abstract/document/10430538",
    tags: ["Software-Defined Networking", "Datasets"],
  },
];

export const projects = [
  {
    title: "Agentic Graph-RAG: The Brain",
    meta: "Graph-RAG · LangGraph · Retrieval",
    summary:
      "A self-correcting LangGraph agent that audits evidence sufficiency, expands to web and Wikipedia when needed, verifies supporting snippets, and refines failed searches before answering.",
    bullets: [
      "Improved retrieval hit rate from 82% to 92% and LLM-judged faithfulness from 0.708 to 0.847 on 100 judged SQuAD-style examples.",
      "Hybrid retrieval across FAISS/Pinecone dense vectors, BM25, and a 311K-node / 374K-edge Neo4j graph over 39K chunks, unified with NVIDIA and Cross-Encoder reranking.",
      "HyDE query expansion plus Tavily/Wikipedia fallback and bounded query-refinement loops to reduce unsupported or stale answers.",
    ],
    links: [{ label: "Repository", href: "https://github.com/PranavDS-codes/RAG" }],
    tags: ["LangGraph", "Neo4j", "FAISS", "Pinecone", "BM25", "RAG"],
  },
  {
    title: "Legal Sentinel",
    meta: "Legal AI · FastAPI · Document Intelligence",
    summary:
      "A deployed contract analysis app that turns legal PDFs into structured sections, clause graphs, risk-ranked review outputs, executive summaries, and grounded follow-up chat.",
    bullets: [
      "Dual-parser PDF extraction with heuristic quality routing.",
      "Identified 18 risk flags across 111 sections with 69 clause links in a sample contract via a graph-aware LLM risk analysis workflow.",
      "Interactive clause graph and guided review workspace.",
      "Run-local retrieval prevents cross-document chat leakage.",
    ],
    links: [
      { label: "Live App", href: "https://bored26-legal-sentinel.hf.space/" },
      { label: "GitHub", href: "https://github.com/PranavDS-codes/DSE_CAPSTONE" },
    ],
    tags: ["FastAPI", "Pydantic", "RAG", "NVIDIA", "Python"],
  },
  {
    title: "LLM Council",
    meta: "Agents · FastAPI · Orchestration",
    summary:
      "A multi-agent deliberation pipeline that separates drafting, scoring, planning, and writing into distinct stages, so a final answer's provenance can be inspected instead of just trusted.",
    bullets: [
      "Independent persona drafts are scored on a fixed five-metric rubric, then a deterministic rule — not another model vote — picks the finalists.",
      "A dedicated architect stage plans structure and tone from the critique before any final prose gets written.",
      "Fully customizable agent roster (up to 12 personas, per-role models), report-grounded follow-up chat, and LangSmith tracing end to end.",
    ],
    links: [
      { label: "Live App", href: "https://llm-council-three.vercel.app/" },
      { label: "GitHub", href: "https://github.com/PranavDS-codes/LLM-Council" },
    ],
    tags: ["FastAPI", "Pydantic", "NVIDIA NIM", "LangSmith", "Multi-Agent Systems"],
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
    skills: ["RAG", "Graph-RAG", "LLM Agents", "Multi-Agent Systems", "HITL Escalation", "LLM-as-a-judge", "Prompt Engineering", "NLP", "Transformers", "NER", "Codex", "Antigravity", "Claude Code"],
  },
  {
    title: "Engineering",
    skills: ["Python", "SQL", "FastAPI", "Pydantic", "LangChain", "LangGraph", "Docker", "Linux", "Git"],
  },
  {
    title: "ML & Data",
    skills: ["PyTorch", "TensorFlow", "Hybrid Retrieval", "FAISS", "Pinecone", "Neo4j", "BM25", "Cross-Encoder Reranking", "Apache Spark", "BigQuery", "Vertex AI"],
  },
  {
    title: "Cloud & Deployment",
    skills: ["GCP", "OpenAI API", "LangSmith", "Azure Blob", "Azure PostgreSQL", "Hugging Face", "Vercel", "Render"],
  },
];

export const caseStudies = [
  {
    slug: "graph-rag",
    title: "Agentic Graph-RAG: The Brain",
    meta: "Graph-RAG · LangGraph · Self-Correction",
    summary: "How a self-correcting retrieval loop pushed hit rate from 82% to 92% and faithfulness from 0.708 to 0.847 — and what naive RAG kept getting wrong.",
    tags: ["LangGraph", "Neo4j", "FAISS", "RAG"],
  },
  {
    slug: "brown-heart",
    title: "Brown Heart Assistant",
    meta: "Medical RAG · HITL · Multi-Agent",
    summary: "Designing a medical Q&A assistant that knows when to refuse and hand off to a human instead of guessing — serving 5,000+ users in production.",
    tags: ["HITL", "pgvector", "LangSmith", "Azure OpenAI"],
  },
  {
    slug: "legal-sentinel",
    title: "Legal Sentinel",
    meta: "Legal AI · Clause Graphs · Document Intelligence",
    summary: "Turning a contract into a risk-ranked clause graph — 18 flags, 111 sections, 69 links, under 60s — without ever letting documents leak across sessions.",
    tags: ["FastAPI", "NVIDIA", "RAG"],
  },
  {
    slug: "llm-council",
    title: "LLM Council",
    meta: "Agents · LLM Orchestration · Deliberation",
    summary: "Five personas draft, one rubric scores them, and a rules-based selector — not a model vote — decides what makes the final answer.",
    tags: ["FastAPI", "NVIDIA NIM", "Multi-Agent Systems", "LangSmith"],
  },
];
