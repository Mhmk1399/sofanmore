"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
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
import {
  INTERIOR_UPLOAD_COUNT,
  INTERIOR_UPLOAD_SIZE_BYTES,
} from "@/lib/lead-config";

type FormErrors = Record<string, string>;

type InteriorFormValues = {
  fullName: string;
  email: string;
  phone: string;
  postcode: string;
  projectType: string;
  needs: string[];
  projectStage: string;
  approximateSpaceSize: string;
  styleDirection: string;
  preferredContactMethod: string;
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

const initialValues: InteriorFormValues = {
  fullName: "",
  email: "",
  phone: "",
  postcode: "",
  projectType: "",
  needs: [],
  projectStage: "",
  approximateSpaceSize: "",
  styleDirection: "",
  preferredContactMethod: "",
  message: "",
  privacyConsent: false,
  marketingConsent: false,
  honeypot: "",
};

const projectTypeOptions = [
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Restaurant or cafe", value: "restaurant-cafe" },
  { label: "Hotel or hospitality", value: "hotel-hospitality" },
  { label: "Office", value: "office" },
  { label: "Other", value: "other" },
] satisfies SelectOption[];

const needOptions = [
  { label: "Complete interior", value: "complete-interior" },
  { label: "Single room", value: "single-room" },
  { label: "Space planning", value: "space-planning" },
  { label: "Colour and materials", value: "colour-materials" },
  { label: "Bespoke sofa integration", value: "bespoke-sofa-integration" },
  { label: "Commercial seating", value: "commercial-seating" },
  { label: "Styling", value: "styling" },
  { label: "Not sure", value: "not-sure" },
] satisfies SelectOption[];

const projectStageOptions = [
  { label: "Just exploring", value: "just-exploring" },
  { label: "Planning", value: "planning" },
  { label: "Property secured", value: "property-secured" },
  { label: "Renovation underway", value: "renovation-underway" },
  { label: "Ready to start", value: "ready-to-start" },
] satisfies SelectOption[];

const preferredContactOptions = [
  { label: "Phone", value: "phone" },
  { label: "Email", value: "email" },
  { label: "Either", value: "either" },
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

function isAllowedInteriorFile(file: File) {
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

function trackInteriorLeadEvent(
  eventName:
    | "interior_form_started"
    | "interior_reference_uploaded"
    | "interior_form_success",
  details: Record<string, unknown> = {},
) {
  const payload = {
    eventName,
    service: "interior_design",
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
    "serviceData.needs": "needs",
    "serviceData.projectStage": "projectStage",
    "serviceData.approximateSpaceSize": "approximateSpaceSize",
    "serviceData.styleDirection": "styleDirection",
    "serviceData.preferredContactMethod": "preferredContactMethod",
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

function validateForm(values: InteriorFormValues, uploads: UploadItem[]) {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Enter your full name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!/^\+?[0-9][0-9\s().-]{6,30}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/.test(values.postcode)) {
    errors.postcode = "Enter a valid UK postcode.";
  }

  if (!values.projectType) {
    errors.projectType = "Choose a project type.";
  }

  if (values.message.trim().length < 20) {
    errors.message = "Share at least 20 characters about the space.";
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

export default function InteriorDesignLeadForm() {
  const [values, setValues] = useState<InteriorFormValues>(initialValues);
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
    trackInteriorLeadEvent("interior_form_started");
  }

  function updateValue<K extends keyof InteriorFormValues>(
    key: K,
    value: InteriorFormValues[K],
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
          service: "INTERIOR_DESIGN",
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
      trackInteriorLeadEvent("interior_reference_uploaded", {
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

      if (!isAllowedInteriorFile(file)) {
        setUploadError("Use JPG, PNG, WebP, or PDF files.");
        continue;
      }

      if (file.size > INTERIOR_UPLOAD_SIZE_BYTES) {
        setUploadError("Each file must be 15MB or smaller.");
        continue;
      }

      if (uploads.length + acceptedFiles.length >= INTERIOR_UPLOAD_COUNT) {
        setUploadError(`Upload ${INTERIOR_UPLOAD_COUNT} files or fewer.`);
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
        : "/services/interior-design";
    const serviceData: Record<string, string | string[]> = {
      projectType: values.projectType,
    };

    if (values.needs.length > 0) {
      serviceData.needs = values.needs;
    }

    if (values.projectStage) {
      serviceData.projectStage = values.projectStage;
    }

    if (values.approximateSpaceSize.trim()) {
      serviceData.approximateSpaceSize = values.approximateSpaceSize;
    }

    if (values.styleDirection.trim()) {
      serviceData.styleDirection = values.styleDirection;
    }

    if (values.preferredContactMethod) {
      serviceData.preferredContactMethod = values.preferredContactMethod;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: "INTERIOR_DESIGN",
          contact: {
            name: values.fullName,
            email: values.email,
            phone: values.phone,
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
      trackInteriorLeadEvent("interior_form_success", {
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
      id="interior-design-enquiry"
      eyebrow="Interior design enquiry"
      icon={<Sparkles size={21} strokeWidth={1.55} />}
      title={
        <>
          Tell Us About Your Space
          <span className="text-[var(--brand-gold)]">.</span>
        </>
      }
      intro={
        <>
          Share the space, what is not currently working and how you would like
          it to feel. Photographs, plans and inspiration can help us understand
          the direction.
        </>
      }
      successLeadId={successLeadId}
      successTitle="Thank You — We’ve Received Your Interior Project."
      successMessage="Our team can now review your space, project requirements and uploaded references before discussing the next step."
      successEyebrow="Interior project received"
      submitError={submitError}
      errorTitle="We couldn’t send your interior project."
      isSubmitting={isSubmitting}
      canSubmit={canSubmit}
      footerNote={
        hasBlockingUploads
          ? "Files need to finish before the brief can be sent."
          : "Required fields are marked with a gold star."
      }
      submitLabel="Start Your Interior Design Project"
      loadingLabel="Sending Your Interior Brief…"
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

      <FormSection title="01 Your Details">
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <ClayInput
              id="interior-full-name"
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
              id="interior-email"
              label="Email"
              type="email"
              inputMode="email"
              value={values.email}
              onChange={(value) => updateValue("email", value)}
              autoComplete="email"
              required
              error={errors.email}
            />
          </div>
          <div className="lg:col-span-3">
            <ClayInput
              id="interior-phone"
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
            <ClayInput
              id="interior-postcode"
              label="Postcode"
              value={values.postcode}
              onChange={(value) => updateValue("postcode", value.toUpperCase())}
              autoComplete="postal-code"
              required
              error={errors.postcode}
            />
          </div>
          <div className="lg:col-span-3">
                <ClaySelect
            id="interior-preferred-contact"
            label="Preferred contact"
            value={values.preferredContactMethod}
            onChange={(value) => updateValue("preferredContactMethod", value)}
            options={preferredContactOptions}
            error={errors.preferredContactMethod}
          />
          </div>
        </div>
      </FormSection>

      <FormSection title="02 Your Space">
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ClaySelect
              id="interior-project-type"
              label="Project type"
              value={values.projectType}
              onChange={(value) => updateValue("projectType", value)}
              options={projectTypeOptions}
              required
              error={errors.projectType}
            />
          </div>
          <div className="lg:col-span-4">
            <ClaySelect
              id="interior-project-stage"
              label="Project stage"
              value={values.projectStage}
              onChange={(value) => updateValue("projectStage", value)}
              options={projectStageOptions}
              error={errors.projectStage}
            />
          </div>
          <div className="lg:col-span-4">
            <ClayInput
              id="interior-space-size"
              label="Approx space size"
              value={values.approximateSpaceSize}
              onChange={(value) => updateValue("approximateSpaceSize", value)}
              error={errors.approximateSpaceSize}
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-12">
            <ClayInput
              id="interior-style-direction"
              label="Style direction"
              value={values.styleDirection}
              onChange={(value) => updateValue("styleDirection", value)}
              error={errors.styleDirection}
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="03 What You Need">
        <div className="grid gap-4   lg:items-start">
          <ClayCheckboxGroup
            label="Needs"
            values={values.needs}
            onChange={(value) => updateValue("needs", value)}
            options={needOptions}
            error={errors.needs}
          />
       
        </div>
      </FormSection>

      <FormSection title="04 Images & Plans">
        <ClayFileDropzone
          id="interior-reference-uploads"
          label="Share Your Space"
          headline="Share Your Space"
          hint={`Upload current room photographs, floor plans, sketches or inspiration. JPG, PNG, WebP, or PDF. Up to ${INTERIOR_UPLOAD_COUNT} files, 15MB each.`}
          buttonLabel="Choose Files"
          items={uploads}
          accept="image/jpeg,image/png,image/webp,application/pdf,.jpg,.jpeg,.png,.webp,.pdf"
          maxFiles={INTERIOR_UPLOAD_COUNT}
          error={uploadError || errors.uploads}
          disabled={isSubmitting}
          onFilesSelected={handleFilesSelected}
          onRetry={retryUpload}
          onRemove={removeUpload}
        />
      </FormSection>

      <FormSection title="05 Anything Else?">
        <div className="grid gap-5   lg:items-start">
          <ClayTextarea
            id="interior-message"
            label="What would you like to change about the space?"
            rows={7}
            value={values.message}
            onChange={(value) => updateValue("message", value)}
            required
            error={errors.message}
          />
          <div className="space-y-3">
            <ClayCheckbox
              id="interior-privacy-consent"
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
              id="interior-marketing-consent"
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
