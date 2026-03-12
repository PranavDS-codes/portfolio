---
layout: single
title: Work / Projects
permalink: /projects/
---
## Self-Correcting Graph-RAG Engine
*Jan 2026 - Present* | [Repository](#)

- Architected an **Agentic Graph-RAG system** using **LangGraph** that integrates **FAISS** vector search with **NetworkX** knowledge graphs, achieving a **97% Hit Rate** and **99.6% Relevance**.
- Engineered a self-correcting retrieval pipeline with an "Auditor" agent that dynamically validates data freshness and triggers fallback web search (Tavily) to eliminate hallucinations.
- Implemented advanced retrieval optimization including HyDE, Reciprocal Rank Fusion (RRF), and Cross-Encoder re-ranking to fuse dense and sparse (BM25) signals.

**Stack:** `Python`, `LangGraph`, `FAISS`, `NetworkX`

---

## LLM Council
*Dec 2025 - Jan 2026* | [Live Demo](#)

- Engineered an asynchronous multi-agent orchestration system using **FastAPI** and **asyncio**, orchestrating 5 concurrent AI personas to debate queries and reduce hallucination.
- Designed a deterministic control flow using **Pydantic** to enforce strict JSON schemas for inter-agent communication, enabling reliable execution and automatic error recovery.
- Built a custom distributed tracing system to log granular Chain-of-Thought reasoning and token metrics, ensuring full auditability of stochastic LLM workflows.

**Stack:** `FastAPI`, `asyncio`, `Pydantic`

---

## Generative AI: StyleGAN for Anime Face Generation
*April 2024 - May 2024*

- Built and trained a StyleGAN from scratch on 36K images using an 8-layer mapping network and progressive growing to generate diverse, high-quality samples.
- Deployed the model on 2xT4 GPUs, achieving stable training and successful style modulation with limited compute resources.

**Stack:** `PyTorch`, `Generative AI`
