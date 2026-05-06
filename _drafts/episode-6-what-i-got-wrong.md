---
layout: post
title: "Episode 6 — What I got wrong"
categories: [ai-agents, behind-the-scenes]
author: Kevin Bennett
publish_target: 2026-06-10
---

> **Skeleton — to be expanded week of June 10.**

## Hook (working draft)

If the first five posts in this series read like everything works, that's because I edited carefully. This post is the cutting-room floor.

These are the moments where the agents broke in subtle, embarrassing, or instructive ways. I'm including them not because failure makes for a great closer (it does), but because anyone considering building something like this for their own small business should know what the failure modes actually look like — not the neat "AI hallucinates" boogeymen, the actual mundane ones.

## Key beats — pick the strongest 3-4

### The JSDoc that took down Cortex

- DevCC shipped a schedule-aware cron-health categorization commit
- The file had `*/2` and `*/5` literal cron expressions inside a `/** */` JSDoc block
- The first `*/` prematurely closed the comment — Node parsed `→ 5 min grace` as code, threw `SyntaxError`, container went into restart loop
- Cortex API down for ~12 hours overnight before I noticed
- Hot-fix: space out the literals (`* /2`, `* /5`), rebuild + restart
- Lesson: comment syntax is code. Linters that catch unclosed-comment errors should be in CI.

### The hallucinated email draft

- A customer wrote in February following up on an unfulfilled badge from the prior year
- The AI drafter pulled in the *prior thread context* — a year-ago batch-coordination email with totally different participants — and addressed the new draft to "Derek/Aaron/Eric/Teagan"
- I caught it before sending only because the names were obviously wrong
- Fixed by tightening the prompt: latest message is the explicit reply target, prior thread is *context only*, hard rule against addressing names from older messages
- Lesson: LLMs blend context that humans naturally compartmentalize. The fix is structural in the prompt, not retraining.

### The opendirectoryd CPU loop I'm still chasing

- AgentMini's macOS opendirectoryd process pinning 60-130% CPU sustained, dragging automountd + log + diagnosticd along
- HUP doesn't fix it (just reloads config). Kill+respawn works briefly, then the same trigger re-pins it
- Root cause: still not fully diagnosed. Authentication failures from somewhere are being processed in a tight loop with automountd hammering opendirectoryd for credential lookups
- Current state: a watchdog cron auto-kills opendirectoryd when CPU >50%, which is a band-aid, not a fix
- Lesson: not every loud problem has a clean root cause. Sometimes the right answer is "automate the recovery while you keep digging."

### The launchctl restart race

- Updater for openclaw used `bootout` then `bootstrap` to restart the gateway service
- `bootout` returns before the unload finishes, so `bootstrap` finds the label still loaded and fails with "Bootstrap failed: 5: Input/output error"
- Auto-rollback fired, gateway stayed on old version
- Fix: use `launchctl kickstart -k` instead, which atomically restarts a running service
- Lesson: macOS launchd APIs have race conditions in their composition. Read the man page, don't infer.

## What these have in common

- None of them were the *AI* failing. The AI was correct in the boring ways. The failures were boring software bugs in the *plumbing* — a comment closing too early, a context window blending, a system call returning before its work was done, a kernel auth flow looping.
- The failures cost time when they happened. Net for the year still positive — but anyone running this stack should expect to spend ~2-5% of their time on plumbing maintenance.

## The worry: "is this all worth it?"

- Honest answer: yes, but only if you genuinely have a long tail of operational work that's costing you attention. If your inbox is already manageable and your infrastructure is one server, agents are a fun toy and you don't need them.
- For a 1.5-person team running multiple product lines, multiple inboxes, a few dozen GitHub repos, and a handful of physical locations? The agents have given me back hours per week and surfaced opportunities that would have otherwise been lost.

## Receipts to pull (week-of)

- Specific commit SHAs for the JSDoc fix (e38982b on cortex repo)
- Specific commit for the prompt fix (the email_watcher.mjs draftReply update)
- Cortex-down timeline for the JSDoc incident (start time, detection time, fix time)
- Watchdog script (`ops/opendirectoryd_watchdog.sh`)

## Closing

- The series wraps. Sketch what's next: more agents (TripDeck, finance reconciliation deeper), open-sourcing parts of the stack (Cortex schema, runbook structure)
- Reader call-to-action: "if you're considering building something like this, pick *one* high-pain manual loop in your week and replace it. Don't try to build my whole stack. Start small."
- Final Discord/Newsletter close
- Possibly: "thanks for reading — the next series will probably be about [seed something — building the hardware side, badge design process, etc.]"
