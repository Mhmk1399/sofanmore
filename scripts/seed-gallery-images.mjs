import { MongoClient } from "mongodb";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required.");

const bucket = "https://sofanmore.s3.eu-west-2.amazonaws.com/Image";
const services = [
  "BESPOKE_SOFA",
  "COMMERCIAL_SOFA",
  "INTERIOR_DESIGN",
  "SOFA_REPAIR_RESTORATION",
];

const serviceLabels = {
  BESPOKE_SOFA: "bespoke upholstery",
  COMMERCIAL_SOFA: "commercial seating",
  INTERIOR_DESIGN: "interior design",
  SOFA_REPAIR_RESTORATION: "sofa repair and restoration",
};

const curated = new Map([
  [1, [2001, "BESPOKE_SOFA", "Tailored navy sofa with channelled upholstery", "A bespoke navy sofa shaped and upholstered by Sofa N More for an elegant residential setting."]],
  [4, [2002, "BESPOKE_SOFA", "Sculptural blue bespoke sofa", "A softly curved, deep-blue bespoke sofa demonstrating precise tailoring and balanced proportions."]],
  [2, [2003, "INTERIOR_DESIGN", "Curved seating in a warm interior", "An interior composition pairing curved upholstered seating with a calm, warm material palette."]],
  [6, [2004, "INTERIOR_DESIGN", "Bespoke dining interior", "A considered dining environment with custom seating, layered textures and refined detailing."]],
  [3, [2005, "SOFA_REPAIR_RESTORATION", "Restored upholstery craftsmanship detail", "Close detail of upholstery restored with careful material selection and traditional craftsmanship."]],
  [5, [2006, "SOFA_REPAIR_RESTORATION", "Sofa restoration in progress", "A sofa being carefully repaired and reupholstered to extend its life without losing character."]],
  [8, [2007, "COMMERCIAL_SOFA", "Hospitality lounge seating", "Durable custom seating created for a commercial hospitality lounge with a premium residential feel."]],
  [12, [2008, "COMMERCIAL_SOFA", "Commercial banquette installation", "Purpose-built commercial seating designed for frequent use, comfort and a polished guest experience."]],
]);

const imageNumbers = Array.from({ length: 75 }, (_, index) => index + 1).filter(
  (imageNumber) => imageNumber !== 16,
);

const seeds = imageNumbers.map((imageNumber, sortOrder) => {
  const known = curated.get(imageNumber);
  const service = known?.[1] || services[sortOrder % services.length];

  return {
    imageNumber,
    code: known?.[0] || 3000 + imageNumber,
    service,
    alt: known?.[2] || `Sofa N More ${serviceLabels[service]} project ${imageNumber}`,
    description:
      known?.[3] ||
      `Completed Sofa N More ${serviceLabels[service]} work from the original gallery collection.`,
    sortOrder,
  };
});

const client = new MongoClient(databaseUrl, { appName: "sofanmore-gallery-seed" });
try {
  await client.connect();
  const dbName = process.env.MONGODB_DB || process.env.MONGO_DB;
  const collection = (dbName ? client.db(dbName) : client.db()).collection("gallery_images");
  const now = new Date();
  const operations = seeds.map(({ code, imageNumber, service, alt, description, sortOrder }) => ({
    updateOne: {
      filter: { url: `${bucket}/${imageNumber}.webp` },
      update: {
        $setOnInsert: {
          url: `${bucket}/${imageNumber}.webp`,
          alt,
          description,
          code,
          service,
          active: true,
          sortOrder,
          mimeType: "image/webp",
          createdAt: now,
          updatedAt: now,
        },
      },
      upsert: true,
    },
  }));
  const result = await collection.bulkWrite(operations, { ordered: true });
  console.log(
    `Gallery seed complete: ${result.upsertedCount} inserted, ${result.matchedCount} already present, ${seeds.length} total expected.`,
  );
} finally {
  await client.close();
}
