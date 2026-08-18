"use client";

import {
  Check,
  Package,
  Paperclip,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { useRef } from "react";

import { Spinner } from "@/components/lead-capture/ClayFormControls";

import {
  AdminTextField,
  AdminTextareaField,
  EmptyPanel,
  SmallIconBtn,
  formatDateTime,
  formatFileSize,
  formatNumber,
  type Product,
  type ProductFormState,
  type ProductImageUploadState,
} from "./adminShared";

export default function ProductManagement({
  products,
  total,
  latestCode,
  loading,
  search,
  form,
  imageUpload,
  saving,
  deletingProductId,
  onSearchChange,
  onFormChange,
  onUploadImage,
  onSave,
  onEdit,
  onReset,
  onDelete,
  onRefresh,
}: {
  products: Product[];
  total: number;
  latestCode: number | null;
  loading: boolean;
  search: string;
  form: ProductFormState;
  imageUpload: ProductImageUploadState | null;
  saving: boolean;
  deletingProductId: string;
  onSearchChange: (value: string) => void;
  onFormChange: (value: ProductFormState) => void;
  onUploadImage: (file: File) => void;
  onSave: () => void;
  onEdit: (product: Product) => void;
  onReset: () => void;
  onDelete: (product: Product) => void;
  onRefresh: () => void;
}) {
  const hasPreview = form.imageUrl.trim().length > 0;
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="grid gap-3 xl:grid-cols-[390px_minmax(0,1fr)]">
      <section className="rounded-xl border border-white/70 bg-white/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="border-b border-black/[0.06] px-3 py-3 sm:px-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-navy)] text-[var(--brand-gold)]">
              <Package size={16} />
            </span>
            <div className="min-w-0">
              <h2 className="font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
                {form.id ? "Edit product" : "New product"}
              </h2>
              <p className="font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
                {latestCode
                  ? `Latest product code: ${latestCode}`
                  : "First product code starts at 1000"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 p-3 sm:p-4">
          <AdminTextField
            label="Product code"
            value={form.productCode}
            onChange={(value) =>
              onFormChange({
                ...form,
                productCode: value.replace(/[^\d]/g, "").slice(0, 9),
              })
            }
            placeholder={latestCode ? String(latestCode + 1) : "1000"}
            inputMode="numeric"
          />
          <AdminTextField
            label="Product name"
            value={form.name}
            onChange={(value) => onFormChange({ ...form, name: value })}
            placeholder="e.g. Curved velvet sofa"
          />
          <AdminTextField
            label="Image URL"
            value={form.imageUrl}
            onChange={(value) =>
              onFormChange({ ...form, imageUrl: value, imageStorageKey: "" })
            }
            placeholder="/assets/images/1.webp"
          />
          <div className="rounded-xl border border-white/60 bg-white/45 p-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.5)_inset]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="font-brand-sans text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)]/70">
                  Upload image
                </p>
                <p className="mt-1 font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
                  JPG, PNG or WebP up to 10MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  if (file) onUploadImage(file);
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={imageUpload?.status === "uploading"}
                className="flex min-h-[36px] items-center justify-center gap-2 rounded-lg border border-black/[0.08] bg-white/55 px-3 font-brand-sans text-[11px] font-bold text-[var(--brand-navy)] transition-colors hover:bg-white/75 disabled:opacity-50"
              >
                <Paperclip size={13} />
                Choose image
              </button>
            </div>

            {imageUpload && (
              <div className="mt-2.5 rounded-lg border border-black/[0.05] bg-white/45 p-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="min-w-0 truncate font-brand-sans text-[10px] font-bold text-[var(--brand-navy)]">
                    {imageUpload.fileName}
                  </p>
                  <span className="shrink-0 font-brand-sans text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--brand-text-muted)]">
                    {imageUpload.status}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-2 font-brand-sans text-[9px] font-semibold text-[var(--brand-text-muted)]">
                  <span>{formatFileSize(imageUpload.fileSize)}</span>
                  <span>{imageUpload.progress}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                  <span
                    className="block h-full rounded-full bg-[var(--brand-gold)] transition-[width]"
                    style={{ width: `${Math.max(imageUpload.progress, 4)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          <AdminTextareaField
            label="Description"
            value={form.description}
            onChange={(value) => onFormChange({ ...form, description: value })}
            placeholder="Write a helpful product description..."
          />

          <div className="overflow-hidden rounded-xl border border-black/[0.06] bg-white/50 p-2.5">
            <div
              className="flex min-h-[150px] items-center justify-center overflow-hidden rounded-lg bg-[#eee6da] bg-cover bg-center"
              style={
                hasPreview
                  ? { backgroundImage: `url("${form.imageUrl.trim()}")` }
                  : undefined
              }
            >
              {!hasPreview && (
                <div className="text-center">
                  <Package
                    size={20}
                    className="mx-auto text-[var(--brand-text-muted)]"
                  />
                  <p className="mt-2 font-brand-sans text-[10px] font-bold text-[var(--brand-text-muted)]">
                    Image preview
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-[var(--brand-navy)] px-4 font-brand-sans text-[12px] font-bold text-white transition-colors hover:bg-[var(--brand-navy)]/92 disabled:opacity-50"
            >
              {saving ? (
                <Spinner />
              ) : form.id ? (
                <Check size={14} />
              ) : (
                <Plus size={14} />
              )}
              {form.id ? "Update product" : "Create product"}
            </button>
            {form.id && (
              <button
                type="button"
                onClick={onReset}
                disabled={saving}
                className="min-h-[42px] rounded-xl border border-black/[0.08] bg-white/45 px-4 font-brand-sans text-[12px] font-bold text-[var(--brand-navy)] transition-colors hover:bg-white/70 disabled:opacity-50"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="min-w-0 rounded-xl border border-white/70 bg-white/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between gap-2 border-b border-black/[0.06] px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="min-w-0">
            <h2 className="font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
              Products
            </h2>
            <p className="font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
              {formatNumber(total)} products
              {latestCode ? ` - latest code ${latestCode}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onRefresh}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[var(--brand-text-muted)] hover:bg-black/5"
            aria-label="Refresh products"
          >
            <RefreshCw size={14} />
          </button>
        </div>

        <div className="border-b border-black/[0.06] px-3 py-3 sm:px-4">
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
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search products or code"
              className="h-full min-w-0 flex-1 border-0 bg-transparent font-brand-sans text-[12px] font-semibold text-[var(--brand-navy)] outline-none placeholder:text-[var(--brand-text-muted)]/50"
            />
          </div>
        </div>

        <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4 2xl:grid-cols-3">
          {loading ? (
            <div className="sm:col-span-2 2xl:col-span-3">
              <EmptyPanel icon={<RefreshCw size={18} />} title="Loading..." />
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <article
                key={product.id}
                className="min-w-0 overflow-hidden rounded-xl border border-black/[0.06] bg-white/60"
              >
                <div
                  className="aspect-[4/3] bg-[#eee6da] bg-cover bg-center"
                  style={{ backgroundImage: `url("${product.imageUrl}")` }}
                  aria-label={`${product.name} image`}
                  role="img"
                />
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
                        {product.name}
                      </h3>
                      <p className="mt-0.5 truncate font-brand-sans text-[9px] font-semibold text-[var(--brand-text-muted)]">
                        Code {product.productCode} -{" "}
                        {formatDateTime(product.createdAt)}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <SmallIconBtn
                        label="Edit"
                        icon={<Pencil size={13} />}
                        onClick={() => onEdit(product)}
                      />
                      <SmallIconBtn
                        label="Delete"
                        icon={<Trash2 size={13} />}
                        onClick={() => onDelete(product)}
                        disabled={deletingProductId === product.id}
                        danger
                      />
                    </div>
                  </div>
                  <p className="mt-2 line-clamp-3 font-brand-sans text-[11px] font-semibold leading-relaxed text-[var(--brand-text-muted)]">
                    {product.description}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <div className="sm:col-span-2 2xl:col-span-3">
              <EmptyPanel
                icon={<Package size={18} />}
                title="No products found"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
