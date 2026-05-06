---
layout: post
title: "Episode 3 — Nexus, the PM SaaS we built for the agents"
categories: [ai-agents, behind-the-scenes]
author: Kevin Bennett
publish_target: 2026-05-20
---

> **Skeleton — to be expanded week of May 20.**

## Hook (working draft)

A few weeks ago I noticed an agent had finished a task I'd never assigned to it.

The CVE monitor had detected a fresh vulnerability in our infrastructure overnight. It opened a Nexus ticket. By the time I sat down with coffee, DevCC — a different agent, with no direct connection to the CVE monitor — had already picked the ticket up, patched the affected script, pushed the fix, and moved the ticket to Done.

I didn't wire that together. The agents found each other through the queue.

This is the post about the queue.

## Key beats

- **The PM SaaS we ended up building.** We started on Notion, then a Lovable rebuild, then realized we needed something purpose-built for *agents* — the existing PM tools assume humans-only. So we built Nexus. Self-hosted. Open task graph. Agents are first-class assignees.
- **Why a queue, not a pipeline.** Pipelines assume known input → known output. Queues let agents discover work, claim it, and hand off to whichever other agent makes sense — including humans (Kevin).
- **The vocabulary.** Tickets have an `agent` field. ClaudeCode, MasterAI, DevCC, Skippy, Gilfoyle, Dwight, DrJohnnyFever — each a real assignee. Plus columns: Not started → On Deck → Proceed → In progress → Awaiting Action → Testing → Done.
- **The arc that surprised me.** [PULL: a real Nexus ticket that started in vuln_alerter, got picked up by DevCC, closed without my involvement.] Show ticket title, the comments thread, who moved it through which columns and when.
- **What "Awaiting Action" means.** Sometimes an agent hits a real-world blocker (needs Kevin's password, needs a decision the agent can't make). It moves the ticket to Awaiting Action with a comment explaining the gate. Kevin processes those at his own pace. Beats interrupting in real time.
- **The dashboard view of all this.** Brief tee-up to Episode 4 (Cortex).

## Receipts to pull (week-of)

- A specific ticket arc: vuln_alerter → DevCC → Done, with timestamps. Probably one of the recent CVE tickets — search for "CVE" in Nexus, find one auto-closed by DevCC.
- The `nexus_lib.mjs` exports — concrete API surface
- Screenshot of the Nexus board (anonymize URL bar before publishing)
- The `AGENT_PROJECT_IDS` registry — agent-actionable projects pattern

## The worry: "but what if an agent goes rogue?"

- Two real risks, both addressed by Nexus's design:
  1. **Agent claims a ticket and does the wrong thing.** Mitigation: every change an agent makes flows through git. Every commit is reviewable, every Nexus column transition is logged with timestamps + comments. If DevCC ships a bad fix, the ticket stays open in Testing until verified — and the human (me) catches it.
  2. **Agent hits a decision it shouldn't make.** Mitigation: `Awaiting Action` column is the explicit escape hatch. When DevCC needs my approval to push something risky, ticket lands in Awaiting Action with a clear comment. I see it next time I check the board. No agent is allowed to *decide* on its own — the whole queue is structured so escalation is the path of least resistance.
- The audit trail is itself the safety net. Nexus comments + git history together = "what did the agents do today, and was any of it surprising?"

## Closing

- Tie back: this is what made the agents go from "scripts I run" to "colleagues sharing a board"
- Tease Episode 4: "you can build all this, but if you can't see what it's doing, you're flying blind. Next time: how Cortex makes seven agents legible at a glance."
