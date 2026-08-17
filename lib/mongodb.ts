import { MongoClient } from "mongodb";

import type {
  LeadAttachmentDocument,
  LeadDocument,
} from "@/models/lead";
import type { UserDocument } from "@/models/user";

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
  leadIndexesPromise?: Promise<void>;
  userIndexesPromise?: Promise<void>;
};

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is required for MongoDB.");
  }

  if (!url.startsWith("mongodb://") && !url.startsWith("mongodb+srv://")) {
    throw new Error("DATABASE_URL must be a MongoDB connection string.");
  }

  return url;
}

export function getMongoClient() {
  if (!globalForMongo.mongoClientPromise) {
    globalForMongo.mongoClientPromise = new MongoClient(getDatabaseUrl(), {
      appName: "sofanmore-lead-capture",
      maxPoolSize: 10,
    }).connect();
  }

  return globalForMongo.mongoClientPromise;
}

export async function getDb() {
  const client = await getMongoClient();
  const dbName = process.env.MONGODB_DB || process.env.MONGO_DB;

  return dbName ? client.db(dbName) : client.db();
}

export async function getLeadCollections() {
  const db = await getDb();

  return {
    leads: db.collection<LeadDocument>("leads"),
    uploads: db.collection<LeadAttachmentDocument>("lead_uploads"),
  };
}

export async function getUserCollections() {
  const db = await getDb();

  return {
    users: db.collection<UserDocument>("users"),
  };
}

export function ensureLeadIndexes() {
  if (!globalForMongo.leadIndexesPromise) {
    globalForMongo.leadIndexesPromise = (async () => {
      const { leads, uploads } = await getLeadCollections();

      await Promise.all([
        leads.createIndex(
          { idempotencyKey: 1 },
          { unique: true, name: "unique_idempotency_key" },
        ),
        leads.createIndex(
          { service: 1, status: 1, createdAt: -1 },
          { name: "admin_service_status_created" },
        ),
        leads.createIndex(
          { postcode: 1, createdAt: -1 },
          { name: "admin_postcode_created", sparse: true },
        ),
        leads.createIndex({ createdAt: -1 }, { name: "created_at_desc" }),
        uploads.createIndex(
          { uploadToken: 1 },
          { unique: true, name: "unique_upload_token" },
        ),
        uploads.createIndex(
          { uploadSessionHash: 1, status: 1, createdAt: -1 },
          { name: "upload_session_status_created" },
        ),
        uploads.createIndex(
          { leadId: 1, createdAt: -1 },
          { name: "lead_attachment_lookup", sparse: true },
        ),
        uploads.createIndex(
          { expiresAt: 1 },
          { name: "orphan_upload_expiry_lookup", sparse: true },
        ),
      ]);
    })();
  }

  return globalForMongo.leadIndexesPromise;
}

export function ensureUserIndexes() {
  if (!globalForMongo.userIndexesPromise) {
    globalForMongo.userIndexesPromise = (async () => {
      const { users } = await getUserCollections();

      await Promise.all([
        users.createIndex(
          { phoneNormalized: 1 },
          { unique: true, name: "unique_user_phone" },
        ),
        users.createIndex(
          { role: 1, createdAt: -1 },
          { name: "admin_user_role_created" },
        ),
        users.createIndex({ createdAt: -1 }, { name: "user_created_at_desc" }),
      ]);
    })();
  }

  return globalForMongo.userIndexesPromise;
}
