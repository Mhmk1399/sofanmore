import { Resend } from "resend";

import { leadServiceDefinitions } from "@/lib/lead-config";
import { getLeadCollections } from "@/lib/mongodb";
import { getPublicUploadUrl } from "@/lib/upload-storage";
import type {
  LeadAttachmentDocument,
  LeadDocument,
  LeadServiceDataValue,
} from "@/models/lead";

export type LeadNotifier = {
  notifyNewLead(lead: LeadDocument): Promise<void>;
};

const DEFAULT_FROM_EMAIL = "Sofa N More <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] || character,
  );
}

function displayValue(value: LeadServiceDataValue | undefined) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }
  return String(value);
}

function detailRows(lead: LeadDocument) {
  const fieldLabels = Object.fromEntries(
    leadServiceDefinitions[lead.service].fields.map((field) => [
      field.key,
      field.label,
    ]),
  );
  const rows: Array<[string, string]> = [
    ["Name", lead.name],
    ["Email", lead.email || "Not provided"],
    ["Phone", lead.phone],
    ["Postcode", lead.postcode || "Not provided"],
  ];

  for (const [key, value] of Object.entries(lead.serviceData)) {
    rows.push([fieldLabels[key] || key, displayValue(value)]);
  }

  rows.push(
    ["Message", lead.message || "Not provided"],
    ["Uploaded files", String(lead.attachmentCount)],
    ["Marketing consent", lead.consentMarketing ? "Yes" : "No"],
    ["Source page", lead.sourcePage || "Not provided"],
    ["Lead ID", lead._id?.toHexString() || "Unavailable"],
    [
      "Submitted",
      lead.createdAt.toLocaleString("en-GB", { timeZone: "Europe/London" }),
    ],
  );

  return rows;
}

function attachmentUrl(attachment: LeadAttachmentDocument) {
  return getPublicUploadUrl(attachment.storageKey);
}

function buildAttachmentHtml(attachments: LeadAttachmentDocument[]) {
  if (attachments.length === 0) return "";

  const items = attachments
    .map((attachment) => {
      const url = escapeHtml(attachmentUrl(attachment));
      const name = escapeHtml(attachment.originalName);
      const isImage = attachment.mimeType.startsWith("image/");

      return `
        <div style="margin-top:12px;padding:12px;border:1px solid #e3d7c8;border-radius:12px;background:#fff;">
          ${
            isImage
              ? `<a href="${url}" target="_blank" style="display:block;text-decoration:none;">
                   <img src="${url}" alt="${name}" style="display:block;width:100%;max-height:420px;object-fit:contain;border-radius:8px;background:#f4ede4;" />
                 </a>`
              : ""
          }
          <a href="${url}" target="_blank" style="display:inline-block;margin-top:${isImage ? "10px" : "0"};color:#9b6b1f;font-size:13px;font-weight:700;text-decoration:none;">
            ${isImage ? "Open full-size image" : "View uploaded file"}: ${name}
          </a>
        </div>`;
    })
    .join("");

  return `
    <div style="padding:20px 24px;border-top:1px solid #e8dfd4;">
      <h2 style="margin:0;color:#26384a;font-size:17px;">Uploaded files</h2>
      ${items}
    </div>`;
}

function buildHtml(
  lead: LeadDocument,
  attachments: LeadAttachmentDocument[],
) {
  const serviceLabel = leadServiceDefinitions[lead.service].label;
  const rows = detailRows(lead)
    .map(
      ([label, value]) => `
        <tr>
          <th style="padding:10px 14px;text-align:left;vertical-align:top;border-bottom:1px solid #e8dfd4;color:#26384a;font-size:13px;width:180px;">${escapeHtml(label)}</th>
          <td style="padding:10px 14px;border-bottom:1px solid #e8dfd4;color:#4c5966;font-size:13px;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;padding:24px;background:#f4ede4;font-family:Arial,sans-serif;">
        <div style="max-width:680px;margin:0 auto;overflow:hidden;border:1px solid #e3d7c8;border-radius:18px;background:#fffdf8;">
          <div style="padding:24px;background:#0c2235;color:#fff;">
            <p style="margin:0 0 6px;color:#d9b66f;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Sofa N More</p>
            <h1 style="margin:0;font-size:24px;line-height:1.3;">New ${escapeHtml(serviceLabel)} lead</h1>
            <p style="margin:8px 0 0;color:#d7dee5;font-size:14px;">A new enquiry has been saved to your dashboard.</p>
          </div>
          <table role="presentation" style="width:100%;border-collapse:collapse;">${rows}</table>
          ${buildAttachmentHtml(attachments)}
          <div style="padding:18px 24px;color:#6a747e;font-size:12px;">
            Reply to this email to contact ${escapeHtml(lead.name)} directly.
          </div>
        </div>
      </body>
    </html>`;
}

function buildText(
  lead: LeadDocument,
  attachments: LeadAttachmentDocument[],
) {
  const serviceLabel = leadServiceDefinitions[lead.service].label;

  return [
    `New ${serviceLabel} lead`,
    "",
    ...detailRows(lead).map(([label, value]) => `${label}: ${value}`),
    ...(attachments.length > 0
      ? [
          "",
          "Uploaded files:",
          ...attachments.map(
            (attachment) =>
              `${attachment.originalName}: ${attachmentUrl(attachment)}`,
          ),
        ]
      : []),
  ].join("\n");
}

class ResendLeadNotifier implements LeadNotifier {
  async notifyNewLead(lead: LeadDocument) {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const ownerEmail = process.env.OWNER_EMAIL?.trim();

    if (!apiKey || apiKey === "re_xxxxxxxxx") {
      throw new Error("RESEND_API_KEY is not configured.");
    }

    if (!ownerEmail) {
      throw new Error("OWNER_EMAIL is not configured.");
    }

    const serviceLabel = leadServiceDefinitions[lead.service].label;
    const attachments = lead._id
      ? await (await getLeadCollections()).uploads
          .find({ leadId: lead._id, status: "ATTACHED" })
          .sort({ createdAt: 1 })
          .toArray()
      : [];
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL,
      to: ownerEmail,
      subject: `New ${serviceLabel} lead — ${lead.name}`,
      html: buildHtml(lead, attachments),
      text: buildText(lead, attachments),
      ...(lead.email ? { replyTo: lead.email } : {}),
    });

    if (error) {
      throw new Error(`Resend email failed: ${error.message}`);
    }

    console.info("Lead notification sent", {
      leadId: lead._id?.toHexString(),
      service: lead.service,
      emailId: data?.id,
      recipient: ownerEmail,
      attachmentCount: attachments.length,
    });
  }
}

export function getLeadNotifier(): LeadNotifier {
  return new ResendLeadNotifier();
}

export async function notifyNewLead(lead: LeadDocument) {
  await getLeadNotifier().notifyNewLead(lead);
}
