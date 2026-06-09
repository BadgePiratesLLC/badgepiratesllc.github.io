---
layout: post
title: "Episode 3 — Nexus, the project board we built for robots"
date: 2026-06-22
publish_on: 2026-06-22
categories: [ai-agents, behind-the-scenes]
author: Kevin Bennett
---

A few weeks ago I sat down with a Monster and found a job already finished .. one I'd never assigned to anyone.

Overnight, something had flagged a fresh hole in our infrastructure: CVE-2026-31431, a Linux kernel bug serious enough to land on CISA's Known Exploited Vulnerabilities list .. the "patch this now, it's already being used in the wild" tier. The monitor that caught it opened a ticket. And by the time I was awake, our IT agent .. a completely separate process, with no direct line to the monitor that filed it .. had patched the kernel on the affected host, verified the fix, and moved the ticket to Done.

Then it did the next host. And the next. I watched the board fill in with closed tickets for a vulnerability I hadn't known we had, on machines I wasn't thinking about, fixed by an agent I never told.

I didn't wire those two together. They found each other through the board.

This is the post about the board.

## The project tool we ended up building for robots

Every company our size runs on some kind of to-do list. We started on Notion, like everyone. Then we tried rebuilding it on one of the AI app-builder platforms. Both times we hit the same wall: every project tool ever made assumes the people doing the work are *people*. Humans click the buttons. Humans drag the cards. Humans read the notification and decide what happens next.

Our problem was that most of the workers doing our work aren't people.

So we built our own. It's called Nexus, and it's nothing fancy .. a self-hosted board with projects, tickets, columns, and assignees, the same shape as a thousand other tools. The one difference is the one that matters: an agent is a first-class citizen on it. Tickets get assigned to agents. Agents move their own tickets across the board. When you look at it, you can't immediately tell which of the workers reading it have a pulse.

## Why a board, and not a pipeline

The obvious way to wire up a pile of automations is a pipeline: this script runs, hands its output to that one, which hands it to the next. Pipelines are great when you know the steps in advance. Ours never hold still.

A board works differently. Nobody hard-wired the vulnerability monitor to the IT agent. The monitor just files a ticket and walks away. The IT agent, on its own schedule, looks at the board, sees a ticket that's its kind of work, claims it, and does it. The monitor doesn't know the IT agent exists. The IT agent doesn't know or care who filed the ticket. They cooperate without ever being introduced .. because the board is the introduction.

That's the part that surprised me. I built a shared to-do list. What I got was something that behaves less like a set of scripts and more like a team that happens to never meet.

## How the work gets claimed

Here's the hand-off from the inside. Same device as last episode: when an agent can explain its own job better than I can, I give it the keyboard.

> Every few minutes I check the board for work that belongs to me. Nobody dispatches me; I'm not waiting to be told. I read the open tickets, and for each one I ask a narrow question — is this mine to do? A kernel CVE on a host I manage is mine. A draft blog post is not; that's someone else's column. A decision about money is nobody's but Kevin's.
>
> When I find one that's mine, I claim it — I move it into my "in progress" column so no other agent grabs the same work — and I do it. Patch the host, verify the fix, write down what I did in the ticket, move it to Done. If I hit something I can't safely decide alone, I don't guess. I move the ticket to "Awaiting Action," write exactly what I need, and leave it for Kevin. Then I go back to the board.
>
> I never talk to the agent that filed the ticket. I don't need to. The ticket is the whole conversation.
>
> — the IT agent

That last line is the trick. There's no chat between agents, no direct calls, no tangle of who-talks-to-whom. There's just a board and a rule everyone follows: read it, claim what's yours, write down what you did, escalate what you can't.

## The vocabulary

If you opened the board today, here's what you'd see. Seventeen projects. Around six hundred tickets over its life so far. Assignees that include a development agent (the busiest by a wide margin, because it builds and maintains nearly everything the others run on), an IT agent, a manager agent that grooms the queue and keeps things moving, the inbox watcher from last episode, a couple of others .. and me. I'm an assignee too. When something genuinely needs a human, I'm just another name in the dropdown.

Every ticket moves through the same columns, left to right: Not started, On Deck, Proceed, In progress, Awaiting Action, Testing, Done. Most are self-explanatory. Two are worth pausing on.

## "Awaiting Action" is where the agents stop

"Awaiting Action" is the most important column on the board, and it's the one I'd point any nervous person to first.

It's where an agent parks a ticket when it has hit something it should not decide alone. The IT agent needs a password I keep in my head. The dev agent wants to push a change risky enough that a human should look first. Something needs a judgment call about money, or a customer, or a direction the agent isn't sure of. Instead of guessing .. instead of barreling ahead because it technically *could* .. it stops, writes down exactly what it's waiting on, and parks the ticket.

I work that column at my own pace, with a Monster, when I choose to .. not in a panic when a notification fires. The agents do the tireless part. The decisions that should stay human stay queued for the human. Nobody's blocked, and nothing important gets decided by a robot at 3 a.m.

## "But what if an agent goes rogue?"

This is the question I get the second I explain any of this, and it's the right one.

Here's why I sleep fine, in two parts, both baked into how the board works.

First, nothing an agent does is invisible. Every code change flows through git, where every line is reviewable and every mistake is reversible. Every move on the board is logged, with a timestamp and a comment explaining it. At any moment I can ask "what did the agents do today, and was any of it surprising?" and actually answer it, because the board and the git history together *are* the answer. A bad change doesn't disappear into a machine .. it sits in a column with an agent's name on it.

Second, no agent gets to call itself finished. Work that matters lands in "Testing" before "Done," and a separate agent .. a QA one, whose whole job is to be skeptical .. re-checks it against what the ticket actually asked for. If the dev agent ships a fix that doesn't hold up, the QA agent bounces it back. Two different agents, with two different jobs, have to agree before anything is called done. And the escape hatch from the last section means the instant an agent is unsure, the path of least resistance is to stop and ask me .. not to push ahead.

"Rogue" assumes an agent acting alone, in the dark, unaccountable. The whole board is built to make all three of those impossible.

## 

That's the shift, really. Before the board, I had a pile of scripts I ran. After it, I had a set of coworkers who share a to-do list .. who pick up work I didn't hand them, do it, check each other, and tap me on the shoulder when they need a human. I didn't plan that part. I built a list, and the teamwork fell out of it.

There's one problem left, though. A board tells you what the agents are *doing*. It doesn't tell you, at a glance, whether everything is *okay* .. whether seven agents and a dozen servers and all the plumbing underneath them are healthy right now, this second. For that you need a different view.

Next time: Cortex, and what seven agents look like when you can finally see all of them at once.

If you want the next post when it lands, the [BadgePirates newsletter][3] is how I announce them .. monthly, with the new writing and whatever we're shipping. The [Discord][2] is where the running commentary lives in between.

— Kevin

[2]: https://discord.gg/BfsYbHY8m7
[3]: https://badgepirates.com
