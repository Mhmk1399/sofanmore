"use client";

import {
  AlertTriangle,
  Armchair,
  Building2,
  Check,
  ChevronDown,
  FileText,
  Hammer,
  MessageSquare,
  Palette,
  Paperclip,
} from "lucide-react";
import {
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { Spinner } from "@/components/lead-capture/ClayFormControls";

export type LeadService =
  | "CONTACT_ENQUIRY"
  | "BESPOKE_SOFA"
  | "COMMERCIAL_SOFA"
  | "INTERIOR_DESIGN"
  | "SOFA_REPAIR_RESTORATION";

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "QUOTED"
  | "WON"
  | "LOST"
  | "SPAM";

export type LeadServiceDataValue = string | number | boolean | string[] | null;

export type LeadAttachment = {
  id: string;
  originalName: string;
  safeName: string;
  mimeType: string;
  sizeBytes: number;
  status: string;
  storageKey: string;
  publicUrl?: string;
  completedAt?: string;
  attachedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type Lead = {
  id: string;
  service: LeadService;
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
  serviceData: Record<string, LeadServiceDataValue>;
  consentPrivacy: boolean;
  consentMarketing: boolean;
  attachmentCount: number;
  attachments?: LeadAttachment[];
  statusUpdatedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type LeadPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type LeadsResponse = {
  ok: true;
  leads: Lead[];
  pagination: LeadPagination;
};

export type LeadDetailResponse = {
  ok: true;
  lead: Lead;
};

export type AnalyticsResponse = {
  ok: true;
  summary: {
    total: number;
    newCount: number;
    activeCount: number;
    wonCount: number;
    lostCount: number;
    spamCount: number;
    attachmentCount: number;
    leadsWithAttachments: number;
    marketingConsentCount: number;
    averageAttachmentsPerLead: number;
  };
  byStatus: { status: LeadStatus; count: number }[];
  byService: {
    service: LeadService;
    label: string;
    count: number;
    attachmentCount: number;
  }[];
  daily: { date: string; count: number }[];
  dateRange: {
    dateFrom?: string;
    dateTo?: string;
    trendFrom: string;
    trendTo: string;
  };
  recent: Lead[];
};

export type DeleteLeadResponse = {
  ok: true;
  deletedLeadId: string;
  deletedAttachments: number;
  deletedObjects: number;
  objectDeleteErrors: string[];
};

export type UserRole = "USER" | "ADMIN";

export type AdminUser = {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type CurrentUserResponse = {
  ok: true;
  user: AdminUser | null;
};

export type UsersResponse = {
  ok: true;
  users: AdminUser[];
  total: number;
};

export type UserDetailResponse = {
  ok: true;
  user: AdminUser;
};

export type DeleteUserResponse = {
  ok: true;
  deletedUserId: string;
};

export type ProjectService =
  | "BESPOKE_SOFA"
  | "COMMERCIAL_SOFA"
  | "INTERIOR_DESIGN"
  | "SOFA_REPAIR_RESTORATION";

export type ProjectImage = {
  id: string;
  url: string;
  storageKey?: string;
  alt: string;
  sortOrder: number;
};

export type Project = {
  id: string;
  projectCode: number;
  title: string;
  slug: string;
  service: ProjectService;
  coverImageUrl: string;
  coverImageStorageKey?: string;
  images: ProjectImage[];
  excerpt: string;
  brief?: string;
  approach?: string;
  details?: string;
  result?: string;
  locationLabel?: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProjectsResponse = {
  ok: true;
  projects: Project[];
  total: number;
  latestCode: number | null;
};

export type ProjectDetailResponse = {
  ok: true;
  project: Project;
};

export type ProjectUploadResponse = {
  ok: true;
  imageUrl: string;
  imageStorageKey: string;
};

export type DeleteProjectResponse = {
  ok: true;
  deletedProjectId: string;
};

export type ProjectFormState = {
  id: string;
  projectCode: string;
  title: string;
  service: ProjectService;
  coverImageUrl: string;
  coverImageStorageKey: string;
  images: ProjectImage[];
  excerpt: string;
  brief: string;
  approach: string;
  details: string;
  result: string;
  locationLabel: string;
  featured: boolean;
  published: boolean;
};

export type FilterState = {
  search: string;
  service: "" | LeadService;
  status: "" | LeadStatus;
  dateFrom: string;
  dateTo: string;
};

export type ApiError = Error & {
  status?: number;
  code?: string;
  fieldErrors?: Record<string, string>;
};

export type ProjectImageUploadState = {
  fileName: string;
  fileSize: number;
  progress: number;
  status: "idle" | "uploading" | "complete" | "failed";
};

export const PAGE_SIZE = 20;

export const emptyFilters: FilterState = {
  search: "",
  service: "",
  status: "",
  dateFrom: "",
  dateTo: "",
};

export const emptyProjectForm: ProjectFormState = {
  id: "",
  projectCode: "",
  title: "",
  service: "BESPOKE_SOFA",
  coverImageUrl: "",
  coverImageStorageKey: "",
  images: [],
  excerpt: "",
  brief: "",
  approach: "",
  details: "",
  result: "",
  locationLabel: "",
  featured: false,
  published: false,
};

export const services: {
  value: LeadService;
  label: string;
  shortLabel: string;
}[] = [
  {
    value: "CONTACT_ENQUIRY",
    label: "Contact messages",
    shortLabel: "Contact",
  },
  { value: "BESPOKE_SOFA", label: "Bespoke sofa", shortLabel: "Bespoke" },
  {
    value: "COMMERCIAL_SOFA",
    label: "Commercial sofas",
    shortLabel: "Commercial",
  },
  {
    value: "INTERIOR_DESIGN",
    label: "Interior design",
    shortLabel: "Interior",
  },
  {
    value: "SOFA_REPAIR_RESTORATION",
    label: "Repair and restoration",
    shortLabel: "Repair",
  },
];

export const statuses: { value: LeadStatus; label: string }[] = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "QUALIFIED", label: "Qualified" },
  { value: "QUOTED", label: "Quoted" },
  { value: "WON", label: "Won" },
  { value: "LOST", label: "Lost" },
  { value: "SPAM", label: "Spam" },
];

export const userRoles: { value: UserRole; label: string }[] = [
  { value: "USER", label: "User" },
  { value: "ADMIN", label: "Admin" },
];

export const projectServices: { value: ProjectService; label: string }[] = [
  { value: "BESPOKE_SOFA", label: "Bespoke sofa" },
  { value: "COMMERCIAL_SOFA", label: "Commercial sofa" },
  { value: "INTERIOR_DESIGN", label: "Interior design" },
  {
    value: "SOFA_REPAIR_RESTORATION",
    label: "Repair and restoration",
  },
];

export const projectServiceRoutes: Record<ProjectService, string> = {
  BESPOKE_SOFA: "/services/bespoke-sofas",
  COMMERCIAL_SOFA: "/services/commercial-sofas",
  INTERIOR_DESIGN: "/services/interior-design",
  SOFA_REPAIR_RESTORATION: "/services/sofa-repair-restoration",
};

export const statusColor: Record<
  LeadStatus,
  { dot: string; bg: string; text: string; border: string }
> = {
  NEW: {
    dot: "bg-amber-500",
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
  },
  CONTACTED: {
    dot: "bg-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-800",
    border: "border-blue-200",
  },
  QUALIFIED: {
    dot: "bg-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
  },
  QUOTED: {
    dot: "bg-violet-500",
    bg: "bg-violet-50",
    text: "text-violet-800",
    border: "border-violet-200",
  },
  WON: {
    dot: "bg-green-600",
    bg: "bg-green-50",
    text: "text-green-800",
    border: "border-green-200",
  },
  LOST: {
    dot: "bg-red-500",
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-200",
  },
  SPAM: {
    dot: "bg-gray-400",
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-200",
  },
};

export const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});
export const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
});

export function statusLabel(status: LeadStatus) {
  return statuses.find((item) => item.value === status)?.label || status;
}

export function formatDateTime(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return dateTimeFormatter.format(parsed);
}

export function formatDate(value: string) {
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime())) return value;
  return dateFormatter.format(parsed);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-GB").format(value);
}

export function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function formatFieldLabel(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function formatServiceValue(value: LeadServiceDataValue) {
  if (Array.isArray(value)) return value.map(formatFieldLabel).join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value == null || value === "") return "Not provided";
  if (typeof value === "number") return formatNumber(value);
  return formatFieldLabel(value);
}

export function buildQuery(filters: FilterState, page: number) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(PAGE_SIZE),
  });
  if (filters.search.trim()) params.set("search", filters.search.trim());
  if (filters.service) params.set("service", filters.service);
  if (filters.status) params.set("status", filters.status);
  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);
  return params.toString();
}

export function buildAnalyticsQuery(filters: FilterState) {
  const params = new URLSearchParams();
  if (filters.search.trim()) params.set("search", filters.search.trim());
  if (filters.service) params.set("service", filters.service);
  if (filters.status) params.set("status", filters.status);
  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);
  return params.toString();
}

export function buildUsersQuery(search: string, role: "" | UserRole) {
  const params = new URLSearchParams();
  if (search.trim()) params.set("search", search.trim());
  if (role) params.set("role", role);
  return params.toString();
}

export function buildProjectsQuery(search: string) {
  const params = new URLSearchParams();
  if (search.trim()) params.set("search", search.trim());
  return params.toString();
}

export function makeApiError(
  fallbackMessage: string,
  response?: Response,
  body?: unknown,
) {
  const error = new Error(fallbackMessage) as ApiError;
  if (response) error.status = response.status;
  if (body && typeof body === "object" && !Array.isArray(body)) {
    const record = body as Record<string, unknown>;
    if (typeof record.message === "string") error.message = record.message;
    if (typeof record.code === "string") error.code = record.code;
    if (
      record.fieldErrors &&
      typeof record.fieldErrors === "object" &&
      !Array.isArray(record.fieldErrors)
    ) {
      error.fieldErrors = record.fieldErrors as Record<string, string>;
    }
  }
  return error;
}

export function uploadProjectImageWithProgress(input: {
  file: File;
  onProgress: (progress: number) => void;
}) {
  return new Promise<ProjectUploadResponse>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("file", input.file);
    xhr.open("POST", "/api/admin/projects/upload");
    xhr.withCredentials = true;

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      input.onProgress(
        Math.max(1, Math.round((event.loaded / event.total) * 90)),
      );
    };

    xhr.onload = () => {
      let body: unknown = null;

      try {
        body = JSON.parse(xhr.responseText);
      } catch {
        body = null;
      }

      if (xhr.status >= 200 && xhr.status < 300 && body) {
        resolve(body as ProjectUploadResponse);
        return;
      }

      const apiBody = body as {
        message?: string;
        fieldErrors?: Record<string, string>;
      };
      reject(
        makeApiError(
          apiBody?.message || "Project image could not be uploaded.",
          undefined,
          apiBody,
        ),
      );
    };

    xhr.onerror = () => reject(makeApiError("Project image upload failed."));
    xhr.onabort = () => reject(makeApiError("Project image upload cancelled."));

    xhr.send(formData);
  });
}

export function getAdminRedirectPath(hasUser: boolean) {
  if (hasUser && typeof window !== "undefined") {
    try {
      const referrer = new URL(document.referrer);
      if (
        referrer.origin === window.location.origin &&
        referrer.pathname !== "/admin"
      ) {
        return `${referrer.pathname}${referrer.search}${referrer.hash}`;
      }
    } catch {
      /* fallback */
    }
    return "/";
  }
  return "/login?next=%2Fadmin";
}

export async function fetchAdminJson<T>(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  const response = await fetch(path, {
    ...init,
    cache: "no-store",
    credentials: "same-origin",
    headers,
  });
  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    throw makeApiError(
      "The admin API returned an unreadable response.",
      response,
    );
  }
  if (!response.ok)
    throw makeApiError("The admin API request failed.", response, body);
  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    (body as { ok?: unknown }).ok !== true
  ) {
    throw makeApiError(
      "The admin API returned an unexpected response.",
      response,
      body,
    );
  }
  return body as T;
}

/* ─── Confirm Modal ─── */

export type LeadAdminDashboardProps = { initialUser?: AdminUser | null };
export type ActiveSection =
  | "overview"
  | "leads"
  | "projects"
  | "users"
  | "profile";

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-[380px] rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
        <div className="p-5">
          <div className="mb-3 flex items-center gap-3">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${danger ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}
            >
              <AlertTriangle size={18} />
            </span>
            <h3 className="font-brand-sans text-[15px] font-bold text-[var(--brand-navy)]">
              {title}
            </h3>
          </div>
          <p className="font-brand-sans text-[13px] leading-relaxed text-[var(--brand-text-muted)]">
            {message}
          </p>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-5 py-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg px-4 py-2 font-brand-sans text-[12px] font-bold text-[var(--brand-text-muted)] transition-colors hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 font-brand-sans text-[12px] font-bold text-white transition-colors disabled:opacity-50 ${danger ? "bg-red-600 hover:bg-red-700" : "bg-[var(--brand-navy)] hover:bg-[var(--brand-navy)]/90"}`}
          >
            {loading && <Spinner />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Custom Dropdown ─── */
export function CustomDropdown({
  label,
  value,
  onChange,
  options,
  compact = false,
  fullWidth = true,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  compact?: boolean;
  fullWidth?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedLabel =
    options.find((o) => o.value === value)?.label || options[0]?.label || "";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <span className="mb-1.5 block font-brand-sans text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)]/70">
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border border-white/60 bg-white/50 font-brand-sans font-semibold text-[var(--brand-navy)] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.5)_inset] transition-all hover:bg-white/70 ${
          compact ? "h-[32px] px-2.5 text-[11px]" : "h-[40px] px-3 text-[12px]"
        }`}
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown
          size={compact ? 12 : 14}
          className={`shrink-0 text-[var(--brand-text-muted)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          data-lenis-prevent
          className="absolute left-0 right-0 top-full z-[100] mt-1 max-h-[220px] overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left font-brand-sans transition-colors hover:bg-[var(--brand-navy)]/5 ${
                compact ? "text-[11px]" : "text-[12px]"
              } ${value === option.value ? "font-bold text-[var(--brand-navy)]" : "font-semibold text-[var(--brand-text-muted)]"}`}
            >
              {value === option.value && (
                <Check
                  size={12}
                  className="shrink-0 text-[var(--brand-gold-700)]"
                />
              )}
              <span className={value === option.value ? "" : "pl-5"}>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Icon Components ─── */
export function ServiceIcon({
  service,
  size = 14,
}: {
  service: LeadService;
  size?: number;
}) {
  if (service === "CONTACT_ENQUIRY") return <MessageSquare size={size} />;
  if (service === "COMMERCIAL_SOFA") return <Building2 size={size} />;
  if (service === "INTERIOR_DESIGN") return <Palette size={size} />;
  if (service === "SOFA_REPAIR_RESTORATION") return <Hammer size={size} />;
  return <Armchair size={size} />;
}

export function StatusBadge({ status }: { status: LeadStatus }) {
  const c = statusColor[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-brand-sans text-[10px] font-bold ${c.bg} ${c.text} ${c.border}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {statusLabel(status)}
    </span>
  );
}

export function ServiceBadge({ service }: { service: LeadService }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-brand-sans text-[10px] font-bold text-gray-700">
      <ServiceIcon service={service} size={11} />
      {services.find((s) => s.value === service)?.shortLabel || service}
    </span>
  );
}

/* ─── Main Dashboard ─── */

export function SmallIconBtn({
  label,
  icon,
  danger = false,
  disabled = false,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  danger?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-black/5 disabled:opacity-40 ${
        danger
          ? "text-red-500 hover:text-red-700"
          : "text-[var(--brand-text-muted)] hover:text-[var(--brand-navy)]"
      }`}
    >
      {icon}
    </button>
  );
}

/* ─── User Management (with mobile card view) ─── */

export function AdminTextField({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-brand-sans text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)]/70">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="h-[42px] w-full rounded-xl border border-white/60 bg-white/55 px-3 font-brand-sans text-[12px] font-semibold text-[var(--brand-navy)] outline-none shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.5)_inset] transition-colors placeholder:text-[var(--brand-text-muted)]/45 focus:bg-white/75"
      />
    </label>
  );
}

export function AdminTextareaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-brand-sans text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)]/70">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={5}
        className="min-h-[116px] w-full resize-none rounded-xl border border-white/60 bg-white/55 px-3 py-3 font-brand-sans text-[12px] font-semibold leading-relaxed text-[var(--brand-navy)] outline-none shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.5)_inset] transition-colors placeholder:text-[var(--brand-text-muted)]/45 focus:bg-white/75"
      />
    </label>
  );
}

export function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-4">
      <h3 className="mb-2 font-brand-sans text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--brand-text-muted)]">
        {title}
      </h3>
      {children}
    </section>
  );
}

export function DetailGrid({ items }: { items: [string, string][] }) {
  return (
    <dl className="grid gap-2 grid-cols-1 sm:grid-cols-2">
      {items.map(([label, value]) => (
        <div
          key={`${label}-${value}`}
          className="min-w-0 rounded-lg border border-black/[0.05] bg-white/60 px-3 py-2"
        >
          <dt className="font-brand-sans text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--brand-text-muted)]">
            {label}
          </dt>
          <dd className="mt-0.5 break-words font-brand-sans text-[12px] font-bold text-[var(--brand-navy)]">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function AttachmentRow({ attachment }: { attachment: LeadAttachment }) {
  const isPdf = attachment.mimeType === "application/pdf";
  const icon = isPdf ? <FileText size={15} /> : <Paperclip size={15} />;
  const body = (
    <>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-navy)] text-[var(--brand-gold)]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-brand-sans text-[11px] font-bold text-[var(--brand-navy)]">
          {attachment.originalName}
        </span>
        <span className="block truncate font-brand-sans text-[9px] font-semibold text-[var(--brand-text-muted)]">
          {attachment.mimeType} · {formatFileSize(attachment.sizeBytes)}
        </span>
      </span>
    </>
  );

  const cls =
    "flex min-w-0 items-center gap-2.5 rounded-lg border border-black/[0.05] bg-white/60 p-2.5 transition-colors";

  if (attachment.publicUrl) {
    return (
      <a
        href={attachment.publicUrl}
        target="_blank"
        rel="noreferrer"
        className={`${cls} hover:bg-white/80`}
      >
        {body}
      </a>
    );
  }
  return <div className={cls}>{body}</div>;
}

export function EmptyPanel({
  icon,
  title,
}: {
  icon: ReactNode;
  title: string;
}) {
  return (
    <div className="flex min-h-[80px] flex-col items-center justify-center rounded-lg border border-black/[0.04] bg-white/30 p-4 text-center">
      <span className="text-[var(--brand-text-muted)]">{icon}</span>
      <p className="mt-1.5 font-brand-sans text-[11px] font-semibold text-[var(--brand-text-muted)]">
        {title}
      </p>
    </div>
  );
}
