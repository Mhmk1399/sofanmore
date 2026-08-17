import { ObjectId, type Filter } from "mongodb";

import { ApiProblem } from "@/lib/api-response";
import {
  type LeadAnalyticsQuery,
  type LeadListQuery,
} from "@/lib/lead-admin";
import { leadServiceDefinitions } from "@/lib/lead-config";
import { ensureLeadIndexes, getLeadCollections, getMongoClient } from "@/lib/mongodb";
import {
  deleteUploadedObject,
  getPublicUploadUrl,
} from "@/lib/upload-storage";
import type {
  LeadAttachmentDocument,
  LeadDocument,
  LeadService,
  LeadStatus,
} from "@/models/lead";
import { LEAD_SERVICES, LEAD_STATUSES } from "@/models/lead";

export type SerializedLeadAttachment = {
  id: string;
  leadId?: string;
  originalName: string;
  safeName: string;
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  status: LeadAttachmentDocument["status"];
  storageKey: string;
  publicUrl?: string;
  completedAt?: string;
  attachedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type SerializedLead = {
  id: string;
  service: LeadDocument["service"];
  status: LeadStatus;
  name: string;
  email?: string;
  phone: string;
  postcode?: string;
  message?: string;
  sourcePage?: string;
  referrer?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  serviceData: LeadDocument["serviceData"];
  consentPrivacy: boolean;
  consentMarketing: boolean;
  attachmentCount: number;
  attachments?: SerializedLeadAttachment[];
  statusUpdatedAt?: string;
  createdAt: string;
  updatedAt: string;
};

function toIsoString(value?: Date) {
  return value ? value.toISOString() : undefined;
}

function serializeAttachment(
  attachment: LeadAttachmentDocument,
): SerializedLeadAttachment {
  return {
    id: attachment._id?.toHexString() || "",
    ...(attachment.leadId ? { leadId: attachment.leadId.toHexString() } : {}),
    originalName: attachment.originalName,
    safeName: attachment.safeName,
    mimeType: attachment.mimeType,
    sizeBytes: attachment.sizeBytes,
    ...(attachment.width ? { width: attachment.width } : {}),
    ...(attachment.height ? { height: attachment.height } : {}),
    status: attachment.status,
    storageKey: attachment.storageKey,
    ...(getPublicUploadUrl(attachment.storageKey)
      ? { publicUrl: getPublicUploadUrl(attachment.storageKey) }
      : {}),
    ...(toIsoString(attachment.completedAt)
      ? { completedAt: toIsoString(attachment.completedAt) }
      : {}),
    ...(toIsoString(attachment.attachedAt)
      ? { attachedAt: toIsoString(attachment.attachedAt) }
      : {}),
    createdAt: attachment.createdAt.toISOString(),
    updatedAt: attachment.updatedAt.toISOString(),
  };
}

function serializeLead(
  lead: LeadDocument,
  attachments?: LeadAttachmentDocument[],
): SerializedLead {
  const utm = {
    ...(lead.utmSource ? { source: lead.utmSource } : {}),
    ...(lead.utmMedium ? { medium: lead.utmMedium } : {}),
    ...(lead.utmCampaign ? { campaign: lead.utmCampaign } : {}),
    ...(lead.utmTerm ? { term: lead.utmTerm } : {}),
    ...(lead.utmContent ? { content: lead.utmContent } : {}),
  };

  return {
    id: lead._id?.toHexString() || "",
    service: lead.service,
    status: lead.status,
    name: lead.name,
    ...(lead.email ? { email: lead.email } : {}),
    phone: lead.phone,
    ...(lead.postcode ? { postcode: lead.postcode } : {}),
    ...(lead.message ? { message: lead.message } : {}),
    ...(lead.sourcePage ? { sourcePage: lead.sourcePage } : {}),
    ...(lead.referrer ? { referrer: lead.referrer } : {}),
    ...(Object.keys(utm).length ? { utm } : {}),
    serviceData: lead.serviceData,
    consentPrivacy: lead.consentPrivacy,
    consentMarketing: lead.consentMarketing,
    attachmentCount: lead.attachmentCount,
    ...(attachments ? { attachments: attachments.map(serializeAttachment) } : {}),
    ...(toIsoString(lead.statusUpdatedAt)
      ? { statusUpdatedAt: toIsoString(lead.statusUpdatedAt) }
      : {}),
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
  };
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildLeadFilter(query: LeadListQuery): Filter<LeadDocument> {
  const filter: Filter<LeadDocument> = {};

  if (query.service) {
    filter.service = query.service;
  }

  if (query.status) {
    filter.status = query.status;
  }

  if (query.search) {
    const regex = new RegExp(escapeRegex(query.search), "i");

    filter.$or = [
      { name: regex },
      { email: regex },
      { phone: regex },
      { postcode: regex },
      { message: regex },
      { sourcePage: regex },
      { referrer: regex },
      { "serviceData.companyName": regex },
      { "serviceData.projectType": regex },
      { "serviceData.venueType": regex },
      { "serviceData.itemType": regex },
    ];
  }

  if (query.dateFrom || query.dateTo) {
    filter.createdAt = {
      ...(query.dateFrom ? { $gte: query.dateFrom } : {}),
      ...(query.dateTo ? { $lte: query.dateTo } : {}),
    };
  }

  return filter;
}

function startOfUtcDay(date: Date) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
}

function endOfUtcDay(date: Date) {
  const end = startOfUtcDay(date);

  end.setUTCDate(end.getUTCDate() + 1);
  end.setUTCMilliseconds(end.getUTCMilliseconds() - 1);

  return end;
}

function addUtcDays(date: Date, days: number) {
  const next = new Date(date);

  next.setUTCDate(next.getUTCDate() + days);

  return next;
}

function isoDay(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getTrendDateRange(query: LeadAnalyticsQuery) {
  if (query.dateFrom || query.dateTo) {
    const now = new Date();

    return {
      from: query.dateFrom ? startOfUtcDay(query.dateFrom) : addUtcDays(now, -13),
      to: query.dateTo ? endOfUtcDay(query.dateTo) : endOfUtcDay(now),
    };
  }

  const to = endOfUtcDay(new Date());

  return {
    from: addUtcDays(startOfUtcDay(to), -13),
    to,
  };
}

function fillDailySeries(
  from: Date,
  to: Date,
  rows: { date: string; count: number }[],
) {
  const byDate = new Map(rows.map((row) => [row.date, row.count]));
  const dayCount =
    Math.floor(
      (startOfUtcDay(to).getTime() - startOfUtcDay(from).getTime()) /
        (24 * 60 * 60 * 1000),
    ) + 1;

  if (dayCount > 90) {
    return rows;
  }

  return Array.from({ length: Math.max(dayCount, 0) }, (_, index) => {
    const date = addUtcDays(startOfUtcDay(from), index);
    const key = isoDay(date);

    return {
      date: key,
      count: byDate.get(key) || 0,
    };
  });
}

async function findAttachmentsForLeadIds(leadIds: ObjectId[]) {
  if (leadIds.length === 0) {
    return new Map<string, LeadAttachmentDocument[]>();
  }

  const { uploads } = await getLeadCollections();
  const attachments = await uploads
    .find({ leadId: { $in: leadIds } })
    .sort({ createdAt: 1 })
    .toArray();
  const byLeadId = new Map<string, LeadAttachmentDocument[]>();

  for (const attachment of attachments) {
    const leadId = attachment.leadId?.toHexString();

    if (!leadId) continue;

    byLeadId.set(leadId, [...(byLeadId.get(leadId) || []), attachment]);
  }

  return byLeadId;
}

export async function listLeads(query: LeadListQuery) {
  await ensureLeadIndexes();

  const { leads } = await getLeadCollections();
  const filter = buildLeadFilter(query);
  const skip = (query.page - 1) * query.limit;
  const [total, leadDocuments] = await Promise.all([
    leads.countDocuments(filter),
    leads
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(query.limit)
      .toArray(),
  ]);
  const attachmentsByLeadId = await findAttachmentsForLeadIds(
    leadDocuments
      .map((lead) => lead._id)
      .filter((leadId): leadId is ObjectId => Boolean(leadId)),
  );

  return {
    leads: leadDocuments.map((lead) =>
      serializeLead(
        lead,
        lead._id ? attachmentsByLeadId.get(lead._id.toHexString()) || [] : [],
      ),
    ),
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.max(Math.ceil(total / query.limit), 1),
    },
  };
}

export async function getLeadAnalytics(query: LeadAnalyticsQuery = {}) {
  await ensureLeadIndexes();

  const { leads } = await getLeadCollections();
  const filter = buildLeadFilter({
    page: 1,
    limit: 1,
    ...query,
  });
  const trendRange = getTrendDateRange(query);
  const trendFilter: Filter<LeadDocument> = {
    ...filter,
    createdAt: {
      $gte: trendRange.from,
      $lte: trendRange.to,
    },
  };

  const [
    total,
    statusRows,
    serviceRows,
    totals,
    dailyRows,
    recentLeadDocuments,
  ] = await Promise.all([
    leads.countDocuments(filter),
    leads
      .aggregate<{ _id: LeadStatus; count: number }>([
        { $match: filter },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ])
      .toArray(),
    leads
      .aggregate<{
        _id: LeadService;
        count: number;
        attachmentCount: number;
      }>([
        { $match: filter },
        {
          $group: {
            _id: "$service",
            count: { $sum: 1 },
            attachmentCount: { $sum: "$attachmentCount" },
          },
        },
      ])
      .toArray(),
    leads
      .aggregate<{
        _id: null;
        attachmentCount: number;
        leadsWithAttachments: number;
        marketingConsentCount: number;
      }>([
        { $match: filter },
        {
          $group: {
            _id: null,
            attachmentCount: { $sum: "$attachmentCount" },
            leadsWithAttachments: {
              $sum: {
                $cond: [{ $gt: ["$attachmentCount", 0] }, 1, 0],
              },
            },
            marketingConsentCount: {
              $sum: {
                $cond: ["$consentMarketing", 1, 0],
              },
            },
          },
        },
      ])
      .toArray(),
    leads
      .aggregate<{ _id: string; count: number }>([
        { $match: trendFilter },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
                timezone: "UTC",
              },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray(),
    leads.find(filter).sort({ createdAt: -1 }).limit(8).toArray(),
  ]);

  const statusCountMap = new Map(
    statusRows.map((row) => [row._id, row.count]),
  );
  const serviceCountMap = new Map(
    serviceRows.map((row) => [row._id, row.count]),
  );
  const serviceAttachmentMap = new Map(
    serviceRows.map((row) => [row._id, row.attachmentCount]),
  );
  const totalsRow = totals[0];
  const attachmentCount = totalsRow?.attachmentCount || 0;
  const daily = fillDailySeries(
    trendRange.from,
    trendRange.to,
    dailyRows.map((row) => ({ date: row._id, count: row.count })),
  );

  return {
    summary: {
      total,
      newCount: statusCountMap.get("NEW") || 0,
      activeCount:
        (statusCountMap.get("NEW") || 0) +
        (statusCountMap.get("CONTACTED") || 0) +
        (statusCountMap.get("QUALIFIED") || 0) +
        (statusCountMap.get("QUOTED") || 0),
      wonCount: statusCountMap.get("WON") || 0,
      lostCount: statusCountMap.get("LOST") || 0,
      spamCount: statusCountMap.get("SPAM") || 0,
      attachmentCount,
      leadsWithAttachments: totalsRow?.leadsWithAttachments || 0,
      marketingConsentCount: totalsRow?.marketingConsentCount || 0,
      averageAttachmentsPerLead: total > 0 ? attachmentCount / total : 0,
    },
    byStatus: LEAD_STATUSES.map((status) => ({
      status,
      count: statusCountMap.get(status) || 0,
    })),
    byService: LEAD_SERVICES.map((service) => ({
      service,
      label: leadServiceDefinitions[service].label,
      count: serviceCountMap.get(service) || 0,
      attachmentCount: serviceAttachmentMap.get(service) || 0,
    })),
    daily,
    dateRange: {
      ...(query.dateFrom ? { dateFrom: isoDay(query.dateFrom) } : {}),
      ...(query.dateTo ? { dateTo: isoDay(query.dateTo) } : {}),
      trendFrom: isoDay(trendRange.from),
      trendTo: isoDay(trendRange.to),
    },
    recent: recentLeadDocuments.map((lead) => serializeLead(lead, [])),
  };
}

export async function getLeadById(leadId: ObjectId) {
  await ensureLeadIndexes();

  const { leads, uploads } = await getLeadCollections();
  const lead = await leads.findOne({ _id: leadId });

  if (!lead) {
    throw new ApiProblem("NOT_FOUND", "Lead was not found.", 404);
  }

  const attachments = await uploads
    .find({ leadId })
    .sort({ createdAt: 1 })
    .toArray();

  return { lead: serializeLead(lead, attachments) };
}

export async function updateLeadStatus(leadId: ObjectId, status: LeadStatus) {
  await ensureLeadIndexes();

  const { leads } = await getLeadCollections();
  const now = new Date();
  const result = await leads.findOneAndUpdate(
    { _id: leadId },
    {
      $set: {
        status,
        statusUpdatedAt: now,
        updatedAt: now,
      },
    },
    { returnDocument: "after" },
  );

  if (!result) {
    throw new ApiProblem("NOT_FOUND", "Lead was not found.", 404);
  }

  return getLeadById(leadId);
}

export async function deleteLead(leadId: ObjectId) {
  await ensureLeadIndexes();

  const client = await getMongoClient();
  const { leads, uploads } = await getLeadCollections();
  const attachments = await uploads.find({ leadId }).toArray();
  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const deleteLeadResult = await leads.deleteOne({ _id: leadId }, { session });

      if (deleteLeadResult.deletedCount !== 1) {
        throw new ApiProblem("NOT_FOUND", "Lead was not found.", 404);
      }

      await uploads.deleteMany({ leadId }, { session });
    });
  } finally {
    await session.endSession();
  }

  let deletedObjects = 0;
  const objectDeleteErrors: string[] = [];

  for (const attachment of attachments) {
    try {
      await deleteUploadedObject(attachment.storageKey);
      deletedObjects += 1;
    } catch (error) {
      objectDeleteErrors.push(attachment.storageKey);
      console.warn("Could not delete lead upload object", {
        leadId: leadId.toHexString(),
        storageKey: attachment.storageKey,
        error,
      });
    }
  }

  return {
    deletedLeadId: leadId.toHexString(),
    deletedAttachments: attachments.length,
    deletedObjects,
    objectDeleteErrors,
  };
}
