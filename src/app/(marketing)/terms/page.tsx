import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Terms of Service — ${siteConfig.name}`,
  description: "Terms of service for Yoga School — the rules and conditions for using our platform.",
};

export default function TermsPage() {
  const lastUpdated = "August 2026";

  return (
    <div className="py-16 px-4 max-w-3xl mx-auto">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-widest text-sage-600 mb-3">Legal</p>
        <h1 className="font-heading text-4xl text-charcoal-700 mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
      </div>

      <div className="space-y-8 text-charcoal-600 leading-relaxed">
        <p>
          By using {siteConfig.name} (&ldquo;the Service&rdquo;), you agree to these terms.
          Please read them carefully. If you do not agree, please do not use the Service.
        </p>

        <section aria-labelledby="eligibility">
          <h2 id="eligibility" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            1. Eligibility
          </h2>
          <p>
            You must be at least 18 years old to create an account and use the Service.
            By registering, you confirm that the information you provide is accurate and complete.
          </p>
        </section>

        <section aria-labelledby="your-account">
          <h2 id="your-account" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            2. Your account
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your login credentials.
            You are responsible for all activity that occurs under your account. Please notify us
            immediately at{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-forest underline underline-offset-2">
              {siteConfig.email}
            </a>{" "}
            if you suspect unauthorised access.
          </p>
        </section>

        <section aria-labelledby="acceptable-use">
          <h2 id="acceptable-use" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            3. Acceptable use
          </h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Post content that is harmful, abusive, discriminatory, or illegal</li>
            <li>Impersonate any person or misrepresent your identity</li>
            <li>Attempt to gain unauthorised access to any part of the Service</li>
            <li>Use the Service for any commercial purpose without our prior written consent</li>
            <li>Scrape, crawl, or systematically collect data from the Service</li>
            <li>Share account credentials with others</li>
          </ul>
          <p className="mt-4">
            We reserve the right to remove content and suspend or terminate accounts that
            violate these terms.
          </p>
        </section>

        <section aria-labelledby="health-disclaimer">
          <h2 id="health-disclaimer" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            4. Health disclaimer
          </h2>
          <p>
            The yoga, breathwork, and mindfulness content offered on this platform is for
            educational and wellness purposes only. It is <strong>not</strong> a substitute for
            professional medical advice, diagnosis, or treatment.
          </p>
          <p className="mt-3">
            If you have any health conditions — physical or mental — please consult a qualified
            healthcare professional before beginning any practice. Participate within your
            own limits and comfort level.
          </p>
        </section>

        <section aria-labelledby="bookings-payments">
          <h2 id="bookings-payments" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            5. Bookings & cancellations
          </h2>
          <p>
            Session bookings are subject to availability. Cancellation policies vary by session
            type and are communicated at the time of booking. We reserve the right to cancel or
            reschedule sessions with reasonable notice.
          </p>
        </section>

        <section aria-labelledby="content-ownership">
          <h2 id="content-ownership" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            6. Content & intellectual property
          </h2>
          <p>
            All content on this platform — including text, audio, video, and images — is owned
            by {siteConfig.name} or its licensors and is protected by copyright. You may not
            reproduce, distribute, or create derivative works without express written permission.
          </p>
          <p className="mt-3">
            Content you create (reflections, community posts) remains yours. By posting publicly,
            you grant us a limited licence to display it on the platform.
          </p>
        </section>

        <section aria-labelledby="limitation">
          <h2 id="limitation" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            7. Limitation of liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, {siteConfig.name} shall not be
            liable for any indirect, incidental, or consequential damages arising from your use
            of the Service. Our total liability to you in any matter shall not exceed the amount
            you paid us in the 12 months preceding the claim.
          </p>
        </section>

        <section aria-labelledby="changes-terms">
          <h2 id="changes-terms" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            8. Changes to these terms
          </h2>
          <p>
            We may update these terms from time to time. Continued use of the Service after
            changes constitutes acceptance of the updated terms. We will notify registered users
            of material changes by email.
          </p>
        </section>

        <section aria-labelledby="governing-law">
          <h2 id="governing-law" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            9. Governing law
          </h2>
          <p>
            These terms are governed by the laws of India. Any disputes shall be subject to the
            exclusive jurisdiction of the courts in the relevant jurisdiction.
          </p>
        </section>

        <section aria-labelledby="contact-terms">
          <h2 id="contact-terms" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            10. Contact
          </h2>
          <p>
            Questions about these terms? Contact us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-forest underline underline-offset-2">
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
