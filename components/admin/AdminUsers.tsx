"use client";

import { RefreshCw, Search, Trash2, UserCog, Users } from "lucide-react";

import {
  CustomDropdown,
  EmptyPanel,
  SmallIconBtn,
  formatDateTime,
  formatNumber,
  userRoles,
  type AdminUser,
  type UserRole,
} from "./adminShared";

function UserRoleSelect({
  value,
  disabled,
  onChange,
}: {
  value: UserRole;
  disabled: boolean;
  onChange: (role: UserRole) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value as UserRole)}
        className="h-[32px] w-full appearance-none rounded-xl border border-white/60 bg-white/50 px-2.5 pr-7 font-brand-sans text-[11px] font-semibold text-[var(--brand-navy)] outline-none shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.5)_inset] transition-all hover:bg-white/70 disabled:opacity-50"
      >
        {userRoles.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 h-0 w-0 -translate-y-1/2 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-[var(--brand-text-muted)]" />
    </div>
  );
}

export default function UserManagement({
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
          <p className="font-brand-sans text-[13px] font-semibold text-[var(--brand-text-muted)]">
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
            <span className="mb-1.5 block font-brand-sans text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)]/70">
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
            <tr className="border-b border-black/[0.06] font-brand-sans text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--brand-text-muted)]">
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
                        <p className="truncate font-brand-sans text-[12px] font-semibold text-[var(--brand-text-muted)]">
                          {user.id.slice(0, 12)}…
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 font-brand-sans text-[11px] font-semibold text-[var(--brand-text-muted)]">
                    {user.phone}
                  </td>
                  <td className="px-3 py-2.5 min-w-[110px]">
                    <UserRoleSelect
                      value={user.role}
                      disabled={updatingUserId === user.id}
                      onChange={(role) => onUpdateRole(user, role)}
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-brand-sans text-[13px] font-bold ${
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
                  <td className="px-3 py-2.5 font-brand-sans text-[13px] font-semibold text-[var(--brand-text-muted)]">
                    {user.lastLoginAt
                      ? formatDateTime(user.lastLoginAt)
                      : "Never"}
                  </td>
                  <td className="px-3 py-2.5 font-brand-sans text-[13px] font-semibold text-[var(--brand-text-muted)]">
                    {formatDateTime(user.createdAt)}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onToggleActive(user)}
                        disabled={updatingUserId === user.id}
                        className="rounded-md px-2.5 py-1 font-brand-sans text-[13px] font-bold text-[var(--brand-navy)] transition-colors hover:bg-black/5 disabled:opacity-40"
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
                  <p className="mt-0.5 truncate font-brand-sans text-[13px] font-semibold text-[var(--brand-text-muted)]">
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
                  className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-brand-sans text-[13px] font-bold ${
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
                <span className="font-brand-sans text-[13px] font-semibold text-[var(--brand-text-muted)]">
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
