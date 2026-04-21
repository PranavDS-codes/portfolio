---
layout: single
title: Writing & Notes
permalink: /writing/
classes: wide
---
<div class="writing-shell">
  <section class="page-intro">
    <p class="eyebrow">Writing</p>
    <h2>Notes on building reliable AI systems</h2>
    <p>
      These notes focus on the parts of AI engineering that usually decide whether a system is trusted in practice: retrieval quality, orchestration discipline, evaluation, and data handling under real constraints.
    </p>
  </section>

  <section class="section-block">
    <div class="section-heading">
      <p class="eyebrow">All Notes</p>
      <h2>Snapshots of every article and technical note I’ve published here</h2>
      <p>Each note is written from an implementation perspective: what tends to break, what is worth instrumenting, and which design choices create better outcomes over time.</p>
    </div>

    <div class="post-grid">
      {% for post in site.posts %}
      <article class="post-card">
        <p class="post-card__meta">{{ post.date | date: "%B %-d, %Y" }}</p>
        <h3><a class="text-link" href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <p>{{ post.excerpt | strip_html | truncate: 220 }}</p>
        <div class="post-card__footer">
          <span class="post-card__time">{{ post.content | number_of_words | divided_by: 180 | plus: 1 }} min read</span>
          <a class="text-link" href="{{ post.url | relative_url }}">Read note</a>
        </div>
      </article>
      {% endfor %}
    </div>
  </section>

  <section class="card-grid card-grid--three">
    <article class="info-card">
      <h3>RAG Architecture</h3>
      <p>How to think about retrieval as a ranking and evidence-design problem instead of just a vector database choice.</p>
    </article>
    <article class="info-card">
      <h3>LLM Reliability</h3>
      <p>Patterns for building control planes around models so failures are easier to detect, isolate, and recover from.</p>
    </article>
    <article class="info-card">
      <h3>Data-Centric ML</h3>
      <p>Why privacy, labeling discipline, and evaluation design often matter more than one more model upgrade.</p>
    </article>
  </section>
</div>
