import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${siteConfig.name}`,
  description: "Privacy policy for Yoga School — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  const lastUpdated = "August 2026";

  return (
    <div className="py-16 px-4 max-w-3xl mx-auto">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-widest text-sage-600 mb-3">Legal</p>
        <h1 className="font-heading text-4xl text-charcoal-700 mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
      </div>

      <div className="prose prose-charcoal max-w-none space-y-8 text-charcoal-600 leading-relaxed">
        <section aria-labelledby="intro">
          <p>
            {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your
            privacy. This policy explains what information we collect when you use our website and
            services, how we use it, and your rights regarding that information.
          </p>
        </section>

        <section aria-labelledby="info-we-collect">
          <h2 id="info-we-collect" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            1. Information we collect
          </h2>
          <p>We collect information you provide directly:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong>Account information:</strong> name, email address, and password when you create an account.</li>
            <li><strong>Profile information:</strong> optional bio, location, and timezone you add to your profile.</li>
            <li><strong>Booking information:</strong> session bookings and associated notes.</li>
            <li><strong>Journey data:</strong> your progress through the 7-Day Journey, reflections you write, and poll responses.</li>
            <li><strong>Contact submissions:</strong> messages you send through our contact form.</li>
            <li><strong>Community posts:</strong> content you choose to share with the community.</li>
          </ul>
          <p className="mt-4">We also collect limited usage data automatically:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Pages visited and approximate session duration</li>
            <li>Device type and browser (via user-agent string)</li>
            <li>Referring URL</li>
          </ul>
        </section>

        <section aria-labelledby="how-we-use">
          <h2 id="how-we-use" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            2. How we use your information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and improve our services</li>
            <li>To send booking confirmations and reminders</li>
            <li>To respond to your enquiries</li>
            <li>To personalise your journey experience</li>
            <li>To understand how our offerings are used so we can improve them</li>
          </ul>
          <p className="mt-4">
            We do <strong>not</strong> sell your personal data. We do not use it for advertising
            on third-party platforms.
          </p>
        </section>

        <section aria-labelledby="reflections-privacy">
          <h2 id="reflections-privacy" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            3. Reflections & privacy settings
          </h2>
          <p>
            Reflections you write during the 7-Day Journey are <strong>private by default</strong>.
            Only you can read them. You may choose to share a reflection with the community —
            this is always opt-in and can be changed at any time.
          </p>
        </section>

        <section aria-labelledby="data-storage">
          <h2 id="data-storage" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            4. Data storage & security
          </h2>
          <p>
            Your data is stored on secure servers. Passwords are hashed using bcrypt and are never
            stored in plain text. We use HTTPS for all data in transit. While no system is completely
            immune to security risks, we take reasonable precautions to protect your information.
          </p>
        </section>

        <section aria-labelledby="cookies">
          <h2 id="cookies" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            5. Cookies
          </h2>
          <p>
            We use a single session cookie to keep you logged in. We do not use advertising cookies
            or third-party tracking cookies. You can disable cookies in your browser, but this will
            prevent you from staying logged in.
          </p>
        </section>

        <section aria-labelledby="your-rights">
          <h2 id="your-rights" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            6. Your rights
          </h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and associated data</li>
            <li>Withdraw consent at any time where processing is based on consent</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-forest underline underline-offset-2">
              {siteConfig.email}
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="changes">
          <h2 id="changes" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            7. Changes to this policy
          </h2>
          <p>
            We may update this policy from time to time. We will notify registered users of
            significant changes by email. Continued use of the service after changes constitutes
            acceptance of the updated policy.
          </p>
        </section>

        <section aria-labelledby="contact-privacy">
          <h2 id="contact-privacy" className="font-heading text-xl text-charcoal-700 mt-8 mb-3">
            8. Contact
          </h2>
          <p>
            For any questions about this privacy policy, please email{" "}
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
