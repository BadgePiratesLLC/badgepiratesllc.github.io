---
layout: post
title: All About the BSidesKC 2019 Badges
---

This year,  Kevin drew the short straw to give the talk about our badge for Bsides KC 2019.  Aptly titled [The Hardest Way to Present at a Conference](https://github.com/BadgePiratesLLC/BSidesKC19/blob/master/docs/BSidesKC_2019_Presentation.pptx) he explains a lot about the development process.


![Great Idea](/images/great-idea.jpg)



When developing the badge this year, we found the form long before the function.  I think its safe to say that where we typically struggle is figuring how how to make the badge look cool AF!  Given that the electronics badges were all reserved in 24 hours we feel like at least came close to achieving it!  This year we started with finding something that we could use to build on a theme and actually sets us up for next year!

Because electronic badges are expensive to build and to keep the cost of attending the conference low, not everyone is fortunate enough to get a badge.  This year, almost 100 more people got electronic badges from last year including participants, speakers, volunteers and organizers. [confirm with Kevin].   If you have never designed a custom electronics platform, there are a lot of things that pop up when going from a single prototype to a production run.  There is a good talk by [Kerry Scharfglass](https://youtu.be/PUvh5-_HJJg) about the process and economics of building a badge.  Due to the fore mentioned cost issues, only 300 [Kevin confirm] attendees were able to get electronic badges when preregistration was launched.  The limited stock was all reserved in under 24 hours almost 3 months [confirm] before the conference.

Part of the challenge in planning for badges is estimating the number of attendees.  This year the conference saw an increase from 500 to 700!  We once again ran out of even the bare PCB badges again this year because of last minute registrations far exceeding our expectations.

While the Attendee badges were all assembled by our vendor PCBWay, the Organizer, Speaker and Jr Hacker badges totaling XXX were all hand assembled.

###The Hardware

![The Bsides Badge](/images/bsides-badge.jpg)

The core of this years badge was the Espressif ESP8266 WIFI micro controller up from the ATTiny 85 from last year.  Beyond the passive components to support the microcontroller, we included 6 [confirm] reverse mount SMD LED’s that we could use for some bling.


###The Badge

There were 6 different designs for the badge, all of which had the same from but different color schemes and text which were:

* Participant
* Speaker
* Organizer
* Volunteer
* Sponsor
* Pirate (more on this below)

This badge was the first that we have used a trick to allow light to pass from the back of the PCB to the front.  We had actually looked into doing this last year for the SecKC Defcon 26 badge however it wouldn’t have worked with our design if we used the normal reverse mount LED’s.  The biggest challenge in using these LED’s is the cost.  Where a typical SMD LED costs 1-3 cents each, these can cost upwards of 30 cents each.

###The Game

While we have used micro controllers in the past that have wireless capabilities, this badge was the first that we took advantage of them beyond just a passive way to broadcast snarky messages.  This years event was held for the first time at the Westport Plexpod facility and the layout was very different from past locations.  Working with the Bsides Team, we felt that we should try and use the badge as a way to explore the venue as things were dispersed much more than last year.

The way that we accomplished this was to come up with WIFI beacons that we would use for the badge to discover as you wondered around similar to the Easter Egg in the Atari game “Adventure”.

Non Electronic participants were not left out either.  While the PCB was electrically the same, only the non-electronic badges had the clues for a Crypto challenge that was run during the conference.  [insert pictures of sysarron and crew]

The solvers of the Crypto challenge received a specially designed “Challenge Accepted” contest SAO.  Only 2 of them were awarded during the Con to one person who solved the Crypto challenge and one who won the counterfeit badge challenge.

![Challenge Accepted SAO](/images/challenge-accepted-sao.jpg)

###Pirates Badge

![Bsides Pirates Badge](/images/bsides-pirates-badge.jpg)

One of the (few) benefits of designing a badge for a conference you will also be attending is getting to make your own ‘unofficial’ version of the badge.  This goes back to our roots in making unofficial DEFCON conference badges.  It’s hard to tell at first glance because the form is exactly the same although a different color scheme (Matte Black / Gold) and the illuminated text says ‘PIRATES’.

We really wanted to give it some color, however there are currently no RGB reverse mount led’s which limit how much bling we can bring to the badge. However, quite by accident last year while building another project we ran across a solution using WS2812 or Neopixel LED’s.

[DC26 Experimentation](/images/seckc-dc26-rgb-test.mp4)

It turns out that RGB LEDs do look good from the backside (at least to us) but they are not mountable in reverse unless you do something like use blobs of solder or extra wires.  What we came up with was to use a daughter board to give us an easy way to mount them normally and then attach it to the backside of the badge.  This would still allow us to align them wherever we wanted the lighting and all with a profile stlll lower than the electrolytic capacitor on the badge or the battery holder.

###Counterfeit Badge Contest

As happened last year for Defcon 26, it seems that any leak of images of badges before the Con is pretty much guaranteed to result in counterfeits.  After a picture of this year BSides badge was released on Twitter it turned into a contest.  The prize was to be an electronic badge given they were sold out on the first day.

There ended up being on a single entry however [DiggerOfLogs](https://twitter.com/DiggerOfLogs) made his own electronic version of the badge and did a great job.  His prize was networkgeek’s Pirate badge as well as one of the special contest SOA’s.

###Junior Hacker (Kids) Badge

Just two weeks before Bsides KC 2018 we got an idea that it might be cool to have a separate badge for kids that attend given the Hakz4kids program however there wasn’t nearly enough time to make it happen.  Even so we started to brainstorm ideas that they would enjoy.  The answer that we came up with was ‘Laser Tag’.

![Experimentation](/images/bsides-shark-badge.jpg)

Of course, we had absolutely no idea how to make it happen and so the research began.  Fortunately we a year to do so...  To start with, we quickly figured out that Lasers are dangerous and thus probably not the right thing to put into the hands of our less experienced  hackers - mature/responsible adjectives intentionally unused.  Infrared (IR) however seemed to be a much better way to go.  There are certainly some trade offs as unless focused, IR is more scattershot like a shotgun than a laser rifle.  Another thing we had to face is that IR likes to bounce off of surfaces so you could just as easily hit someone by shooting off a wall.  Given that it was for kids in a small environment, we decided that we didn’t need to have incredibly strict standards and it could be a learning experience.

###The Kids Badge Hardware

To start with, we wanted to find a way to create a relatively simple and inexpensive to build platform.  To start with, we thought maybe using the ATTiny85 however we had problems getting the IR library working but we might pickup with this path again.  Moving beyond this, we started looking at the ATmega 328 however from a pricing perspective it was still relatively expensive. Good for us, we already developed a hardware platform around the ESP8266 that was at or less expensive than the ATMega 368.

When researching the IR we found that we were going to need a way to drive the IR LED at a higher current than can be driven from a GPIO pin.  This required the use of a transistor to ‘switch’ the current to be drawn directly from the battery source as we wanted to approach the max current of 100ma that the IR LED could handle.  This was our first time using a transistor on one of our badges.  Combined with a currently limiting resistor to ensure that we didn’t overdrive the IR LED we had a functional way to transmit codes at long distances.

As any good project, we started with the goal of allowing you to simply tag the other person but it quickly spiraled into never ending scope creep.  First, you have to have to have sound effects so we decided to integrate a speaker.  This is simple enough to just buy some Piezo’s and connect to a GPIO pin.  However, we learned that there is a difference between a Piezo buzzer and a Piezo speaker.

[Kids Badge Dev Board Testing](bsides-kids-testing.mp4)

Second, when messing around in the lab after getting badge to trigger a sound when you got hit, someone came up with the bright idea that it should have some force feedback.  We discovered that there are these simple vibrating motor disks that could be used.

Last, we thought about having a hit counter.  Originally we were going to use some simple LED’s but because of the limited GPIO pins we decided to use the WS2812s as we can drive a large number with a single pin.  There was also a thought that we could do a Red vs Blue team but we ran out of time to code it and will be included in a future release.

###Testing

The biggest concern we had was that we could end up burning out the IR LED so we wanted to make sure that we tested it well.  This ended up being quite simple by putting to of the badge development platforms back to back, and making each one return fire when it got hit.  We left this ran for 24 hours and when we came back they had tagged each other over 300,000 times which we figured would probably exceed the mechanical life of pewpew button itself!

![Experimentation](/images/shark-badge-ir-test.jpg)

###Lessons Learned

Really the only problem that we ran into this year during the conference was that of battery life.  We got a really good deal on some alkaline batteries but the quality was pretty crap.  While a majority of badges didn’t made it through the con, some had to get a new set.  There were extras to be had however next year we will have better batteries.
