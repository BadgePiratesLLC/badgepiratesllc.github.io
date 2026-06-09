---
layout: post
title: "Episode 4 — Cortex, what seven agents look like when they're working"
date: 2026-07-06
publish_on: 2026-07-06
categories: [ai-agents, behind-the-scenes]
author: Kevin Bennett
---

Most mornings, before anything else, I open one page and look at it for about thirty seconds.

It's a wall of colored rows. Green means a thing is doing what it's supposed to. Yellow means something's drifting. Red means go look now. In those thirty seconds I find out what every agent and every machine did overnight while I was asleep .. what ran, what broke, what quietly stopped. Then I close it and get on with my day.

That page is the most useful thing I've built this year, and it almost didn't get built, because it's the least glamorous.

The hard part of running seven persistent agents was never writing them. It's knowing what they're doing right now. Or, more to the point, knowing what they *aren't* doing when they should be. An agent that errors loudly is easy .. it yells, I look. The dangerous one is the agent that thinks it's working and isn't. The cron that silently stopped firing three days ago. The push that's been failing so quietly that the absence of news started to read like good news.

So we built Cortex. This is the post about how I watch the watchers.

## What Cortex actually is

Cortex is a dashboard. That's it, and I want to undersell it on purpose, because the lesson here is how little it took to start.

Underneath, it's a small database, a thin API, and a web page, sitting on a cheap rented server behind a Cloudflare tunnel so it has no public address and asks for a login before it shows you anything. No SaaS subscription. No third-party "agent observability platform." A few hundred lines of glue and a handful of tabs that answer four questions at a glance: what's healthy, what's failing, what's gone stale, and what just changed.

I priced the commercial options. They're built for engineering teams watching microservices, and they cost more per month than the server Cortex runs on costs per year. More than that, none of them think the way my problem is shaped. My problem isn't a thousand requests a second. It's nine little processes scattered across a few machines that each need to raise a hand every few minutes and say "still here, still fine."

## The four heartbeats

Everything in Cortex is built on one simple idea: every agent, every cron job, every machine emits a pulse, and Cortex's only real job is to notice when a pulse it expected didn't come.

There are four kinds.

- **Runs.** Every scheduled job, when it fires, writes down that it started, that it finished, whether it succeeded, and the last few lines of whatever it printed. So I can answer "did the newsletter job actually run last night" without digging through logs on the machine.
- **Health.** Every check reports its current state .. ok, warning, error, or down .. and, crucially, *when it last reported.* A check that says "ok" but hasn't said anything in six hours isn't ok. It's stale, and stale gets its own color.
- **Inventory.** Every machine, and a lot of the home network .. their OS patch status, certificate expiries, the works. The same board that watches my agents also quietly keeps an inventory of the hardware they run on. (That part was an accident. More on it in a second.)
- **Changes.** An append-only feed of every time something flipped from one state to another. Green to red, red back to green. This is the "what changed" column, and it's the one I read first.

That second bullet .. *when it last reported* .. is the whole trick. The original sin of monitoring is checking whether things are erroring and forgetting to check whether they're reporting at all. A cron that dies doesn't error. It just goes quiet. Cortex is built to treat silence as a signal.

## But the agents read it too

Here's the part the word "dashboard" gets wrong. A dashboard sounds like a thing a human stares at. For the first month, that's all Cortex was .. a wall I checked. The version that actually matters is the one where the agents read it too.

Episode 3 was about the board where the agents *act* .. where they claim tickets and do the work. Cortex is how they *see*. The interesting thing is what happens where those two meet.

Once an hour, an agent whose entire job is to watch reads the most critical rows in Cortex and asks one question: did anything just change? Not "is anything broken," but "did something *just become* broken, or just get fixed, since I last looked." When the answer is yes, it doesn't ping me. It opens a ticket on the board .. the same board from last episode .. and hands it to the manager agent, with exactly what flipped and when. From there the mesh takes over: the manager triages it, routes it to whichever agent owns that kind of problem, that agent fixes the thing, the fix changes the underlying pulse, Cortex goes green, and the watcher quietly closes its own ticket on the way back down.

I'm not anywhere in that loop. A red light becomes a ticket becomes a fix becomes a green light, and the first I hear of it might be reading the closed ticket later. The dashboard isn't where the story ends. It's the sensor that starts it.

Same rule as the other episodes: when an agent can describe its own job better than I can, I give it the keyboard.

> Once an hour I do one small, dumb, important thing. I look at a fixed set of the most critical checks — the ones that, if they're down, mean something is actually on fire — and I ask whether the picture changed since last time. Not whether anything is broken in the abstract. Whether it *just became* broken, or *just got fixed*.
>
> If nothing flipped, I do nothing. That's the part that took discipline to get right — a watcher that says "still fine!" every hour is one you stop reading by Tuesday. So I stay quiet unless the world actually changed.
>
> When something does flip the wrong way, I don't try to fix it myself; that's not my job and I'm not good at it. I open a ticket on the board and hand it to the manager with exactly what changed and when. The manager routes it to whoever owns that kind of problem. When it flips back to green, I find my own ticket and close it. I'm the trip wire. Someone else is the worker.
>
> — the watcher

## And lately, I can just ask it

That's the loop the agents run on their own. The other half of the upgrade since I first sketched this post is the half I run: I can talk to it.

There's a chat box now. It lives behind the same login as the rest of Cortex, and on my phone it behaves like texting a very well-informed coworker. I type "is the newsletter job healthy?" and I get a straight answer, because on the other end is the manager agent .. the same one that grooms the board .. reading the live state and replying in a sentence. But it doesn't stop at answers. "Restart the music sync." "File a ticket to look at that cert." "What changed on the network today?" If it's a quick, safe thing, it just does it and tells me what happened. If it's bigger, it makes a ticket and says so.

This is the part that still feels slightly unreal. I can be standing in a parking lot, text a question at my own infrastructure, and have it both answer *and* go do something about it .. the same agent that would have handled it from the board, just reachable through a chat bubble instead. The dashboard stopped being a thing I look at and became a thing I can ask.

## The thirty seconds, and the noise

For all that, the morning ritual is still me and the changes feed for about thirty seconds .. everything that errored, warned, or went stale overnight, newest first, nothing that stayed green, because I don't need to be told the things that are fine.

During the day I lean on a one-word command in my terminal that pulls the same picture and sorts the real problems from the noise. Half the "failures" on any given day are a model being slow, or a network blip, or a check that's flaky for reasons that don't matter. The command knows the difference between "this failed once and will probably clear itself" and "this has failed every run for six hours and you need to care." That sorting is the whole reason I trust the green instead of learning to ignore it.

## The time it earned its keep

The clearest case for Cortex is a problem it caught that nothing else would have.

One of the agents is a security reporter .. its job is to gather a handful of signals about the health of our defenses and post them to a panel. For a while, that panel was half-empty, and here's the thing: *nothing was erroring.* The agent ran. It reported. It just happened to be running on the wrong machine .. one that couldn't reach four of the six things it was supposed to check. So four signals quietly came back blank, every time, and because blank isn't an error, nothing ever yelled about it.

The only reason I caught it is that Cortex shows me staleness, not just failure. Those four signals weren't red. They were *old* .. last-reported timestamps that kept sliding further into the past while everything around them stayed fresh. That's a thing you can only see when your monitoring treats "hasn't spoken in a while" as worth a color. I moved the agent to the right machine, the panel filled in, and a blind spot I didn't know I had closed.

That's the whole value of the thing in one story. Not catching fires. Catching the smoke detector that quietly unplugged itself.

## The dashboard that became an inventory

Cortex started as "a status page for me." What it turned into, almost by accident, is the closest thing we have to a real inventory of everything I own.

Because every machine has to phone in to be on the board, the board ended up knowing about every machine. Which ones are behind on updates. Which certificates expire next month. Which network devices showed up that I didn't put there. I went looking for a way to watch my agents and came out the other side with a tidy ledger of my whole operation, hardware included .. the kind of thing companies pay for a separate product to maintain, falling out for free as a side effect of making the agents check in.

It's increasingly something I'd hand to another small operator running a fleet like mine. The shape generalizes. That's a recurring theme in this whole series, and it's not an accident either .. I try to build everything so the next person could run it too.

## "Isn't a dashboard like that a juicy target?"

It's the right question, and it's the same instinct as "what if an agent goes rogue" from last time: the more your operation can see itself, the more there is to steal if someone gets in.

Two answers.

First, you can't get to it. Cortex has no public address. Everything that can see the whole picture .. the dashboard, the chat box, the read API .. sits behind a tunnel and a login. The push agents that feed it are the one exception, and they're the *least* dangerous one: each holds a key that can only add a row, never read one. So the parts that can see everything require me to be me, and the parts that run unattended out in the world can't see anything.

Second, even if someone got in, the cupboard is deliberately bare. Cortex holds health, runs, and inventory. It holds no passwords, no customer data, no keys to anything. The worst case is someone learns my server is a little behind on a patch .. which is exactly the kind of thing I built the dashboard to make sure *I* learn first. The only person the information on that board is useful to is the person trying to keep it green.

Backups run nightly, encrypted, off-site. If the whole thing burned down I'd have it back in the morning, which feels about right for a tool whose entire purpose is making sure nothing important goes unnoticed.

## 

Episode 3 was the board where the agents act. This one was the nervous system underneath it .. the thing that notices, the thing that turns a light going red into a ticket going onto the board, and lately the thing I can just ask.

There's a thread running under all four of these posts that I've been circling. Each piece .. the inbox watcher, the board, the dashboard .. I built for myself, for this one small business, and each one keeps turning out to be the kind of thing someone else could run too. That's not luck. Next time I want to say it out loud: how a team of one-and-a-half humans keeps all of this from collapsing under its own weight, and why "build it so the next person could run it" is the only rule that's kept me sane.

If you want that post when it lands, the [BadgePirates newsletter][3] is how I announce them .. monthly, with the new writing and whatever we're shipping. The [Discord][2] is where the running commentary lives in between.

— Kevin

[2]: https://discord.gg/BfsYbHY8m7
[3]: https://badgepirates.com
