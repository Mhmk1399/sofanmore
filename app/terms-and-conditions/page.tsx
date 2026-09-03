import type { Metadata } from "next";
import type { ReactNode } from "react";

import {
  CheckCircle2,
  FileText,
  Hammer,
  Mail,
  MapPin,
  Phone,
  Scale,
  ShieldCheck,
  Sofa,
} from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

import { defaultOgImage, siteConfig } from "@/lib/site";
import TermsQuickNav from "@/components/static/TermsQuickNav";

/* =========================================================
   PAGE CONSTANTS
========================================================= */

const SITE_URL = "https://sofanmore.co.uk";
const PAGE_PATH = "/terms-and-conditions";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const LAST_UPDATED = "18 August 2026";

const PHONE_DISPLAY = "+44 7400 577844";
const PHONE_HREF = "tel:+447400577844";

const EMAIL = "info@sofanmore.co.uk";

const ADDRESS =
  "Sofa N More, Unit G19, Atlas Business Centre, Oxgate Lane, Staples Corner West, London NW2 7HJ";

/* =========================================================
   TERMS NAVIGATION
========================================================= */

const termsNavigation = [
  {
    id: "about",
    number: "01",
    label: "About These Terms",
  },
  {
    id: "our-services",
    number: "02",
    label: "Our Services",
  },
  {
    id: "quotes-orders",
    number: "03",
    label: "Quotes & Orders",
  },
  {
    id: "bespoke-orders",
    number: "04",
    label: "Bespoke Orders",
  },
  {
    id: "measurements",
    number: "05",
    label: "Measurements",
  },
  {
    id: "materials",
    number: "06",
    label: "Materials & Finishes",
  },
  {
    id: "prices-payments",
    number: "07",
    label: "Prices & Payments",
  },
  {
    id: "changes-cancellation",
    number: "08",
    label: "Changes & Cancellation",
  },
  {
    id: "delivery",
    number: "09",
    label: "Delivery & Access",
  },
  {
    id: "repair-restoration",
    number: "10",
    label: "Repair & Restoration",
  },
  {
    id: "commercial",
    number: "11",
    label: "Commercial Projects",
  },
  {
    id: "consumer-rights",
    number: "12",
    label: "Consumer Rights",
  },
  {
    id: "problems",
    number: "13",
    label: "Problems & Complaints",
  },
  {
    id: "liability",
    number: "14",
    label: "Liability",
  },
  {
    id: "delays",
    number: "15",
    label: "Delays Outside Our Control",
  },
  {
    id: "website",
    number: "16",
    label: "Website Use",
  },
  {
    id: "law",
    number: "17",
    label: "Governing Law",
  },
  {
    id: "contact",
    number: "18",
    label: "Contact Us",
  },
] as const;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: "Terms & Conditions | Sofa N More London",

  description:
    "Read the Sofa N More terms and conditions covering bespoke sofas, commercial seating, interior design, sofa repair and restoration, quotations, payments, delivery and cancellations.",

  alternates: {
    canonical: PAGE_PATH,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    url: PAGE_PATH,

    title: "Terms & Conditions | Sofa N More London",

    description:
      "Terms and conditions for Sofa N More services including bespoke sofas, commercial seating, interior design and sofa repair and restoration.",

    siteName: siteConfig.name,
    locale: siteConfig.locale,

    images: [defaultOgImage],
  },

  twitter: {
    card: "summary_large_image",

    title: "Terms & Conditions | Sofa N More London",

    description:
      "Read the terms and conditions applying to Sofa N More projects and services.",

    images: [defaultOgImage.url],
  },
};

/* =========================================================
   STRUCTURED DATA
========================================================= */

const termsSchema = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "WebPage",

      "@id": `${PAGE_URL}#webpage`,

      url: PAGE_URL,

      name: "Terms & Conditions | Sofa N More London",

      description:
        "Terms and conditions applying to Sofa N More products, projects and services.",

      dateModified: "2026-08-18",

      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },

      about: {
        "@id": `${SITE_URL}/#business`,
      },

      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },
    },

    {
      "@type": "BreadcrumbList",

      "@id": `${PAGE_URL}#breadcrumb`,

      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Terms & Conditions",
          item: PAGE_URL,
        },
      ],
    },

    {
      "@type": "Organization",

      "@id": `${SITE_URL}/#business`,

      name: "Sofa N More",

      url: SITE_URL,

      telephone: "+447400577844",

      email: EMAIL,

      address: {
        "@type": "PostalAddress",

        streetAddress:
          "Unit G19, Atlas Business Centre, Oxgate Lane, Staples Corner West",

        addressLocality: "London",

        postalCode: "NW2 7HJ",

        addressCountry: "GB",
      },
    },
  ],
};

/* =========================================================
   PAGE
========================================================= */

export default function TermsAndConditionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(termsSchema),
        }}
      />

      <main
        className="
          bg-[var(--brand-ivory)]
          text-[var(--brand-navy)]
        "
      >
        {/* =================================================
            HERO
        ================================================== */}

        <section
          className="
            px-3
            pb-5
            pt-7 mt-20 md:mt-8

            sm:px-5
            sm:pb-7
            sm:pt-9

            lg:px-8
            lg:pb-10
            lg:pt-[118px]
          "
        >
          <div
            className="
              clay-surface-soft

              mx-auto
              max-w-[var(--site-width)]

              overflow-hidden

              rounded-[28px]

              border
              border-white/70

              px-5
              py-8

              sm:rounded-[34px]
              sm:px-8
              sm:py-10

              lg:rounded-[38px]
              lg:px-12
              lg:py-14
            "
          >
            <div
              className="
                grid
                gap-8

                lg:grid-cols-[1fr_360px]
                lg:items-end
              "
            >
              {/* LEFT */}

              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Scale
                    size={15}
                    strokeWidth={1.5}
                    className="
                      text-[var(--brand-gold)]
                    "
                  />

                  <p
                    className="
                      font-brand-sans

                      text-[9px]
                      font-bold
                      uppercase

                      tracking-[0.2em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    Legal Information
                  </p>
                </div>

                <h1
                  className="
                    mt-4

                    max-w-[850px]

                    font-brand-display

                    text-[42px]
                    font-medium
                    leading-[0.98]

                    tracking-[-0.045em]

                    text-[var(--brand-navy)]

                    sm:text-[56px]

                    lg:text-[70px]
                  "
                >
                  Terms &amp;
                  <br className="hidden sm:block" />
                  Conditions.
                </h1>

                <p
                  className="
                    mt-6

                    max-w-[700px]

                    font-brand-sans

                    text-[12px]
                    font-medium
                    leading-[1.8]

                    text-[var(--brand-text-muted)]

                    sm:text-[13px]
                  "
                >
                  These terms explain how we work, what you can expect from Sofa
                  N More, and the responsibilities that apply when you order a
                  product or service from us.
                </p>
              </div>

              {/* UPDATED CARD */}

              <div
                className="
                  rounded-[22px]

                  border
                  border-[var(--brand-navy)]/[0.07]

                  bg-[#F1E8DC]

                  p-5
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
                  <span
                    className="
                      flex
                      h-9
                      w-9

                      shrink-0

                      items-center
                      justify-center

                      rounded-[11px]

                      bg-[var(--brand-navy)]

                      text-[var(--brand-gold)]
                    "
                  >
                    <FileText size={15} strokeWidth={1.5} />
                  </span>

                  <div>
                    <p
                      className="
                        font-brand-sans

                        text-[7px]
                        font-bold
                        uppercase

                        tracking-[0.14em]

                        text-[var(--brand-gold-700)]
                      "
                    >
                      Last updated
                    </p>

                    <p
                      className="
                        mt-1

                        font-brand-display

                        text-[16px]
                        font-semibold

                        text-[var(--brand-navy)]
                      "
                    >
                      {LAST_UPDATED}
                    </p>
                  </div>
                </div>

                <div
                  className="
                    mt-5

                    border-t
                    border-[var(--brand-navy)]/[0.08]

                    pt-4
                  "
                >
                  <p
                    className="
                      font-brand-sans

                      text-[9px]
                      font-medium
                      leading-[1.65]

                      text-[var(--brand-text-muted)]
                    "
                  >
                    Please read these terms before confirming an order or
                    instructing us to begin work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            QUICK SUMMARY
        ================================================== */}

        <section
          className="
            px-3
            py-5

            sm:px-5

            lg:px-8
          "
        >
          <div
            className="
              mx-auto
              max-w-[var(--site-width)]
            "
          >
            <div
              className="
                grid
                gap-3

                sm:grid-cols-2

                lg:grid-cols-4
              "
            >
              <SummaryCard
                icon={Sofa}
                title="Bespoke Work"
                text="Many Sofa N More projects are produced specifically around the customer's dimensions, choices and requirements."
              />

              <SummaryCard
                icon={FileText}
                title="Clear Quotes"
                text="Project-specific pricing, scope and payment arrangements are confirmed as part of your quotation or order."
              />

              <SummaryCard
                icon={ShieldCheck}
                title="Consumer Rights"
                text="Nothing in these terms is intended to remove rights that cannot legally be excluded."
              />

              <SummaryCard
                icon={Hammer}
                title="Repair Work"
                text="Repair and restoration work depends on the condition, construction and materials of the existing piece."
              />
            </div>
          </div>
        </section>

        {/* =================================================
            MOBILE QUICK NAV
        ================================================== */}

        <section
          className="
            px-3
            py-4

            sm:px-5

            lg:hidden
          "
        >
          <TermsQuickNav items={termsNavigation} />
        </section>

        {/* =================================================
            TERMS BODY
        ================================================== */}

        <section
          className="
            px-3
            pb-12
            pt-3

            sm:px-5
            sm:pb-16

            lg:px-8
            lg:pt-6
          "
        >
          <div
            className="
              mx-auto

              grid
              max-w-[var(--site-width)]

              gap-7

              lg:grid-cols-[260px_minmax(0,1fr)]
              lg:gap-10
            "
          >
            {/* =============================================
                DESKTOP CONTENTS
            ============================================== */}

            <aside
              className="
                hidden

                lg:block
              "
            >
              <div
                className="
                  sticky
                  top-[105px]

                  rounded-[22px]

                  border
                  border-[var(--brand-navy)]/[0.07]

                  bg-[#F3EBE1]

                  p-3
                "
              >
                <div
                  className="
                    px-3
                    pb-3
                    pt-2
                  "
                >
                  <p
                    className="
                      font-brand-sans

                      text-[8px]
                      font-bold
                      uppercase

                      tracking-[0.16em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    On this page
                  </p>
                </div>

                <nav aria-label="Terms and conditions contents">
                  <ul className="space-y-0.5">
                    {termsNavigation.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="
                              group

                              flex
                              min-h-[38px]

                              items-center

                              gap-2.5

                              rounded-[11px]

                              px-3

                              font-brand-sans

                              text-[9px]
                              font-semibold

                              text-[var(--brand-text-muted)]

                              transition-colors
                              duration-150

                              hover:bg-white/50
                              hover:text-[var(--brand-navy)]
                            "
                        >
                          <span
                            className="
                                w-5

                                shrink-0

                                text-[7px]
                                font-bold

                                text-[var(--brand-gold-700)]/70
                              "
                          >
                            {item.number}
                          </span>

                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* =============================================
                CONTENT
            ============================================== */}

            <article
              className="
                min-w-0

                space-y-4
              "
            >
              {/* 01 */}

              <TermsSection id="about" number="01" title="About These Terms">
                <TermsParagraph>
                  These terms and conditions apply when Sofa N More supplies
                  goods or services to a customer, unless we agree different
                  terms with you in writing.
                </TermsParagraph>

                <TermsParagraph>
                  References to &quot;we&quot;, &quot;us&quot; and
                  &quot;our&quot; mean Sofa N More. References to
                  &quot;you&quot; and &quot;your&quot; mean the customer placing
                  the order or instructing the work.
                </TermsParagraph>

                <TermsParagraph>
                  Your quotation, order confirmation, approved specification and
                  any other project-specific written agreement form part of the
                  agreement between us.
                </TermsParagraph>

                <ImportantNote>
                  Where an order-specific document contains a term that differs
                  from these general terms, the order-specific term will
                  normally apply to that project, subject always to applicable
                  law.
                </ImportantNote>
              </TermsSection>

              {/* 02 */}

              <TermsSection
                id="our-services"
                number="02"
                title="Our Products & Services"
              >
                <TermsParagraph>
                  Sofa N More provides services including bespoke sofas and
                  seating, commercial seating, interior design, and sofa repair
                  and restoration.
                </TermsParagraph>

                <TermsParagraph>
                  The exact scope of each project will be based on the
                  quotation, specification, drawings, measurements, material
                  choices or other details agreed for that project.
                </TermsParagraph>

                <TermsList
                  items={[
                    "Made-to-measure sofas and seating",
                    "Commercial and hospitality seating",
                    "Interior design services",
                    "Sofa repair and restoration",
                    "Reupholstery and related upholstery work where agreed",
                  ]}
                />
              </TermsSection>

              {/* 03 */}

              <TermsSection
                id="quotes-orders"
                number="03"
                title="Quotations & Orders"
              >
                <TermsParagraph>
                  A quotation describes the work we understand you would like us
                  to carry out and the price based on the information available
                  at that time.
                </TermsParagraph>

                <TermsParagraph>
                  You should check your quotation, dimensions, product
                  specification, fabrics, finishes and any other agreed details
                  carefully before confirming your order.
                </TermsParagraph>

                <TermsParagraph>
                  An enquiry, website form submission or initial discussion does
                  not by itself create an obligation for either party to
                  proceed.
                </TermsParagraph>

                <TermsParagraph>
                  An order becomes binding when it has been accepted by us and
                  any payment or other confirmation required by the relevant
                  quotation has been received.
                </TermsParagraph>
              </TermsSection>

              {/* 04 */}

              <TermsSection
                id="bespoke-orders"
                number="04"
                title="Bespoke & Made-to-Measure Orders"
              >
                <TermsParagraph>
                  Bespoke sofas and seating may be designed or produced around
                  dimensions, configurations, fabrics, colours, finishes or
                  other choices agreed specifically for you.
                </TermsParagraph>

                <TermsParagraph>
                  Because these projects may be made to individual requirements,
                  changes after production has started may be impossible or may
                  result in additional cost and a revised completion date.
                </TermsParagraph>

                <ImportantNote>
                  Where an item is genuinely made to your specification or
                  clearly personalised, statutory change-of-mind cancellation
                  rights may not apply. We will consider the nature of the
                  individual order rather than treating every customised choice
                  as automatically exempt.
                </ImportantNote>

                <TermsParagraph>
                  This does not affect your legal rights where goods are faulty,
                  not as described, or otherwise fail to meet applicable
                  statutory requirements.
                </TermsParagraph>
              </TermsSection>

              {/* 05 */}

              <TermsSection
                id="measurements"
                number="05"
                title="Measurements, Access & Information"
              >
                <TermsParagraph>
                  Accurate measurements can be essential to bespoke seating,
                  fitted work and delivery planning.
                </TermsParagraph>

                <TermsParagraph>
                  Where you provide measurements, drawings, photographs, plans
                  or other information, you are responsible for making sure the
                  information is accurate unless we have specifically agreed to
                  verify it.
                </TermsParagraph>

                <TermsList
                  items={[
                    "Room and wall dimensions",
                    "Door widths and heights",
                    "Hallways and staircases",
                    "Lift dimensions and restrictions",
                    "Access routes",
                    "Any site conditions that could affect installation or delivery",
                  ]}
                />

                <TermsParagraph>
                  Please tell us about restricted access before an order is
                  confirmed.
                </TermsParagraph>
              </TermsSection>

              {/* 06 */}

              <TermsSection
                id="materials"
                number="06"
                title="Materials, Fabrics & Finishes"
              >
                <TermsParagraph>
                  Natural materials, fabrics, timber, leather, stone and other
                  finishes can contain normal variations in colour, grain,
                  texture and appearance.
                </TermsParagraph>

                <TermsParagraph>
                  Images displayed on screens can also vary because of lighting,
                  photography and device settings. Where colour or texture is
                  particularly important, we recommend reviewing an appropriate
                  physical sample where available.
                </TermsParagraph>

                <TermsParagraph>
                  Different production batches can show reasonable variation.
                  Such natural or manufacturing variation is not by itself a
                  defect.
                </TermsParagraph>
              </TermsSection>

              {/* 07 */}

              <TermsSection
                id="prices-payments"
                number="07"
                title="Prices, Deposits & Payments"
              >
                <TermsParagraph>
                  The price and payment schedule for a project will be stated in
                  the relevant quotation, invoice or order confirmation.
                </TermsParagraph>

                <TermsParagraph>
                  Where a deposit or staged payment is required, the amount,
                  timing and any project-specific conditions will be
                  communicated before the order is confirmed.
                </TermsParagraph>

                <TermsParagraph>
                  Additional work requested after the original scope has been
                  agreed may be quoted separately.
                </TermsParagraph>

                <ImportantNote>
                  We have deliberately not imposed a universal deposit
                  percentage or cancellation charge in these website terms.
                  Those commercial details should appear clearly in the
                  quotation for the individual project.
                </ImportantNote>
              </TermsSection>

              {/* 08 */}

              <TermsSection
                id="changes-cancellation"
                number="08"
                title="Changes & Cancellation"
              >
                <TermsParagraph>
                  If you want to change or cancel an order, contact us as soon
                  as possible.
                </TermsParagraph>

                <TermsParagraph>
                  Whether an order can be changed or cancelled will depend on
                  factors such as the nature of the project, whether materials
                  have been ordered, whether production has begun, whether work
                  has already been carried out, and any statutory cancellation
                  rights that apply.
                </TermsParagraph>

                <TermsParagraph>
                  For eligible distance or off-premises consumer contracts,
                  statutory cancellation rights may apply. Where the law gives
                  you a right to cancel, these terms do not remove that right.
                </TermsParagraph>

                <TermsParagraph>
                  Where you expressly ask us to begin a service during an
                  applicable cancellation period, you may be required to pay for
                  work properly carried out up to the point of a valid
                  cancellation where the law permits.
                </TermsParagraph>
              </TermsSection>

              {/* 09 */}

              <TermsSection
                id="delivery"
                number="09"
                title="Delivery, Collection & Site Access"
              >
                <TermsParagraph>
                  Delivery dates or lead times will be discussed as part of the
                  project. Bespoke production times can depend on materials,
                  workshop capacity, supplier availability and the complexity of
                  the work.
                </TermsParagraph>

                <TermsParagraph>
                  Unless a particular date has been expressly agreed as binding,
                  dates given during a project should be treated as estimates.
                </TermsParagraph>

                <TermsParagraph>
                  You are responsible for ensuring that suitable access is
                  available at the delivery or installation address.
                </TermsParagraph>

                <TermsList
                  items={[
                    "The delivery route must be reasonably clear and safe.",
                    "Relevant parking or loading restrictions should be disclosed in advance.",
                    "Someone authorised to receive the item should be available where agreed.",
                    "Building management or access permissions should be arranged by the customer where required.",
                  ]}
                />

                <TermsParagraph>
                  If delivery cannot reasonably be completed because important
                  access information was not disclosed, a further delivery or
                  attendance charge may apply where reasonable and lawful.
                </TermsParagraph>
              </TermsSection>

              {/* 10 */}

              <TermsSection
                id="repair-restoration"
                number="10"
                title="Sofa Repair & Restoration"
              >
                <TermsParagraph>
                  Repair and restoration work is carried out on existing items
                  whose internal condition may not always be visible before work
                  begins.
                </TermsParagraph>

                <TermsParagraph>
                  An initial assessment or quotation may therefore need to be
                  revised if additional damage, deterioration, previous repairs
                  or structural issues become apparent after upholstery or
                  coverings are removed.
                </TermsParagraph>

                <TermsParagraph>
                  If material additional work becomes necessary, we will
                  normally discuss it with you before carrying out work outside
                  the agreed scope.
                </TermsParagraph>

                <TermsParagraph>
                  Restoration aims to improve and preserve an existing piece.
                  The final result should be assessed with proper regard to the
                  age, construction and existing condition of the item.
                </TermsParagraph>
              </TermsSection>

              {/* 11 */}

              <TermsSection
                id="commercial"
                number="11"
                title="Commercial Projects"
              >
                <TermsParagraph>
                  Commercial seating and interior projects may involve site
                  requirements, drawings, programme dates, third-party
                  contractors and other project-specific obligations.
                </TermsParagraph>

                <TermsParagraph>
                  Where a separate commercial quotation, specification, purchase
                  order or written agreement has been accepted, those
                  project-specific terms may supplement these terms.
                </TermsParagraph>

                <TermsParagraph>
                  Unless expressly agreed otherwise, you are responsible for
                  providing accurate site information and identifying any
                  particular performance, compliance or operational requirements
                  before the relevant specification is approved.
                </TermsParagraph>
              </TermsSection>

              {/* 12 */}

              <TermsSection
                id="consumer-rights"
                number="12"
                title="Your Statutory Consumer Rights"
              >
                <TermsParagraph>
                  If you are purchasing as a consumer, you have rights under UK
                  consumer law. Nothing in these terms is intended to exclude or
                  restrict rights that cannot lawfully be excluded or
                  restricted.
                </TermsParagraph>

                <TermsList
                  items={[
                    "Goods must meet applicable legal standards including requirements relating to quality, fitness for purpose and description.",
                    "Services must be carried out with reasonable care and skill.",
                    "Information about goods or services that forms part of the contract may be legally binding.",
                    "Legal remedies may be available where applicable requirements are not met.",
                  ]}
                />

                <ImportantNote>
                  Contractual warranty terms, if offered, are additional to
                  statutory rights and do not replace them.
                </ImportantNote>
              </TermsSection>

              {/* 13 */}

              <TermsSection
                id="problems"
                number="13"
                title="Problems, Defects & Complaints"
              >
                <TermsParagraph>
                  If you believe there is a problem with goods or work we have
                  supplied, please contact us promptly and provide enough
                  information for us to understand the issue.
                </TermsParagraph>

                <TermsParagraph>
                  Photographs, order details and a clear description of the
                  concern can help us assess the situation efficiently.
                </TermsParagraph>

                <TermsParagraph>
                  Depending on the circumstances and your legal rights, an
                  appropriate resolution may include inspection, repair,
                  replacement, repeat performance, a price adjustment or another
                  remedy required by law.
                </TermsParagraph>

                <div
                  className="
                    mt-5

                    flex
                    flex-col
                    gap-2.5

                    sm:flex-row
                  "
                >
                  <ClayButton
                    href="/contact-us"
                    variant="gold"
                    size="sm"
                    showArrow
                  >
                    Contact Our Team
                  </ClayButton>

                  <ClayButton
                    href={PHONE_HREF}
                    variant="navy"
                    size="sm"
                    startIcon={<Phone size={13} />}
                  >
                    Call Us
                  </ClayButton>
                </div>
              </TermsSection>

              {/* 14 */}

              <TermsSection id="liability" number="14" title="Our Liability">
                <TermsParagraph>
                  Nothing in these terms limits or excludes liability where
                  doing so would be unlawful.
                </TermsParagraph>

                <TermsParagraph>
                  We are not responsible for losses caused by inaccurate
                  information supplied by you, undisclosed site conditions, or
                  work carried out by another person outside our control, except
                  where the law provides otherwise.
                </TermsParagraph>

                <TermsParagraph>
                  If you are purchasing wholly or mainly for business purposes,
                  additional limitations may be agreed in your project-specific
                  commercial terms.
                </TermsParagraph>
              </TermsSection>

              {/* 15 */}

              <TermsSection
                id="delays"
                number="15"
                title="Events & Delays Outside Our Control"
              >
                <TermsParagraph>
                  Occasionally a project may be affected by circumstances
                  outside our reasonable control, including significant supplier
                  disruption, transport interruption, severe weather or other
                  events that could not reasonably have been prevented.
                </TermsParagraph>

                <TermsParagraph>
                  Where this happens, we will try to keep you informed and
                  minimise disruption where reasonably possible.
                </TermsParagraph>

                <TermsParagraph>
                  This section does not remove any legal rights you may have in
                  relation to delivery or performance.
                </TermsParagraph>
              </TermsSection>

              {/* 16 */}

              <TermsSection
                id="website"
                number="16"
                title="Use of This Website"
              >
                <TermsParagraph>
                  We aim to keep information on this website accurate and
                  useful, but website descriptions, imagery and general
                  information do not replace a project-specific quotation or
                  specification.
                </TermsParagraph>

                <TermsParagraph>
                  Website content may be updated from time to time. Prices,
                  availability, designs and service descriptions shown generally
                  on the website should not be treated as a confirmed quotation
                  unless expressly stated otherwise.
                </TermsParagraph>

                <TermsParagraph>
                  Third-party websites linked from our site operate
                  independently and are subject to their own terms and policies.
                </TermsParagraph>
              </TermsSection>

              {/* 17 */}

              <TermsSection id="law" number="17" title="Governing Law">
                <TermsParagraph>
                  Unless mandatory law requires otherwise, these terms and our
                  contractual relationship are governed by the laws of England
                  and Wales.
                </TermsParagraph>

                <TermsParagraph>
                  If you are a consumer, nothing in this section deprives you of
                  mandatory protections or rights to bring proceedings in a
                  court where applicable law gives you that right.
                </TermsParagraph>
              </TermsSection>

              {/* 18 */}

              <TermsSection
                id="contact"
                number="18"
                title="Contact Sofa N More"
              >
                <TermsParagraph>
                  If you have a question about these terms, an existing order or
                  a proposed project, you can contact us using the details
                  below.
                </TermsParagraph>

                <div
                  className="
                    mt-6

                    grid
                    gap-3

                    sm:grid-cols-2
                  "
                >
                  <ContactItem
                    icon={<Phone size={15} />}
                    label="Telephone"
                    value={PHONE_DISPLAY}
                    href={PHONE_HREF}
                  />

                  <ContactItem
                    icon={<Mail size={15} />}
                    label="Email"
                    value={EMAIL}
                    href={`mailto:${EMAIL}`}
                  />

                  <div
                    className="
                      sm:col-span-2
                    "
                  >
                    <ContactItem
                      icon={<MapPin size={15} />}
                      label="Workshop Address"
                      value={ADDRESS}
                    />
                  </div>
                </div>
              </TermsSection>

              {/* =================================================
                  END NOTE
              ================================================== */}

              <div
                className="
                  mt-7

                  rounded-[24px]

                  bg-[var(--brand-navy)]

                  px-5
                  py-6

                  sm:px-7
                  sm:py-7
                "
              >
                <div
                  className="
                    grid
                    gap-5

                    sm:grid-cols-[1fr_auto]
                    sm:items-center
                  "
                >
                  <div>
                    <p
                      className="
                        font-brand-sans

                        text-[8px]
                        font-bold
                        uppercase

                        tracking-[0.16em]

                        text-[var(--brand-gold)]
                      "
                    >
                      Need clarification?
                    </p>

                    <h2
                      className="
                        mt-2

                        font-brand-display

                        text-[25px]
                        font-medium

                        text-white

                        sm:text-[30px]
                      "
                    >
                      Talk to us before you order.
                    </h2>

                    <p
                      className="
                        mt-2

                        max-w-[620px]

                        font-brand-sans

                        text-[9px]
                        font-medium
                        leading-[1.7]

                        text-white/55
                      "
                    >
                      If any part of a quotation or these terms is unclear,
                      contact us before confirming your project.
                    </p>
                  </div>

                  <ClayButton
                    href="/contact-us"
                    variant="ivory"
                    size="md"
                    showArrow
                  >
                    Contact Sofa N More
                  </ClayButton>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Sofa;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        rounded-[19px]

        border
        border-[var(--brand-navy)]/[0.07]

        bg-[#FFFDF8]/70

        p-4
      "
    >
      <span
        className="
          flex
          h-9
          w-9

          items-center
          justify-center

          rounded-[11px]

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        <Icon size={15} strokeWidth={1.5} />
      </span>

      <h2
        className="
          mt-4

          font-brand-display

          text-[15px]
          font-semibold

          text-[var(--brand-navy)]
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-2

          font-brand-sans

          text-[9px]
          font-medium
          leading-[1.65]

          text-[var(--brand-text-muted)]
        "
      >
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   TERMS SECTION
========================================================= */

function TermsSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="
        scroll-mt-[110px]

        rounded-[24px]

        border
        border-[var(--brand-navy)]/[0.07]

        bg-[#FFFDF8]/75

        px-5
        py-6

        sm:px-7
        sm:py-7
      "
      aria-labelledby={`${id}-heading`}
    >
      <div
        className="
          flex
          items-start

          gap-3
        "
      >
        <span
          aria-hidden
          className="
            flex
            h-8
            min-w-8

            items-center
            justify-center

            rounded-[10px]

            bg-[#F0E5D7]

            font-brand-sans

            text-[8px]
            font-bold

            text-[var(--brand-gold-700)]
          "
        >
          {number}
        </span>

        <h2
          id={`${id}-heading`}
          className="
            pt-[2px]

            font-brand-display

            text-[23px]
            font-medium
            leading-[1.1]

            tracking-[-0.025em]

            text-[var(--brand-navy)]

            sm:text-[27px]
          "
        >
          {title}
        </h2>
      </div>

      <div
        className="
          mt-5
          max-w-[880px]

          space-y-4
        "
      >
        {children}
      </div>
    </section>
  );
}

/* =========================================================
   PARAGRAPH
========================================================= */

function TermsParagraph({ children }: { children: ReactNode }) {
  return (
    <p
      className="
        font-brand-sans

        text-[11px]
        font-medium
        leading-[1.85]

        text-[var(--brand-text-muted)]

        sm:text-[12px]
      "
    >
      {children}
    </p>
  );
}

/* =========================================================
   LIST
========================================================= */

function TermsList({ items }: { items: string[] }) {
  return (
    <ul
      className="
        grid
        gap-2.5
      "
    >
      {items.map((item) => (
        <li
          key={item}
          className="
            flex
            items-start

            gap-2.5

            font-brand-sans

            text-[10px]
            font-medium
            leading-[1.7]

            text-[var(--brand-text-muted)]

            sm:text-[11px]
          "
        >
          <CheckCircle2
            size={14}
            strokeWidth={1.6}
            className="
              mt-[2px]

              shrink-0

              text-[var(--brand-gold)]
            "
          />

          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* =========================================================
   IMPORTANT NOTE
========================================================= */

function ImportantNote({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        rounded-[16px]

        border
        border-[var(--brand-gold)]/15

        bg-[#F3E9DC]

        px-4
        py-3.5
      "
    >
      <div
        className="
          flex
          items-start

          gap-2.5
        "
      >
        <ShieldCheck
          size={15}
          strokeWidth={1.5}
          className="
            mt-[2px]

            shrink-0

            text-[var(--brand-gold-700)]
          "
        />

        <p
          className="
            font-brand-sans

            text-[9px]
            font-semibold
            leading-[1.7]

            text-[var(--brand-navy)]/75

            sm:text-[10px]
          "
        >
          {children}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   CONTACT ITEM
========================================================= */

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span
        className="
          flex
          h-9
          w-9

          shrink-0

          items-center
          justify-center

          rounded-[10px]

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        {icon}
      </span>

      <span className="min-w-0">
        <span
          className="
            block

            font-brand-sans

            text-[7px]
            font-bold
            uppercase

            tracking-[0.12em]

            text-[var(--brand-gold-700)]
          "
        >
          {label}
        </span>

        <span
          className="
            mt-1
            block

            font-brand-sans

            text-[9px]
            font-semibold
            leading-[1.55]

            text-[var(--brand-navy)]
          "
        >
          {value}
        </span>
      </span>
    </>
  );

  const className = `
    flex
    min-h-[76px]

    items-center

    gap-3

    rounded-[16px]

    border
    border-[var(--brand-navy)]/[0.06]

    bg-[#F3EBE1]

    px-4
    py-3
  `;

  if (!href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <a
      href={href}
      className={`
        ${className}

        transition-colors
        duration-150

        hover:bg-[#F8F2EA]
      `}
    >
      {content}
    </a>
  );
}
