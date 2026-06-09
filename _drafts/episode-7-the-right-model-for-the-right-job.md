---
layout: post
title: "Episode 7 — The right model for the right job"
date: 2026-08-17
publish_on: 2026-08-17
categories: [ai-agents, behind-the-scenes]
author: Kevin Bennett
---

Here's the question I get more than any other, and the one I've spent six episodes not really answering: *what are these things actually running on?*

People expect a brand-loyalty answer. They want me to say I picked the best model and use it for everything. The real answer is the unfashionable one: I don't use one company's models, I use three different tiers of them, and the cheapest tier .. the one running on a computer in my office .. does some of the most important work in the building.

This is the post about that choice. Because the interesting decision in running a fleet of agents isn't *which model is best.* It's which model is the right one for each specific job, where "right" is a three-way argument between how smart it needs to be, how much it costs, and who gets to see the data.

## Three tiers

If you laid the whole operation out, the models sort into three groups.

**The frontier tier** is the expensive, genuinely-brilliant stuff .. a top-end model from Anthropic, the kind that can hold a hard problem in its head. This is what the manager agent and the development agent run on. The ones that write the code, make the judgment calls, debug something that's on fire at midnight. There are only a couple of agents in this tier, and that's the point. You don't put your best, priciest thinker on a job a calculator could do. You put it on the jobs where being wrong is expensive and being clever actually pays.

**The cheap-and-tireless tier** is a small, fast, inexpensive model .. in our case a "mini" model from OpenAI. This is what the five always-on chat agents run on, the ones living in the team chat answering questions, logging things, nudging, reminding. They don't need to be brilliant. They need to be awake at 3 a.m., answer in a second, and cost almost nothing, because they run constantly. All five of them together cost me about a dollar a day. A dollar. For five coworkers who never sleep and never take a break. The moment you stop demanding genius from a job that doesn't need it, the economics stop being scary.

**The local tier** is the part that surprises people: open-weight models I run myself, on a Mac mini sitting in my office, that cost nothing per use and never send a byte to anyone. A capable mid-size open model handles the summarizing, the triage, the routine "read this and tell me the gist" work .. and, importantly, the work I'd rather not hand to anyone else's servers at all. It costs me electricity and a machine I already owned. That's the whole bill.

## Why the cheapest tier matters most

The instinct is that the local, free models are the toys and the expensive ones are the real workers. It's backwards more often than you'd think.

Consider summarizing. A huge share of what these agents do all day is read something long .. an email thread, a logbook, a ticket history .. and boil it down. That job does not need a frontier brain. A mid-size model running on my own hardware does it perfectly well, for free, forever, no matter how many times a day I ask. If I'd routed every one of those summaries through a top-tier paid model out of reflex, I'd have spent real money to make the work very slightly more eloquent and not one bit more useful.

And there's the other thing the local tier buys that the paid tiers can't: when the model lives on a machine I own, the data never leaves the building. Some of what my agents read .. internal numbers, customer details, the contents of my own inboxes .. I simply would rather not stream to anyone else's servers, no matter how good their privacy promises are. The local model isn't a compromise I tolerate to save money. For the sensitive jobs, it's the *better* answer, and the fact that it's also free is a bonus.

Same device as the rest of the series: when an agent can describe its own job better than I can, I give it the keyboard. This one runs entirely on that office Mac.

> I am not the smartest model in this operation, and I never need to be. I run on a machine in Kevin's office — no internet bill, no per-word charge, no clock ticking while I think. My job is to read the long, boring things nobody wants to and hand back the short version: what this thread is actually about, what this logbook is trying to tell you, what changed. A brilliant, expensive model would do this a hair more gracefully and cost real money every single time. I do it for the price of the electricity, all day, and whatever I read stays on the same desk it started on. There is no glory in my job. There is a great deal of usefulness.
>
> — the summarizing agent

## The rule underneath it

If there's one transferable idea here, it's this: match the model to the job, not to your loyalty.

Most of the cost-horror stories people tell about AI come from a single mistake, made over and over .. using a frontier model for work that didn't need one, at volume. The fix isn't a cheaper provider. It's noticing that "summarize this," "answer a quick question in chat," and "design a safe migration and write the code for it" are three completely different jobs that happen to be phrased in the same language, and they want three completely different engines behind them.

There's a fourth move that matters just as much, and it's the one people forget: sometimes the right model is *no model at all.* A cron job that checks whether a server is up does not need to think. It needs to run a command and compare a number. Early on I caught myself reaching for an agent to do work that was really just a five-line script .. which is a lovely way to pay a language model to do arithmetic. The discipline that keeps the bill sane isn't only "use the cheap model for cheap work." It's "don't put a brain on a job that doesn't have a decision in it."

## "Doesn't juggling three providers get complicated?"

A little. But less than you'd guess, because of everything in Episode 5 .. the agents don't each know or care which company's model is behind them. They run on a shared chassis, and which model a given agent uses is a setting, not a rewrite. I can move an agent from a paid model to a local one by changing a line, the same way you'd change which engine is in a car without redesigning the car.

What three providers actually buys me is the thing you want most and notice least: no single company can end my operation. If one provider triples its prices, or changes its terms, or has a bad week, I am not hostage to it. The expensive work can move. The chatty work can move. The sensitive work already lives at home and was never anyone else's to take away. Spreading across three tiers started as a way to control cost. It turned into a kind of insurance, and that's worth more to me than the tidiness of a single logo on everything.

Next time, the companion to this one: not the models, but the tools .. the actual, unglamorous software that turns a handful of models into a business that runs itself while I sleep.

If you want that post when it lands, the [BadgePirates newsletter][3] is how I announce them .. monthly, with the new writing and whatever we're shipping. The [Discord][2] is where the running commentary lives in between.

— Kevin

[2]: https://discord.gg/BfsYbHY8m7
[3]: https://badgepirates.com
