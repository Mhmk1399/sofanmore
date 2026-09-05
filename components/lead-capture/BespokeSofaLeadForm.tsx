"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";

import {
  ClayCheckbox,
  ClayCheckboxGroup,
  ClayFileDropzone,
  ClayInput,
  ClayRadioGroup,
  ClaySelect,
  ClayTextarea,
  FormSection,
  type SelectOption,
  type UploadItem,
} from "@/components/lead-capture/ClayFormControls";
import LeadFormShell from "@/components/lead-capture/LeadFormShell";
import { MAX_UPLOAD_COUNT, MAX_UPLOAD_SIZE_BYTES } from "@/lib/lead-config";

type FormErrors = Record<string, string>;

type BespokeFormValues = {
  fullName: string;
  phone: string;
  email: string;
  postcode: string;
  projectType: string;
  spaceType: string;
  dimensionsKnown: "no" | "yes";
  widthCm: string;
  depthCm: string;
  heightCm: string;
  configuration: string;
  upholsteryPreference: string;
  comfortPreference: string;
  accessRestrictions: string[];
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

const initialValues: BespokeFormValues = {
  fullName: "",
  phone: "",
  email: "",
  postcode: "",
  projectType: "",
  spaceType: "",
  dimensionsKnown: "no",
  widthCm: "",
  depthCm: "",
  heightCm: "",
  configuration: "",
  upholsteryPreference: "",
  comfortPreference: "",
  accessRestrictions: [],
  message: "",
  privacyConsent: false,
  marketingConsent: false,
  honeypot: "",
};

const projectTypeOptions = [
  { label: "Single sofa", value: "single-sofa" },
  { label: "Corner sofa", value: "corner-sofa" },
  { label: "Modular sofa", value: "modular-sofa" },
  { label: "Armchair", value: "armchair" },
  { label: "Bench or ottoman", value: "bench-ottoman" },
  { label: "Other", value: "other" },
] satisfies SelectOption[];

const spaceTypeOptions = [
  { label: "Living room", value: "living-room" },
  { label: "Apartment", value: "apartment" },
  { label: "House", value: "house" },
  { label: "Office", value: "office" },
  { label: "Hospitality", value: "hospitality" },
  { label: "Other", value: "other" },
] satisfies SelectOption[];

const configurationOptions = [
  { label: "Straight", value: "straight" },
  { label: "Corner", value: "corner" },
  { label: "Chaise", value: "chaise" },
  { label: "Modular", value: "modular" },
  { label: "Curved", value: "curved" },
  { label: "Not sure", value: "not-sure" },
] satisfies SelectOption[];

const upholsteryOptions = [
  { label: "Fabric", value: "fabric" },
  { label: "Velvet", value: "velvet" },
  { label: "Leather", value: "leather" },
  { label: "Not sure", value: "not-sure" },
  { label: "Other", value: "other" },
] satisfies SelectOption[];

const comfortOptions = [
  { label: "Soft", value: "soft" },
  { label: "Medium", value: "medium" },
  { label: "Firm", value: "firm" },
  { label: "Not sure", value: "not-sure" },
] satisfies SelectOption[];

const accessRestrictionOptions = [
  { label: "None", value: "none" },
  { label: "Narrow doorway", value: "narrow-doorway" },
  { label: "Stairs", value: "stairs" },
  { label: "Lift", value: "lift" },
  { label: "Tight hallway", value: "tight-hallway" },
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

function isAllowedImage(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  return (
    acceptedUploadMimeTypes.has(file.type) &&
    Boolean(extension && ["jpg", "jpeg", "png", "webp"].includes(extension))
  );
}

function trackLeadFormEvent(
  eventName:
    | "lead_form_view"
    | "lead_form_started"
    | "lead_file_added"
    | "lead_upload_completed"
    | "lead_form_submit"
    | "lead_form_success"
    | "lead_form_error",
  details: Record<string, unknown> = {},
) {
  const payload = {
    eventName,
    service: "bespoke_sofa",
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
    "serviceData.projectType": "projectType",
    "serviceData.spaceType": "spaceType",
    "serviceData.dimensionsKnown": "dimensionsKnown",
    "serviceData.widthCm": "widthCm",
    "serviceData.depthCm": "depthCm",
    "serviceData.heightCm": "heightCm",
    "serviceData.configuration": "configuration",
    "serviceData.upholsteryPreference": "upholsteryPreference",
    "serviceData.comfortPreference": "comfortPreference",
    "serviceData.accessRestrictions": "accessRestrictions",
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

function validateForm(values: BespokeFormValues, uploads: UploadItem[]) {
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

  if (!values.projectType) {
    errors.projectType = "Choose a project type.";
  }

  if (!values.spaceType) {
    errors.spaceType = "Choose a space type.";
  }

  if (values.dimensionsKnown === "yes") {
    for (const key of ["widthCm", "depthCm", "heightCm"] as const) {
      if (!values[key]) continue;

      const number = Number(values[key]);

      if (!Number.isFinite(number) || number < 1 || number > 2000) {
        errors[key] = "Enter a valid measurement.";
      }
    }
  }

  if (!values.privacyConsent) {
    errors.privacyConsent = "Privacy consent is required.";
  }

  if (uploads.some((item) => item.status === "failed")) {
    errors.uploads = "Retry or remove failed images before sending.";
  } else if (
    uploads.some(
      (item) =>
        item.status !== "complete" || typeof item.uploadToken !== "string",
    )
  ) {
    errors.uploads = "Wait for every image to finish uploading.";
  }

  return errors;
}

export default function BespokeSofaLeadForm() {
  const [values, setValues] = useState<BespokeFormValues>(initialValues);
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
    trackLeadFormEvent("lead_form_view");
  }, []);

  useEffect(() => {
    uploadsRef.current = uploads;
  }, [uploads]);

  useEffect(() => {
    return () => {
      for (const item of uploadsRef.current) {
        URL.revokeObjectURL(item.previewUrl);
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
    trackLeadFormEvent("lead_form_started");
  }

  function updateValue<K extends keyof BespokeFormValues>(
    key: K,
    value: BespokeFormValues[K],
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
          service: "BESPOKE_SOFA",
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
      trackLeadFormEvent("lead_upload_completed", { fileCount: 1 });
    } catch (error) {
      updateUploadItem(id, {
        status: "failed",
        progress: 100,
        error:
          error instanceof Error
            ? error.message
            : "This image could not be uploaded.",
      });
      trackLeadFormEvent("lead_form_error", { stage: "upload" });
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
        setUploadError("This image has already been added.");
        continue;
      }

      if (!isAllowedImage(file)) {
        setUploadError("Use JPG, PNG, or WebP images.");
        continue;
      }

      if (file.size > MAX_UPLOAD_SIZE_BYTES) {
        setUploadError("Each image must be 10MB or smaller.");
        continue;
      }

      if (uploads.length + acceptedFiles.length >= MAX_UPLOAD_COUNT) {
        setUploadError(`Upload ${MAX_UPLOAD_COUNT} images or fewer.`);
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
    trackLeadFormEvent("lead_file_added", { fileCount: acceptedFiles.length });

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
        URL.revokeObjectURL(item.previewUrl);
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
      trackLeadFormEvent("lead_form_error", { stage: "client_validation" });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    trackLeadFormEvent("lead_form_submit", { fileCount: uploads.length });

    const sourcePage =
      typeof window !== "undefined"
        ? `${window.location.pathname}${window.location.search}`
        : "/services/bespoke-sofas";
    const serviceData: Record<string, string | number | boolean | string[]> = {
      projectType: values.projectType,
      spaceType: values.spaceType,
      dimensionsKnown: values.dimensionsKnown === "yes",
    };

    if (values.dimensionsKnown === "yes") {
      for (const key of ["widthCm", "depthCm", "heightCm"] as const) {
        if (values[key]) {
          serviceData[key] = Number(values[key]);
        }
      }
    }

    if (values.configuration) {
      serviceData.configuration = values.configuration;
    }

    if (values.upholsteryPreference) {
      serviceData.upholsteryPreference = values.upholsteryPreference;
    }

    if (values.comfortPreference) {
      serviceData.comfortPreference = values.comfortPreference;
    }

    if (values.accessRestrictions.length > 0) {
      serviceData.accessRestrictions = values.accessRestrictions;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: "BESPOKE_SOFA",
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
      trackLeadFormEvent("lead_form_success", { fileCount: uploads.length });
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
      trackLeadFormEvent("lead_form_error", { stage: "submit" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <LeadFormShell
      id="bespoke-sofa-enquiry"
      eyebrow="Bespoke sofa enquiry"
      title={
        <>
          Request a sofa made around your space
          <span className="text-[var(--brand-gold)]">.</span>
        </>
      }
      intro={
        <>
          Share the shape of the project, the room, and any useful images. The
          details go straight into the Sofa N More lead workflow.
        </>
      }
      successLeadId={successLeadId}
      submitError={submitError}
      isSubmitting={isSubmitting}
      canSubmit={canSubmit}
      footerNote={
        hasBlockingUploads
          ? "Images need to finish before the project can be sent."
          : "Required fields are marked with a gold star."
      }
      submitLabel="Request a Bespoke Sofa Consultation"
      loadingLabel="Sending Your Project..."
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

      <FormSection eyebrow="Contact" title="Your details">
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          <ClayInput
            id="bespoke-full-name"
            label="Full name"
            value={values.fullName}
            onChange={(value) => updateValue("fullName", value)}
            autoComplete="name"
            required
            error={errors.fullName}
          />
          <ClayInput
            id="bespoke-phone"
            label="Phone"
            type="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(value) => updateValue("phone", value)}
            autoComplete="tel"
            required
            error={errors.phone}
          />
          <ClaySelect
            id="bespoke-project-type"
            label="Project type"
            value={values.projectType}
            onChange={(value) => updateValue("projectType", value)}
            options={projectTypeOptions}
            required
            error={errors.projectType}
          />
          <ClaySelect
            id="bespoke-space-type"
            label="Space type"
            value={values.spaceType}
            onChange={(value) => updateValue("spaceType", value)}
            options={spaceTypeOptions}
            required
            error={errors.spaceType}
          />
        </div>
      </FormSection>

       

   

      <FormSection eyebrow="Finish" title="Images and notes">
        <div className="grid gap-5   lg:items-start">
          <ClayFileDropzone
            id="bespoke-image-uploads"
            label="Project references"
            items={uploads}
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            maxFiles={MAX_UPLOAD_COUNT}
            error={uploadError || errors.uploads}
            disabled={isSubmitting}
            onFilesSelected={handleFilesSelected}
            onRetry={retryUpload}
            onRemove={removeUpload}
          />
          <ClayTextarea
            id="bespoke-message"
            label="Message"
            rows={7}
            value={values.message}
            onChange={(value) => updateValue("message", value)}
            error={errors.message}
          />
        </div>
      </FormSection>

      <FormSection eyebrow="Consent" title="Privacy">
        <div className="space-y-3">
          <ClayCheckbox
            id="bespoke-privacy-consent"
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
                  className="font-bold text-[var(--brand-gold-700)] underline decoration-[var(--brand-gold)]/45 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]"
                >
                  Privacy Policy
                </Link>
              </>
            }
          />
          <ClayCheckbox
            id="bespoke-marketing-consent"
            checked={values.marketingConsent}
            onChange={(value) => updateValue("marketingConsent", value)}
            error={errors.marketingConsent}
            label="I would also like to receive occasional Sofa N More updates."
          />
        </div>
      </FormSection>
    </LeadFormShell>
  );
}
