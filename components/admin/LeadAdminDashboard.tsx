"use client";

import {
  AlertTriangle,
  ExternalLink,
  LogOut,
  Menu,
  RefreshCw,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Spinner } from "@/components/lead-capture/ClayFormControls";
import { useToast } from "@/components/ui/ToastProvider";

import AdminOverview from "./AdminOverview";
import { LeadDetailDrawer, LeadFilters, LeadTable } from "./AdminLeads";
import AdminProducts from "./AdminProducts";
import AdminProfile, {
  createProfileFormState,
  type ProfileFormState,
} from "./AdminProfile";
import AdminSidebar from "./AdminSidebar";
import AdminUsers from "./AdminUsers";

import {
  ConfirmModal,
  buildAnalyticsQuery,
  buildProductsQuery,
  buildQuery,
  buildUsersQuery,
  emptyFilters,
  emptyProductForm,
  fetchAdminJson,
  getAdminRedirectPath,
  statusLabel,
  uploadProductImageWithProgress,
  type ActiveSection,
  type AdminUser,
  type AnalyticsResponse,
  type ApiError,
  type CurrentUserResponse,
  type DeleteLeadResponse,
  type DeleteProductResponse,
  type DeleteUserResponse,
  type FilterState,
  type Lead,
  type LeadAdminDashboardProps,
  type LeadDetailResponse,
  type LeadPagination,
  type LeadService,
  type LeadsResponse,
  type LeadStatus,
  type Product,
  type ProductDetailResponse,
  type ProductFormState,
  type ProductImageUploadState,
  type ProductsResponse,
  type UserDetailResponse,
  type UserRole,
  type UsersResponse,
} from "./adminShared";

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
  const [deletingLeadId, setDeletingLeadId] = useState("");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [userTotal, setUserTotal] = useState(0);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState<"" | UserRole>("");
  const [updatingUserId, setUpdatingUserId] = useState("");
  const [deletingUserId, setDeletingUserId] = useState("");
  const [profileForm, setProfileForm] = useState<ProfileFormState>(() =>
    createProfileFormState(initialUser),
  );
  const [savingProfile, setSavingProfile] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productTotal, setProductTotal] = useState(0);
  const [productLatestCode, setProductLatestCode] = useState<number | null>(
    null,
  );
  const [productsLoading, setProductsLoading] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [productForm, setProductForm] =
    useState<ProductFormState>(emptyProductForm);
  const [productImageUpload, setProductImageUpload] =
    useState<ProductImageUploadState | null>(null);
  const [savingProduct, setSavingProduct] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState("");
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
  const productsQuery = useMemo(
    () => buildProductsQuery(productSearch),
    [productSearch],
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
    setProductsLoading(true);
    setLoading((current) => current || !hasLoadedDashboardRef.current);
    try {
      const [nextAnalytics, nextLeads, nextUsers, nextProducts] =
        await Promise.all([
          fetchAdminJson<AnalyticsResponse>(
            `/api/leads/analytics${analyticsQuery ? `?${analyticsQuery}` : ""}`,
          ),
          fetchAdminJson<LeadsResponse>(`/api/leads?${filteredQuery}`),
          fetchAdminJson<UsersResponse>(
            `/api/admin/users${usersQuery ? `?${usersQuery}` : ""}`,
          ),
          fetchAdminJson<ProductsResponse>(
            `/api/admin/products${productsQuery ? `?${productsQuery}` : ""}`,
          ),
        ]);
      setAnalytics(nextAnalytics);
      setLeads(nextLeads.leads);
      setPagination(nextLeads.pagination);
      setUsers(nextUsers.users);
      setUserTotal(nextUsers.total);
      setProducts(nextProducts.products);
      setProductTotal(nextProducts.total);
      setProductLatestCode(nextProducts.latestCode);
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
      setProductsLoading(false);
    }
  }, [
    analyticsQuery,
    canAccessAdmin,
    filteredQuery,
    productsQuery,
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
    setProducts([]);
    setProductTotal(0);
    setProductLatestCode(null);
    setSelectedLead(null);
    toast.info("Logged out.");
    router.replace("/login");
  }

  function requestLogout() {
    showConfirm({
      title: "Log out",
      message: "Are you sure you want to leave the admin dashboard?",
      confirmLabel: "Log out",
      danger: false,
      onConfirm: logout,
    });
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

  function editProduct(product: Product) {
    setProductForm({
      id: product.id,
      productCode: String(product.productCode),
      name: product.name,
      imageUrl: product.imageUrl,
      imageStorageKey: product.imageStorageKey || "",
      description: product.description,
    });
    setProductImageUpload(null);
    setActiveSection("products");
    mainScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetProductForm() {
    setProductForm(emptyProductForm);
    setProductImageUpload(null);
  }

  async function uploadProductImage(file: File) {
    if (!canAccessAdmin) return;
    setProductImageUpload({
      fileName: file.name,
      fileSize: file.size,
      progress: 1,
      status: "uploading",
    });
    toast.info("Uploading product image.", file.name);

    try {
      const result = await uploadProductImageWithProgress({
        file,
        onProgress: (progress) =>
          setProductImageUpload((current) =>
            current ? { ...current, progress, status: "uploading" } : current,
          ),
      });
      setProductForm((current) => ({
        ...current,
        imageUrl: result.imageUrl,
        imageStorageKey: result.imageStorageKey,
      }));
      setProductImageUpload({
        fileName: file.name,
        fileSize: file.size,
        progress: 100,
        status: "complete",
      });
      toast.success("Product image uploaded.", "The image is ready to use.");
    } catch (caught) {
      const apiError = caught as ApiError;
      setProductImageUpload({
        fileName: file.name,
        fileSize: file.size,
        progress: 100,
        status: "failed",
      });
      toast.error(
        "Product image could not be uploaded.",
        apiError.message || "Please try another image.",
      );
    }
  }

  async function saveProduct() {
    if (!canAccessAdmin || savingProduct) return;
    setSavingProduct(true);

    try {
      const path = productForm.id
        ? `/api/admin/products/${productForm.id}`
        : "/api/admin/products";
      const result = await fetchAdminJson<ProductDetailResponse>(path, {
        method: productForm.id ? "PATCH" : "POST",
        body: JSON.stringify({
          productCode: productForm.productCode,
          name: productForm.name,
          imageUrl: productForm.imageUrl,
          imageStorageKey: productForm.imageStorageKey,
          description: productForm.description,
        }),
      });

      setProducts((current) => {
        if (productForm.id) {
          return current.map((item) =>
            item.id === result.product.id ? result.product : item,
          );
        }

        return [result.product, ...current];
      });
      if (!productForm.id) {
        setProductTotal((current) => current + 1);
      }
      setProductLatestCode((current) =>
        Math.max(current ?? 0, result.product.productCode),
      );
      setRefreshKey((current) => current + 1);
      resetProductForm();
      toast.success(
        productForm.id ? "Product updated." : "Product created.",
        `${result.product.name} is ready in the product list.`,
      );
    } catch (caught) {
      const apiError = caught as ApiError;
      toast.error("Product could not be saved.", apiError.message || "");
    } finally {
      setSavingProduct(false);
    }
  }

  function deleteProductRecord(product: Product) {
    showConfirm({
      title: "Delete product",
      message: `Delete ${product.name} permanently?`,
      confirmLabel: "Delete",
      danger: true,
      onConfirm: async () => {
        setDeletingProductId(product.id);
        try {
          await fetchAdminJson<DeleteProductResponse>(
            `/api/admin/products/${product.id}`,
            { method: "DELETE" },
          );
          setProducts((current) =>
            current.filter((item) => item.id !== product.id),
          );
          setProductTotal((current) => Math.max(current - 1, 0));
          if (productForm.id === product.id) {
            resetProductForm();
          }
          toast.success("Product deleted.", `${product.name} was removed.`);
        } catch (caught) {
          const apiError = caught as ApiError;
          toast.error("Product could not be deleted.", apiError.message || "");
        } finally {
          setDeletingProductId("");
        }
      },
    });
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
      toast.error("Lead details could not be loaded.", message);
    } finally {
      setDetailLoading(false);
    }
  }

  async function updateLeadStatus(leadId: string, status: LeadStatus) {
    if (!canAccessAdmin) return;
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
      toast.error("Lead status could not be updated.", message);
    } finally {
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

  async function saveProfile() {
    if (!canAccessAdmin || savingProfile) return;
    setSavingProfile(true);

    try {
      const profilePayload: Record<string, string> = {};
      const nextName = profileForm.name.trim();
      const nextPhone = profileForm.phone.trim();
      const currentPassword = profileForm.currentPassword.trim();
      const newPassword = profileForm.newPassword.trim();

      if (nextName && nextName !== currentUser?.name) {
        profilePayload.name = nextName;
      }

      if (nextPhone && nextPhone !== currentUser?.phone) {
        profilePayload.phone = nextPhone;
      }

      if (newPassword) {
        profilePayload.currentPassword = currentPassword;
        profilePayload.newPassword = newPassword;
      }

      if (Object.keys(profilePayload).length === 0) {
        toast.info(
          "Nothing to save.",
          "Change your name, phone or password first.",
        );
        return;
      }

      const result = await fetchAdminJson<UserDetailResponse>("/api/auth/me", {
        method: "PATCH",
        body: JSON.stringify(profilePayload),
      });

      setCurrentUser(result.user);
      setUsers((current) =>
        current.map((user) =>
          user.id === result.user.id ? result.user : user,
        ),
      );
      setProfileForm(createProfileFormState(result.user));
      toast.success("Profile updated.", "Your admin account has been saved.");
    } catch (caught) {
      const apiError = caught as ApiError;
      const fieldMessage = apiError.fieldErrors
        ? Object.values(apiError.fieldErrors).join(" ")
        : "";

      toast.error(
        "Profile could not be updated.",
        fieldMessage || apiError.message || "",
      );
    } finally {
      setSavingProfile(false);
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
          > *:not([data-admin-root]):not([data-toast-root]):not(script):not(
            style
          ) {
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
          <AdminSidebar
            activeSection={activeSection}
            filters={filters}
            onNavigate={handleNavigation}
            onRefresh={() => setRefreshKey((c) => c + 1)}
            onLogout={requestLogout}
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
                  {activeSection === "products" && "Products"}
                  {activeSection === "users" && "Users"}
                  {activeSection === "profile" && "Profile"}
                </h1>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {currentUser && (
                  <span className="mr-2 hidden max-w-[140px] truncate font-brand-sans text-[11px] font-semibold text-[var(--brand-text-muted)] sm:block">
                    {currentUser.name}
                  </span>
                )}
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 items-center justify-center gap-1.5 rounded-lg border border-white/70 bg-white/55 px-2.5 font-brand-sans text-[11px] font-bold text-[var(--brand-navy)] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.55)_inset] transition-colors hover:bg-white/80"
                >
                  <ExternalLink size={13} />
                  <span className="hidden min-[390px]:inline">View site</span>
                </a>
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
                  onClick={requestLogout}
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
                <AdminOverview
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
                    deletingLeadId={deletingLeadId}
                    onOpenLead={openLead}
                    onUpdateStatus={updateLeadStatus}
                    onDeleteLead={deleteLead}
                    onPageChange={setPage}
                  />
                </>
              )}

              {activeSection === "users" && (
                <AdminUsers
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

              {activeSection === "products" && (
                <AdminProducts
                  products={products}
                  total={productTotal}
                  latestCode={productLatestCode}
                  loading={productsLoading}
                  search={productSearch}
                  form={productForm}
                  imageUpload={productImageUpload}
                  saving={savingProduct}
                  deletingProductId={deletingProductId}
                  onSearchChange={setProductSearch}
                  onFormChange={setProductForm}
                  onUploadImage={uploadProductImage}
                  onSave={saveProduct}
                  onEdit={editProduct}
                  onReset={resetProductForm}
                  onDelete={deleteProductRecord}
                  onRefresh={() => setRefreshKey((c) => c + 1)}
                />
              )}

              {activeSection === "profile" && (
                <AdminProfile
                  user={currentUser}
                  form={profileForm}
                  saving={savingProfile}
                  onFormChange={setProfileForm}
                  onSave={saveProfile}
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
                <AdminSidebar
                  activeSection={activeSection}
                  filters={filters}
                  onNavigate={handleNavigation}
                  onRefresh={() => setRefreshKey((c) => c + 1)}
                  onLogout={requestLogout}
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
