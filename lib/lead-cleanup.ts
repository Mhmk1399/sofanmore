import { ensureLeadIndexes, getLeadCollections } from "@/lib/mongodb";
import { deleteUploadedObject } from "@/lib/upload-storage";

const ORPHAN_UPLOAD_CLEANUP_INTERVAL_MS = 60 * 60 * 1000;
let lastCleanupStartedAt = 0;
let activeCleanup: Promise<void> | null = null;

export async function cleanupOrphanLeadUploads(limit = 100) {
  await ensureLeadIndexes();

  const { uploads } = await getLeadCollections();
  const now = new Date();
  const orphanUploads = await uploads
    .find({
      leadId: { $exists: false },
      expiresAt: { $lte: now },
      status: { $in: ["PENDING", "COMPLETE", "FAILED"] },
    })
    .sort({ expiresAt: 1 })
    .limit(limit)
    .toArray();
  let deletedObjects = 0;
  let deletedRecords = 0;

  for (const upload of orphanUploads) {
    try {
      await deleteUploadedObject(upload.storageKey);
      deletedObjects += 1;
    } catch (error) {
      console.warn("Could not delete orphan lead upload object", {
        uploadToken: upload.uploadToken,
        storageKey: upload.storageKey,
        error,
      });
      continue;
    }

    const result = await uploads.deleteOne({
      uploadToken: upload.uploadToken,
      leadId: { $exists: false },
    });

    deletedRecords += result.deletedCount;
  }

  return {
    scanned: orphanUploads.length,
    deletedObjects,
    deletedRecords,
  };
}

export function scheduleOrphanUploadCleanup() {
  const now = Date.now();

  if (
    activeCleanup ||
    now - lastCleanupStartedAt < ORPHAN_UPLOAD_CLEANUP_INTERVAL_MS
  ) {
    return;
  }

  lastCleanupStartedAt = now;
  activeCleanup = cleanupOrphanLeadUploads()
    .then((result) => {
      if (result.deletedRecords > 0 || result.deletedObjects > 0) {
        console.info("Cleaned orphan lead uploads", result);
      }
    })
    .catch((error) => {
      console.warn("Orphan lead upload cleanup failed", error);
    })
    .finally(() => {
      activeCleanup = null;
    });
}
