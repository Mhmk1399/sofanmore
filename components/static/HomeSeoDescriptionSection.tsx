"use client";

import { ChevronDown, Crown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const LINE_HEIGHT = 28;
const COLLAPSED_LINES = 3;
const COLLAPSED_HEIGHT = LINE_HEIGHT * COLLAPSED_LINES;

const mainText =
  "Sofa N More is a London-based bespoke sofa studio specialising in custom sofas, made-to-measure sofa, sofa repair, reupholstery, sofa restoration, commercial seating, home staging and interior design services for residential and commercial spaces.";

const fullText = `${mainText}

Our website is designed to help customers understand every part of our service before booking a consultation. You can explore bespoke sofa design, luxury custom sofa, sofa repair in London, upholstery and reupholstery, sofa restoration, commercial sofas, office sofa, hospitality seating, home staging and interior design support in one place.

Every Sofa N More project starts with the space, the client and the way the sofa will be used. We consider room proportions, comfort, fabric, colour, frame construction, durability and long-term practicality before recommending a tailored solution. This allows us to create sofa that feels refined, comfortable and made for the way you live or work.

For homeowners, we create bespoke sofas, chairs, beds, headboards, dining sofa, benches, ottomans and soft furnishings with a personal finish. For commercial clients, we design and produce contract seating, banquette seating, office sofa, hospitality sofas and tailored sofa solutions for restaurants, hotels, showrooms, offices and business interiors.

Our repair and restoration service helps extend the life of existing sofa through careful upholstery, frame care, foam replacement, fabric selection and professional finishing. This makes Sofa N More a trusted choice for customers searching for bespoke sofa London, sofa repair London, sofa restoration, reupholstery, commercial sofa and interior design services across London.`;

export default function HomeSeoDescriptionSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [contentHeight, setContentHeight] = useState(COLLAPSED_HEIGHT);

  const fullTextRef = useRef<HTMLDivElement>(null);
  const contentId = "home-seo-description-content";

  const updateHeight = useCallback(() => {
    const fullTextElement = fullTextRef.current;
    if (!fullTextElement) return;

    const fullHeight = fullTextElement.scrollHeight;
    const shouldShowToggle = fullHeight > COLLAPSED_HEIGHT + 2;

    setShowToggle(shouldShowToggle);
    setContentHeight(
      isExpanded || !shouldShowToggle ? fullHeight : COLLAPSED_HEIGHT,
    );
  }, [isExpanded]);

  useEffect(() => {
    updateHeight();

    let frameId: number | null = null;

    const handleResize = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateHeight();
      });
    };

    window.addEventListener("resize", handleResize);
    document.fonts?.ready.then(updateHeight).catch(() => undefined);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("resize", handleResize);
    };
  }, [updateHeight]);

  return (
    <section
      id="sofa-n-more-description"
      aria-labelledby="home-seo-description-heading"
      itemScope
      itemType="https://schema.org/sofaStore"
      className="
        relative overflow-hidden
        bg-[linear-gradient(180deg,#f5f2ea_0%,#fffdf8_52%,#f1e6d6_100%)]
        px-3 py-8
        sm:px-5 sm:py-10
        lg:px-8 lg:py-12
      "
    >
      <div className="relative z-10 mx-auto w-full max-w-[1120px]">
        <div
          className="
            relative overflow-hidden
            rounded-[28px] border border-white/80
            bg-[linear-gradient(145deg,#fffefa_0%,#f6eee3_52%,#e4d2bb_100%)]
            p-[6px]
            shadow-[16px_20px_46px_rgba(83,58,32,0.15),-12px_-12px_30px_rgba(255,255,255,0.76),inset_2px_2px_3px_rgba(255,255,255,0.9),inset_-2px_-2px_6px_rgba(112,80,45,0.08)]
            sm:rounded-[34px] sm:p-[7px]
          "
        >
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-x-8 top-0 h-px
              bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.98),transparent)]
            "
          />

          <div
            className="
              relative overflow-hidden rounded-[22px]
              border border-white/48
              bg-[linear-gradient(145deg,#e8d9c6_0%,#fffaf3_44%,#f3e7d8_100%)]
              p-[5px]
              shadow-[inset_7px_7px_15px_rgba(115,84,50,0.12),inset_-7px_-7px_16px_rgba(255,255,255,0.9)]
              sm:rounded-[28px]
            "
          >
            <div
              className="
                relative overflow-hidden
                rounded-[18px] border border-white/75
                bg-[#fffaf3]
                px-4 py-4
                shadow-[7px_9px_20px_rgba(84,59,34,0.10),-5px_-5px_15px_rgba(255,255,255,0.72),inset_1px_1px_2px_rgba(255,255,255,0.92)]
                sm:rounded-[23px] sm:px-6 sm:py-5
                lg:px-7 lg:py-6
              "
            >
              <div
                aria-hidden
                className="
                  absolute bottom-0 left-0 top-0 w-[5px]
                  bg-[linear-gradient(180deg,var(--brand-gold)_0%,#f2d396_48%,rgba(215,160,74,0.18)_100%)]
                "
              />

              <div
                aria-hidden
                className="
                  pointer-events-none absolute inset-x-6 top-0 h-px
                  bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95),transparent)]
                "
              />

              <div className="mb-4 flex items-center gap-3 pl-2">
                <span
                  className="
                    flex h-8 w-8 items-center justify-center
                    rounded-full border border-white/70
                    bg-[linear-gradient(145deg,#fffdf8,#eadccb)]
                    shadow-[4px_5px_12px_rgba(87,62,36,0.12),inset_1px_1px_2px_rgba(255,255,255,0.9)]
                  "
                >
                  <Crown
                    size={13}
                    strokeWidth={1.6}
                    className="text-[var(--brand-gold-700)]"
                  />
                </span>
                <h2
                  id="home-seo-description-heading"
                  className="
                    font-brand-sans text-[9px]
                    font-bold uppercase tracking-[0.22em]
                    text-[var(--brand-navy)]
                  "
                >
                  About Sofa N More
                </h2>
              </div>

              <div
                className="
                  relative rounded-[16px]
                  border border-white/60
                  bg-[linear-gradient(145deg,#fffdf8_0%,#fbf3e8_100%)]
                  px-4 py-4
                  shadow-[inset_4px_5px_11px_rgba(111,80,45,0.08),inset_-4px_-4px_11px_rgba(255,255,255,0.82)]
                  sm:px-5
                "
              >
                <div
                  ref={fullTextRef}
                  aria-hidden
                  className="
                    invisible absolute inset-x-0
                    pointer-events-none
                    px-4 sm:px-5
                    whitespace-pre-wrap text-justify
                    font-brand-sans text-[13px]
                    font-medium leading-7
                    text-[#4e535a]
                    sm:text-[14px]
                  "
                >
                  {fullText}
                </div>

                <div
                  id={contentId}
                  className="
                    relative overflow-hidden
                    transition-[height] duration-[350ms]
                    ease-[var(--ease-clay)]
                    motion-reduce:transition-none
                  "
                  style={{ height: contentHeight }}
                >
                  <div
                    itemProp="description"
                    className="
                      whitespace-pre-wrap text-justify
                      font-brand-sans text-[13px]
                      font-medium leading-7
                      text-[#4e535a]
                      sm:text-[14px]
                    "
                  >
                    {fullText}
                  </div>

                  <div
                    aria-hidden
                    className={`
                      pointer-events-none absolute inset-x-0 bottom-0 h-12
                      bg-[linear-gradient(180deg,rgba(255,253,248,0),#fffaf3_82%)]
                      transition-opacity duration-[250ms] ease-[var(--ease-clay)]
                      ${!isExpanded && showToggle ? "opacity-100" : "opacity-0"}
                    `}
                  />
                </div>
              </div>

              {showToggle && (
                <div className="mt-4 flex justify-start pl-2">
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={contentId}
                    onClick={() => setIsExpanded((current) => !current)}
                    className="
                      group inline-flex cursor-pointer items-center gap-2
                      rounded-full border border-white/75
                      bg-[linear-gradient(145deg,#fffdf8,#eadccb)]
                      px-3.5 py-2
                      font-brand-sans text-[12px]
                      font-bold text-[var(--brand-navy)]
                      shadow-[5px_7px_16px_rgba(87,62,36,0.12),-4px_-4px_12px_rgba(255,255,255,0.74),inset_1px_1px_2px_rgba(255,255,255,0.9)]
                      transition-[color,transform,box-shadow] duration-200
                      hover:-translate-y-[1px]
                      hover:text-[var(--brand-gold-700)]
                      focus-visible:outline-2
                      focus-visible:outline-offset-4
                      focus-visible:outline-[var(--brand-gold)]
                      sm:text-[13px]
                    "
                  >
                    <span
                      className={`
                        flex h-7 w-7 items-center justify-center
                        rounded-full
                        bg-[linear-gradient(145deg,#d8a24c,#af7424)]
                        text-white
                        shadow-[3px_4px_9px_rgba(130,82,28,0.22),inset_1px_1px_2px_rgba(255,255,255,0.34)]
                        transition-transform duration-300 ease-[var(--ease-clay)]
                        ${isExpanded ? "rotate-180" : "rotate-0"}
                      `}
                    >
                      <ChevronDown size={14} strokeWidth={1.8} />
                    </span>
                    {isExpanded ? "Show Less" : "Show More"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
