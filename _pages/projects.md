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
        <p class="project-card__meta">Jan 2026 – Present</p>
        <h3>Self-Correcting Graph-RAG Engine</h3>
      </div>
      <a class="project-card__link" href="https://github.com/PranavDS-codes/RAG">Repository</a>
    </div>

    <p class="project-card__summary">
      Architected an agentic Graph-RAG system that combines vector search, knowledge graphs, and self-auditing retrieval logic to improve both relevance and trust.
    </p>

    <div class="card-grid card-grid--two">
      <article class="info-card info-card--compact">
        <h4>Why it mattered</h4>
        <p>Retrieval quality often breaks when context is stale or evidence is weak. This system was designed to detect those cases instead of silently returning bad answers.</p>
      </article>
      <article class="info-card info-card--compact">
        <h4>Outcome</h4>
        <p>Reached 97% hit rate and 99.6% relevance with a retrieval stack tuned for high-signal evidence selection.</p>
      </article>
    </div>

    <ul class="feature-list">
      <li>Built with LangGraph, FAISS, and NetworkX to fuse dense retrieval with knowledge graph reasoning</li>
      <li>Added an auditor agent to validate freshness and trigger fallback search when confidence drops</li>
      <li>Improved ranking with HyDE, Reciprocal Rank Fusion, BM25, and cross-encoder reranking</li>
    </ul>

    <div class="tag-row">
      <span class="tag-chip">Python</span>
      <span class="tag-chip">LangGraph</span>
      <span class="tag-chip">FAISS</span>
      <span class="tag-chip">NetworkX</span>
      <span class="tag-chip">Hybrid Retrieval</span>
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
