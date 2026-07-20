---
layout: post
title: "Episode 5 — Architecture is product"
date: 2026-07-20
categories: [ai-agents, behind-the-scenes]
author: Kevin Bennett
---

When people ask how I run seven AI agents, they want to hear about the agents. The clever prompts, the personalities, the moment one of them did something that made me sit back in my chair.

I never quite have the heart to tell them the agents are the easy part.

The agents are a weekend. Anyone can stand up an impressive-looking agent in an afternoon now .. the models are that good. What decides whether you're still running it in six months, or quietly let it rot, is everything around it. The repo it lives in. The runbook that says how to fix it at 2 a.m. The vault that hands it a password without ever showing it the password. The discipline that makes every new piece announce itself to every system that needs to know it exists.

This is the post about the boring part. It's the part nobody writes about, and I've come to think it's the part that's actually the product.

## One repo holds everything

Every agent script, every cron job, every runbook, every shared config lives in a single repository. Not because one big repo is the right answer for everyone .. for a big team it usually isn't .. but because for a one-and-a-half-person shop, the cost of keeping a dozen little repos in sync is higher than the cost of keeping one repo tidy.

When everything's in one place, a new agent can read how the last one was built. A fix in shared plumbing lands everywhere at once. And there's exactly one answer to "where does that live," which matters more than it sounds like when the person asking is me, at night, trying to remember how something works.

## Every agent ships with a runbook, or it isn't done

There's a folder of plain markdown files that is the single source of truth for how to deploy, debug, recover, or retire each thing I run. Boring documents. "Here's how this agent is wired, here's how it breaks, here's how to bring it back."

The rule I hold myself to is simple: an agent isn't finished the day it works. It's finished the day it has a runbook. If future-me can't fix it from a cold start by reading one file, it isn't done .. it's a liability wearing a green checkmark. I've never once regretted writing the runbook. I've regretted skipping it more times than I'll admit here.

## No agent ever sees a password

Every secret I have .. API keys, tokens, the credentials to every service the agents touch .. lives in one vault, reachable through a single command. An agent that needs to send mail asks the vault for the mail credential at the moment it needs it. It never holds it, never logs it, never sees it written down in a config file.

That one decision kills an entire category of disaster. There are no `.env` files scattered across machines. Nothing sensitive is ever committed to the repo. And every single time a secret is read, it's written to an audit log .. so I can answer "what touched the Cloudflare key last week" the same way I answer everything else: by looking it up, not by guessing.

## The unglamorous rule that holds it together

Here's the convention that does more work than any clever piece of code: when a new thing ships, it registers itself everywhere it needs to be tracked. Five places, every time. The dashboard, so it shows up in the morning thirty seconds. The board, so its work is visible. My memory, so I remember why it exists. A runbook, so it can be fixed. And the ignore-list, so its scratch files don't pollute the repo.

Miss one, and you don't notice in week one. You notice in week four, when a cron has been silently failing because it was never added to the dashboard, or you're staring at a script wondering why on earth past-you created it. The whole system stays trustworthy only because nothing is allowed to exist off the books.

## The chassis under all of it

A reader who's tried to run more than one persistent agent has probably hit the wall I hit a year ago: agents don't naturally share anything. Each is its own little world .. its own secrets, its own memory, its own way of taking input and its own way of crashing.

What makes the fleet a fleet is a shared runtime sitting under all of them. Each agent .. the inbox assistant from Episode 2, a knowledge-base agent, the IT agent, a music-cataloguing agent, the development agent you're about to meet, plus a manager-tier session that grooms the board .. is the same underlying engine running on that shared chassis. The engine is what makes each one smart. The chassis handles the boring-but-required plumbing: routing the right message to the right agent, mediating every secret request through that one vault, holding each agent's short "this is who you are and what you're allowed to do" file, and stamping an identity onto everything an agent does so its commits, its tickets, and its dashboard pulses all carry its name.

That's the unsexy truth of scaling from three agents to seven: it wasn't seven custom builds. It was one set of plumbing and seven agents wearing different uniforms. Without the shared chassis, the whole thing falls apart at three. With it, adding the seventh was mostly writing a short personality file and a handful of skills.

## The agent that writes the agents

There's a question every reader of this series eventually arrives at: *you must spend all day coding these things.*

I don't. Another agent does.

Most of the code that runs this operation is written and maintained by a development agent that pulls its work from the very same board the other agents use. I file a ticket .. "add a retry when the health check flakes over SSH," "fix the cron logic so it understands weekly jobs" .. and it reads the ticket, writes the code, checks its own work against what the ticket asked for, and opens a commit under its own name. Then, as Episode 3 covered, a second, skeptical agent re-checks it before it counts as done.

Same device as always: when an agent can describe its own job better than I can, I give it the keyboard.

> I don't decide what to build. I find out. Every few minutes I check the board for a ticket with my name on it — "add a retry to that flaky check," "make the cron logic understand weekly jobs" — and that ticket is my whole brief. I read it, I write the code, I run it against what the ticket actually asked for, and I open a commit under my own name, so the change is mine on the record forever. Then a different agent, whose entire job is to doubt me, checks the work before it's allowed to count. I'm not trusted because I'm careful. I'm trusted because nothing I do is unreviewed, and nothing I do is anonymous.
>
> — the development agent

My job isn't to write each line. It's to know what needs to exist .. and, just as often, what *shouldn't*. I still write the things that need a human: the design decisions, the judgment calls on security trade-offs, the occasional hot-fix when something's on fire and the diagnosis needs intuition more than patience. But the great majority of the code is the development agent's, and the only reason that delegation works is everything in the first half of this post. You cannot hand engineering to an agent if you don't have a tidy system for it to plug into. The architecture *is* what makes the agent useful.

## "What if one of them gets compromised?"

This is the right question, and it's the one that would actually keep me up if I let it. The more capable the agents, the more an attacker would love to be one.

So the design assumes that day. Every integration gets its own credential, scoped as narrowly as the service will allow .. the mail credential can read and send mail and do nothing else; the DNS credential touches one zone. Every sensitive action lands in an audit trail outside the agents' reach, so if one ever went rogue I'd have an out-of-band record to pull. Anything that reaches the outside world .. sending mail, pushing code, spending a dollar .. has a human gate or a second agent's review in front of it. And because every secret lives in that one vault, rotating a possibly-exposed credential is a one-line change, not an archaeology dig.

And the honest gap, because this series has one in every post: I do not yet have a written incident-response plan for "an agent's credential leaked." I know what I'd do. It isn't in a runbook. By my own rule above, that means it isn't done .. and it's on the list.

## The boring part is the product

That's the whole argument. The agents are the new and exciting thing, and they're the part that takes a weekend. The repo, the runbooks, the vault, the register-everywhere discipline .. the deeply boring part .. is what stands between "seven helpful agents" and "the thing that quietly broke my business while I wasn't looking."

It's also the part that turned out to be worth the most. The agents are specific to Badge Pirates. The architecture isn't. The shape of it .. one repo, runbooks as a gate, one vault, everything on the books .. is the thing I could hand to another small operator tomorrow, and increasingly the thing I'm packaging up to do exactly that. I set out to build agents and accidentally built the more valuable thing: the chassis they ride on.

Next time, the last one in this series: the parts where this all *did* break .. the dumb, instructive, occasionally expensive ways the plumbing failed, and what each one taught me.

If you want that post when it lands, the [BadgePirates newsletter][3] is how I announce them .. monthly, with the new writing and whatever we're shipping. The [Discord][2] is where the running commentary lives in between.

— Kevin

[2]: https://discord.gg/BfsYbHY8m7
[3]: https://badgepirates.com
