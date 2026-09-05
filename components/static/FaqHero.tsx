import Image from "next/image";
import {
  HelpCircle,
  MessageSquareText,
  PhoneCall,
  Sparkles,
} from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";
import { siteConfig } from "@/lib/site";

const heroStats = [
  "Bespoke sofas",
  "Commercial seating",
  "Interior design",
  "Repair and restoration",
];

export default function FaqHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-ivory)] px-3 pt-[110px] sm:px-5 sm:pt-[124px] lg:px-8 lg:pt-[144px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fffdf8_0%,#f5ecdf_62%,#efe2d1_100%)]" />

      <div className="relative z-10 mx-auto grid max-w-[var(--site-width)] gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
        <div className="max-w-[720px]">
          <div className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[var(--brand-navy)]/[0.07] bg-[#f3eadf]/75 px-3.5 shadow-[inset_1px_1px_2px_rgba(101,73,43,0.06),inset_-1px_-1px_2px_rgba(255,255,255,0.78)]">
            <HelpCircle
              size={14}
              strokeWidth={1.8}
              className="text-[var(--brand-gold-700)]"
              aria-hidden
            />
            <span className="font-brand-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-navy)]">
              Sofa N More FAQ
            </span>
          </div>

          <h1 className="mt-5 max-w-[760px] font-brand-display text-[44px] font-medium leading-[0.98] tracking-[-0.04em] text-[var(--brand-navy)] sm:text-[60px] lg:text-[74px]">
            Questions before your project begins.
          </h1>

          <p className="mt-5 max-w-[610px] font-brand-sans text-[12px] font-medium leading-[1.85] text-[var(--brand-text-muted)] sm:text-[14px]">
            Clear answers about bespoke sofas, commercial seating, interior
            design, restoration, delivery, materials and visiting our North West
            London workshop.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <ClayButton href="#faq" variant="gold" size="md" showArrow>
              Browse Questions
            </ClayButton>
            <ClayButton
              href="/contact-us"
              variant="outline"
              size="md"
              showArrow
            >
              Ask Our Team
            </ClayButton>
          </div>

          <div className="mt-7 grid max-w-[620px] grid-cols-2 gap-2 sm:grid-cols-4">
            {heroStats.map((item) => (
              <div
                key={item}
                className="min-h-[68px] rounded-[17px] border border-white/70 bg-white/35 px-3 py-3 shadow-[inset_1px_1px_2px_rgba(101,73,43,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.74)]"
              >
                <Sparkles
                  size={12}
                  strokeWidth={1.7}
                  className="text-[var(--brand-gold-700)]"
                  aria-hidden
                />
                <p className="mt-2 font-brand-sans text-[12px] font-bold leading-[1.35] text-[var(--brand-navy)]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="clay-surface-strong rounded-[30px] p-[7px] sm:rounded-[36px]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#ded4c7] sm:rounded-[30px] lg:aspect-[16/11]">
              <Image
                src="https://sofanmore.s3.eu-west-2.amazonaws.com/Image/52.webp"
                alt="Sofa N More North West London workshop"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1023px) 94vw, 52vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,36,62,0.03)_0%,rgba(17,36,62,0.34)_100%)]" />

              <div className="absolute bottom-4 left-4 right-4 rounded-[20px] border border-white/25 bg-[#fffaf2]/88 p-4 shadow-[0_14px_38px_rgba(18,37,62,0.16)] backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-[360px]">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[var(--brand-navy)] text-[var(--brand-gold)]">
                    <MessageSquareText size={18} strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="font-brand-display text-[22px] font-semibold leading-tight text-[var(--brand-navy)]">
                      Still deciding?
                    </p>
                    <p className="mt-1.5 font-brand-sans text-[13px] font-semibold leading-[1.55] text-[var(--brand-text-muted)]">
                      Call {siteConfig.phoneDisplay} or send a quick message and
                      we can point you in the right direction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
            href={siteConfig.phoneHref}
            className="absolute -bottom-4 right-4 hidden min-h-[48px] items-center gap-2 rounded-full bg-[var(--brand-navy)] px-4 font-brand-sans text-[13px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_14px_34px_rgba(18,37,62,0.2)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            <PhoneCall size={14} strokeWidth={1.8} aria-hidden />
            Call the workshop
          </a>
        </div>
      </div>
    </section>
  );
}
