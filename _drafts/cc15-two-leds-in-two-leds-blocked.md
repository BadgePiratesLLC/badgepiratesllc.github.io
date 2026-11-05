---
layout: post
title: "The CC15 build log: two LEDs went on clean, two are stuck, and the board is the one that said no"
publish_target: 2026-11-10
categories: [hardware, badges, cc15]
author: Kevin Bennett
---

CC15 is the badge we're trying to get onto Tindie. It's an ESP32-S3 board, prototype revision, and right now it does not run a single line of our own firmware .. the code folder in that repo is still an empty placeholder. All of the work this month has been hardware: get the board itself right before anything gets written to run on it.

The current piece of that work is four status LEDs. Small thing. Four LEDs, four spots on the board, should be a day's work.

## Two of them were a day's work

South and west went on clean. Placed, routed, checked with a real design-rule pass (not a glance at the render), zero copper removed from anything already working. Those two are done and staying done.

## The other two ran into a board that's already full

East and a small expansion header were supposed to follow the same path. They didn't, because there wasn't a path to follow. This isn't "hard to route" .. it's zero. Both copper layers on this board are already poured edge to edge, and the only open seam left belongs to a different signal's own corridor. Checked with an actual pathfinding tool run against the live board file, not eyeballed off a screenshot, because eyeballing it is exactly how you miss that a seam that looks open on one layer is owned by someone else's trace on the other.

So east and the header are parked. Not dropped, not forced through anyway .. parked, with the real routing data attached, waiting on a call about whether the next board revision makes room for them or they don't make this generation of the badge at all. That's my call to make, not a default to drift into.

## The mismatch that almost shipped twice

Separately, two decoupling caps on the board were built as one footprint size while the schematic called for a different one. First pass at explaining which direction that mismatch went was wrong. Got caught, corrected, and the actual fix went in clean .. swap the footprint, refill the copper around it, re-run the same design-rule check before and after to prove nothing else moved. Small thing, but it's the same lesson as everything else here: a part that looks right in a render isn't verified until something independent checks it against what's actually on the board.

## Where that leaves the badge

Two LEDs shipping, two on hold for a real design decision, one footprint mismatch caught before it became hardware. No firmware yet .. that's next, once the board itself stops moving. The Tindie listing is still coming. This is what "coming" actually looks like in between.

— Kevin
