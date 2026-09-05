import type { Metadata } from "next";

import { defaultOgImage, siteConfig } from "@/lib/site";

const PAGE_TITLE = "Privacy Policy | Sofa N More";
const PAGE_DESCRIPTION =
  "How Sofa N More handles enquiry information and project details.";
const PAGE_PATH = "/privacy-policy";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    type: "website",
    url: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [defaultOgImage.url],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="overflow-hidden bg-[var(--brand-ivory)] px-3 pb-12 pt-24 sm:px-5 sm:pb-14 sm:pt-28 lg:px-7 lg:pb-20">
      <section
        aria-labelledby="privacy-policy-heading"
        className="mx-auto max-w-[980px]"
      >
        <div className="clay-surface-strong rounded-[34px] p-[7px] sm:rounded-[42px] sm:p-[9px]">
          <div className="clay-inset rounded-[27px] px-5 py-8 sm:rounded-[34px] sm:px-8 sm:py-10 lg:px-11 lg:py-12">
            <p className="font-brand-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-gold-700)]">
              Sofa N More
            </p>
            <h1
              id="privacy-policy-heading"
              className="mt-4 font-brand-display text-[42px] font-semibold leading-[1.02] text-[var(--brand-navy)] sm:text-[54px]"
            >
              Privacy Policy<span className="text-[var(--brand-gold)]">.</span>
            </h1>
            <div className="mt-7 space-y-5 font-brand-sans text-[13px] font-semibold leading-[1.8] text-[var(--brand-text-muted)]">
              <p>
                Sofa N More uses enquiry details to respond to messages,
                understand project requirements, and discuss next steps.
              </p>
              <p>
                Form submissions may include contact details, project notes,
                uploaded images, page source information, and basic technical
                data used for security and abuse prevention.
              </p>
              <p>
                Marketing updates are only sent when separate optional consent
                is provided. Enquiry consent is used only to respond to the
                project request.
              </p>
              <p>
                To ask about your information, contact {siteConfig.email}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
