import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/marketing/contact-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch. Ask about yoga, breathwork, programs, or private sessions.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="section-padding-sm"
        style={{ background: "linear-gradient(135deg, #FAF7F0 0%, #E8DFC8 100%)" }}
        aria-labelledby="contact-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center pt-8">
          <h1 id="contact-heading" className="font-heading text-charcoal-700 mb-4">
            Get in touch
          </h1>
          <p className="text-charcoal-500 text-lg">
            Questions about yoga, breathwork, programs, or private sessions?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="section-padding bg-white" aria-label="Contact information and form">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Info */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-charcoal-700 text-2xl mb-6">
                Contact details
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-sage-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-charcoal-700">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm text-charcoal-500 hover:text-forest transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                {(siteConfig.whatsapp as string) !== "[WhatsApp Number]" && (
                  <div className="flex items-start gap-3">
                    <MessageCircle
                      size={18}
                      className="text-sage-500 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-charcoal-700">WhatsApp</p>
                      <a
                        href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`}
                        className="text-sm text-charcoal-500 hover:text-forest transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {siteConfig.whatsapp}
                      </a>
                    </div>
                  </div>
                )}

                {siteConfig.location !== "[Location]" && (
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="text-sage-500 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-charcoal-700">Location</p>
                      <p className="text-sm text-charcoal-500">{siteConfig.location}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-10 p-5 bg-muted rounded-2xl">
                <p className="text-sm text-charcoal-500 leading-relaxed">
                  All sessions are available online. Some in-person sessions
                  are offered at{" "}
                  {siteConfig.location !== "[Location]"
                    ? siteConfig.location
                    : "[location]"}
                  . We'll confirm details when you reach out.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-heading text-charcoal-700 text-2xl mb-6">
                Send a message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
