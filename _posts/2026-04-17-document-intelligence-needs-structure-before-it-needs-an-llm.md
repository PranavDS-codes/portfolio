---
title: "Document Intelligence Needs Structure Before It Needs an LLM"
excerpt: "Building Legal Sentinel reinforced a simple lesson: if a document system does not first establish reliable structure, every downstream LLM stage is forced to reason over text that is already ambiguous, lossy, or misaligned."
layout: single
classes: wide
author_profile: false
date: 2026-04-17
---
One of the most useful lessons from building **Legal Sentinel** was that document intelligence gets much better when the first design question is not *which model should I use?* but *what structure do I need before a model can reason reliably at all?*

That distinction matters a lot in contracts.

Contracts are full of references, definitions, carve-outs, overrides, exhibits, schedules, and clauses whose meaning depends on where they sit in the larger document. If the backend only treats the input as a long bag of text chunks, it forces the model to reconstruct structure that the system should have preserved for it.

That is both expensive and fragile.

## Why raw PDF text is a bad interface

PDFs are not clean semantic documents. They are rendering artifacts.

That means even before any LLM stage begins, the system can already be losing important information:

- headers can be malformed
- section boundaries can be merged or split incorrectly
- references can be separated from the text that gives them meaning
- tables, exhibits, and schedules can be flattened badly
- page flow can distort the original clause hierarchy

If the very first representation of the contract is weak, then every later stage inherits that weakness. An LLM can sometimes smooth over the damage, but it does not remove the root problem.

This is why I think a backend for legal document intelligence should treat PDF extraction as a reliability problem, not as a solved preprocessing task.

## Why I used multiple parsers instead of trusting one

In Legal Sentinel, I did not want to assume that one extraction library would be consistently better across all contracts. So the pipeline ran both PyMuPDF and pdfplumber, scored the resulting text heuristically, and routed the document through the cleaner path.

That decision was important because parser failures are not uniform. One parser might preserve spacing better while another preserves section boundaries better. One might handle dense text well while another handles layout quirks better.

This is one of those cases where simple backend skepticism pays off. Instead of assuming the tool choice was globally correct, the system asked a narrower operational question: *which output looks more usable for this specific document?*

That kind of local judgment often matters more than broad library preferences.

## Section extraction is not just formatting

Once text is extracted, the next major step is not summarization. It is **structure recovery**.

For contracts, that usually means:

- detecting headings
- recovering hierarchy
- identifying articles, sections, exhibits, and schedules
- mapping sections back to pages
- hashing and normalizing section content

This sounds mechanical, but it fundamentally changes what later stages can do.

If the backend has stable section objects, then risk analysis can happen at the clause level instead of across arbitrary chunks. References can resolve to real targets. Reports can cite stable section IDs. Chat can retrieve semantically meaningful artifacts instead of raw window slices.

In other words, structure is not just presentation metadata. It is the scaffold that makes the rest of the intelligence system more trustworthy.

## Contracts are graph-shaped more often than they are paragraph-shaped

One reason flat chunking performs poorly on contracts is that contract meaning is often nonlocal.

A paragraph may look harmless until it invokes a definition elsewhere. A risk clause may appear aggressive until a later carve-out softens it. A section may seem final until an exhibit modifies the obligation.

This is why I think contracts are better modeled as **linked structures** than as isolated text windows.

That was a major design principle in Legal Sentinel. After section extraction, the pipeline looked for internal references like:

- Section 2.2
- Article III
- Exhibit A
- Schedule 1

Those references became graph edges rather than just strings in text.

This matters because once the document becomes a graph of linked clauses, downstream analysis can work with *dependency context* instead of pretending every clause speaks for itself.

## Deterministic parsing should lead, and LLMs should assist selectively

Another strong lesson from the project was that document intelligence works better when deterministic logic does as much as it reasonably can before LLMs take over.

That is not because LLMs are weak. It is because they are expensive and probabilistic. If a regular expression or normalization rule can recover structure reliably, that is usually the better first move.

In Legal Sentinel, deterministic logic handled:

- heading detection
- section construction
- page mapping
- explicit reference extraction
- file-backed artifact persistence

Then LLMs were used for narrower, higher-leverage tasks:

- verifying or recovering edges when regex logic was insufficient
- classifying relation types
- performing graph-aware clause risk analysis
- generating the executive summary

This division of labor felt much more robust than asking a model to do everything in one pass. The deterministic stages narrowed the search space. The model stages then operated inside a better-structured world.

That pattern is worth keeping in almost any applied AI backend: **use symbolic methods to stabilize the input, and use models where ambiguity actually remains.**

## Schema validation matters more in document systems than people think

Once LLMs enter the pipeline, structure becomes even more important.

Contract systems are not just answering a user once. They are generating artifacts that later stages depend on. If one stage emits malformed JSON, drifts from schema, or invents a target that is not grounded in the parsed document, the error can propagate silently.

That is why Legal Sentinel treated structured-output validation as a first-class backend concern.

The practical rule was simple: the model could propose output, but the system had to decide whether that output was acceptable.

For edge verification and risk analysis, that meant validating:

- whether the referenced section IDs actually existed
- whether evidence quotes were present
- whether the output could be parsed cleanly
- whether the fields matched the schema expected downstream

This made the system slower than a pure prompt pipeline, but much more inspectable. And inspectability is usually worth more than speed in legal workflows.

## Better structure improves retrieval too

One side effect I liked in Legal Sentinel was that better structure improved the chat system as well.

Because the backend produced stable section objects, risk artifacts, and report chunks, retrieval could index meaningful units instead of arbitrary text slices. That made grounded chat cleaner. The system was not just searching “the contract.” It was searching the outputs of a pipeline that had already imposed hierarchy, linkage, and analysis.

This is another reason structure should come early. It benefits not only the analysis stages, but the retrieval interface that users experience later.

## Final thought

The strongest lesson from Legal Sentinel is that document intelligence gets more reliable when the backend treats structure as a primary product, not a preprocessing side effect.

If the system can recover clean sections, stable references, and linked context before asking a model to interpret the contract, every downstream stage gets better raw material to work with.

That is what makes a contract analysis system feel engineered rather than merely prompted.
