---
title: "Run-Scoped Retrieval Is the Difference Between Grounded Chat and Leakage"
excerpt: "Legal Sentinel made one lesson very concrete for me: if a document chat system does not isolate retrieval per run or per document, grounding claims become much weaker because the backend can no longer guarantee where the answer context actually came from."
layout: single
classes: wide
author_profile: false
date: 2026-04-18
---
When people talk about grounded chat over documents, the conversation usually focuses on embeddings, chunking strategy, or which model is answering questions. Those choices matter, but **Legal Sentinel** pushed me toward a different conclusion:

The first question should be whether the retrieval layer is *safely scoped at all*.

For a contract system, this is not a minor design choice. If retrieval artifacts from one document can bleed into another, then the system loses one of its most important guarantees: that answers are grounded in the active contract and not in residual memory from previous runs.

That guarantee is easy to gesture at and surprisingly easy to break.

## Why “grounded chat” is often underspecified

A lot of document chat systems say they are grounded because they retrieve from some indexed context before answering. But that statement leaves out a crucial detail:

*Grounded to what?*

If the retrieval layer is a shared global index, then the answer may be grounded to *a* document, but not necessarily *the current document*. In some settings that is acceptable. In legal review, it usually is not.

Contracts are too sensitive, too specific, and too dependency-heavy for fuzzy retrieval scope. If a user asks about termination rights, indemnity carve-outs, or governing law in one uploaded agreement, even a subtle contamination from another contract can distort the answer.

That is why I think grounding claims should include retrieval boundaries, not just retrieval existence.

## What Legal Sentinel did differently

Legal Sentinel stores artifacts per run under a dedicated output directory. That includes:

- parsed sections
- graph edges
- risk findings
- reports
- vector arrays
- retrieval metadata

The practical result is that every uploaded contract gets its own analysis state and its own retrieval surface.

I like this pattern because it turns an abstract trust claim into a concrete backend property. Instead of telling yourself the chat is probably using the right context, you can point to the actual run directory and say: these are the only artifacts eligible for retrieval in this conversation.

That is a much stronger engineering story.

## Why shared memory is dangerous in document systems

Shared retrieval layers are tempting because they are operationally simple. One index is easier to manage than many. But convenience can hide several risks.

### 1. Cross-document contamination

If multiple contracts share the same retrieval surface, similar clause language can cause the retriever to return semantically close but document-wrong passages. Legal language is full of recurring patterns, so this is not a rare edge case.

### 2. Ambiguous provenance

Even when the answer happens to be right, it becomes harder to prove which document the evidence came from. That weakens the inspectability of the system, and inspectability matters a lot in legal workflows.

### 3. Harder debugging

When retrieval is global, a strange answer can come from many places. When retrieval is run-scoped, the search space is much smaller and failures become easier to isolate.

### 4. Weaker product guarantees

A legal review assistant should be able to make crisp promises about context boundaries. If the backend cannot enforce those boundaries, product claims about groundedness become softer than they sound.

## Isolation is not only a security property

One thing I found useful in Legal Sentinel is that run isolation improved not just trust, but architecture clarity.

Because each run had its own artifacts and vector index, the backend pipeline became easier to reason about:

- upload creates a run
- analysis stages write artifacts into that run
- retrieval indexes those artifacts progressively
- chat reads only from that run

That is a very clean mental model. Each contract becomes a local knowledge environment with explicit lifecycle boundaries.

I think this matters because good architecture is often the result of making trust boundaries visible in the code and storage model, not just in documentation.

## Progressive indexing made the system more useful

Another interesting lesson was that run-scoped retrieval pairs well with **progressive indexing**.

In Legal Sentinel, artifacts did not need to wait for the entire pipeline to finish before becoming retrievable. As sections, risks, and reports were produced, they could be added to the run-local retrieval index.

This made the backend more interactive. The system did not have to choose between full pipeline completion and zero retrieval. It could expose partial but clearly scoped intelligence as the run advanced.

That is the kind of design choice I like in applied AI systems: one that improves usability without relaxing the boundary conditions that keep the system trustworthy.

## Retrieval quality is not only about relevance

When people optimize retrieval, they often chase semantic relevance metrics alone. That is useful, but in systems like Legal Sentinel I think retrieval quality has at least three dimensions:

- relevance
- provenance
- scope integrity

Relevance asks whether the returned artifact is semantically helpful. Provenance asks whether you can explain where it came from. Scope integrity asks whether it belonged in the search space to begin with.

If any of those are weak, the chat system becomes less dependable.

This is why I think scoped retrieval should be considered part of the grounding contract, not just a storage implementation detail.

## File-backed run isolation is more credible than overengineered claims

One thing I like about the project is that the implementation stays practical. Legal Sentinel does not pretend to be a massive distributed platform. It uses file-backed run directories, JSON artifacts, and NumPy vectors.

That is a good tradeoff for the stage the system is at.

It is also a reminder that strong backend design is not always about adding infrastructure. Sometimes it is about choosing a storage model that makes important guarantees easy to preserve. In this case, per-run artifact directories are simple, visible, and aligned with the product requirement.

That credibility matters. Recruiters and engineers can usually tell when a system description is overselling infrastructure. A clear file-backed isolation story is often stronger than a vague claim about enterprise architecture.

## What I would generalize from this project

The broader lesson is not limited to contracts. Any system that supports chat over user-provided documents should ask:

- What exactly is the retrieval scope?
- Can a user prove which artifacts were eligible?
- Can the backend enforce isolation rather than merely assume it?
- If the index grows, does the system preserve provenance and scope clarity?

These questions become more important as systems move from demos to tools people actually trust with sensitive workflows.

## Final thought

Legal Sentinel reinforced a principle I want to keep applying: **grounding is not just about retrieving relevant text, but about guaranteeing that the right text was even allowed into the answer path.**

Run-scoped retrieval made that guarantee much stronger.

And in document intelligence systems, stronger guarantees are often what separate a useful backend from a clever demo.
