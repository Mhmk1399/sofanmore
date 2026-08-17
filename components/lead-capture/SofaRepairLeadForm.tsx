"use client";

import Link from "next/link";
import { Camera } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";

import {
  ClayCheckbox,
  ClayCheckboxGroup,
  ClayFileDropzone,
  ClayInput,
  ClaySelect,
  ClayTextarea,
  FormSection,
  type SelectOption,
  type UploadItem,
} from "@/components/lead-capture/ClayFormControls";
import LeadFormShell from "@/components/lead-capture/LeadFormShell";
import { MAX_UPLOAD_COUNT, MAX_UPLOAD_SIZE_BYTES } from "@/lib/lead-config";

type FormErrors = Record<string, string>;

type RepairFormValues = {
  fullName: string;
  phone: string;
  email: string;
  postcode: string;
  itemType: string;
  issues: string[];
  approximateAge: string;
  transportPreference: string;
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

const initialValues: RepairFormValues = {
  fullName: "",
  phone: "",
  email: "",
  postcode: "",
  itemType: "",
  issues: [],
  approximateAge: "",
  transportPreference: "",
  message: "",
  privacyConsent: false,
  marketingConsent: false,
  honeypot: "",
};

const itemTypeOptions = [
  { label: "Sofa", value: "sofa" },
  { label: "Armchair", value: "armchair" },
  { label: "Chair", value: "chair" },
  { label: "Cushions", value: "cushions" },
  { label: "Banquette or commercial seating", value: "banquette-commercial" },
  { label: "Other", value: "other" },
] satisfies SelectOption[];

const issueOptions = [
  { label: "Worn upholstery", value: "worn-upholstery" },
  { label: "Tear or damage", value: "tear-damage" },
  { label: "Sagging cushions", value: "sagging-cushions" },
  { label: "Loss of comfort", value: "loss-of-comfort" },
  { label: "Staining", value: "staining" },
  { label: "General restoration", value: "general-restoration" },
  { label: "Not sure", value: "not-sure" },
  { label: "Other", value: "other" },
] satisfies SelectOption[];

const approximateAgeOptions = [
  { label: "Under 5 years", value: "under-5-years" },
  { label: "5-10 years", value: "5-10-years" },
  { label: "10-20 years", value: "10-20-years" },
  { label: "20+ years", value: "20-plus-years" },
  { label: "Unknown", value: "unknown" },
] satisfies SelectOption[];

const transportPreferenceOptions = [
  { label: "I can drop off", value: "can-drop-off" },
  { label: "I need collection", value: "need-collection" },
  { label: "Not sure", value: "not-sure" },
] satisfies SelectOption[];

const acceptedUploadMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
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

function isAllowedRepairPhoto(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  return (
    acceptedUploadMimeTypes.has(file.type) &&
    Boolean(extension && ["jpg", "jpeg", "png", "webp"].includes(extension))
  );
}

function revokePreviewUrl(item: UploadItem) {
  if (item.previewUrl) {
    URL.revokeObjectURL(item.previewUrl);
  }
}

function trackRepairLeadEvent(
  eventName:
    | "repair_form_started"
    | "repair_photo_added"
    | "repair_upload_completed"
    | "repair_form_success",
  details: Record<string, unknown> = {},
) {
  const payload = {
    eventName,
    service: "sofa_repair_restoration",
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
    "serviceData.itemType": "itemType",
    "serviceData.issues": "issues",
    "serviceData.approximateAge": "approximateAge",
    "serviceData.transportPreference": "transportPreference",
    uploadTokens: "uploads",
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

function validateForm(values: RepairFormValues, uploads: UploadItem[]) {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Enter your full name.";
  }

  if (!/^\+?[0-9][0-9\s().-]{6,30}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (
    values.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())
  ) {
    errors.email = "Enter a valid email address.";
  }

  if (!/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/.test(values.postcode)) {
    errors.postcode = "Enter a valid UK postcode.";
  }

  if (!values.itemType) {
    errors.itemType = "Choose the item type.";
  }

  if (uploads.length < 1) {
    errors.uploads = "Upload at least one photo.";
  } else if (uploads.some((item) => item.status === "failed")) {
    errors.uploads = "Retry or remove failed photos before sending.";
  } else if (
    uploads.some(
      (item) =>
        item.status !== "complete" || typeof item.uploadToken !== "string",
    )
  ) {
    errors.uploads = "Wait for every photo to finish uploading.";
  }

  if (!values.privacyConsent) {
    errors.privacyConsent = "Privacy consent is required.";
  }

  return errors;
}

function normalizeIssues(nextIssues: string[], currentIssues: string[]) {
  if (nextIssues.includes("not-sure") && !currentIssues.includes("not-sure")) {
    return ["not-sure"];
  }

  if (nextIssues.length > 1 && nextIssues.includes("not-sure")) {
    return nextIssues.filter((issue) => issue !== "not-sure");
  }

  return nextIssues;
}

export default function SofaRepairLeadForm() {
  const [values, setValues] = useState<RepairFormValues>(initialValues);
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
    trackRepairLeadEvent("repair_form_started");
  }

  function updateValue<K extends keyof RepairFormValues>(
    key: K,
    value: RepairFormValues[K],
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
          service: "SOFA_REPAIR_RESTORATION",
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
      trackRepairLeadEvent("repair_upload_completed", { fileType: file.type });
    } catch (error) {
      updateUploadItem(id, {
        status: "failed",
        progress: 100,
        error:
          error instanceof Error
            ? error.message
            : "This photo could not be uploaded.",
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
        setUploadError("This photo has already been added.");
        continue;
      }

      if (!isAllowedRepairPhoto(file)) {
        setUploadError("Use JPG, PNG, or WebP photos.");
        continue;
      }

      if (file.size > MAX_UPLOAD_SIZE_BYTES) {
        setUploadError("Each photo must be 10MB or smaller.");
        continue;
      }

      if (uploads.length + acceptedFiles.length >= MAX_UPLOAD_COUNT) {
        setUploadError(`Upload ${MAX_UPLOAD_COUNT} photos or fewer.`);
        break;
      }

      acceptedFiles.push(file);
    }

    if (!acceptedFiles.length) return;

    const newItems = acceptedFiles.map((file) => ({
      id: createClientId("file"),
      file,
      previewUrl: URL.createObjectURL(file),
      progress: 0,
      status: "queued" as const,
    }));

    setUploads((current) => [...current, ...newItems]);
    trackRepairLeadEvent("repair_photo_added", {
      fileCount: acceptedFiles.length,
    });

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
        : "/services/sofa-repair-restoration";
    const serviceData: Record<string, string | string[]> = {
      itemType: values.itemType,
    };

    if (values.issues.length > 0) {
      serviceData.issues = values.issues;
    }

    if (values.approximateAge) {
      serviceData.approximateAge = values.approximateAge;
    }

    if (values.transportPreference) {
      serviceData.transportPreference = values.transportPreference;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: "SOFA_REPAIR_RESTORATION",
          contact: {
            name: values.fullName,
            phone: values.phone,
            email: values.email || undefined,
            postcode: values.postcode,
          },
          serviceData,
          message: values.message || undefined,
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
      trackRepairLeadEvent("repair_form_success", {
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
      id="sofa-repair-enquiry"
      eyebrow="Sofa repair assessment"
      icon={<Camera size={21} strokeWidth={1.55} />}
      title={
        <>
          Show Us What Needs Attention
          <span className="text-[var(--brand-gold)]">.</span>
        </>
      }
      intro={
        <>
          You do not need to diagnose the problem yourself. Send us a few
          photographs, tell us what has changed and we can review the next step.
        </>
      }
      successLeadId={successLeadId}
      successTitle="Thank You — Your Sofa Is Ready for Review."
      successMessage="We’ve received your details and photos. Our team can review the condition before discussing repair, restoration, workshop drop-off or collection."
      successEyebrow="Photos received"
      submitError={submitError}
      errorTitle="We couldn’t send your sofa details."
      isSubmitting={isSubmitting}
      canSubmit={canSubmit}
      footerNote={
        hasBlockingUploads
          ? "Photos need to finish before the details can be sent."
          : "Start with at least one clear photo. Required fields are marked with a gold star."
      }
      submitLabel="Send Photos for Assessment"
      loadingLabel="Sending Your Sofa Details…"
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

      <FormSection title="01 Photos First">
        <div className="grid gap-4   lg:items-start">
          <div className="clay-surface-soft rounded-[22px] p-[5px]">
            <div className="rounded-[18px] bg-white/20 p-4">
              <p className="font-brand-display text-[21px] font-semibold leading-[1.15] text-[var(--brand-navy)]">
                Helpful photos
              </p>
              <div className="mt-4 space-y-2.5">
                {[
                  "One full-item photo",
                  "One close-up of wear or damage",
                  "Any label, fabric or cushion detail",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-[var(--brand-gold)]" />
                    <span className="font-brand-sans text-[11px] font-bold text-[var(--brand-navy)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ClayFileDropzone
            id="repair-photo-uploads"
            label="Upload Photos of Your Sofa"
            headline="Upload Photos of Your Sofa"
            hint="For the most useful assessment, include one full photo and close-ups of any worn or damaged areas. JPG, PNG, or WebP. Up to 8 photos, 10MB each."
            buttonLabel="Choose Photos"
            cameraButtonLabel="Take Photo"
            cameraCapture="environment"
            items={uploads}
            accept="image/jpeg,image/png,image/webp"
            maxFiles={MAX_UPLOAD_COUNT}
            error={uploadError || errors.uploads}
            disabled={isSubmitting}
            onFilesSelected={handleFilesSelected}
            onRetry={retryUpload}
            onRemove={removeUpload}
          />
        </div>
      </FormSection>

      <FormSection title="02 Your Details">
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          <ClayInput
            id="repair-full-name"
            label="Full name"
            value={values.fullName}
            onChange={(value) => updateValue("fullName", value)}
            autoComplete="name"
            required
            error={errors.fullName}
          />
          <ClayInput
            id="repair-phone"
            label="Phone"
            type="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(value) => updateValue("phone", value)}
            autoComplete="tel"
            required
            error={errors.phone}
          />
          <ClayInput
            id="repair-email"
            label="Email"
            type="email"
            inputMode="email"
            value={values.email}
            onChange={(value) => updateValue("email", value)}
            autoComplete="email"
            error={errors.email}
          />
          <ClayInput
            id="repair-postcode"
            label="Postcode"
            value={values.postcode}
            onChange={(value) => updateValue("postcode", value.toUpperCase())}
            autoComplete="postal-code"
            required
            error={errors.postcode}
          />
        </div>
      </FormSection>

      <FormSection title="03 Sofa Details">
        <div className="grid gap-3.5 lg:grid-cols-3">
          <ClaySelect
            id="repair-item-type"
            label="Item type"
            value={values.itemType}
            onChange={(value) => updateValue("itemType", value)}
            options={itemTypeOptions}
            required
            error={errors.itemType}
          />
          <ClaySelect
            id="repair-approximate-age"
            label="Approx age"
            value={values.approximateAge}
            onChange={(value) => updateValue("approximateAge", value)}
            options={approximateAgeOptions}
            error={errors.approximateAge}
          />
          <ClaySelect
            id="repair-transport"
            label="Transport"
            value={values.transportPreference}
            onChange={(value) => updateValue("transportPreference", value)}
            options={transportPreferenceOptions}
            error={errors.transportPreference}
          />
        </div>
        <div className="mt-4">
          <ClayCheckboxGroup
            label="What needs attention"
            values={values.issues}
            onChange={(value) =>
              updateValue("issues", normalizeIssues(value, values.issues))
            }
            options={issueOptions}
            error={errors.issues}
          />
        </div>
      </FormSection>

      <FormSection title="04 Anything Else?">
        <div className="grid gap-5   lg:items-start">
          <ClayTextarea
            id="repair-message"
            label="Tell us what happened or what you would like to improve"
            rows={6}
            value={values.message}
            onChange={(value) => updateValue("message", value)}
            error={errors.message}
          />
          <div className="space-y-3">
            <ClayCheckbox
              id="repair-privacy-consent"
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
              id="repair-marketing-consent"
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
