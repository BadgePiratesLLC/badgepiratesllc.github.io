---
layout: post
title: "Episode 2 — Killing the noise"
date: 2026-06-08
categories: [ai-agents, behind-the-scenes]
author: Kevin Bennett
---

For most of last week, I didn't manually triage a single email.

Not because I was on vacation, and not because the inbox went quiet .. it never does. I didn't triage anything because by the time I looked, there was almost nothing left to triage. The watcher had already read everything, sorted it, silenced the noise, and surfaced the three or four things that actually wanted a human.

Episode 1 was about the one email I almost missed .. the forgotten message that turned into a customer. This is the post about the other three thousand.

## The needle was never the problem. The haystack was.

Let me put a number on it, because the number is the whole story.

Over the last thirty days, across the half-dozen mailboxes a small business accumulates whether it wants to or not, something read and sorted **3,200 emails**. Of those, **fifty-seven** were a real human being writing to us about real business. Fifty-seven. Out of 3,200. About two a day.

Everything else .. the other 98% .. was noise. Not malicious, mostly. Just the steady, relentless drizzle of a business existing on the internet: shipping notifications, receipts, supplier announcements, SaaS pricing changes, newsletters I subscribed to in 2023, and a rising tide of AI-generated cold outreach. Each one individually harmless. Collectively, a wall thick enough to bury a customer for ten weeks.

The agents didn't make me better at finding the needle. They got rid of the haystack.

## The watcher, in its own words

Here's how it works .. and rather than paraphrase, I'll let the thing explain itself. (This is a device I'm going to keep using: when an agent has a better claim to first-person authority than I do, I hand it the mic. Everything in the quote below is the watcher describing its own job.)

> I'm a classifier. When mail lands in one of Kevin's BadgePirates mailboxes, I read the headers, the sender, the subject, the body, and the conversation history if there is one. I'm not deciding whether a message is *important* — that judgment is Kevin's, and I'm bad at it. I'm deciding what *kind* of thing it is. That's a narrower question, and narrow questions are the ones I can answer almost without error.
>
> I sort everything into a handful of working categories:
>
> **Noise** — shipping notices, receipts, calendar invites, marketing, newsletters, the automated exhaust of a dozen services. I mark it read and move on. This is most of it — about 86% of everything I see.
>
> **Money** — anything that smells like an invoice, a payment, a payout, a refund. I don't act on these; I post a one-line summary so Kevin can confirm the number landed where it should.
>
> **Action** — something that needs *doing*: a reservation to confirm, a renewal coming due, a form someone's waiting on. I turn these into tracked tasks so they can't quietly fall on the floor.
>
> **Human** — a real person writing to another person about real business. This is the rare one, about two a day. I draft a reply in Kevin's voice and put the whole thing in front of him to send, rewrite, or ignore.
>
> **Mine** — outbound I recognize as Kevin or one of the other agents. I skip it entirely. I'm not going to reply to us.
>
> The buckets are deliberately coarse, because coarse is where I'm trustworthy. "Does this look like a human writing about real business" I get right nearly every time. "Is this important to Kevin" I would get wrong constantly. So I don't try. I sort; he decides.
>
> — the watcher

That last line is the whole philosophy. The agent isn't smarter than me. It's just never tired, never busy, never skimming at a red light .. and it knows the exact edge of its own judgment and stops there.

## The newest kind of noise is the polished kind

A year ago, spam was easy to spot. Misspellings, bad grammar, a prince, a wire transfer. The new stuff is different. It's grammatically perfect, contextually plausible, often references something real it scraped off our site .. and it's generated and fired off in volume by somebody else's AI agent. It looks, to a scrolling thumb, exactly like a real person reaching out.

This is the arms race nobody asked for: my agent's main job is increasingly to tell *my* humans apart from *other people's* agents. So far it wins, because the tell isn't grammar anymore .. it's substance. Real outreach names a specific thing and asks for a specific next step. Slop gestures at "synergies" and "a quick call." The classifier reads for the former and files the latter under noise.

## "But what if it silences something important?"

This is the right question, and it's the one that kept me from doing this for a long time.

The answer is in two halves.

First, what *can't* be silenced. Anything in the Money or Human buckets gets surfaced, full stop .. those aren't "classified and maybe shown," they're promoted to my attention by default. Same with mail from anyone we've actually done business with. The system is tuned so the cost of a mistake always falls on the safe side: if it's unsure whether something is a real person, it treats it like one.

Second, what *is* silenced: transactional and marketing mail, only. And here's what made me comfortable .. both failure modes are recoverable. If the watcher wrongly silences something, the worst case is that a real person follows up a few days later the old-fashioned way, and I catch it then. A false negative costs me a follow-up email. A false positive .. drowning real mail in noise .. costs me a customer. For a one-and-a-half-person company, attention is the scarce resource, not follow-ups. So I tune it aggressive on purpose.

And it isn't fire-and-forget. Every classification gets logged. I spot-check the silenced pile, and the rate of "that should have surfaced and didn't" sits in the low single digits a month. When I find a miss, it becomes a training example, and the next version is a little better. The loop never closes; it just tightens.

## And yes .. an AI is reading all of it

I can already hear the next objection, and it's a fair one: you've pointed an AI at every email that hits your business. Isn't that a security and privacy problem?

It's a real question, and I took it seriously before any of this touched a live mailbox. The short version: the classifier's job is narrow and almost entirely read-only. It sorts, and it drafts. It does not send mail, move money, or delete anything on its own. A human is in the loop for everything that actually matters .. the agent writes a draft, *I* hit send. What access it does have is scoped to exactly what it needs and nothing more, and every action it takes is logged.

The longer version .. what each agent can and can't touch, how they're walled off from each other, where the credentials actually live, and the things I got wrong before I got them right .. is genuinely its own post, and it's coming later in this series. "We let AI agents run the company" and "here's exactly how we keep that from being a disaster" are two halves of the same story, and I'm not going to wave the second half away in a paragraph. Hold that thought .. I'll earn it.

---

Episode 1 was about the needle. This one was about burning down the haystack so the needle has nowhere left to hide.

Next time: the part that genuinely surprised me .. the agents started using each other's work without me wiring it up. One agent's output became another's input through a shared task queue I'd built for something else entirely, and the whole thing started behaving less like a set of scripts and more like a team. That one I'm still thinking about.

If you want the next post when it lands, the [BadgePirates newsletter][3] is how I announce them .. monthly, with the new writing and whatever we're shipping. The [Discord][2] is where the running commentary lives in between.

— Kevin

[2]: https://discord.gg/BfsYbHY8m7
[3]: https://badgepirates.com
