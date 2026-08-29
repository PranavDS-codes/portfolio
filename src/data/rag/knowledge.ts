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
    snippet: "Pranav has worked as an AI/Data Engineering Intern and Volunteer at Joshi Health Foundation / Brown Heart since May 2026. He built and deployed the Brown Heart Assistant (BHAI) from scratch as a full-stack, citation-grounded health education platform serving 5,000+ users, alongside a separate searchable FAQ website. He built a router-orchestrated multi-agent architecture spanning FAQ, MASALA Study, Instagram, YouTube, and movie-timestamp agents, each using source-grounded prompts, confidence gating, and medical-safety refusals.",
    href: "https://bhai.thebrownheart.com/"
  },
  {
    id: "experience-jhf-tech",
    section: "Experience",
    title: "Brown Heart Technical Stack",
    snippet: "For the Brown Heart Assistant, Pranav implemented hybrid retrieval using BM25, a pgvector HNSW index on Azure PostgreSQL, and NVIDIA embeddings/reranking, unified with reciprocal rank fusion (RRF) and streamed via Azure OpenAI for chat generation. He built MCP-style human-in-the-loop (HITL) tool interfaces that trigger on low-confidence medical queries for doctor-specialty matching, clinician contact, or appointment booking. The production backend includes Azure Blob artifact hydration, checksum validation, signed sessions, admin health checks, environment-based model config, LangSmith tracing across agent runs and retrieval scores, and 420+ passing tests.",
    href: "https://bhai.thebrownheart.com/"
  },
  {
    id: "experience-jhf-production-extras",
    section: "Experience",
    title: "Brown Heart: Data Review Gate, FAQ Dashboard, Service API",
    snippet: "Beyond the assistant itself, Pranav's Brown Heart work spans a separate data pipeline repo and a companion FAQ dashboard site. The data pipeline tracks exactly one file in git, the curated FAQ corpus, so every pipeline run produces a reviewable diff that must be checked before anything is published to the production Azure database - a manual review gate applying the same 'don't ship confidence you can't back up' principle to content curation that HITL escalation applies at query time. The FAQ dashboard (faq.thebrownheart.com) is a separate, read-only Astro site rebuilt daily from the same production database through a dedicated read-only Postgres role, and the assistant's FAQ citations deep-link directly to it. For non-browser integrations, a /service/chat API exposes the same chat contract behind per-caller API keys, per-caller rate limiting, and its own LangSmith trace tagging.",
    href: "https://faq.thebrownheart.com/"
  },
  {
    id: "experience-rocket-lawyer",
    section: "Experience",
    title: "Rocket Lawyer Data Engineering",
    snippet: "Pranav was a Data Engineering Intern (ML/NLP Focus) at Rocket Lawyer in San Francisco, CA (Remote). He built a modular NLP data-quality pipeline for Rocket Lawyer's 'Ask a Lawyer' dataset, processing 3,000+ Q&A pairs through PII anonymization, semantic deduplication, and LLM-based validation to feed Rocket Copilot. He fine-tuned a BERT-based NER model for PII anonymization across 600K+ tagged samples, reduced data redundancy by 59.5% with embedding-based deduplication, and improved compliance/content assessment accuracy by 31% with a two-layer LLM-as-a-judge validation framework using Google Cloud and Vertex AI.",
    href: "/#experience"
  },
  {
    id: "experience-ongc",
    section: "Experience",
    title: "Oil and Natural Gas Corporation (ONGC)",
    snippet: "Pranav worked as a Summer Intern at ONGC in Uttarakhand, India. He designed CNN and Spark-based intrusion detection workflows, including a CNN-based malware detector achieving 95%+ accuracy, and built a semi-supervised lithofacies classification system using Bayesian optimization over well-log data. He also developed scalable feature-engineering workflows for packet-stream and well-log data. His research outcomes on security ML and facies classification were published across conference and journal venues.",
    href: "/#experience"
  },
  {
    id: "profile-education",
    section: "Education",
    title: "Education",
    snippet: "Pranav Pant is pursuing an M.S. in Data Science at Arizona State University (Aug 2024 - May 2026, Tempe, AZ) with a 4.00/4.00 GPA. He holds a B.Tech in Computer Science & Engineering from Kalinga Institute of Industrial Technology (Aug 2020 - Apr 2024, Odisha, India) with a 9.52/10.00 GPA.",
    href: "/#education"
  },
  {
    id: "publication-spark-lithofacies",
    section: "Publications",
    title: "Spark-Driven Intrusion Detection & Lithofacies Classification",
    snippet: "Pranav published a paper titled 'Applied Machine Learning and Spark-Driven Workflows for Industrial Intrusion Detection and Lithofacies Classification' in the International Conference on Cybernetics and Machine Learning (2023). The paper details distributed Spark threat identification and lithofacies mapping optimized using Bayesian optimization over semi-supervised data. It received the Best Paper Award and Best Presentation Recognition.",
    href: "https://doi.org/10.1109/ICML.2023.102345"
  },
  {
    id: "publication-dl-intrusion-comparison",
    section: "Publications",
    title: "Comparative Study of Deep Learning for Intrusion Detection",
    snippet: "Pranav co-authored 'A Comparative Study of Deep Learning Techniques for Network Intrusion Detection', published at the International Conference on Emerging Systems and Intelligent Computing (2024). The paper compares deep learning architectures for network intrusion detection across cloud-scale traffic datasets.",
    href: "https://ieeexplore.ieee.org/document/10481540"
  },
  {
    id: "publication-hybrid-ids-ensemble",
    section: "Publications",
    title: "Hybrid Ensemble Intrusion Detection Systems",
    snippet: "Pranav co-authored 'Optimising Intrusion Detection Systems: A Hybrid Approach with Ensemble Machine Learning Models', published in Cluster Computing (2025). The paper proposes a hybrid ensemble framework combining signature-based detection with interpretable meta-ensemble classifiers to improve generalization and robustness of intrusion detection systems.",
    href: "https://scholar.google.com/citations?user=eToK3kMAAAAJ&hl=en"
  },
  {
    id: "publication-software-security-ml",
    section: "Publications",
    title: "Software Security via Machine Learning",
    snippet: "Pranav co-authored the book chapter 'Empowering Software Security: Leveraging Machine Learning for Anomaly Detection and Threat Prevention' in Boosting Software Development Using Machine Learning (2025), examining how machine-learning techniques integrate with software security practices for anomaly detection and threat prevention.",
    href: "https://scholar.google.com/citations?user=eToK3kMAAAAJ&hl=en"
  },
  {
    id: "publication-secure-data-centres",
    section: "Publications",
    title: "Secure Information and Data Centres",
    snippet: "Pranav co-authored the book chapter 'Secure Information and Data Centres: An Exploratory Study' in Predictive Data Security Using AI (Springer, 2022), exploring strategies for securing sensitive information and data centre infrastructure against cyber-attack vectors.",
    href: "https://scholar.google.com/citations?user=eToK3kMAAAAJ&hl=en"
  },
  {
    id: "publication-demystifying-intrusion",
    section: "Publications",
    title: "Demystifying Intrusion Detection Model Interpretability",
    snippet: "Pranav co-authored 'Demystifying Intrusion Detection: A Path to Enhanced Model Understanding', published in the Utkal University Journal of Computing & Communication (2024), investigating interpretability techniques to improve trust in intrusion detection model decisions.",
    href: "https://scholar.google.com/citations?user=eToK3kMAAAAJ&hl=en"
  },
  {
    id: "publication-well-logs-catboost",
    section: "Publications",
    title: "Categorical Boosting for Well-Log Classification",
    snippet: "Pranav co-authored 'Multi-class Imbalanced Classification on Well Logs Using Categorical Boosting Approach', published at the 14th Biennial International Conference and Exposition (SPG, 2024), applying categorical boosting to improve lithofacies prediction accuracy on skewed subsurface well-log datasets.",
    href: "https://scholar.google.com/citations?user=eToK3kMAAAAJ&hl=en"
  },
  {
    id: "publication-sdn-image-datasets",
    section: "Publications",
    title: "Image Datasets for AI/ML in Software-Defined Networking",
    snippet: "Pranav co-authored 'From Pixels to Insights: Image Datasets for AI/ML in Software-Defined Networking', published at the OITS International Conference on Information Technology (OCIT, 2023), surveying image dataset construction for AI/ML-driven intrusion detection in software-defined networking. This paper received a Best Paper Award — one of Pranav's 2 Best Paper awards across his 8 publications, alongside the Lithofacies Classification paper.",
    href: "https://ieeexplore.ieee.org/abstract/document/10430538"
  },
  {
    id: "project-graph-rag",
    section: "Projects",
    title: "Agentic Graph-RAG: The Brain",
    snippet: "Pranav built 'Agentic Graph-RAG: The Brain', a self-correcting LangGraph agent that audits evidence sufficiency, expands searches to web/Wikipedia via Tavily when needed, verifies supporting snippets, and refines failed queries with HyDE query expansion before answering. It uses hybrid retrieval across FAISS/Pinecone dense vectors, BM25, and a 311K-node / 374K-edge Neo4j knowledge graph over 39K chunks, unified with NVIDIA and Cross-Encoder reranking. On 100 judged SQuAD-style examples it improved retrieval hit rate from 82% to 92% and LLM-judged faithfulness from 0.708 to 0.847.",
    href: "https://github.com/PranavDS-codes/RAG"
  },
  {
    id: "project-legal-sentinel",
    section: "Projects",
    title: "Legal Sentinel",
    snippet: "Legal Sentinel is a deployed contract analysis app that parses legal PDFs using a dual-parser with heuristic quality routing and transforms them into structured sections, clause graphs, risk-ranked reviews, and executive summaries. On a sample contract it identified 18 risk flags across 111 sections with 69 clause links via a graph-aware LLM risk analysis workflow, with a typical end-to-end runtime under 60 seconds. It features a run-local retrieval setup that prevents cross-document chat leaks and supports streamed grounded Q&A.",
    href: "https://bored26-legal-sentinel.hf.space/"
  },
  {
    id: "project-legal-sentinel-architecture",
    section: "Projects",
    title: "Legal Sentinel: Model Choice & Relation Labeling",
    snippet: "For Legal Sentinel, Pranav locked every LLM stage - extraction repair, clause verification, risk analysis, and the executive report - onto a single model, openai/gpt-oss-20b, served through NVIDIA's OpenAI-compatible endpoint, trading per-stage model flexibility for one place to tune prompts and change providers. Clause graph edges carry contextual relation labels ('overrides referenced clause', 'conditioned by', 'governed by', 'incorporates definition from') generated by the LLM with a rule-based fallback, instead of a generic 'references' label. Every risk flag is schema-validated: a risk type, severity, rationale, grounded evidence quote, and confidence score.",
    href: "https://github.com/PranavDS-codes/DSE_CAPSTONE"
  },
  {
    id: "project-legal-sentinel-team",
    section: "Projects",
    title: "Legal Sentinel: Team & Origin",
    snippet: "Legal Sentinel began as an FSE 570 capstone project. Pranav owned product, backend, and deployment; a co-contributor, Vishnu Jayanth Senthil Kumar, led frontend, experience, and analysis. The deployed app's own landing page credits both contributors by name.",
    href: "https://bored26-legal-sentinel.hf.space/"
  },
  {
    id: "project-legal-sentinel-safety",
    section: "Projects",
    title: "Legal Sentinel: Cross-Document Leakage Prevention",
    snippet: "Legal Sentinel's retrieval is run-local by design: each session's index is scoped to that session's own uploaded documents only, closing off cross-document chat leakage at the architecture level rather than relying on query-time filtering to catch it after the fact. PDF extraction itself runs through a dual-parser pipeline with heuristic quality routing, picking between scanned, native-text, and mixed extraction strategies based on measured extraction quality rather than assuming one parser handles every document.",
    href: "/case-studies/legal-sentinel"
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
    href: "/#projects"
  },
  {
    id: "skills-ai-systems",
    section: "Skills",
    title: "AI & ML System Skills",
    snippet: "Pranav's AI and ML Systems skillset includes RAG, Graph-RAG, LLM Agents, Multi-Agent Systems, HITL Escalation, LLM-as-a-judge, Prompt Engineering, NLP, Transformers, NER, PyTorch, TensorFlow, Hybrid Retrieval, FAISS, Pinecone, Neo4j, BM25, Cross-Encoder Reranking, LangChain, LangGraph, LLM evaluation, Codex (OpenAI), Antigravity (Google), and Claude Code (Anthropic).",
    href: "/#skills"
  },
  {
    id: "skills-engineering-cloud",
    section: "Skills",
    title: "Software Engineering & Cloud Skills",
    snippet: "Pranav's software engineering and deployment stack includes Python, SQL, FastAPI, Pydantic, Docker, Linux, Git, GCP, BigQuery, Vertex AI, OpenAI API, LangSmith, Azure Blob, Azure PostgreSQL, Hugging Face, Vercel, and Render.",
    href: "/#skills"
  },
  {
    id: "profile-rag-reliability",
    section: "Projects",
    title: "RAG Reliability & Audits",
    snippet: "Pranav approaches RAG reliability by building self-correcting architectures. In projects like Agentic Graph-RAG (The Brain) and Brown Heart Assistant, he ensures high reliability using query analysis, hybrid retrieval (BM25 + vector matching), Neo4j knowledge graphs, multi-step evidence sufficiency audits, confidence gating thresholds, and medical-safety refusal filters to prevent hallucinations.",
    href: "/case-studies/graph-rag"
  },
  {
    id: "case-study-graph-rag",
    section: "Case Studies",
    title: "Case Study: Agentic Graph-RAG (The Brain)",
    snippet: "Pranav wrote a full case study on Agentic Graph-RAG: The Brain, covering the problem with naive RAG (generating fluent but unsupported answers when retrieval fails), the hybrid FAISS/Pinecone/BM25/Neo4j architecture, the self-correction loop with sufficiency auditing and bounded query refinement, and the results (82%→92% hit rate, 0.708→0.847 faithfulness).",
    href: "/case-studies/graph-rag"
  },
  {
    id: "case-study-brown-heart",
    section: "Case Studies",
    title: "Case Study: Brown Heart Assistant",
    snippet: "Pranav wrote a full case study on the Brown Heart Assistant, covering why medical Q&A needs a 'refuse-and-route' design instead of always answering, the router-orchestrated multi-agent architecture, the HITL escalation design for low-confidence medical queries, the reviewed data-publish gate that applies the same discipline upstream to content curation, and the production hardening (LangSmith tracing, a /service/chat API, the companion FAQ dashboard, 420+ tests) behind a system serving 5,000+ users.",
    href: "/case-studies/brown-heart"
  },
  {
    id: "case-study-legal-sentinel",
    section: "Case Studies",
    title: "Case Study: Legal Sentinel",
    snippet: "Pranav wrote a full case study on Legal Sentinel, covering the dual-parser PDF extraction pipeline, the graph-aware LLM risk analysis workflow, the schema-validated risk flags (18 flags across 111 sections on a sample contract, under 60s runtime), and the run-local retrieval design that prevents documents from leaking across user sessions.",
    href: "/case-studies/legal-sentinel"
  }
];
