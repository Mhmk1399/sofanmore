import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import ClayButton from "@/components/ui/ClayButton";

export type JournalPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  datePublished: string;
  image: string;
  featured?: boolean;
};

export const journalPosts: JournalPost[] = [
  {
    id: 1,
    category: "Bespoke",
    date: "12 MAY 2024",
    datePublished: "2024-05-12",
    title: "How Bespoke sofa Transforms a Space",
    excerpt:
      "Thoughtful design, expert craftsmanship and the finest materials come together to create spaces with soul.",
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/1.webp",
    featured: true,
  },
  {
    id: 2,
    category: "Craftsmanship",
    date: "28 APR 2024",
    datePublished: "2024-04-28",
    title: "Inside Our London Workshop",
    excerpt:
      "A behind-the-scenes look at where craftsmanship and passion meet.",
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/2.webp",
  },
  {
    id: 3,
    category: "Interiors",
    date: "18 APR 2024",
    datePublished: "2024-04-18",
    title: "Choosing the Right Upholstery Fabric",
    excerpt:
      "Explore fabric types, textures and finishes to find the perfect match.",
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/3.webp",
  },
  {
    id: 4,
    category: "Interiors",
    date: "07 APR 2024",
    datePublished: "2024-04-07",
    title: "Interior Styling for Modern London Homes",
    excerpt:
      "Timeless styling ideas to elevate your home with elegance and character.",
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/4.webp",
  },
  {
    id: 5,
    category: "Restoration",
    date: "29 MAR 2024",
    datePublished: "2024-03-29",
    title: "Restoration Secrets for Timeless Pieces",
    excerpt:
      "Preserving heritage through traditional techniques and meticulous care.",
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/5.webp",
  },
  {
    id: 6,
    category: "Bespoke",
    date: "17 MAR 2024",
    datePublished: "2024-03-17",
    title: "Designing a Signature Sofa from Scratch",
    excerpt: "From concept to creation – the journey of a bespoke masterpiece.",
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/6.webp",
  },
];

export default function JournalSection() {
  const featuredPost = journalPosts.find((post) => post.featured);
  const secondaryPosts = journalPosts.filter((post) => !post.featured);
  const mobilePrimary = journalPosts[0];
  const mobileList = journalPosts.slice(1);

  if (!featuredPost) return null;

  return (
    <section
      className="
        relative overflow-hidden
        bg-[var(--brand-ivory)]
        px-4 py-8
        sm:px-5 sm:py-10 mt-16
        lg:px-6 lg:py-14
      "
    >
      <JournalDecorations />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <div aria-hidden className="sr-only">
          {journalPosts.map((post) => (
            <span key={post.id} id={`post-${post.id}`} />
          ))}
        </div>

        {/* ========================= DESKTOP ========================= */}
        <div className="hidden xl:block">
          <div className="clay-surface-strong rounded-[44px] p-[10px]">
            <div
              className="
                relative overflow-hidden rounded-[36px]
                bg-[linear-gradient(180deg,#FFFDF8_0%,#F5F2EA_100%)]
                px-10 py-10
              "
            >
              {/* inner sculpted top shell */}
              <div
                className="
                  clay-inset mb-8 rounded-[38px]
                  px-10 py-8
                "
              >
                <div className="flex items-start justify-between gap-10">
                  <div className="max-w-[720px]">
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className="
                          font-brand-sans text-[11px] font-bold uppercase
                          tracking-[0.24em] text-[var(--brand-gold-700)]
                        "
                      >
                        Journal
                      </span>
                    </div>

                    <h2
                      className="
                        font-brand-display text-[64px] font-medium
                        leading-[0.96] tracking-[-0.035em]
                        text-[var(--brand-navy)]
                      "
                    >
                      Stories, Craft & Inspiration
                      <span className="text-[var(--brand-gold)]">.</span>
                    </h2>

                    <p
                      className="
                        mt-5 max-w-[530px]
                        font-brand-sans text-[17px] leading-[1.75]
                        text-[var(--brand-text-muted)]
                      "
                    >
                      Explore insights, design ideas, craftsmanship stories and
                      updates from Sofa N More.
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop content grid */}
              <div className="grid grid-cols-[1.1fr_1.5fr] gap-6">
                {/* left column */}
                <div className="flex flex-col gap-6">
                  <FeaturedPostCard post={featuredPost} />

                  <LargePostCard post={secondaryPosts[2]} />
                </div>

                {/* right grid */}
                <div className="grid grid-cols-2 gap-6">
                  <StandardPostCard post={secondaryPosts[0]} />
                  <StandardPostCard post={secondaryPosts[1]} />
                  <StandardPostCard post={secondaryPosts[3]} />
                  <StandardPostCard post={secondaryPosts[4]} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================= TABLET / SMALL DESKTOP ========================= */}
        <div className="hidden md:block xl:hidden">
          <div className="clay-surface-strong rounded-[36px] p-[8px]">
            <div
              className="
                relative overflow-hidden rounded-[30px]
                bg-[linear-gradient(180deg,#FFFDF8_0%,#F5F2EA_100%)]
                px-6 py-7
              "
            >
              <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-[760px]">
                  <span
                    className="
                      font-brand-sans text-[13px] font-bold uppercase
                      tracking-[0.24em] text-[var(--brand-gold-700)]
                    "
                  >
                    Journal
                  </span>

                  <h2
                    className="
                      mt-3 font-brand-display
                      text-[48px] font-medium leading-[0.98]
                      tracking-[-0.03em] text-[var(--brand-navy)]
                    "
                  >
                    Stories, Craft & Inspiration
                    <span className="text-[var(--brand-gold)]">.</span>
                  </h2>

                  <p
                    className="
                      mt-4 max-w-[560px]
                      font-brand-sans text-[15px] leading-[1.75]
                      text-[var(--brand-text-muted)]
                    "
                  >
                    Explore insights, design ideas, craftsmanship stories and
                    updates from Sofa N More.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <TabletFeaturedPostCard post={featuredPost} />
                {secondaryPosts.map((post) => (
                  <CompactPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================= MOBILE ========================= */}
        <div className="md:hidden">
          <div className="mx-auto max-w-[430px]">
            <div className="clay-surface-strong rounded-[32px] p-[7px]">
              <div
                className="
                  relative overflow-hidden rounded-[26px]
                  bg-[linear-gradient(180deg,#FFFDF8_0%,#F5F2EA_100%)]
                  px-4 py-5
                "
              >
                {/* top mobile shell */}
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <div
                      className="
                        font-brand-display text-[30px]
                        tracking-[-0.04em] text-[var(--brand-gold-700)]
                      "
                    >
                      SNM
                    </div>
                  </div>
                </div>

                <div>
                  <span
                    className="
                      font-brand-sans text-[12px] font-bold uppercase
                      tracking-[0.22em] text-[var(--brand-gold-700)]
                    "
                  >
                    Journal
                  </span>

                  <h2
                    className="
                      mt-3 pr-2
                      font-brand-display text-[40px]
                      font-medium leading-[0.98]
                      tracking-[-0.035em] text-[var(--brand-navy)]
                    "
                  >
                    Stories, Craft & Inspiration
                    <span className="text-[var(--brand-gold)]">.</span>
                  </h2>

                  <p
                    className="
                      mt-4 max-w-[290px]
                      font-brand-sans text-[13px] leading-[1.7]
                      text-[var(--brand-text-muted)]
                    "
                  >
                    Explore insights, design ideas, craftsmanship stories and
                    updates from Sofa N More.
                  </p>
                </div>

                <div className="mt-5">
                  <MobileFeaturedPostCard post={mobilePrimary} />
                </div>

                <div className="mt-4 space-y-3">
                  {mobileList.map((post) => (
                    <MobileListPostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================= CARDS ========================= */

function FeaturedPostCard({ post }: { post: JournalPost }) {
  return (
    <article className="clay-surface-soft rounded-[34px] p-[6px]">
      <div className="clay-inset rounded-[28px] p-4">
        <div className="relative overflow-hidden rounded-[26px]">
          <div className="relative aspect-[1.08/0.74]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="absolute left-4 top-4">
            <div
              className="
                clay-dark inline-flex items-center gap-2 rounded-full
                px-4 py-2
                font-brand-sans text-[13px] font-bold uppercase
                tracking-[0.14em] text-[var(--brand-gold)]
              "
            >
              <Star size={12} fill="currentColor" strokeWidth={1.5} />
              Featured
            </div>
          </div>
        </div>

        <div className="pt-5">
          <MetaRow category={post.category} date={post.date} />

          <h3
            className="
              mt-4 max-w-[420px]
              font-brand-display text-[28px] font-medium
              leading-[1.06] tracking-[-0.02em]
              text-[var(--brand-navy)]
            "
          >
            {post.title}
          </h3>

          <p
            className="
              mt-4 max-w-[460px]
              font-brand-sans text-[14px] leading-[1.72]
              text-[var(--brand-text-muted)]
            "
          >
            {post.excerpt}
          </p>

          <PostLink href={`/blog/${post.id}`} className="mt-6" />
        </div>
      </div>
    </article>
  );
}

function LargePostCard({ post }: { post: JournalPost }) {
  return (
    <article className="clay-surface-soft rounded-[30px] p-[6px]">
      <div className="clay-inset rounded-[24px] p-4">
        <div className="relative overflow-hidden rounded-[22px]">
          <div className="relative aspect-[1.28/0.72]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="pt-4">
          <MetaRow category={post.category} date={post.date} />

          <h3
            className="
              mt-4 font-brand-display text-[22px]
              font-medium leading-[1.1] tracking-[-0.02em]
              text-[var(--brand-navy)]
            "
          >
            {post.title}
          </h3>

          <p
            className="
              mt-3 font-brand-sans text-[13px]
              leading-[1.7] text-[var(--brand-text-muted)]
            "
          >
            {post.excerpt}
          </p>

          <PostLink href={`/blog/${post.id}`} className="mt-5" />
        </div>
      </div>
    </article>
  );
}

function StandardPostCard({ post }: { post: JournalPost }) {
  return (
    <article className="clay-surface-soft rounded-[30px] p-[6px]">
      <div className="clay-inset h-full rounded-[24px] p-4">
        <div className="relative overflow-hidden rounded-[20px]">
          <div className="relative aspect-[1/0.72]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="pt-4">
          <MetaRow category={post.category} date={post.date} />

          <h3
            className="
              mt-4
              font-brand-display text-[20px]
              font-medium leading-[1.12] tracking-[-0.02em]
              text-[var(--brand-navy)]
            "
          >
            {post.title}
          </h3>

          <p
            className="
              mt-3 font-brand-sans text-[13px]
              leading-[1.68] text-[var(--brand-text-muted)]
            "
          >
            {post.excerpt}
          </p>

          <PostLink href={`/blog/${post.id}`} className="mt-5" />
        </div>
      </div>
    </article>
  );
}

function TabletFeaturedPostCard({ post }: { post: JournalPost }) {
  return (
    <article className="clay-surface-soft row-span-2 rounded-[28px] p-[6px]">
      <div className="clay-inset h-full rounded-[22px] p-4">
        <div className="relative overflow-hidden rounded-[20px]">
          <div className="relative aspect-[1/0.82]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="absolute left-3 top-3">
            <div
              className="
                clay-dark inline-flex items-center gap-2 rounded-full
                px-3 py-1.5
                font-brand-sans text-[12px] font-bold uppercase
                tracking-[0.12em] text-[var(--brand-gold)]
              "
            >
              <Star size={10} fill="currentColor" strokeWidth={1.5} />
              Featured
            </div>
          </div>
        </div>

        <div className="pt-4">
          <MetaRow category={post.category} date={post.date} />

          <h3
            className="
              mt-4
              font-brand-display text-[26px]
              font-medium leading-[1.06] tracking-[-0.02em]
              text-[var(--brand-navy)]
            "
          >
            {post.title}
          </h3>

          <p
            className="
              mt-3 font-brand-sans text-[14px]
              leading-[1.7] text-[var(--brand-text-muted)]
            "
          >
            {post.excerpt}
          </p>

          <PostLink href={`/blog/${post.id}`} className="mt-5" />
        </div>
      </div>
    </article>
  );
}

function CompactPostCard({ post }: { post: JournalPost }) {
  return (
    <article className="clay-surface-soft rounded-[24px] p-[5px]">
      <div className="clay-inset rounded-[18px] p-3.5">
        <div className="relative overflow-hidden rounded-[16px]">
          <div className="relative aspect-[1/0.66]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="pt-3">
          <MetaRow category={post.category} date={post.date} small />

          <h3
            className="
              mt-3 font-brand-display text-[18px]
              font-medium leading-[1.12]
              tracking-[-0.02em] text-[var(--brand-navy)]
            "
          >
            {post.title}
          </h3>

          <p
            className="
              mt-2 font-brand-sans text-[12px]
              leading-[1.65] text-[var(--brand-text-muted)]
            "
          >
            {post.excerpt}
          </p>

          <PostLink href={`/blog/${post.id}`} className="mt-4" small />
        </div>
      </div>
    </article>
  );
}

function MobileFeaturedPostCard({ post }: { post: JournalPost }) {
  return (
    <article className="clay-surface-soft rounded-[24px] p-[5px]">
      <div className="clay-inset rounded-[20px] p-3">
        <div className="relative overflow-hidden rounded-[18px]">
          <div className="relative aspect-[1/0.82]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="absolute left-3 top-3">
            <div
              className="
                clay-dark inline-flex items-center gap-1.5 rounded-full
                px-3 py-1.5
                font-brand-sans text-[11px] font-bold uppercase
                tracking-[0.14em] text-[var(--brand-gold)]
              "
            >
              <Star size={9} fill="currentColor" strokeWidth={1.5} />
              Featured
            </div>
          </div>
        </div>

        <div className="pt-3.5">
          <MetaRow category={post.category} date={post.date} small />

          <h3
            className="
              mt-3 pr-2
              font-brand-display text-[23px]
              font-medium leading-[1.08]
              tracking-[-0.02em] text-[var(--brand-navy)]
            "
          >
            {post.title}
          </h3>

          <p
            className="
              mt-3
              font-brand-sans text-[12px]
              leading-[1.68] text-[var(--brand-text-muted)]
            "
          >
            {post.excerpt}
          </p>

          <PostLink href={`/blog/${post.id}`} className="mt-4" small />
        </div>
      </div>
    </article>
  );
}

function MobileListPostCard({ post }: { post: JournalPost }) {
  return (
    <article className="clay-surface-soft rounded-[20px] p-[5px]">
      <div className="clay-inset flex items-center gap-3 rounded-[16px] p-2.5">
        <div className="relative h-[82px] w-[92px] shrink-0 overflow-hidden rounded-[14px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="min-w-0 flex-1">
          <MetaRow category={post.category} date={post.date} tiny />

          <h3
            className="
              mt-2 line-clamp-2
              font-brand-display text-[17px]
              font-medium leading-[1.08]
              tracking-[-0.02em] text-[var(--brand-navy)]
            "
          >
            {post.title}
          </h3>

          <Link
            href={`/blog/${post.id}`}
            className="
              mt-3 inline-flex items-center gap-2
              font-brand-sans text-[13px] font-bold uppercase
              tracking-[0.12em] text-[var(--brand-navy)]
            "
          >
            Read Article
            <ArrowRight size={12} className="text-[var(--brand-gold-700)]" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ========================= SHARED ========================= */

function MetaRow({
  category,
  date,
  small = false,
  tiny = false,
}: {
  category: string;
  date: string;
  small?: boolean;
  tiny?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span
        className={`
          inline-flex items-center rounded-full border
          border-[var(--brand-gold)]/45
          bg-[rgba(255,255,255,0.45)]
          font-brand-sans font-bold uppercase tracking-[0.12em]
          text-[var(--brand-gold-700)]
          ${tiny ? "px-2 py-1 text-[13px]" : small ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-[12px]"}
        `}
      >
        {category}
      </span>

      <span
        className={`
          shrink-0 font-brand-sans uppercase tracking-[0.1em]
          text-[var(--brand-text-muted)]
          ${tiny ? "text-[13px]" : small ? "text-[11px]" : "text-[12px]"}
        `}
      >
        {date}
      </span>
    </div>
  );
}

function PostLink({
  href,
  className = "",
  small = false,
}: {
  href: string;
  className?: string;
  small?: boolean;
}) {
  return (
    <ClayButton
      href={href}
      ariaLabel="Read article"
      showArrow
      variant="navy"
      target="_blank"
      size="sm"
      type="button"
      className={`
        inline-flex items-center gap-2
        font-brand-sans font-bold uppercase tracking-[0.12em]
        text-[var(--brand-navy)]
        ${small ? "text-[13px]" : "text-[11px]"}
        ${className}
      `}
    >
      Read Article
    </ClayButton>
  );
}

/* ========================= DECORATIONS ========================= */

function JournalDecorations() {
  return (
    <>
      {/* left architecture */}
      <div
        aria-hidden
        className="
          absolute left-0 top-12  hidden h-[420px] w-[180px]
          overflow-hidden xl:block
        "
      >
        <div className="absolute left-[-120px] top-0 h-[380px] w-[320px] rounded-[180px] border-[14px] border-white/35" />
        <div className="absolute left-[-82px] top-[34px] h-[310px] w-[250px] rounded-[160px] border-[10px] border-[#EFE7DA]" />
        <div className="absolute left-[-44px] top-[64px] h-[250px] w-[190px] rounded-[140px] border-[7px] border-[#E6DAC7]" />
      </div>

      {/* bottom left sphere */}
      <div
        aria-hidden
        className="
          absolute top-12 right-8 hidden xl:block z-99
          h-[170px] w-[170px] rounded-full
          bg-[radial-gradient(circle_at_35%_30%,#FFFDF8_0%,#F3ECE1_62%,#E4D9C9_100%)]
          shadow-[inset_10px_10px_20px_rgba(255,255,255,0.85),inset_-10px_-14px_24px_rgba(201,185,161,0.34),0_26px_40px_rgba(98,82,56,0.14)]
        "
      />

      {/* right gold ring */}
      <div
        aria-hidden
        className="
          absolute bottom-[130px] right-8 hidden xl:block
          h-[180px] w-[180px] rounded-full border-[4px]
          border-[var(--brand-gold)]/75
        "
      />

      {/* right pedestal */}
      <div
        aria-hidden
        className="
          absolute bottom-8 right-6 hidden xl:block
          h-[140px] w-[74px] rounded-t-[40px]
          bg-[linear-gradient(180deg,#F4ECE0_0%,#E8DCC9_100%)]
          shadow-[inset_0_6px_10px_rgba(255,255,255,0.75),inset_0_-10px_20px_rgba(197,178,150,0.28)]
        "
      />

      {/* gold sphere */}
      <div
        aria-hidden
        className="
          absolute bottom-[86px] right-[86px] hidden xl:block
          h-[42px] w-[42px] rounded-full
          bg-[radial-gradient(circle_at_30%_30%,#FFE8B8_0%,#D7A04A_50%,#A46C20_100%)]
          shadow-[0_12px_24px_rgba(215,160,74,0.32)]
        "
      />
    </>
  );
}
