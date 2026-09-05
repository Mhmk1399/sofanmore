"use client";

import {
  Activity,
  BarChart3,
  CheckCircle2,
  Clock3,
  Database,
  Inbox,
  Paperclip,
} from "lucide-react";
import type { ReactNode } from "react";

import {
  EmptyPanel,
  ServiceIcon,
  StatusBadge,
  formatDate,
  formatDateTime,
  formatNumber,
  formatPercent,
  services,
  statusColor,
  type AnalyticsResponse,
  type FilterState,
} from "./adminShared";

export default function Overview({
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
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-white/70 bg-white/50 p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate font-brand-sans text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--brand-text-muted)]">
          {label}
        </p>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-navy)] text-[var(--brand-gold)]">
          {icon}
        </span>
      </div>
      <p className="mt-1.5 truncate font-brand-sans text-[22px] font-bold leading-none text-[var(--brand-navy)] sm:text-[24px]">
        {value}
      </p>
      <p className="mt-1 truncate font-brand-sans text-[13px] font-semibold text-[var(--brand-text-muted)]">
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
                  <div className="pointer-events-none absolute bottom-[calc(100%+4px)] left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--brand-navy)] px-2 py-1 font-brand-sans text-[12px] font-bold text-white shadow group-hover:block">
                    {formatDate(item.date)}: {item.count}
                  </div>
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-brand-sans text-[11px] font-semibold text-[var(--brand-text-muted)]">
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
              <span className="shrink-0 font-brand-sans text-[13px] font-bold text-[var(--brand-text-muted)]">
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
              <p className="mt-0.5 font-brand-sans text-[12px] font-semibold text-[var(--brand-text-muted)]">
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
                <p className="truncate font-brand-sans text-[12px] font-semibold text-[var(--brand-text-muted)]">
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