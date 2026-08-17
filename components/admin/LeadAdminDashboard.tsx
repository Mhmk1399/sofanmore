"use client";

import {
  Activity,
  Armchair,
  BarChart3,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Database,
  Eye,
  FileText,
  Filter,
  Hammer,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Palette,
  Paperclip,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  AlertTriangle,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ClayDatePicker,
  Spinner,
} from "@/components/lead-capture/ClayFormControls";
import { useToast } from "@/components/ui/ToastProvider";

type LeadService =
  | "CONTACT_ENQUIRY"
  | "BESPOKE_SOFA"
  | "COMMERCIAL_SOFA"
  | "INTERIOR_DESIGN"
  | "SOFA_REPAIR_RESTORATION";

type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "QUOTED"
  | "WON"
  | "LOST"
  | "SPAM";

type LeadServiceDataValue = string | number | boolean | string[] | null;

type LeadAttachment = {
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

type Lead = {
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

type LeadPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type LeadsResponse = {
  ok: true;
  leads: Lead[];
  pagination: LeadPagination;
};

type LeadDetailResponse = {
  ok: true;
  lead: Lead;
};

type AnalyticsResponse = {
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

type DeleteLeadResponse = {
  ok: true;
  deletedLeadId: string;
  deletedAttachments: number;
  deletedObjects: number;
  objectDeleteErrors: string[];
};

type UserRole = "USER" | "ADMIN";

type AdminUser = {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
};

type CurrentUserResponse = {
  ok: true;
  user: AdminUser | null;
};

type UsersResponse = {
  ok: true;
  users: AdminUser[];
  total: number;
};

type UserDetailResponse = {
  ok: true;
  user: AdminUser;
};

type DeleteUserResponse = {
  ok: true;
  deletedUserId: string;
};

type FilterState = {
  search: string;
  service: "" | LeadService;
  status: "" | LeadStatus;
  dateFrom: string;
  dateTo: string;
};

type ApiError = Error & {
  status?: number;
  code?: string;
  fieldErrors?: Record<string, string>;
};

const PAGE_SIZE = 20;

const emptyFilters: FilterState = {
  search: "",
  service: "",
  status: "",
  dateFrom: "",
  dateTo: "",
};

const services: { value: LeadService; label: string; shortLabel: string }[] = [
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

const statuses: { value: LeadStatus; label: string }[] = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "QUALIFIED", label: "Qualified" },
  { value: "QUOTED", label: "Quoted" },
  { value: "WON", label: "Won" },
  { value: "LOST", label: "Lost" },
  { value: "SPAM", label: "Spam" },
];

const userRoles: { value: UserRole; label: string }[] = [
  { value: "USER", label: "User" },
  { value: "ADMIN", label: "Admin" },
];

const statusColor: Record<
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

const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});
const dateFormatter = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" });

function serviceLabel(service: LeadService) {
  return services.find((item) => item.value === service)?.label || service;
}

function statusLabel(status: LeadStatus) {
  return statuses.find((item) => item.value === status)?.label || status;
}

function formatDateTime(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return dateTimeFormatter.format(parsed);
}

function formatDate(value: string) {
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime())) return value;
  return dateFormatter.format(parsed);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-GB").format(value);
}

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function formatFieldLabel(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatServiceValue(value: LeadServiceDataValue) {
  if (Array.isArray(value)) return value.map(formatFieldLabel).join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value == null || value === "") return "Not provided";
  if (typeof value === "number") return formatNumber(value);
  return formatFieldLabel(value);
}

function buildQuery(filters: FilterState, page: number) {
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

function buildAnalyticsQuery(filters: FilterState) {
  const params = new URLSearchParams();
  if (filters.search.trim()) params.set("search", filters.search.trim());
  if (filters.service) params.set("service", filters.service);
  if (filters.status) params.set("status", filters.status);
  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);
  return params.toString();
}

function buildUsersQuery(search: string, role: "" | UserRole) {
  const params = new URLSearchParams();
  if (search.trim()) params.set("search", search.trim());
  if (role) params.set("role", role);
  return params.toString();
}

function makeApiError(
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

function getAdminRedirectPath(hasUser: boolean) {
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

async function fetchAdminJson<T>(path: string, init: RequestInit = {}) {
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
function ConfirmModal({
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
function CustomDropdown({
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
        <div className="absolute left-0 right-0 top-full z-[100] mt-1 max-h-[220px] overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
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
function ServiceIcon({
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

function StatusBadge({ status }: { status: LeadStatus }) {
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

function ServiceBadge({ service }: { service: LeadService }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-brand-sans text-[10px] font-bold text-gray-700">
      <ServiceIcon service={service} size={11} />
      {services.find((s) => s.value === service)?.shortLabel || service}
    </span>
  );
}

/* ─── Main Dashboard ─── */
type LeadAdminDashboardProps = { initialUser?: AdminUser | null };
type ActiveSection = "overview" | "leads" | "users";

export default function LeadAdminDashboard({
  initialUser = null,
}: LeadAdminDashboardProps) {
  const router = useRouter();
  const toast = useToast();
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const hasLoadedDashboardRef = useRef(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(initialUser);
  const [sessionChecked, setSessionChecked] = useState(Boolean(initialUser));
  const [activeSection, setActiveSection] = useState<ActiveSection>("overview");
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [draftFilters, setDraftFilters] = useState<FilterState>(emptyFilters);
  const [page, setPage] = useState(1);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<LeadPagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [updatingLeadId, setUpdatingLeadId] = useState("");
  const [deletingLeadId, setDeletingLeadId] = useState("");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [userTotal, setUserTotal] = useState(0);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState<"" | UserRole>("");
  const [updatingUserId, setUpdatingUserId] = useState("");
  const [deletingUserId, setDeletingUserId] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    danger: boolean;
    loading: boolean;
    onConfirm: () => void;
  }>({
    open: false,
    title: "",
    message: "",
    confirmLabel: "Confirm",
    danger: false,
    loading: false,
    onConfirm: () => {},
  });

  const canAccessAdmin = currentUser?.role === "ADMIN";

  const filteredQuery = useMemo(
    () => buildQuery(filters, page),
    [filters, page],
  );
  const analyticsQuery = useMemo(() => buildAnalyticsQuery(filters), [filters]);
  const usersQuery = useMemo(
    () => buildUsersQuery(userSearch, userRoleFilter),
    [userRoleFilter, userSearch],
  );

  // 🔒 Lock body scroll while dashboard is open (removes the second scrollbar & hides parent decorations)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    // Add a class we can target to hide any decorative siblings from parent layouts
    body.classList.add("admin-dashboard-open");
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      body.classList.remove("admin-dashboard-open");
    };
  }, []);

  function showConfirm(opts: {
    title: string;
    message: string;
    confirmLabel?: string;
    danger?: boolean;
    onConfirm: () => Promise<void> | void;
  }) {
    setConfirmModal({
      open: true,
      title: opts.title,
      message: opts.message,
      confirmLabel: opts.confirmLabel || "Confirm",
      danger: opts.danger ?? false,
      loading: false,
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, loading: true }));
        await opts.onConfirm();
        setConfirmModal((prev) => ({ ...prev, open: false, loading: false }));
      },
    });
  }

  useEffect(() => {
    let cancelled = false;
    async function loadCurrentUser() {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
          credentials: "same-origin",
        });
        const body = (await response.json()) as CurrentUserResponse;
        if (!cancelled && response.ok && body.ok === true)
          setCurrentUser(body.user);
      } catch {
        if (!cancelled) setCurrentUser(null);
      } finally {
        if (!cancelled) setSessionChecked(true);
      }
    }
    void loadCurrentUser();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!sessionChecked || canAccessAdmin) return;
    toast.error(
      "Admin access is required.",
      currentUser
        ? "Your account does not have admin permission."
        : "Please log in with an admin account.",
    );
    router.replace(getAdminRedirectPath(Boolean(currentUser)));
  }, [canAccessAdmin, currentUser, router, sessionChecked, toast]);

  const loadDashboard = useCallback(async () => {
    if (!canAccessAdmin) return;
    setError("");
    setTableLoading(true);
    setUsersLoading(true);
    setLoading((current) => current || !hasLoadedDashboardRef.current);
    try {
      const [nextAnalytics, nextLeads, nextUsers] = await Promise.all([
        fetchAdminJson<AnalyticsResponse>(
          `/api/leads/analytics${analyticsQuery ? `?${analyticsQuery}` : ""}`,
        ),
        fetchAdminJson<LeadsResponse>(`/api/leads?${filteredQuery}`),
        fetchAdminJson<UsersResponse>(
          `/api/admin/users${usersQuery ? `?${usersQuery}` : ""}`,
        ),
      ]);
      setAnalytics(nextAnalytics);
      setLeads(nextLeads.leads);
      setPagination(nextLeads.pagination);
      setUsers(nextUsers.users);
      setUserTotal(nextUsers.total);
      hasLoadedDashboardRef.current = true;
    } catch (caught) {
      const apiError = caught as ApiError;
      if (apiError.status === 401 || apiError.status === 403) {
        setCurrentUser(null);
        router.replace("/login?next=%2Fadmin");
      }
      setError(apiError.message || "Dashboard data could not be loaded.");
      toast.error(
        "Dashboard data could not be loaded.",
        apiError.message || "Please check admin access and try again.",
      );
    } finally {
      setLoading(false);
      setTableLoading(false);
      setUsersLoading(false);
    }
  }, [
    analyticsQuery,
    canAccessAdmin,
    filteredQuery,
    router,
    toast,
    usersQuery,
  ]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadDashboard();
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadDashboard, refreshKey]);

  function logout() {
    void fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    }).catch(() => undefined);
    setCurrentUser(null);
    hasLoadedDashboardRef.current = false;
    setAnalytics(null);
    setLeads([]);
    setPagination(null);
    setUsers([]);
    setUserTotal(0);
    setSelectedLead(null);
    toast.info("Logged out.");
    router.replace("/login");
  }

  function applyFilters() {
    setFilters(draftFilters);
    setPage(1);
    setMobileFiltersOpen(false);
  }
  function resetFilters() {
    setDraftFilters(emptyFilters);
    setFilters(emptyFilters);
    setPage(1);
  }

  function handleNavigation(
    section: ActiveSection,
    service?: "" | LeadService,
  ) {
    setActiveSection(section);
    setMobileMenuOpen(false);
    if (service !== undefined) {
      const nextFilters = { ...filters, service };
      setFilters(nextFilters);
      setDraftFilters(nextFilters);
      setPage(1);
    }
    mainScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function openLead(lead: Lead) {
    if (!canAccessAdmin) return;
    setSelectedLead(lead);
    setDetailLoading(true);
    try {
      const detail = await fetchAdminJson<LeadDetailResponse>(
        `/api/leads/${lead.id}`,
      );
      setSelectedLead(detail.lead);
    } catch (caught) {
      const message =
        (caught as ApiError).message || "Lead details could not be loaded.";
      setError(message);
      toast.error("Lead details could not be loaded.", message);
    } finally {
      setDetailLoading(false);
    }
  }

  async function updateLeadStatus(leadId: string, status: LeadStatus) {
    if (!canAccessAdmin) return;
    setUpdatingLeadId(leadId);
    setError("");
    try {
      const result = await fetchAdminJson<LeadDetailResponse>(
        `/api/leads/${leadId}`,
        { method: "PATCH", body: JSON.stringify({ status }) },
      );
      setLeads((current) =>
        current.map((lead) => (lead.id === leadId ? result.lead : lead)),
      );
      setSelectedLead((current) =>
        current?.id === leadId ? result.lead : current,
      );
      setRefreshKey((current) => current + 1);
      toast.success(
        "Lead status updated.",
        `Status changed to ${statusLabel(status)}.`,
      );
    } catch (caught) {
      const message =
        (caught as ApiError).message || "Lead status could not be updated.";
      setError(message);
      toast.error("Lead status could not be updated.", message);
    } finally {
      setUpdatingLeadId("");
    }
  }

  function deleteLead(lead: Lead) {
    showConfirm({
      title: "Delete lead",
      message: `Delete ${lead.name}'s lead permanently? This also removes all attached uploads.`,
      confirmLabel: "Delete",
      danger: true,
      onConfirm: async () => {
        setDeletingLeadId(lead.id);
        setError("");
        try {
          await fetchAdminJson<DeleteLeadResponse>(`/api/leads/${lead.id}`, {
            method: "DELETE",
          });
          setLeads((current) => current.filter((item) => item.id !== lead.id));
          setSelectedLead((current) =>
            current?.id === lead.id ? null : current,
          );
          setRefreshKey((current) => current + 1);
          toast.success("Lead deleted.", `${lead.name}'s record was removed.`);
        } catch (caught) {
          const message =
            (caught as ApiError).message || "Lead could not be deleted.";
          setError(message);
          toast.error("Lead could not be deleted.", message);
        } finally {
          setDeletingLeadId("");
        }
      },
    });
  }

  async function updateUserRole(user: AdminUser, role: UserRole) {
    if (!canAccessAdmin || user.role === role) return;
    setUpdatingUserId(user.id);
    try {
      const result = await fetchAdminJson<UserDetailResponse>(
        `/api/admin/users/${user.id}`,
        { method: "PATCH", body: JSON.stringify({ role }) },
      );
      setUsers((current) =>
        current.map((item) => (item.id === user.id ? result.user : item)),
      );
      toast.success("User role updated.", `${user.name} is now ${role}.`);
    } catch (caught) {
      toast.error(
        "User role could not be updated.",
        (caught as ApiError).message || "",
      );
    } finally {
      setUpdatingUserId("");
    }
  }

  async function toggleUserActive(user: AdminUser) {
    if (!canAccessAdmin) return;
    setUpdatingUserId(user.id);
    try {
      const result = await fetchAdminJson<UserDetailResponse>(
        `/api/admin/users/${user.id}`,
        { method: "PATCH", body: JSON.stringify({ isActive: !user.isActive }) },
      );
      setUsers((current) =>
        current.map((item) => (item.id === user.id ? result.user : item)),
      );
      toast.success(
        result.user.isActive ? "User activated." : "User disabled.",
        `${user.name}'s account was updated.`,
      );
    } catch (caught) {
      toast.error(
        "User could not be updated.",
        (caught as ApiError).message || "",
      );
    } finally {
      setUpdatingUserId("");
    }
  }

  function deleteUserRecord(user: AdminUser) {
    showConfirm({
      title: "Delete user",
      message: `Delete ${user.name}'s account permanently? This cannot be undone.`,
      confirmLabel: "Delete",
      danger: true,
      onConfirm: async () => {
        setDeletingUserId(user.id);
        try {
          await fetchAdminJson<DeleteUserResponse>(
            `/api/admin/users/${user.id}`,
            { method: "DELETE" },
          );
          setUsers((current) => current.filter((item) => item.id !== user.id));
          setUserTotal((current) => Math.max(current - 1, 0));
          toast.success("User deleted.", `${user.name}'s account was removed.`);
        } catch (caught) {
          toast.error(
            "User could not be deleted.",
            (caught as ApiError).message || "",
          );
        } finally {
          setDeletingUserId("");
        }
      },
    });
  }

  if (!sessionChecked || !canAccessAdmin) {
    return (
      <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#faf8f5]">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
          <Spinner />
          <span className="font-brand-sans text-[13px] font-semibold text-[var(--brand-navy)]">
            {sessionChecked ? "Redirecting..." : "Checking access..."}
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Global style: hide parent decorative orbs while dashboard is open */}
      <style jsx global>{`
        body.admin-dashboard-open
          > *:not([data-admin-root]):not(script):not(style) {
          display: none !important;
        }
        body.admin-dashboard-open {
          overflow: hidden !important;
        }
      `}</style>

      <div
        data-admin-root
        className="fixed inset-0 z-[2000] flex overflow-hidden bg-[#f5f3ef] text-[var(--brand-navy)]"
      >
        {/* Sidebar - Desktop */}
        <aside className="hidden w-[210px] shrink-0 flex-col border-r border-black/[0.06] bg-white/60 backdrop-blur-xl lg:flex">
          <Sidebar
            activeSection={activeSection}
            filters={filters}
            onNavigate={handleNavigation}
            onRefresh={() => setRefreshKey((c) => c + 1)}
            onLogout={logout}
            currentUser={currentUser}
          />
        </aside>

        {/* Main area */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className="shrink-0 border-b border-black/[0.06] bg-white/70 px-3 py-2 backdrop-blur-xl sm:px-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--brand-navy)] transition-colors hover:bg-black/5 lg:hidden"
                  aria-label="Menu"
                >
                  <Menu size={18} />
                </button>
                <h1 className="truncate font-brand-sans text-[14px] font-bold text-[var(--brand-navy)] sm:text-[15px]">
                  {activeSection === "overview" && "Overview"}
                  {activeSection === "leads" && "Leads"}
                  {activeSection === "users" && "Users"}
                </h1>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {currentUser && (
                  <span className="mr-2 hidden max-w-[140px] truncate font-brand-sans text-[11px] font-semibold text-[var(--brand-text-muted)] sm:block">
                    {currentUser.name}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setRefreshKey((c) => c + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--brand-text-muted)] transition-colors hover:bg-black/5 hover:text-[var(--brand-navy)]"
                  aria-label="Refresh"
                >
                  <RefreshCw size={15} />
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--brand-text-muted)] transition-colors hover:bg-black/5 hover:text-[var(--brand-navy)]"
                  aria-label="Log out"
                >
                  <LogOut size={15} />
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <main
            ref={mainScrollRef}
            className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden"
            data-lenis-prevent
          >
            <div className="mx-auto w-full max-w-[1280px] px-3 py-3 sm:px-4 sm:py-4 lg:px-5">
              {error && (
                <div className="mb-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 font-brand-sans text-[11px] font-semibold text-red-800">
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                  <span className="min-w-0 break-words">{error}</span>
                </div>
              )}

              {activeSection === "overview" && (
                <Overview
                  analytics={analytics}
                  loading={loading}
                  filters={filters}
                />
              )}

              {activeSection === "leads" && (
                <>
                  <LeadFilters
                    draftFilters={draftFilters}
                    setDraftFilters={setDraftFilters}
                    onApply={applyFilters}
                    onReset={resetFilters}
                    loading={tableLoading}
                    mobileOpen={mobileFiltersOpen}
                    setMobileOpen={setMobileFiltersOpen}
                  />
                  <LeadTable
                    leads={leads}
                    pagination={pagination}
                    loading={tableLoading}
                    updatingLeadId={updatingLeadId}
                    deletingLeadId={deletingLeadId}
                    onOpenLead={openLead}
                    onUpdateStatus={updateLeadStatus}
                    onDeleteLead={deleteLead}
                    onPageChange={setPage}
                  />
                </>
              )}

              {activeSection === "users" && (
                <UserManagement
                  users={users}
                  total={userTotal}
                  loading={usersLoading}
                  search={userSearch}
                  roleFilter={userRoleFilter}
                  updatingUserId={updatingUserId}
                  deletingUserId={deletingUserId}
                  onSearchChange={setUserSearch}
                  onRoleFilterChange={setUserRoleFilter}
                  onRefresh={() => setRefreshKey((c) => c + 1)}
                  onUpdateRole={updateUserRole}
                  onToggleActive={toggleUserActive}
                  onDeleteUser={deleteUserRecord}
                />
              )}
            </div>
          </main>
        </div>

        {/* Mobile sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[80] lg:hidden">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside className="absolute left-0 top-0 h-full w-[250px] max-w-[85vw] border-r border-black/[0.06] bg-[#faf8f5] shadow-2xl">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
                  <span className="font-brand-sans text-[14px] font-bold">
                    Menu
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-black/5"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
                <Sidebar
                  activeSection={activeSection}
                  filters={filters}
                  onNavigate={handleNavigation}
                  onRefresh={() => setRefreshKey((c) => c + 1)}
                  onLogout={logout}
                  currentUser={currentUser}
                />
              </div>
            </aside>
          </div>
        )}

        {selectedLead && (
          <LeadDetailDrawer
            lead={selectedLead}
            loading={detailLoading}
            updatingLeadId={updatingLeadId}
            deletingLeadId={deletingLeadId}
            onClose={() => setSelectedLead(null)}
            onUpdateStatus={updateLeadStatus}
            onDeleteLead={deleteLead}
          />
        )}

        <ConfirmModal
          open={confirmModal.open}
          title={confirmModal.title}
          message={confirmModal.message}
          confirmLabel={confirmModal.confirmLabel}
          danger={confirmModal.danger}
          loading={confirmModal.loading}
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal((prev) => ({ ...prev, open: false }))}
        />
      </div>
    </>
  );
}

/* ─── Sidebar (NO counts anymore) ─── */
function Sidebar({
  activeSection,
  filters,
  onNavigate,
  onRefresh,
  onLogout,
  currentUser,
}: {
  activeSection: ActiveSection;
  filters: FilterState;
  onNavigate: (section: ActiveSection, service?: "" | LeadService) => void;
  onRefresh: () => void;
  onLogout: () => void;
  currentUser: AdminUser | null;
}) {
  return (
    <div className="flex h-full flex-col overflow-y-auto px-3 py-3">
      {/* Brand */}
      <div className="mb-4 flex items-center gap-2.5 px-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-navy)] text-[var(--brand-gold)]">
          <ShieldCheck size={15} />
        </span>
        <div className="min-w-0">
          <p className="truncate font-brand-sans text-[13px] font-bold leading-tight">
            Admin
          </p>
          <p className="truncate font-brand-sans text-[9px] font-semibold text-[var(--brand-text-muted)]">
            {currentUser?.name || "Lead system"}
          </p>
        </div>
      </div>

      <p className="mb-1 px-2 font-brand-sans text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-muted)]">
        Dashboard
      </p>
      <nav className="space-y-0.5">
        <NavItem
          active={activeSection === "overview"}
          icon={<LayoutDashboard size={15} />}
          label="Overview"
          onClick={() => onNavigate("overview")}
        />
        <NavItem
          active={activeSection === "leads" && !filters.service}
          icon={<Inbox size={15} />}
          label="All leads"
          onClick={() => onNavigate("leads", "")}
        />
      </nav>

      <p className="mb-1 mt-4 px-2 font-brand-sans text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-muted)]">
        Services
      </p>
      <nav className="space-y-0.5">
        {services.map((service) => (
          <NavItem
            key={service.value}
            active={
              activeSection === "leads" && filters.service === service.value
            }
            icon={<ServiceIcon service={service.value} size={15} />}
            label={service.shortLabel}
            onClick={() => onNavigate("leads", service.value)}
          />
        ))}
      </nav>

      <p className="mb-1 mt-4 px-2 font-brand-sans text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-muted)]">
        System
      </p>
      <nav className="space-y-0.5">
        <NavItem
          active={activeSection === "users"}
          icon={<Users size={15} />}
          label="Users"
          onClick={() => onNavigate("users")}
        />
      </nav>

      <div className="mt-auto space-y-0.5 border-t border-black/[0.06] pt-3">
        <NavItem
          icon={<RefreshCw size={15} />}
          label="Refresh"
          onClick={onRefresh}
        />
        <NavItem
          icon={<LogOut size={15} />}
          label="Log out"
          onClick={onLogout}
        />
      </div>
    </div>
  );
}

function NavItem({
  active = false,
  icon,
  label,
  onClick,
}: {
  active?: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-left font-brand-sans text-[12px] transition-colors ${
        active
          ? "bg-[var(--brand-navy)]/[0.07] font-bold text-[var(--brand-navy)]"
          : "font-semibold text-[var(--brand-text-muted)] hover:bg-black/[0.04] hover:text-[var(--brand-navy)]"
      }`}
    >
      <span className={active ? "text-[var(--brand-gold-700)]" : ""}>
        {icon}
      </span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </button>
  );
}

/* ─── Overview Section ─── */
function Overview({
  analytics,
  loading,
  filters,
}: {
  analytics: AnalyticsResponse | null;
  loading: boolean;
  filters: FilterState;
}) {
  const summary = analytics?.summary;
  const wonRate =
    summary && summary.total > 0 ? summary.wonCount / summary.total : 0;

  return (
    <div>
      <div className="mb-3 flex items-end justify-between">
        <div className="min-w-0">
          <h2 className="font-brand-sans text-[16px] font-bold text-[var(--brand-navy)] sm:text-[18px]">
            Overview
          </h2>
          <p className="truncate font-brand-sans text-[11px] font-semibold text-[var(--brand-text-muted)]">
            {filters.dateFrom || filters.dateTo
              ? `${filters.dateFrom || "Start"} — ${filters.dateTo || "Today"}`
              : "All time"}
          </p>
        </div>
      </div>

      <div className="grid gap-2.5 grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={<Inbox size={15} />}
          label="Total"
          value={summary ? formatNumber(summary.total) : loading ? "..." : "0"}
          detail={`${summary ? formatNumber(summary.newCount) : "0"} new`}
        />
        <MetricCard
          icon={<Activity size={15} />}
          label="Active"
          value={
            summary ? formatNumber(summary.activeCount) : loading ? "..." : "0"
          }
          detail="In pipeline"
        />
        <MetricCard
          icon={<CheckCircle2 size={15} />}
          label="Won rate"
          value={summary ? formatPercent(wonRate) : loading ? "..." : "0%"}
          detail={`${summary ? formatNumber(summary.wonCount) : "0"} won`}
        />
        <MetricCard
          icon={<Paperclip size={15} />}
          label="Files"
          value={
            summary
              ? formatNumber(summary.attachmentCount)
              : loading
                ? "..."
                : "0"
          }
          detail={`${summary ? formatNumber(summary.leadsWithAttachments) : "0"} leads`}
        />
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-[1.4fr_0.9fr]">
        <TrendChart analytics={analytics} />
        <ServiceBreakdown analytics={analytics} />
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-[0.9fr_1.1fr]">
        <StatusBreakdown analytics={analytics} />
        <RecentLeads analytics={analytics} />
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-white/70 bg-white/50 p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate font-brand-sans text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--brand-text-muted)]">
          {label}
        </p>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-navy)] text-[var(--brand-gold)]">
          {icon}
        </span>
      </div>
      <p className="mt-1.5 truncate font-brand-sans text-[22px] font-bold leading-none text-[var(--brand-navy)] sm:text-[24px]">
        {value}
      </p>
      <p className="mt-1 truncate font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
        {detail}
      </p>
    </div>
  );
}

function TrendChart({ analytics }: { analytics: AnalyticsResponse | null }) {
  const daily = analytics?.daily || [];
  const max = Math.max(...daily.map((item) => item.count), 1);
  const hasData = daily.some((item) => item.count > 0);

  return (
    <div className="min-w-0 rounded-xl border border-white/70 bg-white/50 p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
          Daily trend
        </h3>
        <BarChart3 size={16} className="text-[var(--brand-text-muted)]" />
      </div>
      <div className="mt-3 h-[160px] overflow-x-auto" data-lenis-prevent>
        {hasData ? (
          <div
            className="flex h-full min-w-[420px] items-end gap-1 border-b border-black/[0.06] pb-5"
            aria-label="Daily lead volume chart"
          >
            {daily.map((item) => {
              const height = Math.max((item.count / max) * 100, 3);
              return (
                <div
                  key={item.date}
                  className="group relative flex h-full flex-1 min-w-4 items-end justify-center"
                >
                  <div
                    className="w-full max-w-[18px] rounded-t-md bg-gradient-to-t from-[var(--brand-navy)] to-[var(--brand-navy)]/70 transition-opacity group-hover:opacity-80"
                    style={{ height: `${height}%` }}
                  />
                  <div className="pointer-events-none absolute bottom-[calc(100%+4px)] left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--brand-navy)] px-2 py-1 font-brand-sans text-[9px] font-bold text-white shadow group-hover:block">
                    {formatDate(item.date)}: {item.count}
                  </div>
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-brand-sans text-[8px] font-semibold text-[var(--brand-text-muted)]">
                    {item.date.slice(8)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyPanel icon={<BarChart3 size={20} />} title="No data" />
        )}
      </div>
    </div>
  );
}

function ServiceBreakdown({
  analytics,
}: {
  analytics: AnalyticsResponse | null;
}) {
  const rows = analytics?.byService || [];
  const max = Math.max(...rows.map((item) => item.count), 1);

  return (
    <div className="min-w-0 rounded-xl border border-white/70 bg-white/50 p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
          By service
        </h3>
        <Database size={16} className="text-[var(--brand-text-muted)]" />
      </div>
      <div className="mt-3 space-y-2.5">
        {rows.map((row) => (
          <div key={row.service}>
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-1.5 font-brand-sans text-[11px] font-semibold text-[var(--brand-navy)]">
                <ServiceIcon service={row.service} size={13} />
                <span className="truncate">
                  {services.find((s) => s.value === row.service)?.shortLabel ||
                    row.service}
                </span>
              </span>
              <span className="shrink-0 font-brand-sans text-[10px] font-bold text-[var(--brand-text-muted)]">
                {formatNumber(row.count)}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-black/[0.06]">
              <div
                className="h-full rounded-full bg-[var(--brand-navy)]/60"
                style={{
                  width: `${Math.max((row.count / max) * 100, row.count ? 6 : 0)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBreakdown({
  analytics,
}: {
  analytics: AnalyticsResponse | null;
}) {
  const rows = analytics?.byStatus || [];
  const total = rows.reduce((sum, row) => sum + row.count, 0);

  return (
    <div className="min-w-0 rounded-xl border border-white/70 bg-white/50 p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
          Pipeline
        </h3>
        <Clock3 size={16} className="text-[var(--brand-text-muted)]" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {rows.map((row) => {
          const c = statusColor[row.status];
          return (
            <div
              key={row.status}
              className={`min-w-0 rounded-lg border p-2 ${c.border} ${c.bg}`}
            >
              <StatusBadge status={row.status} />
              <p className="mt-1.5 font-brand-sans text-[18px] font-bold leading-none">
                {formatNumber(row.count)}
              </p>
              <p className="mt-0.5 font-brand-sans text-[9px] font-semibold text-[var(--brand-text-muted)]">
                {total > 0 ? formatPercent(row.count / total) : "0%"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecentLeads({ analytics }: { analytics: AnalyticsResponse | null }) {
  const recent = analytics?.recent || [];

  return (
    <div className="min-w-0 rounded-xl border border-white/70 bg-white/50 p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
          Recent
        </h3>
        <Inbox size={16} className="text-[var(--brand-text-muted)]" />
      </div>
      <div className="mt-3 space-y-1.5">
        {recent.length > 0 ? (
          recent.map((lead) => (
            <div
              key={lead.id}
              className="flex items-center justify-between gap-2 rounded-lg border border-black/[0.04] bg-white/60 px-2.5 py-2"
            >
              <div className="min-w-0">
                <p className="truncate font-brand-sans text-[12px] font-bold text-[var(--brand-navy)]">
                  {lead.name}
                </p>
                <p className="truncate font-brand-sans text-[9px] font-semibold text-[var(--brand-text-muted)]">
                  {services.find((s) => s.value === lead.service)?.shortLabel} ·{" "}
                  {formatDateTime(lead.createdAt)}
                </p>
              </div>
              <StatusBadge status={lead.status} />
            </div>
          ))
        ) : (
          <EmptyPanel icon={<Inbox size={18} />} title="No recent leads" />
        )}
      </div>
    </div>
  );
}

/* ─── Lead Filters (collapsible on mobile) ─── */
function LeadFilters({
  draftFilters,
  setDraftFilters,
  onApply,
  onReset,
  loading,
  mobileOpen,
  setMobileOpen,
}: {
  draftFilters: FilterState;
  setDraftFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onApply: () => void;
  onReset: () => void;
  loading: boolean;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const activeFiltersCount =
    (draftFilters.search ? 1 : 0) +
    (draftFilters.service ? 1 : 0) +
    (draftFilters.status ? 1 : 0) +
    (draftFilters.dateFrom ? 1 : 0) +
    (draftFilters.dateTo ? 1 : 0);

  return (
    <div className="mb-3 rounded-xl border border-white/70 bg-white/50 p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <Filter
            size={14}
            className="shrink-0 text-[var(--brand-text-muted)]"
          />
          <h2 className="truncate font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
            Filters
          </h2>
          {activeFiltersCount > 0 && (
            <span className="rounded-md bg-[var(--brand-navy)] px-1.5 py-0.5 font-brand-sans text-[9px] font-bold text-white">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center gap-1 rounded-lg border border-black/[0.06] px-2.5 py-1.5 font-brand-sans text-[11px] font-bold text-[var(--brand-navy)] transition-colors hover:bg-black/5 sm:hidden"
          >
            {mobileOpen ? <X size={12} /> : <SlidersHorizontal size={12} />}
            {mobileOpen ? "Close" : "Show"}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="hidden rounded-lg px-2.5 py-1.5 font-brand-sans text-[11px] font-bold text-[var(--brand-text-muted)] transition-colors hover:bg-black/5 sm:block"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onApply}
            disabled={loading}
            className="hidden items-center gap-1.5 rounded-lg bg-[var(--brand-navy)] px-3 py-1.5 font-brand-sans text-[11px] font-bold text-white transition-colors hover:bg-[var(--brand-navy)]/90 disabled:opacity-50 sm:flex"
          >
            <Search size={12} />
            Apply
          </button>
        </div>
      </div>

      {/* Filter fields */}
      <div
        className={`${mobileOpen ? "grid" : "hidden sm:grid"} mt-3 gap-2.5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-5`}
      >
        <div className="min-w-0 xl:col-span-1">
          <span className="mb-1.5 block font-brand-sans text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)]/70">
            Search
          </span>
          <div className="flex h-[40px] items-center gap-2 rounded-xl border border-white/60 bg-white/50 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.5)_inset]">
            <Search
              size={13}
              className="shrink-0 text-[var(--brand-text-muted)]"
            />
            <input
              value={draftFilters.search}
              onChange={(e) =>
                setDraftFilters((c) => ({ ...c, search: e.target.value }))
              }
              placeholder="Name, phone, email"
              className="h-full min-w-0 flex-1 border-0 bg-transparent font-brand-sans text-[12px] font-semibold text-[var(--brand-navy)] outline-none placeholder:text-[var(--brand-text-muted)]/50"
            />
          </div>
        </div>

        <CustomDropdown
          label="Service"
          value={draftFilters.service}
          onChange={(v) =>
            setDraftFilters((c) => ({ ...c, service: v as "" | LeadService }))
          }
          options={[
            { value: "", label: "All services" },
            ...services.map((s) => ({ value: s.value, label: s.label })),
          ]}
        />

        <CustomDropdown
          label="Status"
          value={draftFilters.status}
          onChange={(v) =>
            setDraftFilters((c) => ({ ...c, status: v as "" | LeadStatus }))
          }
          options={[
            { value: "", label: "All statuses" },
            ...statuses.map((s) => ({ value: s.value, label: s.label })),
          ]}
        />

        <ClayDatePicker
          id="admin-date-from"
          label="From"
          value={draftFilters.dateFrom}
          onChange={(v) => setDraftFilters((c) => ({ ...c, dateFrom: v }))}
          placeholder="Start date"
        />

        <ClayDatePicker
          id="admin-date-to"
          label="To"
          value={draftFilters.dateTo}
          onChange={(v) => setDraftFilters((c) => ({ ...c, dateTo: v }))}
          placeholder="End date"
        />

        {/* Mobile-only apply/reset */}
        <div className="flex gap-2 sm:hidden">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 rounded-lg border border-black/[0.08] px-3 py-2 font-brand-sans text-[11px] font-bold text-[var(--brand-text-muted)] transition-colors hover:bg-black/5"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onApply}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[var(--brand-navy)] px-3 py-2 font-brand-sans text-[11px] font-bold text-white transition-colors hover:bg-[var(--brand-navy)]/90 disabled:opacity-50"
          >
            <Search size={12} />
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Lead Table (with mobile card view) ─── */
function LeadTable({
  leads,
  pagination,
  loading,
  updatingLeadId,
  deletingLeadId,
  onOpenLead,
  onUpdateStatus,
  onDeleteLead,
  onPageChange,
}: {
  leads: Lead[];
  pagination: LeadPagination | null;
  loading: boolean;
  updatingLeadId: string;
  deletingLeadId: string;
  onOpenLead: (lead: Lead) => void;
  onUpdateStatus: (leadId: string, status: LeadStatus) => void;
  onDeleteLead: (lead: Lead) => void;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-white/70 bg-white/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between gap-2 border-b border-black/[0.06] px-3 py-2.5 sm:px-4 sm:py-3">
        <h2 className="font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
          Leads
        </h2>
        {pagination && (
          <span className="shrink-0 rounded-md bg-black/[0.05] px-2 py-0.5 font-brand-sans text-[10px] font-bold text-[var(--brand-text-muted)]">
            {formatNumber(pagination.total)}
          </span>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block" data-lenis-prevent>
        <table className="w-full min-w-[860px] text-left">
          <thead>
            <tr className="border-b border-black/[0.06] font-brand-sans text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--brand-text-muted)]">
              <th className="px-4 py-2.5">Lead</th>
              <th className="px-3 py-2.5">Service</th>
              <th className="px-3 py-2.5">Contact</th>
              <th className="px-3 py-2.5">Status</th>
              <th className="px-3 py-2.5">Files</th>
              <th className="px-3 py-2.5">Date</th>
              <th className="px-4 py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04]">
            {loading ? (
              <tr>
                <td colSpan={7}>
                  <EmptyPanel
                    icon={<RefreshCw size={18} />}
                    title="Loading..."
                  />
                </td>
              </tr>
            ) : leads.length > 0 ? (
              leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="transition-colors hover:bg-white/40"
                >
                  <td className="px-4 py-2.5">
                    <button
                      type="button"
                      onClick={() => onOpenLead(lead)}
                      className="block max-w-[200px] text-left"
                    >
                      <span className="block truncate font-brand-sans text-[12px] font-bold text-[var(--brand-navy)]">
                        {lead.name}
                      </span>
                      <span className="mt-0.5 block truncate font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
                        {lead.message
                          ? lead.message.length > 40
                            ? lead.message.slice(0, 40) + "…"
                            : lead.message
                          : "No message"}
                      </span>
                    </button>
                  </td>
                  <td className="px-3 py-2.5">
                    <ServiceBadge service={lead.service} />
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="space-y-0.5 font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
                      {lead.email && (
                        <p className="flex items-center gap-1">
                          <Mail size={10} />
                          {lead.email}
                        </p>
                      )}
                      <p className="flex items-center gap-1">
                        <Phone size={10} />
                        {lead.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 min-w-[130px]">
                    <CustomDropdown
                      value={lead.status}
                      onChange={(v) => onUpdateStatus(lead.id, v as LeadStatus)}
                      options={statuses.map((s) => ({
                        value: s.value,
                        label: s.label,
                      }))}
                      compact
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="inline-flex items-center gap-1 font-brand-sans text-[10px] font-bold text-[var(--brand-text-muted)]">
                      <Paperclip size={11} /> {lead.attachmentCount}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
                    {formatDateTime(lead.createdAt)}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex justify-end gap-1">
                      <SmallIconBtn
                        label="View"
                        icon={<Eye size={13} />}
                        onClick={() => onOpenLead(lead)}
                      />
                      <SmallIconBtn
                        label="Delete"
                        icon={<Trash2 size={13} />}
                        onClick={() => onDeleteLead(lead)}
                        disabled={deletingLeadId === lead.id}
                        danger
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
                  <EmptyPanel
                    icon={<Inbox size={18} />}
                    title="No leads match filters"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="divide-y divide-black/[0.04] md:hidden">
        {loading ? (
          <EmptyPanel icon={<RefreshCw size={18} />} title="Loading..." />
        ) : leads.length > 0 ? (
          leads.map((lead) => (
            <div key={lead.id} className="p-3">
              <div className="flex items-start justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onOpenLead(lead)}
                  className="min-w-0 flex-1 text-left"
                >
                  <p className="truncate font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
                    {lead.name}
                  </p>
                  <p className="mt-0.5 truncate font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
                    {lead.message
                      ? lead.message.length > 60
                        ? lead.message.slice(0, 60) + "…"
                        : lead.message
                      : "No message"}
                  </p>
                </button>
                <div className="flex shrink-0 gap-1">
                  <SmallIconBtn
                    label="View"
                    icon={<Eye size={13} />}
                    onClick={() => onOpenLead(lead)}
                  />
                  <SmallIconBtn
                    label="Delete"
                    icon={<Trash2 size={13} />}
                    onClick={() => onDeleteLead(lead)}
                    disabled={deletingLeadId === lead.id}
                    danger
                  />
                </div>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <ServiceBadge service={lead.service} />
                <StatusBadge status={lead.status} />
                {lead.attachmentCount > 0 && (
                  <span className="inline-flex items-center gap-1 font-brand-sans text-[10px] font-bold text-[var(--brand-text-muted)]">
                    <Paperclip size={10} /> {lead.attachmentCount}
                  </span>
                )}
              </div>
              <div className="mt-2 space-y-0.5 font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
                {lead.email && (
                  <p className="flex items-center gap-1 truncate">
                    <Mail size={10} className="shrink-0" />
                    <span className="truncate">{lead.email}</span>
                  </p>
                )}
                <p className="flex items-center gap-1">
                  <Phone size={10} className="shrink-0" />
                  {lead.phone}
                </p>
                <p className="mt-1">{formatDateTime(lead.createdAt)}</p>
              </div>
              <div className="mt-2">
                <CustomDropdown
                  value={lead.status}
                  onChange={(v) => onUpdateStatus(lead.id, v as LeadStatus)}
                  options={statuses.map((s) => ({
                    value: s.value,
                    label: s.label,
                  }))}
                  compact
                />
              </div>
            </div>
          ))
        ) : (
          <EmptyPanel
            icon={<Inbox size={18} />}
            title="No leads match filters"
          />
        )}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between gap-2 border-t border-black/[0.06] px-3 py-2 sm:px-4 sm:py-2.5">
          <p className="truncate font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={() => onPageChange(Math.max(pagination.page - 1, 1))}
              disabled={pagination.page <= 1}
              className="flex h-7 items-center gap-1 rounded-md px-2 font-brand-sans text-[10px] font-bold text-[var(--brand-navy)] transition-colors hover:bg-black/5 disabled:opacity-40"
            >
              <ChevronLeft size={12} />{" "}
              <span className="hidden sm:inline">Prev</span>
            </button>
            <button
              type="button"
              onClick={() =>
                onPageChange(
                  Math.min(pagination.page + 1, pagination.totalPages),
                )
              }
              disabled={pagination.page >= pagination.totalPages}
              className="flex h-7 items-center gap-1 rounded-md px-2 font-brand-sans text-[10px] font-bold text-[var(--brand-navy)] transition-colors hover:bg-black/5 disabled:opacity-40"
            >
              <span className="hidden sm:inline">Next</span>{" "}
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SmallIconBtn({
  label,
  icon,
  danger = false,
  disabled = false,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
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
function UserManagement({
  users,
  total,
  loading,
  search,
  roleFilter,
  updatingUserId,
  deletingUserId,
  onSearchChange,
  onRoleFilterChange,
  onRefresh,
  onUpdateRole,
  onToggleActive,
  onDeleteUser,
}: {
  users: AdminUser[];
  total: number;
  loading: boolean;
  search: string;
  roleFilter: "" | UserRole;
  updatingUserId: string;
  deletingUserId: string;
  onSearchChange: (v: string) => void;
  onRoleFilterChange: (v: "" | UserRole) => void;
  onRefresh: () => void;
  onUpdateRole: (u: AdminUser, r: UserRole) => void;
  onToggleActive: (u: AdminUser) => void;
  onDeleteUser: (u: AdminUser) => void;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-white/70 bg-white/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between gap-2 border-b border-black/[0.06] px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="min-w-0">
          <h2 className="font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
            Users
          </h2>
          <p className="font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
            {formatNumber(total)} accounts
          </p>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[var(--brand-text-muted)] hover:bg-black/5"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      <div className="border-b border-black/[0.06] px-3 py-3 sm:px-4">
        <div className="grid gap-2.5 grid-cols-1 sm:grid-cols-[1fr_160px]">
          <div className="min-w-0">
            <span className="mb-1.5 block font-brand-sans text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)]/70">
              Search
            </span>
            <div className="flex h-[38px] items-center gap-2 rounded-xl border border-white/60 bg-white/50 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.5)_inset]">
              <Search
                size={13}
                className="shrink-0 text-[var(--brand-text-muted)]"
              />
              <input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search users"
                className="h-full min-w-0 flex-1 border-0 bg-transparent font-brand-sans text-[12px] font-semibold text-[var(--brand-navy)] outline-none placeholder:text-[var(--brand-text-muted)]/50"
              />
            </div>
          </div>
          <CustomDropdown
            label="Role"
            value={roleFilter}
            onChange={(v) => onRoleFilterChange(v as "" | UserRole)}
            options={[
              { value: "", label: "All roles" },
              ...userRoles.map((r) => ({ value: r.value, label: r.label })),
            ]}
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block" data-lenis-prevent>
        <table className="w-full min-w-[780px] text-left">
          <thead>
            <tr className="border-b border-black/[0.06] font-brand-sans text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--brand-text-muted)]">
              <th className="px-4 py-2.5">User</th>
              <th className="px-3 py-2.5">Phone</th>
              <th className="px-3 py-2.5">Role</th>
              <th className="px-3 py-2.5">Status</th>
              <th className="px-3 py-2.5">Last login</th>
              <th className="px-3 py-2.5">Created</th>
              <th className="px-4 py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04]">
            {loading ? (
              <tr>
                <td colSpan={7}>
                  <EmptyPanel
                    icon={<RefreshCw size={18} />}
                    title="Loading..."
                  />
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-white/40"
                >
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-navy)] text-[var(--brand-gold)]">
                        <UserCog size={13} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-brand-sans text-[12px] font-bold text-[var(--brand-navy)]">
                          {user.name}
                        </p>
                        <p className="truncate font-brand-sans text-[9px] font-semibold text-[var(--brand-text-muted)]">
                          {user.id.slice(0, 12)}…
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 font-brand-sans text-[11px] font-semibold text-[var(--brand-text-muted)]">
                    {user.phone}
                  </td>
                  <td className="px-3 py-2.5 min-w-[110px]">
                    <CustomDropdown
                      value={user.role}
                      onChange={(v) => onUpdateRole(user, v as UserRole)}
                      options={userRoles.map((r) => ({
                        value: r.value,
                        label: r.label,
                      }))}
                      compact
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-brand-sans text-[10px] font-bold ${
                        user.isActive
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-red-200 bg-red-50 text-red-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${user.isActive ? "bg-green-500" : "bg-red-400"}`}
                      />
                      {user.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
                    {user.lastLoginAt
                      ? formatDateTime(user.lastLoginAt)
                      : "Never"}
                  </td>
                  <td className="px-3 py-2.5 font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
                    {formatDateTime(user.createdAt)}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onToggleActive(user)}
                        disabled={updatingUserId === user.id}
                        className="rounded-md px-2.5 py-1 font-brand-sans text-[10px] font-bold text-[var(--brand-navy)] transition-colors hover:bg-black/5 disabled:opacity-40"
                      >
                        {user.isActive ? "Disable" : "Activate"}
                      </button>
                      <SmallIconBtn
                        label="Delete"
                        icon={<Trash2 size={13} />}
                        onClick={() => onDeleteUser(user)}
                        disabled={deletingUserId === user.id}
                        danger
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
                  <EmptyPanel
                    icon={<Users size={18} />}
                    title="No users found"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="divide-y divide-black/[0.04] md:hidden">
        {loading ? (
          <EmptyPanel icon={<RefreshCw size={18} />} title="Loading..." />
        ) : users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="p-3">
              <div className="flex items-start gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-navy)] text-[var(--brand-gold)]">
                  <UserCog size={14} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
                    {user.name}
                  </p>
                  <p className="mt-0.5 truncate font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
                    {user.phone}
                  </p>
                </div>
                <SmallIconBtn
                  label="Delete"
                  icon={<Trash2 size={13} />}
                  onClick={() => onDeleteUser(user)}
                  disabled={deletingUserId === user.id}
                  danger
                />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span
                  className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-brand-sans text-[10px] font-bold ${
                    user.isActive
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${user.isActive ? "bg-green-500" : "bg-red-400"}`}
                  />
                  {user.isActive ? "Active" : "Disabled"}
                </span>
                <span className="font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
                  Last:{" "}
                  {user.lastLoginAt
                    ? formatDateTime(user.lastLoginAt)
                    : "Never"}
                </span>
              </div>
              <div className="mt-2 grid gap-2 grid-cols-[1fr_auto]">
                <CustomDropdown
                  value={user.role}
                  onChange={(v) => onUpdateRole(user, v as UserRole)}
                  options={userRoles.map((r) => ({
                    value: r.value,
                    label: r.label,
                  }))}
                  compact
                />
                <button
                  type="button"
                  onClick={() => onToggleActive(user)}
                  disabled={updatingUserId === user.id}
                  className="rounded-lg border border-black/[0.08] px-3 font-brand-sans text-[11px] font-bold text-[var(--brand-navy)] transition-colors hover:bg-black/5 disabled:opacity-40"
                >
                  {user.isActive ? "Disable" : "Activate"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <EmptyPanel icon={<Users size={18} />} title="No users found" />
        )}
      </div>
    </div>
  );
}

/* ─── Lead Detail Drawer ─── */
function LeadDetailDrawer({
  lead,
  loading,
  updatingLeadId,
  deletingLeadId,
  onClose,
  onUpdateStatus,
  onDeleteLead,
}: {
  lead: Lead;
  loading: boolean;
  updatingLeadId: string;
  deletingLeadId: string;
  onClose: () => void;
  onUpdateStatus: (id: string, s: LeadStatus) => void;
  onDeleteLead: (l: Lead) => void;
}) {
  const serviceEntries = Object.entries(lead.serviceData || {});
  const attachments = lead.attachments || [];

  return (
    <div className="fixed inset-0 z-[90]">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 h-full w-full max-w-[560px] border-l border-black/[0.06] bg-[#faf8f5] shadow-2xl">
        <div className="flex h-full flex-col">
          <div className="shrink-0 border-b border-black/[0.06] px-4 py-3 sm:px-5 sm:py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-brand-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--brand-text-muted)]">
                  Lead details
                </p>
                <h2 className="mt-1 truncate font-brand-sans text-[18px] font-bold text-[var(--brand-navy)] sm:text-[20px]">
                  {lead.name}
                </h2>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <ServiceBadge service={lead.service} />
                  <StatusBadge status={lead.status} />
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md hover:bg-black/5"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div
            className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5"
            data-lenis-prevent
          >
            {loading && (
              <div className="mb-3 flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2 font-brand-sans text-[11px] font-semibold text-[var(--brand-text-muted)]">
                <Spinner /> Loading details...
              </div>
            )}

            <DetailSection title="Contact">
              <DetailGrid
                items={[
                  ["Name", lead.name],
                  ["Email", lead.email || "Not provided"],
                  ["Phone", lead.phone],
                  ["Postcode", lead.postcode || "Not provided"],
                  ["Marketing", lead.consentMarketing ? "Yes" : "No"],
                  ["Privacy", lead.consentPrivacy ? "Yes" : "No"],
                ]}
              />
            </DetailSection>

            <DetailSection title="Message">
              <p className="whitespace-pre-wrap break-words rounded-lg border border-black/[0.06] bg-white/60 p-3 font-brand-sans text-[12px] font-semibold leading-relaxed text-[var(--brand-navy)]">
                {lead.message || "No message provided."}
              </p>
            </DetailSection>

            <DetailSection title="Service data">
              {serviceEntries.length > 0 ? (
                <DetailGrid
                  items={serviceEntries.map(([key, value]) => [
                    formatFieldLabel(key),
                    formatServiceValue(value),
                  ])}
                />
              ) : (
                <EmptyPanel
                  icon={<SlidersHorizontal size={16} />}
                  title="No service data"
                />
              )}
            </DetailSection>

            <DetailSection title="Attachments">
              {attachments.length > 0 ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  {attachments.map((a) => (
                    <AttachmentRow key={a.id} attachment={a} />
                  ))}
                </div>
              ) : (
                <EmptyPanel icon={<Paperclip size={16} />} title="No uploads" />
              )}
            </DetailSection>

            <DetailSection title="Tracking">
              <DetailGrid
                items={[
                  ["Source page", lead.sourcePage || "—"],
                  ["Referrer", lead.referrer || "—"],
                  ["UTM source", lead.utm?.source || "—"],
                  ["UTM medium", lead.utm?.medium || "—"],
                  ["UTM campaign", lead.utm?.campaign || "—"],
                  ["Created", formatDateTime(lead.createdAt)],
                  ["Updated", formatDateTime(lead.updatedAt)],
                  [
                    "Status updated",
                    lead.statusUpdatedAt
                      ? formatDateTime(lead.statusUpdatedAt)
                      : "—",
                  ],
                  ["ID", lead.id],
                ]}
              />
            </DetailSection>
          </div>

          <div className="shrink-0 border-t border-black/[0.06] px-4 py-3 sm:px-5">
            <div className="flex items-end gap-2">
              <div className="min-w-0 flex-1">
                <CustomDropdown
                  label="Update status"
                  value={lead.status}
                  onChange={(v) => onUpdateStatus(lead.id, v as LeadStatus)}
                  options={statuses.map((s) => ({
                    value: s.value,
                    label: s.label,
                  }))}
                />
              </div>
              <button
                type="button"
                onClick={() => onDeleteLead(lead)}
                disabled={deletingLeadId === lead.id}
                className="flex h-[40px] shrink-0 items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 font-brand-sans text-[11px] font-bold text-red-700 transition-colors hover:bg-red-100 disabled:opacity-50"
              >
                <Trash2 size={13} />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
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

function DetailGrid({ items }: { items: [string, string][] }) {
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

function AttachmentRow({ attachment }: { attachment: LeadAttachment }) {
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

function EmptyPanel({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex min-h-[80px] flex-col items-center justify-center rounded-lg border border-black/[0.04] bg-white/30 p-4 text-center">
      <span className="text-[var(--brand-text-muted)]">{icon}</span>
      <p className="mt-1.5 font-brand-sans text-[11px] font-semibold text-[var(--brand-text-muted)]">
        {title}
      </p>
    </div>
  );
}
