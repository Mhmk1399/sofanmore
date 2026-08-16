"use client";

import { useEffect, useRef } from "react";

/* =========================================================
   HELPERS
========================================================= */

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function smoothstep(start: number, end: number, value: number) {
  const x = clamp((value - start) / (end - start));

  return x * x * (3 - 2 * x);
}

/* =========================================================
   COMPONENT
========================================================= */

export default function ScrollAssemblyRoom() {
  const sectionRef = useRef<HTMLElement>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    const svg = svgRef.current;

    if (!section || !svg) {
      return;
    }

    const pieces = Array.from(
      svg.querySelectorAll<SVGGElement>("[data-piece]"),
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;

    /* =====================================================
       SET ELEMENT
    ====================================================== */

    function transformPiece(element: SVGGElement, amount: number) {
      const mobile = window.innerWidth < 768;

      const responsiveFactor = mobile ? 0.58 : 1;

      const x = Number(element.dataset.x ?? 0) * responsiveFactor;

      const y = Number(element.dataset.y ?? 0) * responsiveFactor;

      const rotate = Number(element.dataset.rotate ?? 0);

      const scaleFrom = Number(element.dataset.scale ?? 0.92);

      const inverse = 1 - amount;

      const tx = x * inverse;

      const ty = y * inverse;

      const rotation = rotate * inverse;

      const scale = scaleFrom + (1 - scaleFrom) * amount;

      element.style.transformOrigin = "center";

      element.style.transformBox = "fill-box";

      element.style.transform = `
        translate3d(
          ${tx}px,
          ${ty}px,
          0
        )
        rotate(${rotation}deg)
        scale(${scale})
      `;

      element.style.opacity = String(0.22 + amount * 0.78);
    }

    /* =====================================================
       UPDATE
    ====================================================== */

    function update() {
      raf = 0;

      if (reducedMotion) {
        pieces.forEach((piece) => transformPiece(piece, 1));

        return;
      }

      const rect = section.getBoundingClientRect();

      const scrollable = section.offsetHeight - window.innerHeight;

      const progress = clamp(-rect.top / Math.max(scrollable, 1));

      pieces.forEach((piece) => {
        const delay = Number(piece.dataset.delay ?? 0);

        /*
         * ==============================
         * ENTER
         *
         * 0.06 → ~0.42
         * ==============================
         */

        const enter = smoothstep(0.05 + delay, 0.38 + delay, progress);

        /*
         * ==============================
         * EXIT
         *
         * Room remains assembled
         * approximately until 72%.
         * ==============================
         */

        const exit = smoothstep(0.72 + delay * 0.12, 0.96, progress);

        /*
         * Bell-like animation:
         *
         * 0 → 1 → hold → 0
         */

        const assembled = enter * (1 - exit);

        transformPiece(piece, assembled);
      });

      /*
       * Background responds much more
       * subtly than sofa.
       */

      svg.style.setProperty("--scene-progress", progress.toFixed(4));
    }

    function requestUpdate() {
      if (raf) return;

      raf = requestAnimationFrame(update);
    }

    update();

    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });

    window.addEventListener("resize", requestUpdate, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", requestUpdate);

      window.removeEventListener("resize", requestUpdate);

      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="living-composition"
      className="
        relative
        h-[240svh]
        bg-[var(--brand-ivory)]
      "
    >
      {/* ===================================================
          STICKY VIEWPORT
      ==================================================== */}

      <div
        className="
          sticky
          top-0
          flex
          h-[100svh]
          w-full
          items-center
          justify-center
          overflow-hidden
        "
      >
        {/* ===============================================
            COPY
        ================================================ */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[8%]
            z-20
            w-full
            max-w-[760px]
            -translate-x-1/2
            px-5
            text-center
          "
        >
          <span
            className="
              font-brand-sans
              text-[8px]
              font-bold
              uppercase
              tracking-[0.32em]
              text-[var(--brand-gold-700)]

              md:text-[10px]
            "
          >
            Crafted Around You
          </span>

          <h2
            className="
              mt-3
              font-brand-display
              text-[34px]
              font-semibold
              leading-[0.98]
              tracking-[-0.04em]
              text-[var(--brand-navy)]

              sm:text-[42px]

              lg:text-[52px]
            "
          >
            A Room Designed
            <br />
            to Come Together
            <span
              className="
                text-[var(--brand-gold)]
              "
            >
              .
            </span>
          </h2>
        </div>

        {/* ===============================================
            SVG ROOM
        ================================================ */}

        <svg
          ref={svgRef}
          viewBox="0 0 1440 820"
          role="img"
          aria-label="Animated luxury living room assembling as the page scrolls"
          className="
            h-auto
            w-[min(1500px,116vw)]
            max-w-none

            sm:w-[min(1500px,108vw)]

            lg:w-[min(1500px,96vw)]
          "
        >
          <defs>
            {/* =========================
      MAIN MATERIAL GRADIENTS
  ========================== */}

            <linearGradient id="ivoryWall" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fffdf8" />
              <stop offset="35%" stopColor="#f7f2e9" />
              <stop offset="72%" stopColor="#ebe0d0" />
              <stop offset="100%" stopColor="#dac8b2" />
            </linearGradient>

            <linearGradient id="ivorySoft" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fffefb" />
              <stop offset="100%" stopColor="#e8dcc9" />
            </linearGradient>

            <linearGradient id="navyVelvet" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2f5377" />
              <stop offset="22%" stopColor="#1a3552" />
              <stop offset="58%" stopColor="#12253E" />
              <stop offset="100%" stopColor="#081523" />
            </linearGradient>

            <radialGradient id="navyVelvetHighlight" cx="35%" cy="25%" r="80%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
              <stop offset="35%" stopColor="rgba(255,255,255,0.09)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            <linearGradient id="goldMetal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f7dda1" />
              <stop offset="18%" stopColor="#e5be70" />
              <stop offset="52%" stopColor="#c58a32" />
              <stop offset="82%" stopColor="#a96a1f" />
              <stop offset="100%" stopColor="#f0d08b" />
            </linearGradient>

            <linearGradient id="glassWarm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,250,236,0.95)" />
              <stop offset="100%" stopColor="rgba(233,209,159,0.75)" />
            </linearGradient>

            <linearGradient id="rugTone" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5eee5" />
              <stop offset="60%" stopColor="#e7dac9" />
              <stop offset="100%" stopColor="#d9c6ae" />
            </linearGradient>

            {/* =========================
      NOISE / TEXTURE
  ========================== */}

            <filter
              id="fabricTexture"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="2"
                seed="7"
                result="noise"
              />
              <feColorMatrix
                in="noise"
                type="saturate"
                values="0"
                result="monoNoise"
              />
              <feComponentTransfer in="monoNoise" result="noiseSoft">
                <feFuncA type="table" tableValues="0 0.06" />
              </feComponentTransfer>
              <feBlend in="SourceGraphic" in2="noiseSoft" mode="soft-light" />
            </filter>

            <filter
              id="wallTexture"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.55"
                numOctaves="2"
                seed="12"
                result="wallNoise"
              />
              <feColorMatrix
                in="wallNoise"
                type="saturate"
                values="0"
                result="wallMono"
              />
              <feComponentTransfer in="wallMono" result="wallNoiseSoft">
                <feFuncA type="table" tableValues="0 0.04" />
              </feComponentTransfer>
              <feBlend
                in="SourceGraphic"
                in2="wallNoiseSoft"
                mode="soft-light"
              />
            </filter>

            {/* =========================
      SHADOWS
  ========================== */}

            <filter
              id="sceneShadow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="0"
                dy="18"
                stdDeviation="18"
                floodColor="#5c4b34"
                floodOpacity="0.22"
              />
            </filter>

            <filter
              id="heavyShadow"
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
            >
              <feDropShadow
                dx="0"
                dy="24"
                stdDeviation="22"
                floodColor="#07131f"
                floodOpacity="0.34"
              />
            </filter>

            <filter
              id="smallSoftShadow"
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
            >
              <feDropShadow
                dx="0"
                dy="8"
                stdDeviation="8"
                floodColor="#4d4030"
                floodOpacity="0.18"
              />
            </filter>

            <filter id="innerGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur
                in="SourceAlpha"
                stdDeviation="10"
                result="blur"
              />
              <feOffset dx="0" dy="0" result="offset" />
              <feFlood
                floodColor="#fff8ea"
                floodOpacity="0.65"
                result="color"
              />
              <feComposite
                in="color"
                in2="offset"
                operator="in"
                result="glow"
              />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* =========================
      SOFT BLUR FOR BACKGROUND DEPTH
  ========================== */}

            <filter id="depthBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.8" />
            </filter>
          </defs>

          {/* =================================================
              ROOM / STATIC ARCHITECTURE
          ================================================== */}

          {/* ROOM SHELL */}
          <rect
            x="40"
            y="70"
            width="1360"
            height="690"
            rx="82"
            fill="url(#ivoryWall)"
            filter="url(#sceneShadow)"
          />

          <rect
            x="76"
            y="104"
            width="1288"
            height="620"
            rx="65"
            fill="#f4ebe0"
            stroke="#fffdf8"
            strokeWidth="8"
            filter="url(#wallTexture)"
          />

          {/* subtle top highlight */}
          <rect
            x="82"
            y="110"
            width="1276"
            height="100"
            rx="58"
            fill="rgba(255,255,255,0.25)"
          />

          {/* central recessed wall */}
          <path
            d="
    M460 590
    V375
    C460 180
    980 180
    980 375
    V590
    Z
  "
            fill="#ece0cf"
            stroke="#fffdf8"
            strokeWidth="24"
            filter="url(#sceneShadow)"
          />

          <path
            d="
    M515 585
    V390
    C515 245
    925 245
    925 390
    V585
    Z
  "
            fill="url(#glassWarm)"
            filter="url(#innerGlow)"
          />

          {/* window depth */}
          <rect
            x="560"
            y="280"
            width="320"
            height="270"
            rx="10"
            fill="rgba(255,255,255,0.08)"
          />

          <g opacity="0.18" stroke="#b99964" strokeWidth="3">
            <line x1="720" y1="265" x2="720" y2="575" />
            <line x1="525" y1="430" x2="915" y2="430" />
          </g>

          {/* distant side panels */}
          <g filter="url(#depthBlur)" opacity="0.55">
            <rect
              x="110"
              y="160"
              width="255"
              height="360"
              rx="32"
              fill="none"
              stroke="#d7cbb8"
              strokeWidth="4"
            />
            <rect
              x="1075"
              y="160"
              width="255"
              height="360"
              rx="32"
              fill="none"
              stroke="#d7cbb8"
              strokeWidth="4"
            />
          </g>
          {/* =================================================
              ARTWORK
          ================================================== */}

          <g
            data-piece
            data-x="0"
            data-y="-180"
            data-rotate="-7"
            data-scale="0.88"
            data-delay="0.05"
          >
            <rect
              x="655"
              y="172"
              width="130"
              height="95"
              rx="13"
              fill="url(#ivory-surface)"
              filter="url(#small-shadow)"
            />

            <rect
              x="670"
              y="187"
              width="100"
              height="65"
              rx="5"
              fill="#cabca9"
            />

            <path
              d="
                M670 236
                C700 210 720 245 745 210
                C755 198 766 202 770 200
                V252
                H670
                Z
              "
              fill="#12253e"
              opacity="0.7"
            />

            <circle cx="698" cy="207" r="9" fill="#d7a04a" />
          </g>

          {/* =================================================
              RUG
          ================================================== */}

          <g
            data-piece
            data-x="0"
            data-y="240"
            data-rotate="0"
            data-scale="0.6"
            data-delay="0"
          >
            <ellipse
              cx="720"
              cy="655"
              rx="390"
              ry="82"
              fill="#e6d9c7"
              filter="url(#small-shadow)"
            />

            <ellipse cx="720" cy="647" rx="350" ry="62" fill="#f5eee4" />
          </g>

          {/* =================================================
              LEFT CHAIR
          ================================================== */}

          {/* LEFT CHAIR */}
          <g
            data-piece
            data-x="-410"
            data-y="65"
            data-rotate="-12"
            data-scale="0.84"
            data-delay="0.04"
            filter="url(#sceneShadow)"
          >
            {/* gold base */}
            <ellipse cx="340" cy="624" rx="74" ry="16" fill="url(#goldMetal)" />

            {/* body */}
            <path
              d="
      M280 535
      C275 474 300 435 348 430
      C397 435 423 472 415 536
      L398 599
      C385 622 308 621 293 598
      Z
    "
              fill="url(#ivorySoft)"
              filter="url(#fabricTexture)"
            />

            {/* seat shadow */}
            <path
              d="
      M296 523
      C300 472 321 455 348 454
      C377 454 398 474 400 524
      C382 510 365 503 348 503
      C330 503 313 510 296 523
      Z
    "
              fill="#e8ddce"
            />

            {/* inner navy pillow */}
            <rect
              x="323"
              y="492"
              width="51"
              height="56"
              rx="15"
              fill="url(#navyVelvet)"
            />

            {/* highlight */}
            <path
              d="
      M302 505
      C316 466 336 452 352 450
    "
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="3"
              fill="none"
            />
          </g>

          {/* =================================================
              FLOOR LAMP
          ================================================== */}

          <g
            data-piece
            data-x="-360"
            data-y="-80"
            data-rotate="-8"
            data-scale="0.9"
            data-delay="0.11"
          >
            <line
              x1="240"
              y1="376"
              x2="240"
              y2="620"
              stroke="#b47a27"
              strokeWidth="8"
              strokeLinecap="round"
            />

            <ellipse
              cx="240"
              cy="624"
              rx="42"
              ry="10"
              fill="url(#gold-surface)"
            />

            <path
              d="
                M190 390
                C200 345 280 345 290 390
                Z
              "
              fill="#f8efe1"
              filter="url(#small-shadow)"
            />
          </g>

          {/* =================================================
              SOFA BASE
          ================================================== */}

          <g
            data-piece
            data-x="0"
            data-y="220"
            data-rotate="0"
            data-scale="0.84"
            data-delay="0.02"
            filter="url(#heavyShadow)"
          >
            <path
              d="
      M472 550
      C475 510 510 488 560 484
      H880
      C930 488 965 510 968 550
      V625
      H472
      Z
    "
              fill="url(#navyVelvet)"
              filter="url(#fabricTexture)"
            />

            <rect
              x="490"
              y="594"
              width="460"
              height="48"
              rx="24"
              fill="#0b1a2a"
              opacity="0.92"
            />

            <rect
              x="514"
              y="628"
              width="410"
              height="10"
              rx="5"
              fill="url(#goldMetal)"
            />

            <path
              d="M510 575 C620 558 820 558 930 575"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="4"
              fill="none"
            />
          </g>

          {/* =================================================
              SOFA BACK
          ================================================== */}

          <g
            data-piece
            data-x="0"
            data-y="-230"
            data-rotate="0"
            data-scale="0.85"
            data-delay="0.06"
          >
            <path
              d="
                M515 532
                C515 450 558 420 620 421
                H820
                C882 420 925 450 925 532

                C845 510 595 510 515 532
                Z
              "
              fill="url(#navy-surface)"
              filter="url(#navy-shadow)"
            />

            {/* channels */}

            <g fill="none" stroke="#38516b" strokeWidth="4" opacity="0.6">
              <path d="M570 443 Q560 487 566 521" />
              <path d="M620 430 Q612 482 614 515" />
              <path d="M670 425 Q665 480 667 513" />
              <path d="M720 423 V511" />
              <path d="M770 425 Q775 480 773 513" />
              <path d="M820 430 Q828 482 826 515" />
              <path d="M870 443 Q880 487 874 521" />
            </g>
          </g>

          {/* =================================================
              LEFT SOFA ARM
          ================================================== */}

          <g
            data-piece
            data-x="-315"
            data-y="15"
            data-rotate="-14"
            data-scale="0.84"
            data-delay="0.08"
            filter="url(#heavyShadow)"
          >
            <path
              d="
      M450 505
      C408 510 390 550 398 596
      C407 633 438 644 490 635
      V530
      C477 512 463 505 450 505
      Z
    "
              fill="url(#navyVelvet)"
            />

            <path
              d="
      M418 560
      C426 530 446 518 474 516
      C462 555 462 603 474 632
      C441 630 423 612 418 560
      Z
    "
              fill="rgba(255,255,255,0.07)"
            />
          </g>

          {/* =================================================
              RIGHT SOFA ARM
          ================================================== */}

          <g
            data-piece
            data-x="315"
            data-y="15"
            data-rotate="14"
            data-scale="0.84"
            data-delay="0.08"
            filter="url(#heavyShadow)"
          >
            <path
              d="
      M990 505
      C1032 510 1050 550 1042 596
      C1033 633 1002 644 950 635
      V530
      C963 512 977 505 990 505
      Z
    "
              fill="url(#navyVelvet)"
            />

            <path
              d="
      M1022 560
      C1014 530 994 518 966 516
      C978 555 978 603 966 632
      C999 630 1017 612 1022 560
      Z
    "
              fill="rgba(255,255,255,0.07)"
            />
          </g>

          {/* =================================================
              SOFA CUSHION 1
          ================================================== */}

          <g
            data-piece
            data-x="-95"
            data-y="-270"
            data-rotate="-17"
            data-scale="0.72"
            data-delay="0.14"
            filter="url(#smallSoftShadow)"
          >
            <rect
              x="550"
              y="526"
              width="104"
              height="72"
              rx="22"
              fill="#f2e7d6"
            />
            <rect
              x="558"
              y="534"
              width="88"
              height="56"
              rx="18"
              fill="rgba(255,255,255,0.16)"
            />
          </g>

          {/* =================================================
              SOFA CUSHION 2
          ================================================== */}

          <g
            data-piece
            data-x="115"
            data-y="-280"
            data-rotate="15"
            data-scale="0.72"
            data-delay="0.16"
            filter="url(#smallSoftShadow)"
          >
            <rect
              x="786"
              y="522"
              width="102"
              height="74"
              rx="22"
              fill="#c7a05d"
            />
            <rect
              x="794"
              y="530"
              width="86"
              height="58"
              rx="18"
              fill="rgba(255,255,255,0.11)"
            />
          </g>

          {/* =================================================
              COFFEE TABLE
          ================================================== */}

          {/* COFFEE TABLE */}
          <g
            data-piece
            data-x="0"
            data-y="285"
            data-rotate="0"
            data-scale="0.74"
            data-delay="0.13"
            filter="url(#sceneShadow)"
          >
            {/* tabletop shadow */}
            <ellipse
              cx="720"
              cy="666"
              rx="170"
              ry="42"
              fill="rgba(78,61,38,0.12)"
            />

            {/* top */}
            <ellipse
              cx="720"
              cy="648"
              rx="158"
              ry="35"
              fill="#fffaf1"
              stroke="url(#goldMetal)"
              strokeWidth="4"
            />

            {/* light reflection */}
            <ellipse
              cx="670"
              cy="638"
              rx="52"
              ry="10"
              fill="rgba(255,255,255,0.26)"
            />

            {/* legs */}
            <path
              d="M628 660 V706"
              stroke="#b67b27"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M812 660 V706"
              stroke="#b67b27"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* base shadow */}
            <ellipse
              cx="720"
              cy="706"
              rx="108"
              ry="14"
              fill="#9a6b28"
              opacity="0.42"
            />
          </g>

          {/* TABLE OBJECTS */}
          <g
            data-piece
            data-x="60"
            data-y="-220"
            data-rotate="10"
            data-scale="0.55"
            data-delay="0.2"
            filter="url(#smallSoftShadow)"
          >
            <rect
              x="672"
              y="627"
              width="82"
              height="10"
              rx="3"
              fill="#11243a"
            />
            <rect x="682" y="618" width="72" height="9" rx="3" fill="#d7a04a" />
            <ellipse cx="785" cy="629" rx="22" ry="12" fill="#cdbb83" />
          </g>

          {/* =================================================
              COFFEE TABLE OBJECTS
          ================================================== */}

          <g
            data-piece
            data-x="60"
            data-y="-220"
            data-rotate="10"
            data-scale="0.5"
            data-delay="0.2"
          >
            <rect
              x="670"
              y="628"
              width="80"
              height="10"
              rx="3"
              fill="#12253e"
            />

            <rect x="680" y="619" width="72" height="9" rx="3" fill="#d7a04a" />

            <ellipse cx="782" cy="630" rx="22" ry="11" fill="#cdbb83" />
          </g>

          {/* =================================================
              PLANT
          ================================================== */}

          <g
            data-piece
            data-x="400"
            data-y="80"
            data-rotate="13"
            data-scale="0.8"
            data-delay="0.1"
          >
            <path
              d="
                M1180 560
                C1150 500 1160 430 1168 380
              "
              stroke="#8b744b"
              strokeWidth="5"
              fill="none"
            />

            <path
              d="
                M1164 420
                C1115 402 1105 365 1110 345
                C1144 352 1170 376 1164 420
              "
              fill="#5d725f"
            />

            <path
              d="
                M1170 458
                C1210 430 1238 438 1250 456
                C1227 482 1193 482 1170 458
              "
              fill="#6e8067"
            />

            <path
              d="
                M1168 390
                C1190 350 1217 338 1238 346
                C1230 378 1204 398 1168 390
              "
              fill="#536b57"
            />

            <path
              d="
                M1125 550
                H1215
                L1198 635
                H1142
                Z
              "
              fill="url(#gold-surface)"
              filter="url(#small-shadow)"
            />
          </g>

          {/* =================================================
              RIGHT SIDE TABLE
          ================================================== */}

          <g
            data-piece
            data-x="330"
            data-y="170"
            data-rotate="8"
            data-scale="0.75"
            data-delay="0.15"
          >
            <ellipse
              cx="1080"
              cy="585"
              rx="64"
              ry="19"
              fill="#fff8ec"
              stroke="#d7a04a"
              strokeWidth="4"
            />

            <path
              d="
                M1055 600
                L1040 655

                M1105 600
                L1120 655
              "
              stroke="#a56d24"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </g>
        </svg>

        {/* ===============================================
            SCROLL INDICATOR
        ================================================ */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-6
            left-1/2
            z-20
            -translate-x-1/2
            text-center
          "
        >
          <span
            className="
              font-brand-sans
              text-[7px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-[var(--brand-gold-700)]

              md:text-[8px]
            "
          >
            Scroll to compose
          </span>

          <div
            className="
              mx-auto
              mt-2
              h-7
              w-px
              bg-gradient-to-b
              from-[var(--brand-gold)]
              to-transparent
            "
          />
        </div>
      </div>
    </section>
  );
}
