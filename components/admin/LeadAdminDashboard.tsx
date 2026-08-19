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
import AdminProjects from "./AdminProjects";
import AdminProfile, {
  createProfileFormState,
  type ProfileFormState,
} from "./AdminProfile";
import AdminSidebar from "./AdminSidebar";
import AdminUsers from "./AdminUsers";

import {
  ConfirmModal,
  buildAnalyticsQuery,
  buildProjectsQuery,
  buildQuery,
  buildUsersQuery,
  emptyFilters,
  emptyProjectForm,
  fetchAdminJson,
  getAdminRedirectPath,
  statusLabel,
  uploadProjectImageWithProgress,
  type ActiveSection,
  type AdminUser,
  type AnalyticsResponse,
  type ApiError,
  type CurrentUserResponse,
  type DeleteLeadResponse,
  type DeleteProjectResponse,
  type DeleteUserResponse,
  type FilterState,
  type Lead,
  type LeadAdminDashboardProps,
  type LeadDetailResponse,
  type LeadPagination,
  type LeadService,
  type LeadsResponse,
  type LeadStatus,
  type Project,
  type ProjectDetailResponse,
  type ProjectFormState,
  type ProjectImageUploadState,
  type ProjectsResponse,
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectTotal, setProjectTotal] = useState(0);
  const [projectLatestCode, setProjectLatestCode] = useState<number | null>(
    null,
  );
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  const [projectForm, setProjectForm] =
    useState<ProjectFormState>(emptyProjectForm);
  const [projectImageUpload, setProjectImageUpload] =
    useState<ProjectImageUploadState | null>(null);
  const [savingProject, setSavingProject] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState("");
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
  const projectsQuery = useMemo(
    () => buildProjectsQuery(projectSearch),
    [projectSearch],
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
    setProjectsLoading(true);
    setLoading((current) => current || !hasLoadedDashboardRef.current);
    try {
      const [nextAnalytics, nextLeads, nextUsers, nextProjects] =
        await Promise.all([
          fetchAdminJson<AnalyticsResponse>(
            `/api/leads/analytics${analyticsQuery ? `?${analyticsQuery}` : ""}`,
          ),
          fetchAdminJson<LeadsResponse>(`/api/leads?${filteredQuery}`),
          fetchAdminJson<UsersResponse>(
            `/api/admin/users${usersQuery ? `?${usersQuery}` : ""}`,
          ),
          fetchAdminJson<ProjectsResponse>(
            `/api/admin/projects${projectsQuery ? `?${projectsQuery}` : ""}`,
          ),
        ]);
      setAnalytics(nextAnalytics);
      setLeads(nextLeads.leads);
      setPagination(nextLeads.pagination);
      setUsers(nextUsers.users);
      setUserTotal(nextUsers.total);
      setProjects(nextProjects.projects);
      setProjectTotal(nextProjects.total);
      setProjectLatestCode(nextProjects.latestCode);
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
      setProjectsLoading(false);
    }
  }, [
    analyticsQuery,
    canAccessAdmin,
    filteredQuery,
    projectsQuery,
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

  useEffect(() => {
    if (projectForm.id || projectForm.projectCode || projectsLoading) return;
    setProjectForm((current) => {
      if (current.id || current.projectCode) return current;
      return {
        ...current,
        projectCode: projectLatestCode ? String(projectLatestCode + 1) : "1000",
      };
    });
  }, [projectForm.id, projectForm.projectCode, projectLatestCode, projectsLoading]);

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
    setProjects([]);
    setProjectTotal(0);
    setProjectLatestCode(null);
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

  function editProject(project: Project) {
    setProjectForm({
      id: project.id,
      projectCode: String(project.projectCode),
      title: project.title,
      service: project.service,
      coverImageUrl: project.coverImageUrl,
      coverImageStorageKey: project.coverImageStorageKey || "",
      images: project.images || [],
      excerpt: project.excerpt,
      brief: project.brief || "",
      approach: project.approach || "",
      details: project.details || "",
      result: project.result || "",
      locationLabel: project.locationLabel || "",
      featured: project.featured,
      published: project.published,
    });
    setProjectImageUpload(null);
    setActiveSection("projects");
    mainScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetProjectForm() {
    setProjectForm({
      ...emptyProjectForm,
      projectCode: projectLatestCode ? String(projectLatestCode + 1) : "1000",
    });
    setProjectImageUpload(null);
  }

  async function uploadProjectImage(file: File) {
    if (!canAccessAdmin) return;
    setProjectImageUpload({
      fileName: file.name,
      fileSize: file.size,
      progress: 1,
      status: "uploading",
    });
    toast.info("Uploading project image.", file.name);

    try {
      const result = await uploadProjectImageWithProgress({
        file,
        onProgress: (progress) =>
          setProjectImageUpload((current) =>
            current ? { ...current, progress, status: "uploading" } : current,
          ),
      });
      setProjectForm((current) => ({
        ...current,
        coverImageUrl: result.imageUrl,
        coverImageStorageKey: result.imageStorageKey,
      }));
      setProjectImageUpload({
        fileName: file.name,
        fileSize: file.size,
        progress: 100,
        status: "complete",
      });
      toast.success("Project image uploaded.", "The image is ready to use.");
    } catch (caught) {
      const apiError = caught as ApiError;
      setProjectImageUpload({
        fileName: file.name,
        fileSize: file.size,
        progress: 100,
        status: "failed",
      });
      toast.error(
        "Project image could not be uploaded.",
        apiError.message || "Please try another image.",
      );
    }
  }

  async function uploadProjectGalleryImages(files: File[]) {
    for (const file of files) {
      if (!canAccessAdmin) return;
      setProjectImageUpload({
        fileName: file.name,
        fileSize: file.size,
        progress: 1,
        status: "uploading",
      });
      toast.info("Uploading gallery image.", file.name);

      try {
        const result = await uploadProjectImageWithProgress({
          file,
          onProgress: (progress) =>
            setProjectImageUpload((current) =>
              current
                ? { ...current, progress, status: "uploading" }
                : current,
            ),
        });

        setProjectForm((current) => ({
          ...current,
          images: [
            ...current.images,
            {
              id:
                typeof crypto !== "undefined" && "randomUUID" in crypto
                  ? crypto.randomUUID()
                  : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
              url: result.imageUrl,
              storageKey: result.imageStorageKey,
              alt: current.title || file.name.replace(/\.[^.]+$/, ""),
              sortOrder: current.images.length,
            },
          ],
        }));
        setProjectImageUpload({
          fileName: file.name,
          fileSize: file.size,
          progress: 100,
          status: "complete",
        });
        toast.success("Gallery image uploaded.", "The image was added.");
      } catch (caught) {
        const apiError = caught as ApiError;
        setProjectImageUpload({
          fileName: file.name,
          fileSize: file.size,
          progress: 100,
          status: "failed",
        });
        toast.error(
          "Gallery image could not be uploaded.",
          apiError.message || "Please try another image.",
        );
        break;
      }
    }
  }

  async function saveProject() {
    if (!canAccessAdmin || savingProject) return;
    setSavingProject(true);

    try {
      const fallbackProjectCode = projectLatestCode
        ? String(projectLatestCode + 1)
        : "1000";
      const projectCode =
        projectForm.projectCode.trim() || fallbackProjectCode;
      const path = projectForm.id
        ? `/api/admin/projects/${projectForm.id}`
        : "/api/admin/projects";
      const result = await fetchAdminJson<ProjectDetailResponse>(path, {
        method: projectForm.id ? "PATCH" : "POST",
        body: JSON.stringify({
          projectCode,
          title: projectForm.title,
          service: projectForm.service,
          coverImageUrl: projectForm.coverImageUrl,
          coverImageStorageKey: projectForm.coverImageStorageKey,
          images: projectForm.images,
          excerpt: projectForm.excerpt,
          brief: projectForm.brief,
          approach: projectForm.approach,
          details: projectForm.details,
          result: projectForm.result,
          locationLabel: projectForm.locationLabel,
          featured: projectForm.featured,
          published: projectForm.published,
        }),
      });

      setProjects((current) => {
        if (projectForm.id) {
          return current.map((item) =>
            item.id === result.project.id ? result.project : item,
          );
        }

        return [result.project, ...current];
      });
      if (!projectForm.id) {
        setProjectTotal((current) => current + 1);
      }
      setProjectLatestCode((current) =>
        Math.max(current ?? 0, result.project.projectCode),
      );
      setRefreshKey((current) => current + 1);
      resetProjectForm();
      mainScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      toast.success(
        projectForm.id ? "Project updated." : "Project created.",
        `${result.project.title} is ready in the project list.`,
      );
    } catch (caught) {
      const apiError = caught as ApiError;
      const fieldMessage = apiError.fieldErrors
        ? Object.values(apiError.fieldErrors).join(" ")
        : "";

      toast.error(
        "Project could not be saved.",
        fieldMessage || apiError.message || "",
      );
    } finally {
      setSavingProject(false);
    }
  }

  function deleteProjectRecord(project: Project) {
    showConfirm({
      title: "Delete project",
      message: `Delete ${project.title} permanently?`,
      confirmLabel: "Delete",
      danger: true,
      onConfirm: async () => {
        setDeletingProjectId(project.id);
        try {
          await fetchAdminJson<DeleteProjectResponse>(
            `/api/admin/projects/${project.id}`,
            { method: "DELETE" },
          );
          setProjects((current) =>
            current.filter((item) => item.id !== project.id),
          );
          setProjectTotal((current) => Math.max(current - 1, 0));
          if (projectForm.id === project.id) {
            resetProjectForm();
          }
          toast.success("Project deleted.", `${project.title} was removed.`);
        } catch (caught) {
          const apiError = caught as ApiError;
          toast.error("Project could not be deleted.", apiError.message || "");
        } finally {
          setDeletingProjectId("");
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
                  {activeSection === "projects" && "Projects"}
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

              {activeSection === "projects" && (
                <AdminProjects
                  projects={projects}
                  total={projectTotal}
                  latestCode={projectLatestCode}
                  loading={projectsLoading}
                  search={projectSearch}
                  form={projectForm}
                  imageUpload={projectImageUpload}
                  saving={savingProject}
                  deletingProjectId={deletingProjectId}
                  onSearchChange={setProjectSearch}
                  onFormChange={setProjectForm}
                  onUploadCoverImage={uploadProjectImage}
                  onUploadGalleryImages={uploadProjectGalleryImages}
                  onSave={saveProject}
                  onEdit={editProject}
                  onReset={resetProjectForm}
                  onDelete={deleteProjectRecord}
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
