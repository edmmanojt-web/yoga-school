import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { faqSections } from "@/lib/guide/content";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description: "Common questions about yoga, breathwork, mindfulness, and the 7-Day Awareness Journey.",
};

export default function FAQPage() {
  return (
    <>
      <section
        className="section-padding-sm"
        style={{ background: "linear-gradient(135deg, #FBF7F2 0%, #F2E8DA 100%)" }}
        aria-labelledby="faq-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
          <h1 id="faq-heading" className="font-heading mb-3" style={{ color: "#231E1A" }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: "#7B6B5B" }}>
            Common questions about yoga, breathwork, mindfulness and the 7-Day
            Awareness Journey.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#FEFCF9]" aria-label="FAQ content">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {faqSections.map((section) => (
            <div key={section.category} className="mb-12">
              <h2
                className="font-heading text-xl mb-6 pb-2 border-b"
                style={{ color: "#C8913A", borderColor: "#E4D8C8" }}
              >
                {section.category}
              </h2>
              <dl className="space-y-6">
                {section.questions.map((faq) => (
                  <div key={faq.q}>
                    <dt className="font-medium mb-1.5" style={{ color: "#231E1A" }}>{faq.q}</dt>
                    <dd className="text-sm leading-relaxed" style={{ color: "#7B6B5B" }}>{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <div
            className="text-center py-10 rounded-3xl mt-8"
            style={{ background: "#F6EFE6" }}
          >
            <p className="font-heading text-xl mb-2" style={{ color: "#231E1A" }}>
              Still have questions?
            </p>
            <p className="mb-6" style={{ color: "#7B6B5B" }}>We&rsquo;re happy to help.</p>
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
