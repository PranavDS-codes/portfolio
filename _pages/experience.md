---
layout: single
title: Experience
permalink: /experience/
classes: wide
---
<section class="page-intro">
  <p class="eyebrow">Experience</p>
  <h2>Applied ML work with measurable outcomes</h2>
  <p>
    I’ve worked across privacy-aware NLP, semantic retrieval, and machine learning systems that need to be both technically strong and operationally practical. The through line is building with clarity, rigor, and measurable improvement.
  </p>
</section>

<section class="timeline">
  <article class="timeline-entry">
    <div class="timeline-entry__rail">
      <span class="timeline-entry__dot"></span>
    </div>
    <div class="timeline-entry__card">
      <p class="timeline-card__meta">Jun 2025 – Aug 2025 · San Francisco, CA · Remote</p>
      <h3>Rocket Lawyer</h3>
      <p class="timeline-entry__role">Data Engineering Intern (ML/NLP Focus)</p>
      <ul class="feature-list">
        <li>Developed a modular NLP data-quality pipeline for Rocket Lawyer’s Ask a Lawyer data to support Rocket Copilot, processing 3,000+ Q&A pairs through PII anonymization, LLM-as-a-judge compliance validation, embedding-based deduplication, and content-quality assessment.</li>
        <li>Built a PII anonymization module by fine-tuning a BERT-based NER model for token-level entity classification on 600K+ public/proprietary PII-tagged samples, improving sensitive-entity masking and reducing missed PII compared with the initial rule-heavy workflow.</li>
        <li>Reduced data redundancy by 59.5% by building an AI-assisted deduplication workflow that generated question embeddings, clustered semantically similar Q&A pairs, and consolidated overlapping answers to improve content quality, downstream model performance and reduce storage overhead.</li>
        <li>Improved assessment accuracy by 31% by implementing a two-layer LLM-as-a-judge validation framework to detect missed PII/compliance leaks and score content quality (relevance, variety, format) against an expert-curated golden dataset.</li>
        <li>Consolidated a 12-stage Jupyter notebook prototype into a modular Python/GCP workflow, improving reproducibility, stage-level debugging, and handoff readiness for downstream ML teams.</li>
      </ul>
    </div>
  </article>

  <article class="timeline-entry">
    <div class="timeline-entry__rail">
      <span class="timeline-entry__dot"></span>
    </div>
    <div class="timeline-entry__card">
      <p class="timeline-card__meta">May 2023 – Aug 2023 · Uttarakhand, India</p>
      <h3>Oil and Natural Gas Corporation (ONGC)</h3>
      <p class="timeline-entry__role">Summer Intern</p>
      <ul class="feature-list">
        <li>Architected an end-to-end Intrusion Detection System using CNNs and Apache Spark, scalable to large-packet data streams. Research published in OCIT 2023 (Best Paper Award) and Cluster Computing Journal.</li>
        <li>Developed a semi-supervised facies classification pipeline to propagate labels across well logs using Bayesian Optimization. Findings published in SPG 2024.</li>
        <li>Built a CNN-based malware detection model achieving 95%+ accuracy, creating a standardized workflow for network security feature engineering.</li>
      </ul>
    </div>
  </article>
</section>
