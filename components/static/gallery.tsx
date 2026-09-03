"use client";

import Image from "next/image";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

import { createPortal } from "react-dom";

import { useCallback, useEffect, useRef, useState } from "react";

import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";

/* =========================================================
   TYPES
========================================================= */

type GalleryItem = {
  id: number;
  code: number;
  image: string;
  alt: string;
};

/* =========================================================
   DATA

   These filenames are based on the files visible
   in the supplied screenshot.

   Missing from screenshot:
   16.webp
========================================================= */

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    code: 1000,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/1.webp",
    alt: "Sofa N More completed project 100",
  },
  {
    id: 2,
    code: 1001,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/2.webp",
    alt: "Sofa N More completed project 101",
  },
  {
    id: 3,
    code: 1002,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/3.webp",
    alt: "Sofa N More completed project 102",
  },
  {
    id: 4,
    code: 1003,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/4.webp",
    alt: "Sofa N More completed project 103",
  },
  {
    id: 5,
    code: 1004,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/5.webp",
    alt: "Sofa N More completed project 104",
  },
  {
    id: 6,
    code: 1005,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/6.webp",
    alt: "Sofa N More completed project 105",
  },
  {
    id: 7,
    code: 1006,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/7.webp",
    alt: "Sofa N More completed project 106",
  },
  {
    id: 8,
    code: 1007,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/8.webp",
    alt: "Sofa N More completed project 107",
  },
  {
    id: 9,
    code: 1008,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/9.webp",
    alt: "Sofa N More completed project 108",
  },
  {
    id: 10,
    code: 1009,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/10.webp",
    alt: "Sofa N More completed project 109",
  },
  {
    id: 11,
    code: 1010,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/11.webp",
    alt: "Sofa N More completed project 110",
  },
  {
    id: 12,
    code: 1011,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/12.webp",
    alt: "Sofa N More completed project 111",
  },
  {
    id: 13,
    code: 1012,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/13.webp",
    alt: "Sofa N More completed project 112",
  },
  {
    id: 14,
    code: 1013,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/14.webp",
    alt: "Sofa N More completed project 113",
  },
  {
    id: 15,
    code: 1014,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/15.webp",
    alt: "Sofa N More completed project 114",
  },

  // 16.webp intentionally omitted

  {
    id: 17,
    code: 1015,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/17.webp",
    alt: "Sofa N More completed project 115",
  },
  {
    id: 18,
    code: 1016,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/18.webp",
    alt: "Sofa N More completed project 116",
  },
  {
    id: 19,
    code: 1017,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/19.webp",
    alt: "Sofa N More completed project 117",
  },
  {
    id: 20,
    code: 1018,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/20.webp",
    alt: "Sofa N More completed project 118",
  },
  {
    id: 21,
    code: 1019,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/21.webp",
    alt: "Sofa N More completed project 119",
  },
  {
    id: 22,
    code: 1020,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/22.webp",
    alt: "Sofa N More completed project 120",
  },
  {
    id: 23,
    code: 1021,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/23.webp",
    alt: "Sofa N More completed project 121",
  },
  {
    id: 24,
    code: 122,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/24.webp",
    alt: "Sofa N More completed project 122",
  },
  {
    id: 25,
    code: 1023,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/25.webp",
    alt: "Sofa N More completed project 123",
  },
  {
    id: 26,
    code: 1024,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/26.webp",
    alt: "Sofa N More completed project 124",
  },
  {
    id: 27,
    code: 1025,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/27.webp",
    alt: "Sofa N More completed project 125",
  },
  {
    id: 28,
    code: 1026,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/28.webp",
    alt: "Sofa N More completed project 126",
  },
  {
    id: 29,
    code: 1027,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/29.webp",
    alt: "Sofa N More completed project 127",
  },
  {
    id: 30,
    code: 1028,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/30.webp",
    alt: "Sofa N More completed project 128",
  },
  {
    id: 31,
    code: 1029,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/31.webp",
    alt: "Sofa N More completed project 129",
  },
  {
    id: 32,
    code: 1030,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/32.webp",
    alt: "Sofa N More completed project 130",
  },
  {
    id: 33,
    code: 1031,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/33.webp",
    alt: "Sofa N More completed project 131",
  },
  {
    id: 34,
    code: 1032,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/34.webp",
    alt: "Sofa N More completed project 132",
  },
  {
    id: 35,
    code: 1033,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/35.webp",
    alt: "Sofa N More completed project 133",
  },
  {
    id: 36,
    code: 1034,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/36.webp",
    alt: "Sofa N More completed project 134",
  },
  {
    id: 37,
    code: 1035,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/37.webp",
    alt: "Sofa N More completed project 135",
  },
  {
    id: 38,
    code: 1036,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/38.webp",
    alt: "Sofa N More completed project 136",
  },
  {
    id: 39,
    code: 1037,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/39.webp",
    alt: "Sofa N More completed project 137",
  },
  {
    id: 40,
    code: 1038,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/40.webp",
    alt: "Sofa N More completed project 138",
  },
  {
    id: 41,
    code: 1039,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/41.webp",
    alt: "Sofa N More completed project 139",
  },
  {
    id: 42,
    code: 1040,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/42.webp",
    alt: "Sofa N More completed project 140",
  },
  {
    id: 43,
    code: 1041,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/43.webp",
    alt: "Sofa N More completed project 141",
  },
  {
    id: 44,
    code: 1042,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/44.webp",
    alt: "Sofa N More completed project 142",
  },
  {
    id: 45,
    code: 1043,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/45.webp",
    alt: "Sofa N More completed project 143",
  },
  {
    id: 46,
    code: 1044,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/46.webp",
    alt: "Sofa N More completed project 144",
  },
  {
    id: 47,
    code: 1045,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/47.webp",
    alt: "Sofa N More completed project 145",
  },
  {
    id: 48,
    code: 1046,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/48.webp",
    alt: "Sofa N More completed project 146",
  },
  {
    id: 49,
    code: 1047,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/49.webp",
    alt: "Sofa N More completed project 147",
  },
  {
    id: 50,
    code: 1048,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/50.webp",
    alt: "Sofa N More completed project 148",
  },
  {
    id: 51,
    code: 1049,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/51.webp",
    alt: "Sofa N More completed project 149",
  },
  {
    id: 52,
    code: 1050,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/52.webp",
    alt: "Sofa N More completed project 150",
  },
  {
    id: 53,
    code: 1051,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/53.webp",
    alt: "Sofa N More completed project 151",
  },
  {
    id: 54,
    code: 1052,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/54.webp",
    alt: "Sofa N More completed project 152",
  },
  {
    id: 55,
    code: 1053,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/55.webp",
    alt: "Sofa N More completed project 153",
  },
  {
    id: 56,
    code: 1054,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/56.webp",
    alt: "Sofa N More completed project 154",
  },
  {
    id: 57,
    code: 1055,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/57.webp",
    alt: "Sofa N More completed project 155",
  },
  {
    id: 58,
    code: 1056,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/58.webp",
    alt: "Sofa N More completed project 156",
  },
  {
    id: 59,
    code: 1057,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/59.webp",
    alt: "Sofa N More completed project 157",
  },
  {
    id: 60,
    code: 1058,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/60.webp",
    alt: "Sofa N More completed project 158",
  },
  {
    id: 61,
    code: 1059,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/61.webp",
    alt: "Sofa N More completed project 159",
  },
  {
    id: 62,
    code: 1060,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/62.webp",
    alt: "Sofa N More completed project 160",
  },
  {
    id: 63,
    code: 1061,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/63.webp",
    alt: "Sofa N More completed project 161",
  },
  {
    id: 64,
    code: 1062,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/64.webp",
    alt: "Sofa N More completed project 162",
  },
  {
    id: 65,
    code: 1063,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/65.webp",
    alt: "Sofa N More completed project 163",
  },
  {
    id: 66,
    code: 1064,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/66.webp",
    alt: "Sofa N More completed project 164",
  },
  {
    id: 67,
    code: 1065,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/67.webp",
    alt: "Sofa N More completed project 165",
  },
  {
    id: 68,
    code: 1066,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/68.webp",
    alt: "Sofa N More completed project 166",
  },
  {
    id: 69,
    code: 1067,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/69.webp",
    alt: "Sofa N More completed project 167",
  },
  {
    id: 70,
    code: 1068,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/70.webp",
    alt: "Sofa N More completed project 168",
  },
  {
    id: 71,
    code: 1069,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/71.webp",
    alt: "Sofa N More completed project 169",
  },
  {
    id: 72,
    code: 1070,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/72.webp",
    alt: "Sofa N More completed project 170",
  },
  {
    id: 73,
    code: 1071,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/73.webp",
    alt: "Sofa N More completed project 171",
  },
  {
    id: 74,
    code: 1072,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/74.webp",
    alt: "Sofa N More completed project 172",
  },
  {
    id: 75,
    code: 1073,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/75.webp",
    alt: "Sofa N More completed project 173",
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /* =======================================================
     OPEN
  ======================================================= */

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  /* =======================================================
     CLOSE
  ======================================================= */

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  /* =======================================================
     NEXT
  ======================================================= */

  const nextImage = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) {
        return null;
      }

      return (current + 1) % galleryItems.length;
    });
  }, []);

  /* =======================================================
     PREVIOUS
  ======================================================= */

  const previousImage = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) {
        return null;
      }

      return (current - 1 + galleryItems.length) % galleryItems.length;
    });
  }, []);

  /* =======================================================
     KEYBOARD + BODY LOCK
  ======================================================= */

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
        return;
      }

      if (event.key === "ArrowRight") {
        nextImage();
        return;
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }
    }

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, nextImage, previousImage]);

  return (
    <>
      <section
        id="gallery"
        aria-labelledby="gallery-heading"
        className="
          bg-[var(--brand-ivory)]

          px-3
          py-10

          sm:px-5
          sm:py-12

          lg:px-8
          lg:py-14
        "
      >
        <div
          className="
            mx-auto
            max-w-[var(--site-width)]
          "
        >
          {/* =================================================
              LIGHT CLAY SHELL

              Only one outer shadow.
          ================================================== */}

          <div
            className="
              rounded-[28px]

              border
              border-white/75

              bg-[#EEE6DA]

              p-4

              shadow-[0_10px_26px_rgba(70,50,30,0.07),inset_1px_1px_2px_rgba(255,255,255,0.82)]

              sm:rounded-[32px]
              sm:p-5

              lg:rounded-[36px]
              lg:p-6
            "
          >
            <GalleryHeader />

            <GalleryGrid items={galleryItems} onOpen={openLightbox} />
          </div>
        </div>
      </section>

      {lightboxIndex !== null && galleryItems[lightboxIndex] && (
        <GalleryLightbox
          items={galleryItems}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrevious={previousImage}
        />
      )}
    </>
  );
}

/* =========================================================
   HEADER
========================================================= */

function GalleryHeader() {
  return (
    <header
      className="
        grid

        gap-4

        border-b
        border-[var(--brand-navy)]/[0.07]

        pb-5

        lg:grid-cols-[1fr_430px]
        lg:items-end
        lg:gap-10
        lg:pb-6
      "
    >
      <div>
        {/* EYEBROW */}

        <div
          className="
            flex
            items-center

            gap-2.5
          "
        >
          <span
            aria-hidden
            className="
              h-px
              w-7

              bg-[var(--brand-gold)]
            "
          />

          <p
            className="
              font-brand-sans

              text-[8px]
              font-bold
              uppercase

              tracking-[0.2em]

              text-[var(--brand-gold-700)]

              sm:text-[9px]
            "
          >
            Our Work
          </p>
        </div>

        {/* TITLE */}

        <h2
          id="gallery-heading"
          className="
            mt-3

            max-w-[620px]

            font-brand-display

            text-[34px]
            font-medium
            leading-[0.98]

            tracking-[-0.04em]

            text-[var(--brand-navy)]

            sm:text-[41px]

            lg:text-[47px]
          "
        >
          Crafted Spaces.
          <br />
          Made to Inspire
          <span
            className="
              text-[var(--brand-gold)]
            "
          >
            .
          </span>
        </h2>
      </div>

      <div
        className="
          lg:text-right
        "
      >
        <p
          className="
            font-brand-sans

            text-[10px]
            font-medium
            leading-[1.75]

            text-[var(--brand-text-muted)]

            sm:text-[11px]
          "
        >
          Explore a selection of real Sofa N More work. Select any image to see
          the complete detail in full screen.
        </p>

        <p
          className="
            mt-2

            font-brand-sans

            text-[7px]
            font-bold
            uppercase

            tracking-[0.13em]

            text-[var(--brand-gold-700)]
          "
        >
          {galleryItems.length} project images
        </p>
      </div>
    </header>
  );
}

/* =========================================================
   GRID
========================================================= */

function GalleryGrid({
  items,
  onOpen,
}: {
  items: GalleryItem[];

  onOpen: (index: number) => void;
}) {
  return (
    <div
      className="
        mt-5

        grid
        grid-cols-2

        gap-2.5

        sm:gap-3

        md:grid-cols-3

        lg:mt-6
        lg:grid-cols-4

        xl:grid-cols-5
      "
    >
      {items.map((item, index) => (
        <GalleryTile key={item.id} item={item} index={index} onOpen={onOpen} />
      ))}
    </div>
  );
}

/* =========================================================
   TILE
========================================================= */

function GalleryTile({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;

  index: number;

  onOpen: (index: number) => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Open project image ${item.code}`}
      onClick={() => onOpen(index)}
      className="
        group

        relative

        min-w-0

        rounded-[18px]

        border
        border-white/75

        bg-[#F2E9DD]

        p-[4px]

        text-left

        shadow-[0_5px_13px_rgba(73,51,29,0.055),inset_1px_1px_1px_rgba(255,255,255,0.82)]

        transition-transform
        duration-150

        lg:hover:-translate-y-[1px]

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--brand-gold)]
        focus-visible:ring-offset-2

        [content-visibility:auto]
        [contain-intrinsic-size:240px]

        sm:rounded-[20px]
      "
    >
      {/* =================================================
          IMAGE
      ================================================== */}

      <span
        className="
          relative

          block

          aspect-[4/3]

          overflow-hidden

          rounded-[14px]

          bg-[#DDD3C6]

          sm:rounded-[16px]
        "
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          draggable={false}
          quality={76}
          sizes="(max-width: 639px) 48vw, (max-width: 767px) 32vw, (max-width: 1279px) 24vw, 19vw"
          className="
            object-cover
            object-center
          "
        />

        {/* =================================================
            VERY LIGHT SINGLE OVERLAY
        ================================================== */}

        <span
          aria-hidden
          className="
            absolute
            inset-x-0
            bottom-0

            h-[38%]

            bg-gradient-to-t

            from-[#081725]/60

            to-transparent
          "
        />

        {/* =================================================
            IMAGE CODE
        ================================================== */}

        <span
          className="
            absolute

            bottom-2
            left-2

            inline-flex
            h-7

            items-center
            justify-center

            rounded-[9px]

            border
            border-white/65

            bg-[#F3EADF]

            px-2.5

            font-brand-sans

            text-[7px]
            font-bold
            uppercase

            tracking-[0.1em]

            text-[var(--brand-navy)]

            shadow-[0_3px_8px_rgba(0,0,0,0.10)]
          "
        >
          <span
            className="
              mr-1

              text-[var(--brand-gold-700)]
            "
          >
            #
          </span>

          {item.code}
        </span>

        {/* EXPAND */}

        <span
          aria-hidden
          className="
            absolute

            bottom-2
            right-2

            flex
            h-7
            w-7

            items-center
            justify-center

            rounded-[9px]

            border
            border-white/60

            bg-[#F3EADF]

            text-[var(--brand-navy)]

            shadow-[0_3px_8px_rgba(0,0,0,0.10)]
          "
        >
          <Expand size={11} strokeWidth={1.6} />
        </span>
      </span>

      {/* =================================================
          SMALL CODE FOOTER

          Keeps every card visually aligned.
      ================================================== */}

      <span
        className="
          flex
          h-[32px]

          items-center
          justify-between

          px-2
          pt-1
        "
      >
        <span
          className="
            font-brand-sans

            text-[7px]
            font-bold
            uppercase

            tracking-[0.1em]

            text-[var(--brand-text-muted)]
          "
        >
          Sofa N More
        </span>

        <span
          className="
            font-brand-sans

            text-[7px]
            font-bold

            text-[var(--brand-gold-700)]
          "
        >
          {item.code}
        </span>
      </span>
    </button>
  );
}

/* =========================================================
   LIGHTBOX
========================================================= */

function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}: {
  items: GalleryItem[];

  currentIndex: number;

  onClose: () => void;

  onNext: () => void;

  onPrevious: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);

  const pointerRef = useRef<{
    id: number;
    startX: number;
  } | null>(null);

  const current = items[currentIndex];

  /* =======================================================
     BACKDROP
  ======================================================= */

  function handleBackdropClick(event: ReactMouseEvent<HTMLDivElement>) {
    if (event.target === backdropRef.current) {
      onClose();
    }
  }

  /* =======================================================
     LIGHTBOX SWIPE
  ======================================================= */

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("[data-lightbox-control]")) {
      return;
    }

    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const pointer = pointerRef.current;

    if (!pointer || pointer.id !== event.pointerId) {
      return;
    }

    const delta = event.clientX - pointer.startX;

    pointerRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (delta < -55) {
      onNext();
      return;
    }

    if (delta > 55) {
      onPrevious();
    }
  }

  const lightbox = (
    <div
      ref={backdropRef}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={`Project image ${current.code}`}
      onClick={handleBackdropClick}
      className="
        fixed
        inset-0

        z-[1800]

        flex
        items-center
        justify-center

        bg-[#07111C]/95

        px-3
        py-[72px]

        sm:px-5
      "
    >
      {/* =================================================
          TOP BAR
      ================================================== */}

      <div
        className="
          absolute

          inset-x-4
          top-4

          z-20

          flex
          items-center
          justify-between

          gap-4

          sm:inset-x-6
          sm:top-5
        "
      >
        <div>
          <p
            className="
              font-brand-sans

              text-[7px]
              font-bold
              uppercase

              tracking-[0.16em]

              text-[var(--brand-gold)]
            "
          >
            Sofa N More
          </p>

          <p
            className="
              mt-1

              font-brand-display

              text-[16px]
              font-semibold

              text-white

              sm:text-[19px]
            "
          >
            Project #{current.code}
          </p>
        </div>

        <LightboxControlButton label="Close gallery" onClick={onClose}>
          <X size={17} strokeWidth={1.7} />
        </LightboxControlButton>
      </div>

      {/* =================================================
          IMAGE

          No animation,
          no backdrop blur,
          one small clay frame.
      ================================================== */}

      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerRef.current = null;
        }}
        onClick={(event) => event.stopPropagation()}
        className="
          relative

          h-full
          max-h-[calc(100dvh-150px)]

          w-full
          max-w-[1180px]

          select-none

          touch-pan-y
        "
      >
        <div
          className="
            h-full

            rounded-[22px]

            border
            border-white/35

            bg-[#EEE5D8]

            p-[5px]

            shadow-[0_12px_30px_rgba(0,0,0,0.18)]

            sm:rounded-[26px]
            sm:p-[6px]
          "
        >
          <div
            className="
              relative

              h-full
              w-full

              overflow-hidden

              rounded-[17px]

              bg-[#0B1929]

              sm:rounded-[21px]
            "
          >
            <Image
              key={current.id}
              src={current.image}
              alt={current.alt}
              fill
              draggable={false}
              quality={88}
              sizes="100vw"
              className="
                pointer-events-none

                object-contain
                object-center
              "
            />
          </div>
        </div>
      </div>

      {/* =================================================
          DESKTOP NAV
      ================================================== */}

      <div
        className="
          pointer-events-none

          absolute

          inset-x-5
          top-1/2

          hidden

          -translate-y-1/2

          items-center
          justify-between

          lg:flex
        "
      >
        <LightboxControlButton
          label="Previous image"
          onClick={onPrevious}
          className="
            pointer-events-auto
          "
        >
          <ChevronLeft size={21} strokeWidth={1.5} />
        </LightboxControlButton>

        <LightboxControlButton
          label="Next image"
          onClick={onNext}
          className="
            pointer-events-auto
          "
        >
          <ChevronRight size={21} strokeWidth={1.5} />
        </LightboxControlButton>
      </div>

      {/* =================================================
          MOBILE CONTROLS
      ================================================== */}

      <div
        className="
          absolute

          bottom-4
          left-1/2

          z-20

          flex

          -translate-x-1/2

          items-center

          gap-3

          lg:hidden
        "
      >
        <LightboxControlButton label="Previous image" onClick={onPrevious}>
          <ChevronLeft size={17} strokeWidth={1.6} />
        </LightboxControlButton>

        <GalleryCounter current={currentIndex + 1} total={items.length} />

        <LightboxControlButton label="Next image" onClick={onNext}>
          <ChevronRight size={17} strokeWidth={1.6} />
        </LightboxControlButton>
      </div>

      {/* DESKTOP COUNTER */}

      <div
        className="
          absolute

          bottom-5
          left-1/2

          hidden

          -translate-x-1/2

          lg:block
        "
      >
        <GalleryCounter current={currentIndex + 1} total={items.length} />
      </div>
    </div>
  );

  return createPortal(lightbox, document.body);
}

/* =========================================================
   COUNTER
========================================================= */

function GalleryCounter({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <span
      aria-live="polite"
      className="
        min-w-[70px]

        text-center

        font-brand-sans

        text-[9px]
        font-bold

        tracking-[0.08em]

        text-white/65
      "
    >
      {String(current).padStart(2, "0")}

      <span
        className="
          mx-1.5

          text-white/25
        "
      >
        /
      </span>

      {String(total).padStart(2, "0")}
    </span>
  );
}

/* =========================================================
   LIGHTBOX CONTROL
========================================================= */

function LightboxControlButton({
  label,
  onClick,
  children,
  className = "",
}: {
  label: string;

  onClick: () => void;

  children: ReactNode;

  className?: string;
}) {
  return (
    <button
      data-lightbox-control
      type="button"
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();

        onClick();
      }}
      onPointerDown={(event) => event.stopPropagation()}
      className={`
        flex
        h-10
        w-10

        items-center
        justify-center

        rounded-[13px]

        border
        border-white/60

        bg-[#F1E8DC]

        text-[var(--brand-navy)]

        shadow-[0_4px_10px_rgba(0,0,0,0.12)]

        transition-transform
        duration-100

        active:scale-[0.94]

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--brand-gold)]

        ${className}
      `}
    >
      {children}
    </button>
  );
}
