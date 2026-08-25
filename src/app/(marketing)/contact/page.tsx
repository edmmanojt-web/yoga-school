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
        style={{ background: "linear-gradient(135deg, #FBF7F2 0%, #F2E8DA 100%)" }}
        aria-labelledby="contact-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center pt-8">
          <h1 id="contact-heading" className="font-heading mb-4" style={{ color: "#231E1A" }}>
            Get in touch
          </h1>
          <p className="text-lg" style={{ color: "#7B6B5B" }}>
            Questions about yoga, breathwork, programs, or private sessions?
            We&rsquo;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="section-padding bg-[#FEFCF9]" aria-label="Contact information and form">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Info */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl mb-6" style={{ color: "#231E1A" }}>
                Contact details
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#B87D3B" }} aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#231E1A" }}>Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm transition-colors"
                      style={{ color: "#7B6B5B" }}
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                {(siteConfig.whatsapp as string) !== "[WhatsApp Number]" && (
                  <div className="flex items-start gap-3">
                    <MessageCircle
                      size={18}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: "#B87D3B" }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#231E1A" }}>WhatsApp</p>
                      <a
                        href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`}
                        className="text-sm transition-colors"
                        style={{ color: "#7B6B5B" }}
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
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: "#B87D3B" }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#231E1A" }}>Location</p>
                      <p className="text-sm" style={{ color: "#7B6B5B" }}>{siteConfig.location}</p>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="mt-10 p-5 rounded-2xl"
                style={{ background: "#F6EFE6" }}
              >
                <p className="text-sm leading-relaxed" style={{ color: "#7B6B5B" }}>
                  All sessions are available online. Some in-person sessions
                  are offered at{" "}
                  {siteConfig.location !== "[Location]"
                    ? siteConfig.location
                    : "[location]"}
                  . We&rsquo;ll confirm details when you reach out.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-heading text-2xl mb-6" style={{ color: "#231E1A" }}>
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
