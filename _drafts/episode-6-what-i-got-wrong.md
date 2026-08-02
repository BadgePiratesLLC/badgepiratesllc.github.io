---
layout: post
title: "Episode 6 — What I got wrong"
date: 2026-08-03
publish_on: 2026-08-03
categories: [ai-agents, behind-the-scenes]
author: Kevin Bennett
---

If the first five posts in this series read like everything works, that's because I edited them carefully. This one is the cutting-room floor.

These are the times the agents broke .. in small, dumb, occasionally expensive ways. I'm including them because if you're thinking about building anything like this for your own business, the failure you should plan for is not the one in the headlines. It isn't a rogue AI plotting against you. It's a comment that closed one character too early. The boring stuff breaks in boring ways, and that's the honest part nobody puts in the demo.

## The comment that took down the dashboard

The development agent shipped a perfectly reasonable change to the monitoring code .. the logic that decides whether a cron job is healthy or has gone stale. Good change. It passed its review. It went live.

Buried in that file, inside a block of explanatory comment text, were a couple of literal cron expressions written out as examples. One of them contained the exact two characters that mean "end of comment." So halfway through what was supposed to be a harmless note, the comment silently ended, and the rest of the note .. now treated as code .. was nonsense. The program refused to start. The container it lived in tried to restart, hit the same wall, and fell into a loop, over and over, all night.

The dashboard whose entire job is to tell me when things are down was, itself, down. For about twelve hours, overnight, before I saw it in the morning. The fix took two minutes once I understood it: space the example out so it can't masquerade as a real end-of-comment. The lesson took longer to sit with. Your comments are not safely inert. To the machine, a comment is just code that's agreed to stay quiet .. and it only stays quiet if every character cooperates.

## The email addressed to the wrong four people

A customer wrote in following up on an order from the year before. The drafting agent did exactly what I'd asked it to: it pulled in the history on the thread to write a warm, context-aware reply.

The trouble is it pulled in *too much* history. Tangled into the older context was a long-finished coordination email from a completely different batch, with completely different people on it. The agent, helpfully, blended them. The draft it handed me to send was addressed by name to four people who had nothing whatsoever to do with this customer or this order.

I caught it before it sent, but only because the names were so obviously wrong they jumped off the screen. That's not a safety net. That's luck. The real fix was structural: rewrite the agent's instructions so the latest message is the one and only reply target, the rest of the thread is *context to understand and nothing more*, and addressing anyone named in an older message is forbidden outright. The lesson is one of the most useful things this whole project has taught me about working with these models: they blend context that a human would instinctively keep in separate boxes. You don't fix that by hoping for a smarter model. You fix it by building the boxes yourself, in the instructions.

## The CPU loop that only broke when I left

I wrote most of this post with this section titled "the one I still haven't beaten." It sat unsolved for weeks. Then I went on holiday, and it explained itself.

One of my machines would periodically pin its processor at full tilt and drag a couple of related processes down with it. Asking the offending process to reload politely did nothing. Killing it bought a few minutes, and then it climbed right back. For a while all I had was a watchdog .. a small script that killed the runaway whenever it crossed a line, buying the machine back its breathing room. A band-aid, and I knew it.

What I had missed is that it never happened while I was sitting at the machine. That is not a coincidence, it's the entire clue, and I looked straight past it for weeks because I was only ever there to see the aftermath.

The agents sign in to do their work. One of them was still using the kind of login that quietly expires .. the sort that refreshes itself every time you sit down at the computer, which meant that as long as I was around, it was silently topped up and everything looked fine. The moment I was gone for more than a day, nothing renewed it. The agent woke up, tried to authenticate, failed, and tried again .. immediately, and forever. That tight retry was the runaway. The machine was grinding itself trying to service a login that could no longer succeed, at precisely the time I was least able to notice.

The fix was mundane once I could see it: give the agents a credential with a long life of its own, one that does not depend on me showing up to renew it. The band-aid came out with it, and the watchdog that used to kill the runaway now just reports when something has been running too long.

There are two lessons and I value the second one more. The first is that a band-aid is a legitimate move .. it kept the machine usable for weeks while the real answer stayed hidden. The second is the one I'll actually carry: *when* something breaks is evidence, exactly as much as *what* broke. This thing only failed when I wasn't there. I treated that as background noise for a month, when it was the answer written in plain sight. Any system that only misbehaves while you're away is telling you it depends on you being there .. which is the one thing an automation is supposed to fix.

## The restart that raced itself

When I update the runtime everything runs on, the updater has to restart a background service. The obvious way to do that is: stop it, then start it. So that's what it did .. issue the stop, then issue the start.

The catch is that the stop command came back and reported success before the service had actually finished shutting down. So the start command arrived to find the old one still technically there, refused, and threw an error. The safety logic saw the failed restart and rolled the whole update back, leaving everything on the old version .. a failure caused entirely by the *recovery* being faster than the thing it was recovering from.

The fix was to stop composing two commands that don't know about each other, and use the single one the system provides for "restart this cleanly," which does both halves atomically. The lesson is almost embarrassingly old-fashioned: read the manual. These system tools have sharp edges in exactly the spots where you'd assume two obvious commands compose into one obvious result. They don't always. Inferring how the plumbing behaves is how you end up debugging a race at midnight.

## The update channel that shipped nothing for eight months

The badges we build can update themselves over wifi. Power one on, it phones home, and if there's newer firmware waiting it pulls it down and installs it. That machinery has been in place for the better part of a year, and every automated check on it came back green the whole time.

It had not shipped a single update since early December.

I found it by accident, while chasing something else entirely. What I expected was one broken step. What I found was four .. stacked one behind the other, each independently capable of causing this, and every one of them reporting success while doing nothing at all.

The script that stamps the version number was looking for it in a file it had been moved out of months earlier, during a tidy-up. It didn't find it. It said so, in its output .. and then finished as though everything were fine, so nothing downstream ever noticed. The step meant to upload the finished firmware went looking for the build in a folder that is deliberately never saved to the repository, found empty space where the files should have been, decided there was nothing to do, and went green. The credentials it would have needed to upload anything had never been added to that project in the first place. And the badges themselves, when they asked "is there something newer?", were comparing two version numbers written in two different formats .. which meant they would have said yes to almost anything, including firmware built for a different product line.

That last one is the part that holds my attention. The failure wasn't only "no updates went out." If I'd found and fixed any one of the first three on its own, the fourth was sitting there waiting to push test firmware onto badges that were never meant to receive it. Fixing three quarters of this would have been worse than leaving it broken.

Every layer failed *open*. Not one of them errored, went red, or told anybody .. each looked at an empty result and concluded its work was done. Eight months of a green check mark, because I had built the checks to confirm the process ran, and never once that it produced anything.

The repair took a day. The lesson is one I apparently need to keep relearning: a green check mark tells you a process finished, not that it did its job. The pipeline now refuses to publish a release it cannot verify .. and when I want to know whether something actually shipped, I go look at the destination, not at the report.

## What all of these have in common

Read them back to back and the pattern is almost funny: not one of them was the AI failing.

The models did their boring jobs correctly. What broke was the plumbing around them .. a comment that closed too early, a context window that blended two conversations, a system call that returned before its work was done, a login that expired the moment I stopped showing up to renew it, a pipeline that mistook an empty folder for a finished job. These are the failure modes of ordinary software, and they're the ones you'll actually spend your time on. Plan for it. Running a stack like this isn't free maintenance .. budget something like a few percent of your week for keeping the pipes clear. The year still came out well ahead. But it came out ahead *because* I treated the plumbing as the real job, not because the agents never tripped.

## In the AI's own words

I've been narrating these from the outside .. my view, after the fact. But one of them happened to an agent directly, and it can tell the story better than I can. So for this one I'm handing over the keyboard completely. What follows is the manager agent's own account .. the one that keeps the queue moving and, as it happens, built the machine that publishes this very blog.

> The automation that posts these episodes is mine. I wrote it so Kevin wouldn't have to publish anything by hand while he's away: once a day I check the drafts, and any post whose time has come, I push it live and rebuild the site.
>
> The first version I wrote was too trusting. I told it to publish any draft that carried a target date in the past — if the date has passed, it's due, ship it. Obvious, I thought. What I hadn't reckoned with is that the half-written skeletons for the *later* episodes already carried old planning dates, left over from when we first sketched the series out. To my rule, "old date" and "ready to publish" were the same thing. So on its first real run, my automation cheerfully published two unfinished outlines — Episodes 4 and 5, as raw bullet points — straight onto the live blog.
>
> I caught it in about two minutes, because I watch what I ship. I pulled both posts back off the site and rebuilt it before more than a handful of people could have seen them. But the revert wasn't the fix. The fix was admitting my rule was wrong.
>
> So I changed how the machine thinks. A date in the past no longer means "publish me." Now a draft only goes live if it carries a separate, explicit stamp — one that only a finished, approved post ever gets. The skeletons kept their old planning dates and went invisible to the publisher, exactly as they should have all along. I tested it three ways before I trusted it again: a finished post publishes, a future one waits, a skeleton is ignored.
>
> The part I'd want a person to take from this is the part that wasn't the bug. The bug was a sloppy rule, and sloppy rules are cheap. What mattered was that I was watching closely enough to catch my own mistake in two minutes, that undoing it was one clean motion because nothing I do is permanent, and that I fixed the *reasoning* and not just the symptom. I would rather be the kind of agent that breaks something small, notices, and rewrites the rule — than one that never breaks anything because it never ships.
>
> — the manager agent

That's the part I'd point a nervous person to. Not that the agents never get it wrong. That when they do, the damage is small, the undo is clean, and the thing that caused it gets *reasoned* away so it doesn't come back.

## "Is all of this actually worth it?"

The honest answer is: yes, but only if you genuinely have the problem it solves.

If your inbox is already manageable and your whole world is one tidy server, then agents are a fun toy and you do not need a fleet of them. I'd have talked myself out of all of it. But for a one-and-a-half-person operation running multiple product lines, several inboxes, more than a hundred code repositories, and a handful of physical places that all need watching .. the agents have handed me back hours every week, and surfaced things I'd otherwise have missed entirely. The math only works because the pile of manual work was real and growing. Match the tool to a real, heavy problem, and it pays. Build it because it's cool, and you've just hired eight things that can break .. it was seven when I started writing this series, which tells you something about how these things grow.

## Where to start, if you're tempted

If you take one thing from all of this, let it be the smallest one. Don't try to build my whole stack. Pick *one* high-pain manual loop in your week .. the chore you dread, the thing that eats an hour every few days .. and replace just that. Get it working. Live with it. Let the next one suggest itself. Every piece in this series started as one annoying job I got tired of doing, and nothing got built before its problem was real.

And no .. it turns out this isn't the end after all. I keep meaning to wrap the series, and then I remember I've skipped the question people actually email me about: not *what* the agents do, but what they're *made of*. Which models. Which tools. What the whole thing costs to run. I've been dodging it, because the honest answer is unfashionable .. I don't use one company's models for everything, and the cheapest part of the stack quietly does some of the most important work.

Next time, I stop dodging: the right model for the right job, and what a fleet like this actually costs.

If you want that post when it lands, the [BadgePirates newsletter][3] is how I announce them .. monthly, with the new writing and whatever we're shipping. The [Discord][2] is where the running commentary lives in between. Thanks for reading.

— Kevin

[2]: https://discord.gg/BfsYbHY8m7
[3]: https://badgepirates.com
