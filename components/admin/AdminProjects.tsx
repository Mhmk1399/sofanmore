"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  FolderOpen,
  ImagePlus,
  Paperclip,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useRef } from "react";

import { Spinner } from "@/components/lead-capture/ClayFormControls";

import {
  AdminTextField,
  AdminTextareaField,
  CustomDropdown,
  EmptyPanel,
  SmallIconBtn,
  formatDateTime,
  formatFileSize,
  formatNumber,
  projectServices,
  type Project,
  type ProjectFormState,
  type ProjectImage,
  type ProjectImageUploadState,
} from "./adminShared";

export default function ProjectManagement({
  projects,
  total,
  latestCode,
  loading,
  search,
  form,
  imageUpload,
  saving,
  deletingProjectId,
  onSearchChange,
  onFormChange,
  onUploadCoverImage,
  onUploadGalleryImages,
  onSave,
  onEdit,
  onReset,
  onDelete,
  onRefresh,
}: {
  projects: Project[];
  total: number;
  latestCode: number | null;
  loading: boolean;
  search: string;
  form: ProjectFormState;
  imageUpload: ProjectImageUploadState | null;
  saving: boolean;
  deletingProjectId: string;
  onSearchChange: (value: string) => void;
  onFormChange: (value: ProjectFormState) => void;
  onUploadCoverImage: (file: File) => void;
  onUploadGalleryImages: (files: File[]) => void;
  onSave: () => void;
  onEdit: (project: Project) => void;
  onReset: () => void;
  onDelete: (project: Project) => void;
  onRefresh: () => void;
}) {
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const hasPreview = form.coverImageUrl.trim().length > 0;

  function updateImage(imageId: string, updates: Partial<ProjectImage>) {
    onFormChange({
      ...form,
      images: form.images.map((image) =>
        image.id === imageId ? { ...image, ...updates } : image,
      ),
    });
  }

  function removeImage(imageId: string) {
    onFormChange({
      ...form,
      images: form.images
        .filter((image) => image.id !== imageId)
        .map((image, index) => ({ ...image, sortOrder: index })),
    });
  }

  function moveImage(imageId: string, direction: -1 | 1) {
    const next = [...form.images].sort((a, b) => a.sortOrder - b.sortOrder);
    const index = next.findIndex((image) => image.id === imageId);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onFormChange({
      ...form,
      images: next.map((image, sortOrder) => ({ ...image, sortOrder })),
    });
  }

  return (
    <div className="grid gap-3 xl:grid-cols-[420px_minmax(0,1fr)]">
      <section className="rounded-xl border border-white/70 bg-white/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="border-b border-black/[0.06] px-3 py-3 sm:px-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-navy)] text-[var(--brand-gold)]">
              <FolderOpen size={16} />
            </span>
            <div className="min-w-0">
              <h2 className="font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
                {form.id ? "Edit project" : "New project"}
              </h2>
              <p className="font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
                {latestCode
                  ? `Latest project code: ${latestCode}`
                  : "First project code starts at 1000"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-3 sm:p-4">
          <FormGroup title="Project">
            <div className="grid gap-3 sm:grid-cols-2">
              <AdminTextField
                label="Project code"
                value={form.projectCode}
                onChange={(value) =>
                  onFormChange({
                    ...form,
                    projectCode: value.replace(/[^\d]/g, "").slice(0, 9),
                  })
                }
                placeholder={latestCode ? String(latestCode + 1) : "1000"}
                inputMode="numeric"
              />
              <CustomDropdown
                label="Service"
                value={form.service}
                onChange={(value) =>
                  onFormChange({
                    ...form,
                    service: value as ProjectFormState["service"],
                  })
                }
                options={projectServices}
              />
            </div>
            <AdminTextField
              label="Title"
              value={form.title}
              onChange={(value) => onFormChange({ ...form, title: value })}
              placeholder="e.g. Hampstead curved banquette"
            />
            <AdminTextField
              label="Location label"
              value={form.locationLabel}
              onChange={(value) =>
                onFormChange({ ...form, locationLabel: value })
              }
              placeholder="e.g. North West London"
            />
          </FormGroup>

          <FormGroup title="Media">
            <AdminTextField
              label="Cover image URL"
              value={form.coverImageUrl}
              onChange={(value) =>
                onFormChange({
                  ...form,
                  coverImageUrl: value,
                  coverImageStorageKey: "",
                })
              }
              placeholder="/assets/images/1.webp"
            />
            <div className="rounded-xl border border-white/60 bg-white/45 p-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.5)_inset]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-brand-sans text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)]/70">
                    Upload cover
                  </p>
                  <p className="mt-1 font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
                    JPG, PNG or WebP up to 10MB
                  </p>
                </div>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    event.target.value = "";
                    if (file) onUploadCoverImage(file);
                  }}
                />
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={imageUpload?.status === "uploading"}
                  className="flex min-h-[36px] items-center justify-center gap-2 rounded-lg border border-black/[0.08] bg-white/55 px-3 font-brand-sans text-[11px] font-bold text-[var(--brand-navy)] transition-colors hover:bg-white/75 disabled:opacity-50"
                >
                  <Paperclip size={13} />
                  Choose cover
                </button>
              </div>

              {imageUpload && <UploadProgress upload={imageUpload} />}
            </div>

            <div className="overflow-hidden rounded-xl border border-black/[0.06] bg-white/50 p-2.5">
              <div
                className="flex min-h-[155px] items-center justify-center overflow-hidden rounded-lg bg-[#eee6da] bg-cover bg-center"
                style={
                  hasPreview
                    ? {
                        backgroundImage: `url("${form.coverImageUrl.trim()}")`,
                      }
                    : undefined
                }
              >
                {!hasPreview && (
                  <div className="text-center">
                    <ImagePlus
                      size={20}
                      className="mx-auto text-[var(--brand-text-muted)]"
                    />
                    <p className="mt-2 font-brand-sans text-[10px] font-bold text-[var(--brand-text-muted)]">
                      Cover preview
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-white/60 bg-white/45 p-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-brand-sans text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)]/70">
                    Gallery images
                  </p>
                  <p className="mt-1 font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
                    Upload multiple images, then edit alt text and order.
                  </p>
                </div>
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="sr-only"
                  onChange={(event) => {
                    const files = Array.from(event.target.files || []);
                    event.target.value = "";
                    if (files.length) onUploadGalleryImages(files);
                  }}
                />
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={imageUpload?.status === "uploading"}
                  className="flex min-h-[36px] items-center justify-center gap-2 rounded-lg border border-black/[0.08] bg-white/55 px-3 font-brand-sans text-[11px] font-bold text-[var(--brand-navy)] transition-colors hover:bg-white/75 disabled:opacity-50"
                >
                  <ImagePlus size={13} />
                  Add images
                </button>
              </div>

              <div className="mt-3 grid gap-2">
                {form.images.length > 0 ? (
                  [...form.images]
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((image, index) => (
                      <div
                        key={image.id}
                        className="grid gap-2 rounded-lg border border-black/[0.05] bg-white/55 p-2 sm:grid-cols-[76px_minmax(0,1fr)]"
                      >
                        <div
                          className="min-h-[70px] rounded-md bg-[#eee6da] bg-cover bg-center"
                          style={{ backgroundImage: `url("${image.url}")` }}
                          role="img"
                          aria-label={image.alt || "Project gallery image"}
                        />
                        <div className="min-w-0">
                          <input
                            value={image.alt}
                            onChange={(event) =>
                              updateImage(image.id, { alt: event.target.value })
                            }
                            placeholder="Image alt text"
                            className="h-[34px] w-full rounded-lg border border-white/60 bg-white/70 px-2.5 font-brand-sans text-[11px] font-semibold text-[var(--brand-navy)] outline-none"
                          />
                          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                            <span className="font-brand-sans text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--brand-text-muted)]">
                              Image {index + 1}
                            </span>
                            <div className="flex gap-1">
                              <SmallIconBtn
                                label="Move left"
                                icon={<ArrowLeft size={12} />}
                                disabled={index === 0}
                                onClick={() => moveImage(image.id, -1)}
                              />
                              <SmallIconBtn
                                label="Move right"
                                icon={<ArrowRight size={12} />}
                                disabled={index === form.images.length - 1}
                                onClick={() => moveImage(image.id, 1)}
                              />
                              <SmallIconBtn
                                label="Remove image"
                                icon={<X size={12} />}
                                danger
                                onClick={() => removeImage(image.id)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <EmptyPanel
                    icon={<ImagePlus size={18} />}
                    title="No gallery images yet"
                  />
                )}
              </div>
            </div>
          </FormGroup>

          <FormGroup title="Project Story">
            <AdminTextareaField
              label="Excerpt"
              value={form.excerpt}
              onChange={(value) => onFormChange({ ...form, excerpt: value })}
              placeholder="A short introduction for cards and SEO..."
            />
            <AdminTextareaField
              label="Brief"
              value={form.brief}
              onChange={(value) => onFormChange({ ...form, brief: value })}
              placeholder="What the client needed..."
            />
            <AdminTextareaField
              label="Approach"
              value={form.approach}
              onChange={(value) => onFormChange({ ...form, approach: value })}
              placeholder="How Sofa N More approached the project..."
            />
            <AdminTextareaField
              label="Details"
              value={form.details}
              onChange={(value) => onFormChange({ ...form, details: value })}
              placeholder="Materials, layout or construction details..."
            />
            <AdminTextareaField
              label="Result"
              value={form.result}
              onChange={(value) => onFormChange({ ...form, result: value })}
              placeholder="What changed after completion..."
            />
          </FormGroup>

          <FormGroup title="Publishing">
            <div className="grid gap-2 sm:grid-cols-2">
              <ToggleRow
                label="Published"
                checked={form.published}
                onChange={(checked) =>
                  onFormChange({
                    ...form,
                    published: checked,
                    featured: checked ? false : form.featured,
                  })
                }
              />
              <ToggleRow
                label="Featured"
                checked={form.featured}
                onChange={(checked) =>
                  onFormChange({
                    ...form,
                    featured: checked,
                    published: checked ? false : form.published,
                  })
                }
              />
            </div>
          </FormGroup>

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
              {form.id ? "Update project" : "Create project"}
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
              Projects
            </h2>
            <p className="font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
              {formatNumber(total)} projects
              {latestCode ? ` - latest code ${latestCode}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onRefresh}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[var(--brand-text-muted)] hover:bg-black/5"
            aria-label="Refresh projects"
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
              placeholder="Search projects, title, location or code"
              className="h-full min-w-0 flex-1 border-0 bg-transparent font-brand-sans text-[12px] font-semibold text-[var(--brand-navy)] outline-none placeholder:text-[var(--brand-text-muted)]/50"
            />
          </div>
        </div>

        <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4 2xl:grid-cols-3">
          {loading ? (
            <div className="sm:col-span-2 2xl:col-span-3">
              <EmptyPanel icon={<RefreshCw size={18} />} title="Loading..." />
            </div>
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <article
                key={project.id}
                className="min-w-0 overflow-hidden rounded-xl border border-black/[0.06] bg-white/60"
              >
                <div
                  className="aspect-[4/3] bg-[#eee6da] bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${project.coverImageUrl}")`,
                  }}
                  aria-label={`${project.title} cover image`}
                  role="img"
                />
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
                        {project.title}
                      </h3>
                      <p className="mt-0.5 truncate font-brand-sans text-[9px] font-semibold text-[var(--brand-text-muted)]">
                        Code {project.projectCode} -{" "}
                        {formatDateTime(project.createdAt)}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <SmallIconBtn
                        label="Edit"
                        icon={<Pencil size={13} />}
                        onClick={() => onEdit(project)}
                      />
                      <SmallIconBtn
                        label="Delete"
                        icon={<Trash2 size={13} />}
                        onClick={() => onDelete(project)}
                        disabled={deletingProjectId === project.id}
                        danger
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Badge>{project.published ? "Published" : "Draft"}</Badge>
                    {project.featured && <Badge>Featured</Badge>}
                    <Badge>
                      {projectServices.find((s) => s.value === project.service)
                        ?.label || project.service}
                    </Badge>
                  </div>
                  <p className="mt-2 line-clamp-3 font-brand-sans text-[11px] font-semibold leading-relaxed text-[var(--brand-text-muted)]">
                    {project.excerpt}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <div className="sm:col-span-2 2xl:col-span-3">
              <EmptyPanel
                icon={<FolderOpen size={18} />}
                title="No projects found"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function FormGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-3 rounded-xl border border-black/[0.04] bg-white/30 p-3">
      <h3 className="font-brand-sans text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--brand-gold-700)]">
        {title}
      </h3>
      {children}
    </section>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex min-h-[42px] cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/60 bg-white/55 px-3">
      <span className="font-brand-sans text-[12px] font-bold text-[var(--brand-navy)]">
        {label}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-[var(--brand-navy)]"
      />
    </label>
  );
}

function UploadProgress({ upload }: { upload: ProjectImageUploadState }) {
  const progressColor =
    upload.status === "complete"
      ? "bg-emerald-500"
      : upload.status === "failed"
        ? "bg-red-500"
        : "bg-[var(--brand-gold)]";

  return (
    <div className="mt-2.5 rounded-lg border border-black/[0.05] bg-white/45 p-2">
      <div className="flex items-center justify-between gap-2">
        <p className="min-w-0 truncate font-brand-sans text-[10px] font-bold text-[var(--brand-navy)]">
          {upload.fileName}
        </p>
        <span className="shrink-0 font-brand-sans text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--brand-text-muted)]">
          {upload.status}
        </span>
      </div>
      <div className="mt-1 flex items-center justify-between gap-2 font-brand-sans text-[9px] font-semibold text-[var(--brand-text-muted)]">
        <span>{formatFileSize(upload.fileSize)}</span>
        <span>{upload.progress}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
        <span
          className={`block h-full rounded-full transition-[width,background-color] ${progressColor}`}
          style={{ width: `${Math.max(upload.progress, 4)}%` }}
        />
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-black/[0.06] bg-white/60 px-1.5 py-0.5 font-brand-sans text-[9px] font-bold text-[var(--brand-text-muted)]">
      {children}
    </span>
  );
}
