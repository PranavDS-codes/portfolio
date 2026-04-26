---
title: "Legal Sentinel Is Now Live"
excerpt: "Legal Sentinel is now deployed as a single-URL contract review experience, which forced a useful shift in the engineering work: packaging the backend, serving the frontend cleanly, and making run state, cleanup, and health checks practical enough for real hosted demos."
layout: single
classes: wide
author_profile: false
date: 2026-04-26
---
Legal Sentinel is now live at [bored26-legal-sentinel.hf.space](https://bored26-legal-sentinel.hf.space/).

That matters because the project is no longer just a local pipeline demo. The deployed version lets someone follow the full workflow in one place:

- upload a contract PDF
- extract sections
- build the clause relationship graph
- analyze risk
- generate an executive review
- ask grounded follow-up questions in chat

The most useful engineering shift was not in the prompting. It was in making the system deployable as a single-container app: packaging the backend, serving the built frontend from FastAPI, externalizing runtime configuration, and adding file-backed run state, cleanup, and health checks so the app behaves well enough for free hosting.

The live app currently supports guided progress, interactive clause exploration, risk-priority review, section-aware executive reporting, and grounded chat with model selection. I still would not overclaim production-grade legal reliability or durable multi-user infrastructure, but it is now a much stronger demonstration of product-minded AI backend engineering than a notebook-only prototype.
