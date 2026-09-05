"use client";

import { Check, KeyRound, Phone, Save, UserCircle } from "lucide-react";
import type { ReactNode } from "react";

import { Spinner } from "@/components/lead-capture/ClayFormControls";

import {
  AdminTextField,
  formatDateTime,
  type AdminUser,
} from "./adminShared";

export type ProfileFormState = {
  name: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
};

export const createProfileFormState = (
  user: AdminUser | null,
): ProfileFormState => ({
  name: user?.name || "",
  phone: user?.phone || "",
  currentPassword: "",
  newPassword: "",
});

export default function AdminProfile({
  user,
  form,
  saving,
  onFormChange,
  onSave,
}: {
  user: AdminUser | null;
  form: ProfileFormState;
  saving: boolean;
  onFormChange: (form: ProfileFormState) => void;
  onSave: () => void;
}) {
  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section className="rounded-xl border border-white/70 bg-white/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="border-b border-black/[0.06] px-3 py-3 sm:px-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-navy)] text-[var(--brand-gold)]">
              <UserCircle size={16} />
            </span>
            <div className="min-w-0">
              <h2 className="font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
                Profile settings
              </h2>
              <p className="font-brand-sans text-[13px] font-semibold text-[var(--brand-text-muted)]">
                Update your admin account details
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-3 sm:p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <AdminTextField
              label="Name"
              value={form.name}
              onChange={(name) => onFormChange({ ...form, name })}
              placeholder="Your name"
            />
            <AdminTextField
              label="Phone"
              value={form.phone}
              onChange={(phone) => onFormChange({ ...form, phone })}
              placeholder="+44..."
              inputMode="tel"
            />
          </div>

          <div className="rounded-xl border border-black/[0.06] bg-white/40 p-3">
            <div className="mb-3 flex items-center gap-2">
              <KeyRound
                size={14}
                className="text-[var(--brand-text-muted)]"
              />
              <p className="font-brand-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)]/70">
                Password
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <AdminTextField
                label="Current password"
                value={form.currentPassword}
                onChange={(currentPassword) =>
                  onFormChange({ ...form, currentPassword })
                }
                placeholder="Required to change password"
                type="password"
              />
              <AdminTextField
                label="New password"
                value={form.newPassword}
                onChange={(newPassword) =>
                  onFormChange({ ...form, newPassword })
                }
                placeholder="Strong new password"
                type="password"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand-navy)] px-4 font-brand-sans text-[12px] font-bold text-white transition-colors hover:bg-[var(--brand-navy)]/92 disabled:opacity-50 sm:w-auto sm:justify-self-start"
          >
            {saving ? <Spinner /> : <Save size={14} />}
            Save profile
          </button>
        </div>
      </section>

      <aside className="rounded-xl border border-white/70 bg-white/50 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-navy)] text-[var(--brand-gold)]">
            <UserCircle size={20} />
          </span>
          <div className="min-w-0">
            <p className="truncate font-brand-sans text-[14px] font-bold text-[var(--brand-navy)]">
              {user?.name || "Admin"}
            </p>
            <p className="mt-0.5 font-brand-sans text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--brand-text-muted)]">
              {user?.role || "ADMIN"}
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-2">
          <ProfileFact
            icon={<Phone size={13} />}
            label="Phone"
            value={user?.phone || "Not provided"}
          />
          <ProfileFact
            icon={<Check size={13} />}
            label="Status"
            value={user?.isActive ? "Active" : "Disabled"}
          />
          <ProfileFact
            icon={<UserCircle size={13} />}
            label="Last login"
            value={user?.lastLoginAt ? formatDateTime(user.lastLoginAt) : "Never"}
          />
        </div>
      </aside>
    </div>
  );
}

function ProfileFact({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-lg border border-black/[0.05] bg-white/45 px-3 py-2">
      <span className="shrink-0 text-[var(--brand-text-muted)]">{icon}</span>
      <div className="min-w-0">
        <p className="font-brand-sans text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--brand-text-muted)]">
          {label}
        </p>
        <p className="truncate font-brand-sans text-[11px] font-bold text-[var(--brand-navy)]">
          {value}
        </p>
      </div>
    </div>
  );
}
