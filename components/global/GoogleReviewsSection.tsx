"use client";

import { ArrowUpRight, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Sofa+N+More/@51.5683486,-0.233041,17z/data=!4m8!3m7!1s0x4876111726173097:0x9b06efce5680b451!8m2!3d51.5683486!4d-0.233041!9m1!1b1!16s%2Fg%2F11vr7trx_f?hl=en&entry=ttu";

const reviews = [
  { name: "Saliha Eyici", date: "One month ago", summary: "Delighted with a new sofa and chairs, highlighting the craftsmanship, thoughtful advice on space and materials, regular updates and professional finish." },
  { name: "S T", date: "Five months ago", summary: "Their sofas of more than 20 years looked new after reupholstery, with clear communication, progress updates and attentive service throughout." },
  { name: "Neda Kah", date: "Five months ago", summary: "Foam replacement made the seating firmer and more supportive, with praise for the professional, knowledgeable team and refreshed result." },
  { name: "maria persian", date: "One year ago", summary: "Highlighted friendly, knowledgeable service, help with colour and made-to-measure choices, punctuality, value and the finished purchase." },
  { name: "Elif", date: "Nine months ago", summary: "Praised the high-quality finished product and confirmed that the delivered result matched what had been ordered." },
];

function Stars({ compact = false }: { compact?: boolean }) {
  return (
    <span aria-hidden="true" className="flex gap-1 text-[var(--brand-gold)]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={compact ? "h-3.5 w-3.5 fill-current" : "h-4 w-4 fill-current"} strokeWidth={1.5} />
      ))}
    </span>
  );
}

function ReviewCard({ review, duplicate = false }: { review: (typeof reviews)[number]; duplicate?: boolean }) {
  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={duplicate ? -1 : undefined}
      aria-hidden={duplicate || undefined}
      aria-label={duplicate ? undefined : `Read ${review.name}'s review on Google (opens in a new tab)`}
      className="group flex w-[292px] shrink-0 snap-start flex-col rounded-[24px] border border-white/12 bg-white/[0.075] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_34px_rgba(0,0,0,0.13)] transition-[transform,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--brand-gold)]/45 hover:bg-white/[0.11] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-gold)] sm:w-[340px] sm:p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <Stars compact />
        <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-white/35 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--brand-gold)]" />
      </div>
      <p className="mt-5 font-brand-sans text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--brand-gold)]/85">Google review summary</p>
      <p className="mt-3 flex-1 font-brand-display text-[20px] font-medium leading-[1.28] text-white sm:text-[22px]">{review.summary}</p>
      <div className="mt-6 border-t border-white/12 pt-4">
        <p className="font-brand-sans text-[12px] font-extrabold text-white">{review.name}</p>
        <p className="mt-1 font-brand-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-white/68">{review.date} · Google</p>
      </div>
    </a>
  );
}

export default function GoogleReviewsSection() {
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isUserPaused, setIsUserPaused] = useState(false);

  const clearResumeTimer = () => {
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  };

  const pauseForTouch = () => {
    clearResumeTimer();
    setIsUserPaused(true);
  };

  const resumeAfterMomentum = () => {
    clearResumeTimer();
    setIsUserPaused(true);
    resumeTimer.current = setTimeout(() => {
      setIsUserPaused(false);
      resumeTimer.current = null;
    }, 1800);
  };

  useEffect(() => clearResumeTimer, []);

  return (
    <section aria-labelledby="google-reviews-heading" className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="clay-surface-strong rounded-[34px] p-[6px] sm:rounded-[42px] sm:p-[8px]">
          <div className="relative isolate overflow-hidden rounded-[29px] bg-[var(--brand-navy)] py-10 text-white sm:rounded-[34px] sm:py-12 lg:py-14">
            <div aria-hidden="true" className="absolute -right-20 -top-28 h-80 w-80 rounded-full border border-[var(--brand-gold)]/20 bg-[var(--brand-gold)]/[0.06]" />
            <div aria-hidden="true" className="absolute -bottom-32 left-[18%] h-64 w-64 rounded-full bg-white/[0.035] blur-3xl" />

            <div className="relative flex flex-col gap-8 px-6 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:gap-14 lg:px-14">
              <div className="max-w-[760px]">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                  <p className="font-brand-sans text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-gold)] sm:text-[11px]">Google customer feedback</p>
                  <Stars />
                  <p className="font-brand-sans text-[10px] font-bold uppercase tracking-[0.14em] text-white/58">5.0 · 20 reviews</p>
                </div>
                <h2 id="google-reviews-heading" className="mt-5 font-brand-display text-[36px] font-medium leading-[0.98] tracking-[-0.035em] text-white sm:text-[48px] lg:text-[58px]">Craftsmanship, confirmed by our clients.</h2>
                <p className="mt-5 max-w-[680px] font-brand-sans text-[13px] font-medium leading-[1.8] text-white/72 sm:text-[14px]">Explore paraphrased summaries of visible public feedback below, then visit Google to read the original reviews and latest client experiences.</p>
                <p className="mt-2 font-brand-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-white/65">Google profile snapshot observed 3 October 2026</p>
              </div>

              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" aria-label="Read all Sofa N More reviews on Google (opens in a new tab)" className="group inline-flex min-h-14 w-full shrink-0 items-center justify-between gap-5 rounded-[18px] bg-[var(--brand-gold)] px-5 py-3 font-brand-sans text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--brand-navy)] shadow-[0_12px_30px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.45)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:bg-[#e5b35f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-gold)] active:translate-y-0 sm:w-auto sm:min-w-[260px]">
                <span>Read all on Google</span>
                <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
              </a>
            </div>

            <div
              className="google-reviews-marquee relative mt-9 snap-x snap-mandatory touch-pan-x overflow-x-auto px-6 pb-3 pt-1 [scrollbar-width:none] sm:mt-11 sm:px-10 lg:px-14 [&::-webkit-scrollbar]:hidden"
              aria-label="Google review summaries. Scroll horizontally to browse."
              role="region"
              tabIndex={0}
              data-user-paused={isUserPaused ? "true" : "false"}
              onTouchStart={pauseForTouch}
              onTouchEnd={resumeAfterMomentum}
              onTouchCancel={resumeAfterMomentum}
              onScroll={resumeAfterMomentum}
            >
              <div className="google-reviews-track flex w-max">
                <div className="flex gap-4 pr-4 sm:gap-5 sm:pr-5">
                  {reviews.map((review) => <ReviewCard key={review.name} review={review} />)}
                </div>
                <div aria-hidden="true" className="flex gap-4 pr-4 sm:gap-5 sm:pr-5">
                  {reviews.map((review) => <ReviewCard key={`duplicate-${review.name}`} review={review} duplicate />)}
                </div>
              </div>
            </div>
            <p className="relative mt-3 px-6 text-center font-brand-sans text-[11px] font-bold uppercase tracking-[0.12em] text-white/65 sm:px-10 lg:px-14">Hover or focus to pause · Swipe to explore</p>
          </div>
        </div>
      </div>
    </section>
  );
}
