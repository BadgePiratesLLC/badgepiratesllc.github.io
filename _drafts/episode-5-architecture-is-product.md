---
layout: post
title: "Episode 5 — Architecture is product"
categories: [ai-agents, behind-the-scenes]
author: Kevin Bennett
publish_target: 2026-06-03
---

> **Skeleton — to be expanded week of June 3.**

## Hook (working draft)

People who ask "how do you run seven agents?" usually expect me to talk about the agents.

The honest answer is that the agents are the easy part. The hard part — and the part that actually decides whether a setup like this scales for a small team or collapses under its own weight — is the *architecture* around them. The repos. The runbooks. The credential vault. The discipline of making each new piece register itself everywhere it needs to be tracked.

This post is about the boring part. It's also the part nobody else seems to write about.

## Key beats

- **The monorepo that holds everything.** `BadgePiratesLLC/agent-repo` — every agent script, every cron job, every runbook, every shared config lives here. Not because monorepos are universally right, but because for a 1.5-person team the cost of cross-repo coordination is higher than the cost of one well-organized repo.
- **The runbooks discipline.** `workspace/runbooks/*.md` is the single source of truth for "how do I deploy / debug / recover / decommission X." Every new agent ships with a runbook the day it goes live. If a runbook doesn't exist yet, the agent isn't done.
- **Credential management.** All secrets in one vault accessed via a single CLI: `skippy-secret get <key>`. No ad-hoc `.env` files. No checked-in credentials. No "where did I put the GoDaddy API key" panics. Mention `~/.openclaw/openclaw.json` and the secrets-redaction step in the nightly config backup.
- **Register-everywhere convention.** When a new cron, script, or service ships, it gets registered in five places: Cortex (so it shows up in the dashboard), Nexus (so its work is trackable), memory (so I remember why it exists), runbook (so future-me can fix it), `.gitignore` (so its state files don't pollute git). One step missing = trouble in week 4.
- **Plain-text git as the audit log.** Every commit is who-did-what-and-when. DevCC commits as a distinct git identity, MasterAI commits as another. `git log --author=DevCC` is the agent's diary.
- **The "I am the architecture" reality.** When you're 1.5 humans, the architect IS the operator IS the user. There's no team to delegate "ops hygiene" to. Architecture choices that assume someone else will keep things tidy fail immediately.

## The worry: "but credential blast radius — what if an agent gets compromised?"

- This is the right question and the most-likely-to-bite real risk.
- Mitigations:
  - **Scoped credentials.** Each integration has its own credential, narrowest-scope possible. The Microsoft Graph app has only Mail.ReadWrite + Mail.Send + a few read scopes — nothing else. The Cloudflare key scoped to one zone, etc.
  - **Audit trail at the API layer.** Graph logs every action. Cloudflare logs every change. If an agent went rogue with API access, there's an out-of-band record I can pull.
  - **Human-in-the-loop on anything outbound.** Email sending is gated on Discord-channel approval (Episode 1). Git pushes go through a verifier (DevCC has its own CI). Spending money requires my password every time.
  - **Rotation discipline.** Credentials get rotated quarterly minimum, immediately on any suspicion. The `skippy-secret` vault makes rotation a one-line update.
  - **What I don't yet have:** a structured incident-response runbook for "what if an agent's credential leaks." On the to-do list. (Honest about gaps.)

## Receipts to pull (week-of)

- The runbooks index (`ls workspace/runbooks/` count + categories)
- A specific runbook example — pick something concise like `runbooks/macos-daemon-runaway.md` (recent, real, useful)
- The `skippy-secret list` output (count of secrets, no values)
- One commit thread showing the "register-everywhere" pattern

## Closing

- "The agents are the new thing. The boring stuff is what keeps them from becoming the thing that broke your business."
- Tease Episode 6: "next time, the parts where this DID break — and what I learned from it"
- Same Discord/Newsletter close
