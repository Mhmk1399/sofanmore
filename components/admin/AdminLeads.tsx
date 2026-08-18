"use client";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Inbox,
  Mail,
  Paperclip,
  Phone,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";
import type * as React from "react";

import {
  ClayDatePicker,
  Spinner,
} from "@/components/lead-capture/ClayFormControls";

import {
  AttachmentRow,
  CustomDropdown,
  DetailGrid,
  DetailSection,
  EmptyPanel,
  ServiceBadge,
  SmallIconBtn,
  StatusBadge,
  formatDateTime,
  formatFieldLabel,
  formatNumber,
  formatServiceValue,
  services,
  statuses,
  type FilterState,
  type Lead,
  type LeadPagination,
  type LeadService,
  type LeadStatus,
} from "./adminShared";

function AdminStatusSelect({
  value,
  onChange,
}: {
  value: LeadStatus;
  onChange: (status: LeadStatus) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as LeadStatus)}
        className="h-[32px] w-full appearance-none rounded-xl border border-white/60 bg-white/50 px-2.5 pr-7 font-brand-sans text-[11px] font-semibold text-[var(--brand-navy)] outline-none shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.5)_inset] transition-all hover:bg-white/70"
      >
        {statuses.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 h-0 w-0 -translate-y-1/2 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-[var(--brand-text-muted)]" />
    </div>
  );
}

function AdminStatusSelectField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: LeadStatus;
  onChange: (status: LeadStatus) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-brand-sans text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)]/70">
        {label}
      </span>
      <AdminStatusSelect value={value} onChange={onChange} />
    </label>
  );
}

export function LeadFilters({
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
          variant="admin"
        />

        <ClayDatePicker
          id="admin-date-to"
          label="To"
          value={draftFilters.dateTo}
          onChange={(v) => setDraftFilters((c) => ({ ...c, dateTo: v }))}
          placeholder="End date"
          variant="admin"
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

export function LeadTable({
  leads,
  pagination,
  loading,
  deletingLeadId,
  onOpenLead,
  onUpdateStatus,
  onDeleteLead,
  onPageChange,
}: {
  leads: Lead[];
  pagination: LeadPagination | null;
  loading: boolean;
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
                    <AdminStatusSelect
                      value={lead.status}
                      onChange={(status) => onUpdateStatus(lead.id, status)}
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
                <AdminStatusSelect
                  value={lead.status}
                  onChange={(status) => onUpdateStatus(lead.id, status)}
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

export function LeadDetailDrawer({
  lead,
  loading,
  deletingLeadId,
  onClose,
  onUpdateStatus,
  onDeleteLead,
}: {
  lead: Lead;
  loading: boolean;
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
                <AdminStatusSelectField
                  label="Update status"
                  value={lead.status}
                  onChange={(status) => onUpdateStatus(lead.id, status)}
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
