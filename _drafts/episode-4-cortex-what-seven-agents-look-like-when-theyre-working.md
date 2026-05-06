---
layout: post
title: "Episode 4 — Cortex, what seven agents look like when they're working"
categories: [ai-agents, behind-the-scenes]
author: Kevin Bennett
publish_target: 2026-05-27
---

> **Skeleton — to be expanded week of May 27.**

## Hook (working draft)

The single hardest thing about running seven persistent agents is *not* writing them.

It's knowing what they're doing right now.

Or — more pointedly — knowing what they *aren't* doing right now, when they should be. A cron that silently stops firing is worse than one that errors loudly. An agent that thinks it's working but isn't is worse than one that's openly broken.

So we built Cortex.

## Key beats

- **What Cortex is.** A self-hosted dashboard at `cortex.bplabs.tech` (Postgres + Caddy + a small API + a UI). Not a SaaS. Not a third-party agent observability product. A hundred lines of glue and three tabs that show me, at any moment: what's healthy, what's failing, what's stale, what just changed.
- **The four pulses every agent emits.**
  - `cron_runs` — every cron job posts its start, end, exit code, stdout/stderr tail
  - `health_checks` — current state per check (ok/warn/error/down) with schedule-aware staleness
  - `assets` — every machine, network device, HA entity (the family CMDB)
  - `alerts` — append-only log of state transitions (the "what changed" feed)
- **What I look at first.** Mornings: Cortex dashboard. Tells me everything that errored, warned, or went stale overnight. ~30 seconds to triage. The /status skill in my CLI does the same but with auto-classification of transient flakes vs persistent failures.
- **The shift in mindset.** Before Cortex, I was reactive — Discord pings would tell me *something* broke, then I'd go hunt for what. After Cortex, I'm proactive — I see the full state of the fleet at once, even when nothing is yelling.
- **The accidental product.** Cortex started as "a dashboard for me." Now it's increasingly a system Kevin would deploy for any small operator running a similar fleet. Tease toward open-sourcing it (or at least documenting the schema).
- **The Family CMDB angle.** Cortex tracks not just agents but my actual machines — AgentLaptop, AgentMini, AgentServer, the home network. Vulnerabilities, OS update status, certificate expiries, all in one place. Inventory hygiene as a side effect of agent ops.

## The worry: "but isn't that dashboard a juicy target?"

- Cortex is fronted by Cloudflare Tunnel + Cloudflare Access. No public IP. Auth required for any read. API key for writes (push agents only — agents don't read).
- Schema is intentionally narrow — no PII, no customer data, no credential material. Inventory + health + run records. If someone breached the dashboard they'd get an interesting picture of my infrastructure but no keys to it.
- Backups: nightly Postgres dump → S3, encrypted. Mentioned briefly.

## Receipts to pull (week-of)

- Screenshot of Cortex dashboard with real numbers
- Schema snippet from `runbooks/cortex-prd.md`
- A specific recent incident where Cortex caught something pre-Discord (any of the recent stale-cron warns)
- Push agent list (every script with `pulse_wrap` invocation)

## Closing

- "If Episode 3 was the agents talking to each other, this is the part where I get to listen in."
- Tease Episode 5: "next time, the boring part — how all of this stays maintainable for a team of one-and-a-half humans"
- Same Discord/Newsletter close
