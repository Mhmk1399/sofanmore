"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";

import {
  ClayCheckbox,
  ClayFileDropzone,
  ClayInput,
  ClaySelect,
  ClayTextarea,
  FormSection,
  type SelectOption,
  type UploadItem,
} from "@/components/lead-capture/ClayFormControls";
import LeadFormShell from "@/components/lead-capture/LeadFormShell";
import {
  COMMERCIAL_UPLOAD_COUNT,
  COMMERCIAL_UPLOAD_SIZE_BYTES,
} from "@/lib/lead-config";

type FormErrors = Record<string, string>;

type CommercialFormValues = {
  fullName: string;
  companyName: string;
  workEmail: string;
  phone: string;
  postcode: string;
  venueType: string;
  projectType: string;
  projectStage: string;
  approximateQuantity: string;
  hasFloorPlan: "no" | "yes";
  dimensionsKnown: "no" | "yes";
  widthCm: string;
  depthCm: string;
  heightCm: string;
  targetInstallationDate: string;
  message: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
  honeypot: string;
};

type SignUploadResponse = {
  ok: true;
  uploadToken: string;
  uploadUrl: string;
  requiredHeaders?: Record<string, string>;
};

type LeadResponse = {
  ok: true;
  leadId: string;
};

type ApiErrorResponse = {
  ok: false;
  code: string;
  message: string;
  fieldErrors?: FormErrors;
};

const initialValues: CommercialFormValues = {
  fullName: "",
  companyName: "",
  workEmail: "",
  phone: "",
  postcode: "",
  venueType: "",
  projectType: "",
  projectStage: "",
  approximateQuantity: "",
  hasFloorPlan: "no",
  dimensionsKnown: "no",
  widthCm: "",
  depthCm: "",
  heightCm: "",
  targetInstallationDate: "",
  message: "",
  privacyConsent: false,
  marketingConsent: false,
  honeypot: "",
};

const venueTypeOptions = [
  { label: "Restaurant", value: "restaurant" },
  { label: "Cafe", value: "cafe" },
  { label: "Hotel", value: "hotel" },
  { label: "Office", value: "office" },
  { label: "Hospitality", value: "hospitality" },
  { label: "Retail", value: "retail" },
  { label: "Other", value: "other" },
] satisfies SelectOption[];

const acceptedUploadMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

function createClientId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}:${crypto.randomUUID()}`;
  }

  return `${prefix}:${Date.now().toString(36)}:${Math.random()
    .toString(36)
    .slice(2)}`;
}

function fileFingerprint(file: File) {
  return `${file.name}:${file.size}:${file.lastModified}`;
}

function isAllowedCommercialFile(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  return (
    acceptedUploadMimeTypes.has(file.type) &&
    Boolean(
      extension && ["jpg", "jpeg", "png", "webp", "pdf"].includes(extension),
    )
  );
}

function createPreviewUrl(file: File) {
  return file.type.startsWith("image/") ? URL.createObjectURL(file) : "";
}

function revokePreviewUrl(item: UploadItem) {
  if (item.previewUrl) {
    URL.revokeObjectURL(item.previewUrl);
  }
}

function trackCommercialLeadEvent(
  eventName:
    | "commercial_lead_started"
    | "commercial_plan_uploaded"
    | "commercial_lead_success",
  details: Record<string, unknown> = {},
) {
  const payload = {
    eventName,
    service: "commercial_sofa",
    sourcePage:
      typeof window !== "undefined"
        ? `${window.location.pathname}${window.location.search}`
        : undefined,
    ...details,
  };

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("lead-form-event", { detail: payload }),
    );

    const analyticsWindow = window as typeof window & {
      dataLayer?: Record<string, unknown>[];
    };

    analyticsWindow.dataLayer?.push(payload);
  }
}

function normalizeServerFieldErrors(fieldErrors?: FormErrors) {
  if (!fieldErrors) return {};

  const mappedErrors: FormErrors = {};
  const fieldMap: Record<string, string> = {
    name: "fullName",
    email: "workEmail",
    "serviceData.companyName": "companyName",
    "serviceData.venueType": "venueType",
    "serviceData.projectType": "projectType",
    "serviceData.projectStage": "projectStage",
    "serviceData.approximateQuantity": "approximateQuantity",
    "serviceData.hasFloorPlan": "hasFloorPlan",
    "serviceData.dimensionsKnown": "dimensionsKnown",
    "serviceData.widthCm": "widthCm",
    "serviceData.depthCm": "depthCm",
    "serviceData.heightCm": "heightCm",
    "serviceData.targetInstallationDate": "targetInstallationDate",
  };

  for (const [key, message] of Object.entries(fieldErrors)) {
    mappedErrors[fieldMap[key] || key] = message;
  }

  return mappedErrors;
}

async function readApiResponse<T extends { ok: true }>(
  response: Response,
): Promise<T> {
  const body = (await response.json()) as unknown;

  if (!response.ok || !body || typeof body !== "object" || !("ok" in body)) {
    const error = new Error("Request failed.") as Error & {
      fieldErrors?: FormErrors;
    };
    throw error;
  }

  if (body.ok === false) {
    const errorBody = body as ApiErrorResponse;
    const error = new Error(errorBody.message || "Request failed.") as Error & {
      fieldErrors?: FormErrors;
    };
    error.fieldErrors = normalizeServerFieldErrors(errorBody.fieldErrors);
    throw error;
  }

  return body as T;
}

function uploadFileWithProgress(input: {
  uploadUrl: string;
  file: File;
  headers?: Record<string, string>;
  onProgress: (progress: number) => void;
}) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", input.uploadUrl);

    for (const [key, value] of Object.entries(input.headers || {})) {
      xhr.setRequestHeader(key, value);
    }

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        input.onProgress(Math.round((event.loaded / event.total) * 86) + 6);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        input.onProgress(94);
        resolve();
        return;
      }

      reject(new Error("Upload failed."));
    };

    xhr.onerror = () => reject(new Error("Upload failed."));
    xhr.ontimeout = () => reject(new Error("Upload timed out."));
    xhr.timeout = 120000;
    xhr.send(input.file);
  });
}

function getUtmParams() {
  if (typeof window === "undefined") return undefined;

  const params = new URLSearchParams(window.location.search);
  const utm = {
    source: params.get("utm_source") || undefined,
    medium: params.get("utm_medium") || undefined,
    campaign: params.get("utm_campaign") || undefined,
    term: params.get("utm_term") || undefined,
    content: params.get("utm_content") || undefined,
  };

  return Object.values(utm).some(Boolean) ? utm : undefined;
}

function validateForm(values: CommercialFormValues, uploads: UploadItem[]) {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Enter your full name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.workEmail.trim())) {
    errors.workEmail = "Enter a valid work email address.";
  }

  if (!/^\+?[0-9][0-9\s().-]{6,30}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.venueType) {
    errors.venueType = "Choose a venue type.";
  }

  if (values.approximateQuantity) {
    const quantity = Number(values.approximateQuantity);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10000) {
      errors.approximateQuantity = "Enter a whole number between 1 and 10000.";
    }
  }

  if (values.targetInstallationDate) {
    const parsed = new Date(`${values.targetInstallationDate}T00:00:00.000Z`);

    if (
      Number.isNaN(parsed.getTime()) ||
      parsed.toISOString().slice(0, 10) !== values.targetInstallationDate
    ) {
      errors.targetInstallationDate = "Choose a valid date.";
    }
  }

  if (values.message.trim().length < 20) {
    errors.message = "Share at least 20 characters about the project.";
  }

  if (!values.privacyConsent) {
    errors.privacyConsent = "Privacy consent is required.";
  }

  if (uploads.some((item) => item.status === "failed")) {
    errors.uploads = "Retry or remove failed files before sending.";
  } else if (
    uploads.some(
      (item) =>
        item.status !== "complete" || typeof item.uploadToken !== "string",
    )
  ) {
    errors.uploads = "Wait for every file to finish uploading.";
  }

  return errors;
}

export default function CommercialSofaLeadForm() {
  const [values, setValues] = useState<CommercialFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [uploadError, setUploadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successLeadId, setSuccessLeadId] = useState("");
  const [uploadSessionId] = useState(() => createClientId("upload"));
  const [idempotencyKey] = useState(() => createClientId("lead"));
  const [formStartedAt] = useState(() => Date.now());
  const startedEventSent = useRef(false);
  const uploadsRef = useRef<UploadItem[]>([]);

  useEffect(() => {
    uploadsRef.current = uploads;
  }, [uploads]);

  useEffect(() => {
    return () => {
      for (const item of uploadsRef.current) {
        revokePreviewUrl(item);
      }
    };
  }, []);

  const hasBlockingUploads = uploads.some(
    (item) =>
      item.status === "queued" ||
      item.status === "signing" ||
      item.status === "uploading" ||
      item.status === "completing" ||
      item.status === "failed",
  );

  const canSubmit = useMemo(
    () => !isSubmitting && !hasBlockingUploads,
    [hasBlockingUploads, isSubmitting],
  );

  function markStarted() {
    if (startedEventSent.current) return;

    startedEventSent.current = true;
    trackCommercialLeadEvent("commercial_lead_started");
  }

  function updateValue<K extends keyof CommercialFormValues>(
    key: K,
    value: CommercialFormValues[K],
  ) {
    markStarted();
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
    setSubmitError("");
  }

  function updateUploadItem(id: string, patch: Partial<UploadItem>) {
    setUploads((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  async function uploadItem(id: string, file: File) {
    try {
      updateUploadItem(id, { status: "signing", progress: 4, error: "" });

      const signResponse = await fetch("/api/uploads/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
          service: "COMMERCIAL_SOFA",
          uploadSessionId,
        }),
      });
      const signedUpload =
        await readApiResponse<SignUploadResponse>(signResponse);

      updateUploadItem(id, {
        status: "uploading",
        progress: 6,
        uploadToken: signedUpload.uploadToken,
      });

      await uploadFileWithProgress({
        uploadUrl: signedUpload.uploadUrl,
        file,
        headers: signedUpload.requiredHeaders,
        onProgress: (progress) => updateUploadItem(id, { progress }),
      });

      updateUploadItem(id, { status: "completing", progress: 96 });

      const completeResponse = await fetch("/api/uploads/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uploadToken: signedUpload.uploadToken }),
      });

      await readApiResponse<{ ok: true }>(completeResponse);

      updateUploadItem(id, { status: "complete", progress: 100, error: "" });
      trackCommercialLeadEvent("commercial_plan_uploaded", {
        fileType: file.type,
      });
    } catch (error) {
      updateUploadItem(id, {
        status: "failed",
        progress: 100,
        error:
          error instanceof Error
            ? error.message
            : "This file could not be uploaded.",
      });
    }
  }

  function handleFilesSelected(files: File[]) {
    if (!files.length) return;

    markStarted();
    setUploadError("");
    setErrors((current) => {
      const next = { ...current };
      delete next.uploads;
      return next;
    });

    const existingFingerprints = new Set(
      uploads.map((item) => fileFingerprint(item.file)),
    );
    const acceptedFiles: File[] = [];

    for (const file of files) {
      if (existingFingerprints.has(fileFingerprint(file))) {
        setUploadError("This file has already been added.");
        continue;
      }

      if (!isAllowedCommercialFile(file)) {
        setUploadError("Use JPG, PNG, WebP, or PDF files.");
        continue;
      }

      if (file.size > COMMERCIAL_UPLOAD_SIZE_BYTES) {
        setUploadError("Each file must be 15MB or smaller.");
        continue;
      }

      if (uploads.length + acceptedFiles.length >= COMMERCIAL_UPLOAD_COUNT) {
        setUploadError(`Upload ${COMMERCIAL_UPLOAD_COUNT} files or fewer.`);
        break;
      }

      acceptedFiles.push(file);
    }

    if (!acceptedFiles.length) return;

    const newItems = acceptedFiles.map((file) => ({
      id: createClientId("file"),
      file,
      previewUrl: createPreviewUrl(file),
      progress: 0,
      status: "queued" as const,
    }));

    setUploads((current) => [...current, ...newItems]);

    for (const item of newItems) {
      void uploadItem(item.id, item.file);
    }
  }

  function retryUpload(id: string) {
    const item = uploads.find((upload) => upload.id === id);

    if (!item) return;

    void uploadItem(id, item.file);
  }

  function removeUpload(id: string) {
    setUploads((current) => {
      const item = current.find((upload) => upload.id === id);

      if (item) {
        revokePreviewUrl(item);
      }

      return current.filter((upload) => upload.id !== id);
    });
    setErrors((current) => {
      const next = { ...current };
      delete next.uploads;
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    markStarted();
    setSubmitError("");

    const validationErrors = validateForm(values, uploads);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const sourcePage =
      typeof window !== "undefined"
        ? `${window.location.pathname}${window.location.search}`
        : "/services/commercial-sofas";
    const serviceData: Record<string, string | number | boolean> = {
      venueType: values.venueType,
    };

    if (values.companyName.trim()) {
      serviceData.companyName = values.companyName;
    }

    if (values.projectType) {
      serviceData.projectType = values.projectType;
    }

    if (values.hasFloorPlan === "yes") {
      serviceData.hasFloorPlan = true;
    }

    if (values.dimensionsKnown === "yes") {
      serviceData.dimensionsKnown = true;
    }

    if (values.projectStage) {
      serviceData.projectStage = values.projectStage;
    }

    if (values.approximateQuantity) {
      serviceData.approximateQuantity = Number(values.approximateQuantity);
    }

    if (values.dimensionsKnown === "yes" && values.widthCm && values.depthCm) {
      serviceData.widthCm = Number(values.widthCm);
      serviceData.depthCm = Number(values.depthCm);

      if (values.heightCm) {
        serviceData.heightCm = Number(values.heightCm);
      }
    }

    if (values.targetInstallationDate) {
      serviceData.targetInstallationDate = values.targetInstallationDate;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: "COMMERCIAL_SOFA",
          contact: {
            name: values.fullName,
            phone: values.phone,
            email: values.workEmail,
            postcode: values.postcode,
          },
          serviceData,
          message: values.message,
          uploadTokens: uploads
            .map((item) => item.uploadToken)
            .filter((token): token is string => Boolean(token)),
          uploadSessionId,
          privacyConsent: values.privacyConsent,
          marketingConsent: values.marketingConsent,
          idempotencyKey,
          sourcePage,
          referrer:
            typeof document !== "undefined" ? document.referrer : undefined,
          utm: getUtmParams(),
          honeypot: values.honeypot,
          formStartedAt,
        }),
      });
      const result = await readApiResponse<LeadResponse>(response);

      setSuccessLeadId(result.leadId);
      trackCommercialLeadEvent("commercial_lead_success", {
        fileCount: uploads.length,
      });
    } catch (error) {
      const errorWithFields = error as Error & { fieldErrors?: FormErrors };

      if (errorWithFields.fieldErrors) {
        setErrors(errorWithFields.fieldErrors);
      }

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Please try again or contact Sofa N More directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <LeadFormShell
      id="commercial-sofa-enquiry"
      eyebrow="Commercial sofa brief"
      icon={<Building2 size={21} strokeWidth={1.55} />}
      title={
        <>
          Tell Us About Your Commercial Seating Project
          <span className="text-[var(--brand-gold)]">.</span>
        </>
      }
      intro={
        <>
          Share your venue, plans and seating requirements. Floor plans, site
          photographs and reference images help us understand the project before
          the first conversation.
        </>
      }
      successLeadId={successLeadId}
      successTitle="Your Commercial Project Brief Has Been Received."
      successMessage="Thank you. Our team can review your project details, plans and uploaded references before getting in touch."
      successEyebrow="Commercial brief received"
      successAction={{
        href: "#commercial-projects",
        label: "Explore Our Commercial Projects",
      }}
      submitError={submitError}
      errorTitle="Your project brief could not be sent."
      isSubmitting={isSubmitting}
      canSubmit={canSubmit}
      footerNote={
        hasBlockingUploads
          ? "Files need to finish before the brief can be sent."
          : "Required fields are marked with a gold star."
      }
      submitLabel="Send Your Commercial Project Brief"
      loadingLabel="Sending Your Project Brief..."
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={values.honeypot}
        onChange={(event) => updateValue("honeypot", event.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <FormSection title="Your Details">
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <ClayInput
              id="commercial-full-name"
              label="Full name"
              value={values.fullName}
              onChange={(value) => updateValue("fullName", value)}
              autoComplete="name"
              required
              error={errors.fullName}
            />
          </div>

          <div className="lg:col-span-3">
            <ClayInput
              id="commercial-work-email"
              label="Work email"
              type="email"
              inputMode="email"
              value={values.workEmail}
              onChange={(value) => updateValue("workEmail", value)}
              autoComplete="email"
              required
              error={errors.workEmail}
            />
          </div>
          <div className="lg:col-span-3">
            <ClayInput
              id="commercial-phone"
              label="Phone"
              type="tel"
              inputMode="tel"
              value={values.phone}
              onChange={(value) => updateValue("phone", value)}
              autoComplete="tel"
              required
              error={errors.phone}
            />
          </div>
          <div className="lg:col-span-3">
            <ClaySelect
              id="commercial-venue-type"
              label="Venue type"
              value={values.venueType}
              onChange={(value) => updateValue("venueType", value)}
              options={venueTypeOptions}
              required
              error={errors.venueType}
            />
          </div>
        </div>
      </FormSection>

 

     
      <FormSection title="Plans & References">
        <ClayFileDropzone
          id="commercial-plan-uploads"
          label="Plans, Photos & References"
          headline="Plans, Photos & References"
          hint={`JPG, PNG, WebP, or PDF. Up to ${COMMERCIAL_UPLOAD_COUNT} files, 15MB each.`}
          buttonLabel="Choose Files"
          items={uploads}
          accept="image/jpeg,image/png,image/webp,application/pdf,.jpg,.jpeg,.png,.webp,.pdf"
          maxFiles={COMMERCIAL_UPLOAD_COUNT}
          error={uploadError || errors.uploads}
          disabled={isSubmitting}
          onFilesSelected={handleFilesSelected}
          onRetry={retryUpload}
          onRemove={removeUpload}
        />
      </FormSection>

      <FormSection title="Final Notes">
        <div className="grid gap-5  lg:items-start">
          <ClayTextarea
            id="commercial-message"
            label="Message"
            rows={7}
            value={values.message}
            onChange={(value) => updateValue("message", value)}
            required
            error={errors.message}
          />
          <div className="space-y-3">
            <ClayCheckbox
              id="commercial-privacy-consent"
              checked={values.privacyConsent}
              onChange={(value) => updateValue("privacyConsent", value)}
              required
              error={errors.privacyConsent}
              label={
                <>
                  I agree that Sofa N More may use the information I provide to
                  respond to this enquiry.{" "}
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    className="font-extrabold text-xs   underline  underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2  "
                  >
                    Privacy Policy
                  </Link>
                </>
              }
            />
            <ClayCheckbox
              id="commercial-marketing-consent"
              checked={values.marketingConsent}
              onChange={(value) => updateValue("marketingConsent", value)}
              error={errors.marketingConsent}
              label="I would also like to receive occasional Sofa N More updates."
            />
          </div>
        </div>
      </FormSection>
    </LeadFormShell>
  );
}
