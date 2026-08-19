import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description: "Common questions about yoga, breathwork, mindfulness, and the 7-Day Awareness Journey.",
};

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "Do I need any experience to join?",
        a: "No. We welcome complete beginners. All sessions are designed to be accessible regardless of your experience level.",
      },
      {
        q: "Do I need to be flexible?",
        a: "No. Flexibility is a result of practice, not a requirement for it. You can start exactly where you are.",
      },
      {
        q: "What language are sessions conducted in?",
        a: "Sessions are available in English, Hindi and Marathi. Please mention your preferred language when you sign up or get in touch.",
      },
    ],
  },
  {
    category: "Yoga",
    questions: [
      {
        q: "What do I need for an online yoga class?",
        a: "A quiet space, a yoga mat (or any comfortable surface), comfortable clothing, and a stable internet connection.",
      },
      {
        q: "How is yoga different from stretching?",
        a: "Yoga includes movement and stretching, but it also includes breath awareness, body awareness, and — when practiced over time — a way of relating to experience that goes beyond the mat.",
      },
    ],
  },
  {
    category: "Breathwork",
    questions: [
      {
        q: "Is breathwork safe?",
        a: "Most breathwork practices are safe for healthy adults. If you have a cardiovascular condition, epilepsy, pregnancy, or other medical conditions, please consult your doctor before joining. These sessions are not medical treatment.",
      },
      {
        q: "What can I expect in a breathwork session?",
        a: "You'll be guided through one or more breathing techniques. Sessions are calm and grounded. You may feel physical sensations — tingling, light-headedness, emotional release. You are always in control.",
      },
    ],
  },
  {
    category: "7-Day Journey",
    questions: [
      {
        q: "What is the 7-Day Awareness Journey?",
        a: "A free, self-paced exploration of awareness through ordinary activities — starting with walking. Each day introduces a short practice that takes about 10 minutes.",
      },
      {
        q: "Is it really free?",
        a: "Yes. The 7-Day Journey is completely free. You just need to create an account.",
      },
      {
        q: "What if I miss a day?",
        a: "That's completely fine. There are no streaks, no penalties. You continue from where you left off.",
      },
      {
        q: "Are my reflections private?",
        a: "Yes. All reflections are private by default. You can choose to share a reflection with the community, but this is always your choice.",
      },
    ],
  },
  {
    category: "Booking & Sessions",
    questions: [
      {
        q: "How do I book a session?",
        a: "Create an account, browse the schedule, and book the session you want. You'll receive confirmation details by email.",
      },
      {
        q: "Can I book a private session?",
        a: "Yes. Private sessions are available for yoga, breathwork, and mindfulness. Please get in touch through the contact page.",
      },
      {
        q: "What is the cancellation policy?",
        a: "[Cancellation policy to be added]",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <section
        className="section-padding-sm"
        style={{ background: "linear-gradient(135deg, #FAF7F0 0%, #F4EFE3 100%)" }}
        aria-labelledby="faq-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
          <h1 id="faq-heading" className="font-heading text-charcoal-700 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-charcoal-500">
            Common questions about yoga, breathwork, mindfulness and the 7-Day
            Awareness Journey.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white" aria-label="FAQ content">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {faqs.map((section) => (
            <div key={section.category} className="mb-12">
              <h2 className="font-heading text-sage-600 text-xl mb-6 pb-2 border-b border-border">
                {section.category}
              </h2>
              <dl className="space-y-6">
                {section.questions.map((faq) => (
                  <div key={faq.q}>
                    <dt className="font-medium text-charcoal-700 mb-1.5">{faq.q}</dt>
                    <dd className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <div className="text-center py-10 bg-muted rounded-3xl mt-8">
            <p className="text-charcoal-700 font-heading text-xl mb-2">
              Still have questions?
            </p>
            <p className="text-charcoal-500 mb-6">We're happy to help.</p>
            <Link href="/contact">
              <Button variant="primary">
                Get in touch
                <ArrowRight size={14} aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
