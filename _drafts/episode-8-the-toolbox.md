---
layout: post
title: "Episode 8 — The toolbox"
date: 2026-08-31
publish_on: 2026-08-31
categories: [ai-agents, behind-the-scenes]
author: Kevin Bennett
---

Last time was the models .. the brains. This time it's everything else: the boxes, the wires, the dull little programs that turn a few language models into something that actually runs a business while I'm asleep.

I want to be honest about why this post exists, because "here are the tools I use" is the kind of thing that's usually filler. It's here because the question underneath it is the real one: when someone says "I want to do what you did," they don't actually need my agents. They need to know what the agents are *plugged into*. The model is the easy part to buy. The toolbox is the part that takes a year to get right, and almost none of it is AI.

## The engine and the chassis, again

Two pieces sit under everything, and I covered them in Episode 5, so just the short version. Each agent is a coding assistant running with a real set of tools .. it can read files, run commands, search the web, edit code. That's the engine. Underneath all of them is a shared runtime that routes messages to the right agent, hands out secrets safely, and gives each one its identity and its short list of what it's allowed to do. That's the chassis. Everything below is what plugs into that pair.

## The interface is a chat app you already have

People expect the agents to live in some custom dashboard. They live in Discord.

It's almost embarrassing how well this works. Each agent sits in its own channel. I talk to them the way I'd talk to a coworker .. I type a message, they answer, they post when something needs my attention. There was no app to build, no UI to design, no login for me to maintain. The chat app I was already in became the front door to the whole operation, on my phone and my desktop, for free. When people ask what the agents "look like," the honest answer is: they look like text messages from a colleague who happens to never be off the clock.

## The unglamorous middle

Here's the part nobody puts on a slide. Most of the toolbox is plain infrastructure, and the agents would be useless without it.

There's a database holding the state of everything .. the board, the dashboard, the inventory. There's a service in front of it all that gives me a private, login-protected door from the public internet without ever exposing a single machine directly .. so I can reach my agents from a parking lot, but no one else can reach them at all. There's the boring scheduler that fires the recurring jobs .. and, crucially, a lot of those scheduled jobs run as ordinary little scripts with no AI in them at all, because, as last episode argued, a job that just checks whether a server is up shouldn't be paying a language model to think. There's the vault that hands out every password so no agent ever holds one. There's the plain-text version history that records who changed what and when, agent or human.

None of that is exciting. All of it is load-bearing. The lesson I'd give anyone starting out is that you will spend far more of your time on this unremarkable plumbing than on anything that says "AI" on the box, and that's not a sign you're doing it wrong. That's the job.

## The connectors

The agents touch the outside world through a growing set of connectors, and this is where it starts to feel less like a chatbot and more like an employee.

There are standard integrations that let an agent reach into a real mailbox, a real calendar, a real document store .. not by me copying and pasting, but directly, with permission, scoped to exactly what it's allowed to do. There's a shipping connector that turns "this order is ready" into an actual printed label. There's a voice service wired to a real phone number, so a call to the shop reaches an agent that can answer it .. and, fittingly, that voice agent leans on the cheap local brain from last episode for the back-and-forth. Each connector is small. Together they're the difference between an agent that can *talk about* the work and one that can *do* it.

The same restraint from the security posts applies to every one of these: the narrowest possible permission, every time. The mailbox connector can read and send mail and nothing else. The shipping connector can buy a label and nothing else. A connector is a door, and every door you open is one someone else might someday walk through, so you open each one exactly as wide as the job needs and not a millimeter more.

When an agent uses one of these, it never sees the key behind it. Same device as always .. I'll let one explain.

> When I send an email, I never actually hold the password to the mailbox. I ask the vault for it at the instant I need it, it hands me a sealed connection, I do the one thing I'm allowed to do — send this message — and the key is gone again before I've finished the sentence. I don't keep it. I couldn't hand it to someone if I tried; I never have it long enough. It always felt backwards to people that the way to make me safe with a credential was to never quite let me have one. But that's exactly it. I'm trusted with the action, not the key.
>
> — an agent with mail access

## "Could I actually build this?"

The honest answer is yes, but not all at once, and not by buying a product called this.

There is no single thing you purchase that is "the toolbox." It's a chat app you already use, a cheap rented server, a database, a scheduler, a vault, a tunnel, and a handful of connectors, assembled over a year, each one added the week a real problem demanded it. Nobody designed the whole thing up front. It accreted. That's the part the tidy diagrams never show: this wasn't architected in an afternoon, it was *grown*, one annoying problem at a time, and every piece earned its place by solving something specific before it got added.

So if you take the toolbox as a shopping list, it'll look overwhelming. Take it as a sequence .. one tool, the week you actually need it .. and it's just a series of small, obvious decisions. Which is, more or less, the whole story of this series.

Next time, I think, we finally leave the machines behind and talk about the thing all of this exists to serve in the first place: the badges. We'll see if I can keep that promise.

If you want that post when it lands, the [BadgePirates newsletter][3] is how I announce them .. monthly, with the new writing and whatever we're shipping. The [Discord][2] is where the running commentary lives in between.

— Kevin

[2]: https://discord.gg/BfsYbHY8m7
[3]: https://badgepirates.com
