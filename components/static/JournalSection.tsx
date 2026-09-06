import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

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

// Keep empty until posts come from your database / CMS.
export const journalPosts: JournalPost[] = [];

type JournalSectionProps = {
  posts?: JournalPost[];
};

export default function JournalSection({
  posts = journalPosts,
}: JournalSectionProps) {
  return (
    <section className="mt-16 bg-[var(--brand-ivory)] px-4 py-10 sm:px-5 sm:py-14 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-[1380px]">
        <div
          className="
            rounded-[34px]
            border border-white/70
            bg-[rgba(255,253,248,0.7)]
            p-5
            shadow-[18px_18px_42px_rgba(92,74,47,0.10),-14px_-14px_36px_rgba(255,255,255,0.92),inset_1px_1px_0_rgba(255,255,255,0.85)]
            sm:rounded-[42px] sm:p-8
            lg:p-10
          "
        >
          <JournalHeader />

          {posts.length === 0 ? (
            <JournalEmptyState />
          ) : (
            <JournalGrid posts={posts} />
          )}
        </div>
      </div>
    </section>
  );
}

function JournalHeader() {
  return (
    <div className="flex flex-col gap-5 border-b border-[var(--brand-navy)]/8 pb-7 sm:pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
      <div>
        <span className="font-brand-sans text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-gold-700)]">
          Journal
        </span>

        <h2 className="mt-3 max-w-[720px] font-brand-display text-[38px] font-medium leading-[1] tracking-[-0.035em] text-[var(--brand-navy)] sm:text-[48px] lg:text-[58px]">
          Stories, craft & inspiration
          <span className="text-[var(--brand-gold)]">.</span>
        </h2>
      </div>

      <p className="max-w-[390px] font-brand-sans text-[13px] leading-[1.75] text-[var(--brand-text-muted)] sm:text-[14px]">
        Ideas, materials and stories from the Sofa N More workshop and the
        spaces we create.
      </p>
    </div>
  );
}

function JournalEmptyState() {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto flex max-w-[580px] flex-col items-center text-center">
        <div
          className="
            flex h-16 w-16 items-center justify-center rounded-[22px]
            bg-[var(--brand-ivory)]
            shadow-[8px_8px_18px_rgba(122,101,68,0.13),-8px_-8px_18px_rgba(255,255,255,0.92),inset_1px_1px_0_rgba(255,255,255,0.75)]
          "
        >
          <BookOpen
            size={25}
            strokeWidth={1.45}
            className="text-[var(--brand-navy)]"
          />
        </div>

        <span className="mt-6 font-brand-sans text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--brand-gold-700)]">
          Coming soon
        </span>

        <h3 className="mt-3 font-brand-display text-[30px] font-medium leading-[1.06] tracking-[-0.025em] text-[var(--brand-navy)] sm:text-[38px]">
          Our journal is taking shape.
        </h3>

        <p className="mt-4 max-w-[460px] font-brand-sans text-[13px] leading-[1.75] text-[var(--brand-text-muted)] sm:text-[14px]">
          We&apos;ll soon share design notes, craftsmanship stories and
          practical inspiration from our London workshop.
        </p>
      </div>
    </div>
  );
}

function JournalGrid({ posts }: { posts: JournalPost[] }) {
  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const remainingPosts = posts
    .filter((post) => post.id !== featuredPost.id)
    .slice(0, 4);

  return (
    <div className="mt-7 sm:mt-8">
      <FeaturedPost post={featuredPost} />

      {remainingPosts.length > 0 && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {remainingPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

function FeaturedPost({ post }: { post: JournalPost }) {
  return (
    <article
      className="
        grid overflow-hidden rounded-[28px]
        bg-[var(--brand-ivory)]
        shadow-[9px_9px_22px_rgba(112,90,57,0.11),-9px_-9px_22px_rgba(255,255,255,0.86)]
        lg:grid-cols-[1.15fr_0.85fr]
      "
    >
      <Link
        href={`/blog/${post.id}`}
        aria-label={`Read ${post.title}`}
        className="relative block min-h-[280px] overflow-hidden sm:min-h-[360px] lg:min-h-[430px]"
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover transition-transform duration-700 hover:scale-[1.02]"
        />
      </Link>

      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <PostMeta post={post} />

        <h3 className="mt-4 font-brand-display text-[28px] font-medium leading-[1.05] tracking-[-0.025em] text-[var(--brand-navy)] sm:text-[34px] lg:text-[40px]">
          {post.title}
        </h3>

        <p className="mt-4 font-brand-sans text-[13px] leading-[1.75] text-[var(--brand-text-muted)] sm:text-[14px]">
          {post.excerpt}
        </p>

        <ReadLink id={post.id} />
      </div>
    </article>
  );
}

function PostCard({ post }: { post: JournalPost }) {
  return (
    <article
      className="
        overflow-hidden rounded-[24px]
        bg-[var(--brand-ivory)]
        shadow-[7px_7px_18px_rgba(112,90,57,0.10),-7px_-7px_18px_rgba(255,255,255,0.82)]
      "
    >
      <Link
        href={`/blog/${post.id}`}
        aria-label={`Read ${post.title}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 hover:scale-[1.025]"
        />
      </Link>

      <div className="p-5">
        <PostMeta post={post} />

        <h3 className="mt-3 line-clamp-2 font-brand-display text-[21px] font-medium leading-[1.08] tracking-[-0.02em] text-[var(--brand-navy)]">
          {post.title}
        </h3>

        <ReadLink id={post.id} compact />
      </div>
    </article>
  );
}

function PostMeta({ post }: { post: JournalPost }) {
  return (
    <div className="flex items-center gap-2 font-brand-sans text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-muted)]">
      <span className="text-[var(--brand-gold-700)]">{post.category}</span>
      <span className="h-1 w-1 rounded-full bg-[var(--brand-gold)]/60" />
      <time dateTime={post.datePublished}>{post.date}</time>
    </div>
  );
}

function ReadLink({ id, compact = false }: { id: number; compact?: boolean }) {
  return (
    <Link
      href={`/blog/${id}`}
      className={`inline-flex items-center gap-2 font-brand-sans font-bold uppercase tracking-[0.14em] text-[var(--brand-navy)] transition-opacity hover:opacity-65 ${
        compact ? "mt-4 text-[10px]" : "mt-6 text-[11px]"
      }`}
    >
      Read article
      <ArrowUpRight
        size={compact ? 13 : 14}
        strokeWidth={1.7}
        className="text-[var(--brand-gold-700)]"
      />
    </Link>
  );
}
