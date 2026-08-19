/**
 * Development seed data.
 * Run with: npx prisma db seed
 *
 * This is DEMO DATA for development only.
 * Do NOT use this data in production.
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? "",
});
const db = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database (development)...\n");

  // ─── Admin user ──────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("Admin@12345", 12);
  const admin = await db.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin",
      passwordHash: adminPassword,
      role: "ADMIN",
      emailVerified: new Date(),
      profile: { create: {} },
    },
  });
  console.log("✅ Admin user created: admin@example.com / Admin@12345");

  // ─── Demo user ───────────────────────────────────────────────
  const userPassword = await bcrypt.hash("User@12345", 12);
  const demoUser = await db.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      name: "Demo User",
      passwordHash: userPassword,
      role: "USER",
      emailVerified: new Date(),
      profile: { create: {} },
    },
  });
  console.log("✅ Demo user created: demo@example.com / User@12345");

  // ─── Teacher ─────────────────────────────────────────────────
  const teacher = await db.teacher.upsert({
    where: { slug: "teacher-placeholder" },
    update: {},
    create: {
      name: "[Teacher Name]",
      slug: "teacher-placeholder",
      bio: "[Full teacher biography. Describe their background, training, approach, and philosophy here.]",
      shortBio: "[A short introduction to the teacher — 1-2 sentences.]",
      specialties: ["Yoga", "Breathwork", "Mindfulness"],
      published: true,
    },
  });
  console.log("✅ Teacher created");

  // ─── Offerings ───────────────────────────────────────────────
  const offerings = [
    {
      title: "Yoga",
      slug: "yoga",
      category: "YOGA" as const,
      shortDescription: "Online and in-person yoga classes for all levels.",
      description: "Yoga as a practice of movement, breath, and awareness. Classes for beginners through to regular practitioners — online and in-person.",
      mode: "HYBRID" as const,
      featured: true,
      published: true,
      sortOrder: 1,
    },
    {
      title: "Breathwork",
      slug: "breathwork",
      category: "BREATHWORK" as const,
      shortDescription: "Guided breathwork and pranayama sessions.",
      description: "The breath is always with us. Learning to notice it — and work with it — is one of the simplest and most powerful practices available.",
      mode: "HYBRID" as const,
      featured: false,
      published: true,
      sortOrder: 2,
    },
    {
      title: "Mindfulness & Meditation",
      slug: "mindfulness",
      category: "MINDFULNESS" as const,
      shortDescription: "Guided mindfulness and meditation practices.",
      description: "The practice of paying attention to what is actually happening — without judgment, without agenda.",
      mode: "HYBRID" as const,
      featured: false,
      published: true,
      sortOrder: 3,
    },
    {
      title: "Yoga Beyond the Mat",
      slug: "yoga-beyond-the-mat",
      category: "JOURNEY" as const,
      shortDescription: "A 7-Day Awareness Journey.",
      description: "What if yoga didn't begin on the mat? A simple 7-day experiment to notice how you think, move, eat, work and respond.",
      mode: "ONLINE" as const,
      featured: true,
      published: true,
      sortOrder: 0,
    },
  ];

  for (const o of offerings) {
    await db.offering.upsert({
      where: { slug: o.slug },
      update: {},
      create: o,
    });
  }
  console.log("✅ Offerings created");

  // ─── Journey ─────────────────────────────────────────────────
  const journeyOffering = await db.offering.findUnique({
    where: { slug: "yoga-beyond-the-mat" },
  });

  const journey = await db.journey.upsert({
    where: { slug: "7-day-awareness-journey" },
    update: {},
    create: {
      slug: "7-day-awareness-journey",
      offeringId: journeyOffering?.id,
      title: "Yoga Beyond the Mat",
      subtitle: "A 7-Day Awareness Journey",
      description: "What if yoga didn't begin on the mat? A 7-day experiment to bring awareness to ordinary activities.",
      published: true,
      featured: true,
      totalDays: 7,
    },
  });
  console.log("✅ Journey created");

  // ─── Journey days ─────────────────────────────────────────────
  const journeyDays = [
    {
      dayNumber: 1,
      title: "Where Is Your Mind?",
      theme: "Mind",
      intention: "To notice where your attention actually is.",
      practiceTitle: "A ten-minute walk with one question",
      practiceContent: `Today's practice is simple. Take a walk of at least ten minutes — somewhere you would normally walk without thinking about it.

As you walk, ask yourself one question: Where is my mind?

Not "where should it be?" — just where is it actually, right now?

It might be on a conversation you had earlier. On a task you haven't finished. On what you'll eat when you get home. On the past, the future, somewhere else entirely.

You don't need to change anything. Just notice.

That is the practice.`,
      observationNote: "Notice how often the mind is somewhere other than where the body is. This is not a problem to fix — it is simply what the mind does. Noticing it is the beginning of awareness.",
      durationMinutes: 10,
    },
    {
      dayNumber: 2,
      title: "Notice the Body",
      theme: "Body",
      intention: "To come into the physical experience of walking.",
      practiceTitle: "Walk and feel",
      practiceContent: `Take a walk today — same kind of walk as yesterday, at least ten minutes.

This time, turn your attention to the body.

What does walking actually feel like? Can you feel your feet on the ground? The weight shifting from heel to toe? The movement of your arms? The temperature of the air on your skin?

You don't need to walk any differently. You don't need to slow down or speed up. Just pay attention to what is already happening in the body as it moves through the world.

Notice when attention drifts away from the body — to thoughts, plans, memories. That's fine. Gently bring it back. Not as a correction. Just as a return.`,
      observationNote: "The body is always in the present moment. The mind travels. Coming back to physical sensation is one of the simplest ways to return to now.",
      durationMinutes: 10,
    },
    {
      dayNumber: 3,
      title: "Come Back to the Breath",
      theme: "Breath",
      intention: "To use the breath as an anchor.",
      practiceTitle: "Walk and breathe",
      practiceContent: `Today, take your walk and add one layer of attention: the breath.

You don't need to breathe any differently. No counting. No special technique. Just notice that you are breathing.

Feel the breath coming in. Feel it going out. Feel where you feel it most clearly — the nostrils, the chest, the belly.

When attention moves to thoughts, plans, sensations — that's fine. See if you can use the breath as a point to return to. Not because the breath is more important than everything else. Just because it is always there.`,
      observationNote: "The breath has been described as the bridge between the body and the mind. When we notice the breath, we are in the body and aware of experience simultaneously.",
      durationMinutes: 10,
    },
    {
      dayNumber: 4,
      title: "Wake Up Your Senses",
      theme: "Senses",
      intention: "To receive the world through the senses.",
      practiceTitle: "Walk and sense",
      practiceContent: `Today, see if you can open the senses a little wider.

What do you hear? Not just the obvious sounds — what else? Background sounds, distant sounds, sounds you normally filter out?

What do you see? Not just what's in front of you — what's to the side, above, below?

What do you smell? Can you feel the air temperature?

We walk through the world but often don't receive it. We look without seeing, listen without hearing.

Today, just try receiving a little more of it.`,
      observationNote: "The senses are our contact with the present moment. When we engage them fully, the world becomes fuller, richer — not because it has changed, but because we are more present to it.",
      durationMinutes: 10,
    },
    {
      dayNumber: 5,
      title: "Notice Distraction",
      theme: "Distraction",
      intention: "To become curious about where attention goes.",
      practiceTitle: "Walk and notice what pulls you",
      practiceContent: `You've been practising for four days now. Today, get curious about distraction.

When your attention moves away from the walk — where does it go?

To the future (planning, worrying)?
To the past (remembering, replaying)?
To the phone, the noise, the thought that just appeared?

You don't need to fight distraction or avoid it. You don't even need to come back to the walk if you get pulled away completely. Just notice what pulls you.

This is important information about how your mind works.`,
      observationNote: "Distraction is not the enemy of awareness — it is one of the most interesting things to observe. Noticing where attention goes tells us a great deal about what we are attached to, afraid of, or avoiding.",
      durationMinutes: 10,
    },
    {
      dayNumber: 6,
      title: "Experience Presence",
      theme: "Presence",
      intention: "To be fully here — even briefly.",
      practiceTitle: "The walk without a destination",
      practiceContent: `You've spent five days noticing different aspects of the walk. Today, let it all come together.

Walk without a specific direction if you can. No destination, no agenda.

See if there are moments — even brief ones — where you are simply here. Present. Not thinking about what's coming or what's passed. Just this: the walking, the air, the light, the sounds, the breath, the body.

These moments of presence may be very brief. That's completely fine. The purpose is not to achieve some extended state of meditation. It is to experience presence — even for a moment.

Notice what it's like when you are here.`,
      observationNote: "Presence is not a permanent achievement. It is a recurring return. Each moment of presence — however brief — is complete in itself.",
      durationMinutes: 15,
    },
    {
      dayNumber: 7,
      title: "Look Back",
      theme: "Reflection",
      intention: "To see what you've actually observed about yourself.",
      practiceTitle: "A final walk and a reflection",
      practiceContent: `Take one last walk.

There's no new instruction today. You already know what to notice.

As you walk, let your attention move freely — to the body, the breath, the senses, the mind, the moments of presence, the moments of distraction.

When you return, sit down and write something. Not a summary of the week. Not what you think you were supposed to experience. But what you actually noticed.

What did you observe about your mind?
What surprised you?
What do you want to carry forward?`,
      observationNote: "The walk was never really about walking. It was about paying attention. And paying attention — to whatever you're doing — is what yoga beyond the mat actually means.",
      durationMinutes: 15,
    },
  ];

  for (const dayData of journeyDays) {
    const existingDay = await db.journeyDay.findFirst({
      where: { journeyId: journey.id, dayNumber: dayData.dayNumber },
    });

    if (!existingDay) {
      const day = await db.journeyDay.create({
        data: { journeyId: journey.id, ...dayData },
      });

      // Add polls for each day
      await db.poll.createMany({
        data: [
          {
            dayId: day.id,
            question: `Before today's practice, how present did you feel?`,
            sortOrder: 1,
          },
          {
            dayId: day.id,
            question: `After today's practice, what did you notice most?`,
            sortOrder: 2,
          },
          {
            dayId: day.id,
            question: `How often did your mind wander during the practice?`,
            sortOrder: 3,
          },
        ],
      });

      // Add options for each poll
      const polls = await db.poll.findMany({ where: { dayId: day.id } });

      for (const poll of polls) {
        if (poll.sortOrder === 1) {
          await db.pollOption.createMany({
            data: [
              { pollId: poll.id, text: "Not at all present", sortOrder: 1 },
              { pollId: poll.id, text: "Somewhat distracted", sortOrder: 2 },
              { pollId: poll.id, text: "Reasonably present", sortOrder: 3 },
              { pollId: poll.id, text: "Very present", sortOrder: 4 },
            ],
          });
        } else if (poll.sortOrder === 2) {
          await db.pollOption.createMany({
            data: [
              { pollId: poll.id, text: "The body sensations", sortOrder: 1 },
              { pollId: poll.id, text: "Thoughts and mental chatter", sortOrder: 2 },
              { pollId: poll.id, text: "The environment around me", sortOrder: 3 },
              { pollId: poll.id, text: "The breath", sortOrder: 4 },
              { pollId: poll.id, text: "Something unexpected", sortOrder: 5 },
            ],
          });
        } else {
          await db.pollOption.createMany({
            data: [
              { pollId: poll.id, text: "Constantly", sortOrder: 1 },
              { pollId: poll.id, text: "Frequently", sortOrder: 2 },
              { pollId: poll.id, text: "Sometimes", sortOrder: 3 },
              { pollId: poll.id, text: "Rarely", sortOrder: 4 },
            ],
          });
        }
      }
    }
  }
  console.log("✅ Journey days and polls created");

  // ─── Sample sessions ──────────────────────────────────────────
  const yogaOffering = await db.offering.findUnique({ where: { slug: "yoga" } });
  const breathOffering = await db.offering.findUnique({ where: { slug: "breathwork" } });

  if (yogaOffering && breathOffering) {
    const nextMonday = new Date();
    nextMonday.setDate(nextMonday.getDate() + ((7 - nextMonday.getDay() + 1) % 7 || 7));
    nextMonday.setHours(7, 0, 0, 0);

    const nextTuesday = new Date(nextMonday);
    nextTuesday.setDate(nextMonday.getDate() + 1);
    nextTuesday.setHours(18, 0, 0, 0);

    await db.session.createMany({
      data: [
        {
          offeringId: yogaOffering.id,
          teacherId: teacher.id,
          title: "Morning Yoga Flow",
          description: "A gentle morning yoga flow to start the week. Suitable for all levels.",
          startTime: nextMonday,
          endTime: new Date(nextMonday.getTime() + 60 * 60 * 1000),
          mode: "ONLINE",
          capacity: 20,
          status: "SCHEDULED",
        },
        {
          offeringId: breathOffering.id,
          teacherId: teacher.id,
          title: "Breathwork & Pranayama",
          description: "A guided breathwork session exploring basic pranayama techniques.",
          startTime: nextTuesday,
          endTime: new Date(nextTuesday.getTime() + 45 * 60 * 1000),
          mode: "ONLINE",
          capacity: 15,
          status: "SCHEDULED",
        },
      ],
      skipDuplicates: true,
    });
    console.log("✅ Sample sessions created");
  }

  console.log("\n✅ Seeding complete!\n");
  console.log("Admin: admin@example.com / Admin@12345");
  console.log("Demo user: demo@example.com / User@12345");
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
