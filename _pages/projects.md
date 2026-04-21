---
layout: single
title: Projects
permalink: /projects/
classes: wide
---
<section class="page-intro">
  <p class="eyebrow">Selected Projects</p>
  <h2>Systems I’ve built across retrieval, orchestration, and generative modeling</h2>
  <p>
    My favorite projects are the ones where model quality alone is not enough. I care about evaluation, fallbacks, monitoring, and the scaffolding that turns an intelligent feature into something teams can actually rely on.
  </p>
</section>

<section class="project-stack">
  <article class="project-card">
    <div class="project-card__header">
      <div>
        <p class="project-card__meta">Dec 2025 – Apr 2026 · Personal Project</p>
        <h3>Agentic Graph-RAG: The Brain</h3>
      </div>
      <a class="project-card__link" href="https://github.com/PranavDS-codes/RAG">Repository</a>
    </div>

    <p class="project-card__summary">
      Built a self-correcting RAG platform that treats retrieval as a decision-making workflow. The system decomposes queries, searches across dense, sparse, and graph signals, audits whether internal evidence is sufficient, and dynamically expands to Wikipedia or live web search when needed.
    </p>

    <div class="card-grid card-grid--two">
      <article class="info-card info-card--compact">
        <h4>Why it mattered</h4>
        <p>Most RAG pipelines fail when internal retrieval is shallow or stale. I wanted a system that could detect those gaps, verify external evidence, and refine its search plan before answering instead of hallucinating confidently.</p>
      </article>
      <article class="info-card info-card--compact">
        <h4>Outcome</h4>
        <p>On a 100-question judged benchmark, the system improved hit rate from 82% to 92%, faithfulness from 0.708 to 0.847, and relevance from 0.604 to 0.796 over a naive RAG baseline.</p>
      </article>
    </div>

    <ul class="feature-list">
      <li>Designed a LangGraph workflow around a shared state machine with LLM-based query decomposition, HyDE passages, and sub-query-specific metadata</li>
      <li>Built a tri-hybrid retrieval stack combining FAISS dense search, BM25 keyword search, and Neo4j graph traversal, followed by reranking with NVIDIA NIM and local fallback</li>
      <li>Implemented audit, verification, and refinement loops that decide when internal evidence is insufficient, route to Wikipedia or Tavily web search, and retry with a materially better search plan</li>
      <li>Added provider failover, deep trace logging, and a benchmark harness spanning retrieval metrics plus LLM-judge scores for faithfulness, relevance, utility, and semantic similarity</li>
    </ul>

    <div class="tag-row">
      <span class="tag-chip">Python</span>
      <span class="tag-chip">LangGraph</span>
      <span class="tag-chip">FAISS</span>
      <span class="tag-chip">BM25</span>
      <span class="tag-chip">Neo4j</span>
      <span class="tag-chip">Tavily</span>
      <span class="tag-chip">Hybrid Retrieval</span>
    </div>
  </article>

  <article class="project-card">
    <div class="project-card__header">
      <div>
        <p class="project-card__meta">Apr 2026 · Personal / Capstone Project</p>
        <h3>Legal Sentinel</h3>
      </div>
      <a class="project-card__link" href="https://github.com/PranavDS-codes/DSE_CAPSTONE">Repository</a>
    </div>

    <p class="project-card__summary">
      Built a backend-first AI contract analysis system that ingests legal PDFs, extracts structured sections, resolves clause references into a graph, runs graph-aware risk analysis, generates an executive report, and supports grounded chat scoped to a single contract run.
    </p>

    <div class="card-grid card-grid--two">
      <article class="info-card info-card--compact">
        <h4>Why it mattered</h4>
        <p>Contract risk is rarely isolated to one paragraph. Important exposure is often hidden across definitions, overrides, exhibits, and cross-referenced clauses, which makes flat summarization unreliable for serious review.</p>
      </article>
      <article class="info-card info-card--compact">
        <h4>What stands out</h4>
        <p>The system combines deterministic parsing, schema-validated LLM stages, graph construction, file-backed run orchestration, and run-local retrieval so the backend stays inspectable instead of behaving like a black-box PDF chatbot.</p>
      </article>
    </div>

    <ul class="feature-list">
      <li>Designed a staged FastAPI backend for upload handling, status polling, cancellation, artifact serving, and streaming contract-grounded chat</li>
      <li>Built a dual-parser extraction flow with PyMuPDF and pdfplumber, routing to the higher-quality text path using heuristic scoring rather than trusting one parser blindly</li>
      <li>Constructed section objects, page mappings, regex-based clause references, and LLM-assisted edge verification to build a clause-reference graph before risk analysis</li>
      <li>Implemented graph-aware risk analysis, executive report generation, custom NumPy/JSON vector indexing, and run-scoped retrieval to prevent cross-document leakage in chat</li>
    </ul>

    <div class="tag-row">
      <span class="tag-chip">Python</span>
      <span class="tag-chip">FastAPI</span>
      <span class="tag-chip">Legal AI</span>
      <span class="tag-chip">Document Intelligence</span>
      <span class="tag-chip">PDF Parsing</span>
      <span class="tag-chip">Graph-Based Reasoning</span>
      <span class="tag-chip">Pydantic</span>
    </div>
  </article>

  <article class="project-card">
    <div class="project-card__header">
      <div>
        <p class="project-card__meta">Dec 2025 – Jan 2026</p>
        <h3>LLM Council</h3>
      </div>
      <a class="project-card__link" href="https://llm-council-three.vercel.app/">Live Demo</a>
    </div>

    <p class="project-card__summary">
      Created an asynchronous multi-agent orchestration system where distinct AI personas debate the same prompt, critique one another, and produce a more grounded final response.
    </p>

    <ul class="feature-list">
      <li>Orchestrated five concurrent personas using FastAPI and asyncio for parallel reasoning paths</li>
      <li>Used Pydantic contracts to enforce deterministic, schema-safe message passing between agents</li>
      <li>Implemented custom tracing for chain execution, token usage, and recovery visibility</li>
    </ul>

    <div class="tag-row">
      <span class="tag-chip">FastAPI</span>
      <span class="tag-chip">asyncio</span>
      <span class="tag-chip">Pydantic</span>
      <span class="tag-chip">Multi-Agent Systems</span>
    </div>
  </article>

  <article class="project-card">
    <div class="project-card__header">
      <div>
        <p class="project-card__meta">Apr 2024 – May 2024</p>
        <h3>StyleGAN for Anime Face Generation</h3>
      </div>
    </div>

    <p class="project-card__summary">
      Built and trained a StyleGAN pipeline from scratch to generate high-quality anime faces under constrained compute conditions.
    </p>

    <ul class="feature-list">
      <li>Trained on 36K images with an 8-layer mapping network and progressive growing</li>
      <li>Stabilized training and style modulation behavior across limited GPU resources</li>
      <li>Delivered diverse, visually consistent results using 2x T4 GPUs</li>
    </ul>

    <div class="tag-row">
      <span class="tag-chip">PyTorch</span>
      <span class="tag-chip">GANs</span>
      <span class="tag-chip">Computer Vision</span>
      <span class="tag-chip">Deep Learning</span>
    </div>
  </article>
</section>
