---
layout: single
author_profile: false
permalink: /
classes: wide
---
<div class="portfolio-home">
  <section class="portfolio-hero">
    <div class="portfolio-hero__copy">
      <p class="eyebrow">Pranav Pant · AI &amp; ML Engineer</p>
      <h1>Building production-minded AI systems that are accurate, auditable, and useful.</h1>
      <p class="lead">
        I design and ship intelligent systems across NLP, retrieval, and agentic workflows. My work blends research depth with engineering discipline, from custom NER pipelines at 99.9% accuracy to Graph-RAG systems tuned for relevance and trust.
      </p>
      <div class="button-row">
        <a class="btn btn--primary btn--large" href="{{ '/projects/' | relative_url }}">View Projects</a>
        <a class="btn btn--light-outline btn--large" href="{{ '/assets/resume/PranavPant2026.pdf' | relative_url }}">Download Resume</a>
        <a class="btn btn--light-outline btn--large" href="{{ '/contact/' | relative_url }}">Get In Touch</a>
      </div>
      <div class="tag-row">
        <span class="tag-chip">Graph-RAG</span>
        <span class="tag-chip">LLM Systems</span>
        <span class="tag-chip">MLOps</span>
        <span class="tag-chip">Applied NLP</span>
        <span class="tag-chip">Evaluation Pipelines</span>
      </div>
    </div>

    <div class="portfolio-hero__visual">
      <div class="portrait-card">
        <div class="portrait-card__glow"></div>
        <img src="{{ '/assets/images/Headshot-torso1.jpg' | relative_url }}" alt="Portrait of Pranav Pant">
        <div class="portrait-card__caption">
          <strong>Based in Arizona</strong>
          <span>Open to ML, AI platform, and applied research roles.</span>
        </div>
      </div>

      <div class="floating-note">
        <span class="floating-note__label">Latest focus</span>
        <strong>Reliable retrieval and multi-agent decision systems</strong>
      </div>
    </div>
  </section>

  <section class="metric-grid">
    <article class="metric-card">
      <span class="metric-card__value">99.9%</span>
      <p class="metric-card__label">NER accuracy on a 600k-sample anonymization pipeline</p>
    </article>
    <article class="metric-card">
      <span class="metric-card__value">92%</span>
      <p class="metric-card__label">Retrieval hit rate on a 100-question benchmark for my agentic Graph-RAG system</p>
    </article>
    <article class="metric-card">
      <span class="metric-card__value">8</span>
      <p class="metric-card__label">Peer-reviewed publications, including 2 Best Paper awards</p>
    </article>
  </section>

  <section class="section-block">
    <div class="section-heading">
      <p class="eyebrow">Selected Work</p>
      <h2>Projects built around reliability, evaluation, and scale</h2>
      <p>I like systems that can explain themselves, recover gracefully, and hold up under real usage instead of staying at demo quality.</p>
    </div>

    <div class="card-grid card-grid--projects">
      <article class="feature-card">
        <p class="feature-card__meta">Graph-RAG · LangGraph · Retrieval</p>
        <h3>Agentic Graph-RAG: The Brain</h3>
        <p>Built a self-correcting retrieval system that audits evidence sufficiency, expands to web and Wikipedia when needed, verifies supporting snippets, and refines failed searches before answering.</p>
        <ul class="feature-list">
          <li>Hit rate improved from 82% to 92% on a judged benchmark</li>
          <li>Hybrid retrieval with FAISS, BM25, Neo4j, and reranking</li>
          <li>Audit, verification, and refinement loops reduce unsupported answers</li>
        </ul>
        <a class="text-link" href="{{ '/projects/' | relative_url }}">Explore project details</a>
      </article>

      <article class="feature-card">
        <p class="feature-card__meta">Legal AI · FastAPI · Backend Systems</p>
        <h3>Legal Sentinel</h3>
        <p>Built and deployed a contract analysis app that turns legal PDFs into structured sections, clause graphs, risk-ranked review outputs, executive summaries, and grounded follow-up chat.</p>
        <ul class="feature-list">
          <li>Dual-parser PDF extraction with heuristic quality routing</li>
          <li>Interactive clause graph and guided review workspace</li>
          <li>Run-local retrieval prevents cross-document chat leakage</li>
        </ul>
        <a class="text-link" href="https://bored26-legal-sentinel.hf.space/">Try Legal Sentinel</a>
      </article>

      <article class="feature-card">
        <p class="feature-card__meta">Agents · FastAPI · Orchestration</p>
        <h3>LLM Council</h3>
        <p>Designed a multi-agent debate system with structured schemas, concurrency, and tracing to make model outputs easier to inspect and trust.</p>
        <ul class="feature-list">
          <li>Five concurrent AI personas evaluating the same problem space</li>
          <li>Strict Pydantic contracts for inter-agent communication</li>
          <li>Traceability for reasoning flow, token usage, and recovery paths</li>
        </ul>
        <a class="text-link" href="{{ '/projects/' | relative_url }}">See the architecture</a>
      </article>

      <article class="feature-card">
        <p class="feature-card__meta">Deep Learning · Vision · Research</p>
        <h3>StyleGAN for Anime Face Generation</h3>
        <p>Implemented a StyleGAN training pipeline from scratch and tuned it for stable generation under constrained compute.</p>
        <ul class="feature-list">
          <li>Trained on 36K images using progressive growing</li>
          <li>Custom mapping network and style modulation workflow</li>
          <li>Delivered high-quality samples using 2x T4 GPUs</li>
        </ul>
        <a class="text-link" href="{{ '/projects/' | relative_url }}">Read the project breakdown</a>
      </article>
    </div>
  </section>

  <section class="section-block section-block--split">
    <div class="highlight-panel">
      <p class="eyebrow">Experience Snapshot</p>
      <h2>Recent work at the intersection of ML engineering and product delivery</h2>
      <p>At Rocket Lawyer, I worked on a modular QA anonymization and validation pipeline that improved privacy handling, reduced redundancy, and gave teams higher-confidence training data.</p>
      <a class="btn btn--primary" href="{{ '/experience/' | relative_url }}">View Experience</a>
    </div>

    <div class="mini-timeline">
      <article class="mini-timeline__item">
        <span class="mini-timeline__date">2025</span>
        <div>
          <h3>Rocket Lawyer</h3>
          <p>Built a three-pass pipeline for anonymization, de-duplication, and semantic QA validation.</p>
        </div>
      </article>
      <article class="mini-timeline__item">
        <span class="mini-timeline__date">2024 to 2026</span>
        <div>
          <h3>Arizona State University</h3>
          <p>M.S. in Data Science with a 4.0 GPA, focused on applied AI systems and research rigor.</p>
        </div>
      </article>
      <article class="mini-timeline__item">
        <span class="mini-timeline__date">Research</span>
        <div>
          <h3>Published Author</h3>
          <p>Eight peer-reviewed papers with two Best Paper awards across AI and systems topics.</p>
        </div>
      </article>
    </div>
  </section>

  <section class="cta-panel">
    <div>
      <p class="eyebrow">Let’s Build Something Sharp</p>
      <h2>I’m especially interested in roles involving LLM infrastructure, retrieval systems, and applied ML engineering.</h2>
    </div>
    <div class="cta-panel__actions">
      <a class="btn btn--primary btn--large" href="{{ '/contact/' | relative_url }}">Start a Conversation</a>
      <a class="btn btn--light-outline btn--large" href="https://www.linkedin.com/in/pranav-pant-ds">LinkedIn</a>
    </div>
  </section>
</div>
