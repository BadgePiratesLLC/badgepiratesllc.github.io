---
layout: post
title: "How we left Mailchimp in 13 days"
publish_target: 2026-09-28
categories: [ai-agents, behind-the-scenes]
author: Kevin Bennett
---

Mailchimp told us in May they were killing rich HTML on the free tier. Not a warning shot .. an email that showed up in the same batch as that month's newsletter, saying the format we'd used for six issues wasn't going to render right anymore unless we paid up.

I didn't want to pay Mailchimp to keep doing something we could run ourselves. So we didn't. Thirteen days later the newsletter was running on our own list server, over our own mail, and Mailchimp was off.

## What actually moved

24 subscribers, double opt-in intact, six historical issues imported so the archive didn't just start over. The old service kept running in an archived state for two months as a rollback path we never used.

That part went fine. The part that didn't go fine is the part worth writing about.

## The cutover that wasn't

The June send looked normal. Campaign said "finished." Nobody checked further, because "finished" reads like "done."

It wasn't. The outbound mail credential was bad, and every single message in that send failed with an authentication error at the mail server. "Finished" in this system means every message was *attempted*, not that any of them arrived. That distinction cost us a full newsletter cycle before anyone noticed the mail simply never left the building. Fixed by 2026-06-08, and after that I stopped trusting a green status on its own .. now the check is "did mail actually leave," not "did the job report success."

## The worry

Once I stood up a public "join the newsletter" form again, it stopped being a mailing list and started being a target. By August the list had grown to hundreds of signups, and the overwhelming majority of them weren't people. They were scripted, from a form endpoint that never asked for a captcha in the first place, and by the time it was caught the quarantined pile was in the high hundreds .. sitting unconfirmed, not deleted, because purging first and asking questions later is how you also delete the humans mixed in with the bots.

The rate limit and detection that followed that catch are still running. That's the boring, correct answer. The uncomfortable one is that I'd been looking at a subscriber count for weeks that had almost nothing to do with how many people actually wanted this newsletter.

There was a second scare the same month, smaller but sharper: a send that had been reverted back to draft sat armed and scheduled for about twenty hours anyway, because the people involved trusted each other's "confirmed draft" comments instead of re-checking the one thing that was actually true .. the live state of the campaign. It didn't fire. But "it didn't fire" and "it was never going to fire" are different claims, and only one of them was true that day. The fix wasn't a smarter person. It was a rule: paste the actual API response, every time, not what you believe it says.

## The number that matters

As of today, the confirmed, opted-in, actually-reads-this-thing subscriber count is 15.

Fifteen, not the 129 sitting on the list, not the hundreds that cycled through as bot noise this summer. Fifteen people who clicked a confirmation link because they wanted to. That's the real number, and I'm fine with it. A newsletter that fifteen people actually open beats one that thousands of bots are subscribed to and zero people read. Mailchimp never made me confront that distinction, because their dashboard was happy to just show me a bigger number. Running the thing myself means I don't get to look away from what's real.
