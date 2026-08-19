"use client";

import {
  Inbox,
  LayoutDashboard,
  LogOut,
  FolderOpen,
  RefreshCw,
  ShieldCheck,
  UserCircle,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

import {
  ServiceIcon,
  services,
  type ActiveSection,
  type AdminUser,
  type FilterState,
  type LeadService,
} from "./adminShared";

export default function Sidebar({
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
          active={activeSection === "profile"}
          icon={<UserCircle size={15} />}
          label="Profile"
          onClick={() => onNavigate("profile")}
        />
        <NavItem
          active={activeSection === "projects"}
          icon={<FolderOpen size={15} />}
          label="Projects"
          onClick={() => onNavigate("projects")}
        />
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
  icon: ReactNode;
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
