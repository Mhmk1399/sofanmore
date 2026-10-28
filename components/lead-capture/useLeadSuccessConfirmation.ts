"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  buildLeadConfirmationEvent,
  type LeadConfirmationSnapshot,
  type LeadTrackingService,
} from "@/lib/lead-confirmation-tracking";

type LeadSuccessConfirmationOptions = {
  service: LeadTrackingService;
  autoReturnMs?: number;
};

type DataLayerWindow = typeof window & {
  dataLayer?: Record<string, unknown>[];
};

const DEFAULT_AUTO_RETURN_MS = 4500;

function getCurrentRelativeUrl() {
  return (
    window.location.pathname + window.location.search + window.location.hash
  );
}

export function useLeadSuccessConfirmation({
  service,
  autoReturnMs = DEFAULT_AUTO_RETURN_MS,
}: LeadSuccessConfirmationOptions) {
  const [successLeadId, setSuccessLeadId] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const returnUrlRef = useRef("");
  const trackedIds = useRef(new Set<string>());
  const pendingConfirmation = useRef<{
    leadId: string;
    event: ReturnType<typeof buildLeadConfirmationEvent>;
    afterTracking: () => void;
  } | null>(null);

  const clearSuccessConfirmation = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (returnUrlRef.current) {
      window.history.replaceState(
        window.history.state,
        "",
        returnUrlRef.current,
      );
      returnUrlRef.current = "";
    }
    pendingConfirmation.current = null;
    setSuccessLeadId("");
  }, []);

  const showSuccessConfirmation = useCallback(
    (
      leadId: string,
      snapshot: LeadConfirmationSnapshot,
      afterTracking: () => void,
    ) => {
      if (typeof leadId !== "string" || !leadId.trim()) {
        throw new Error(
          "The server did not confirm that your enquiry was saved. Please try again.",
        );
      }
      if (trackedIds.current.has(leadId) || pendingConfirmation.current) return;
      const event = buildLeadConfirmationEvent(
        service,
        snapshot,
        window.location.href,
      );
      pendingConfirmation.current = { leadId, event, afterTracking };
      returnUrlRef.current = getCurrentRelativeUrl();
      const confirmationUrl = new URL(window.location.href);
      confirmationUrl.searchParams.set("lead_confirmation", service);
      confirmationUrl.searchParams.set("lead_status", "success");
      window.history.pushState(
        { leadConfirmation: service },
        "",
        confirmationUrl.pathname +
          confirmationUrl.search +
          confirmationUrl.hash,
      );
      setSuccessLeadId(leadId);
    },
    [service],
  );

  const onConfirmationVisible = useCallback(
    (leadId: string) => {
      const pending = pendingConfirmation.current;
      if (
        !pending ||
        pending.leadId !== leadId ||
        trackedIds.current.has(leadId)
      )
        return;
      // Consume first: Strict Mode, rerenders and repeated callbacks must not count twice.
      pendingConfirmation.current = null;
      trackedIds.current.add(leadId);
      try {
        const analyticsWindow = window as DataLayerWindow;
        analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
        analyticsWindow.dataLayer.push(pending.event);
        console.log("Lead tracking pushed to dataLayer", {
          event: "lead_confirmation_view",
          lead_service: service,
          lead_status: "success",
        });
      } catch {
        // Analytics failure must not turn an already saved enquiry into a failed submission.
        console.warn("Lead tracking could not be delivered to dataLayer.");
      } finally {
        pending.afterTracking();
      }
      timeoutRef.current = setTimeout(clearSuccessConfirmation, autoReturnMs);
    },
    [autoReturnMs, clearSuccessConfirmation, service],
  );

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      pendingConfirmation.current = null;
      if (returnUrlRef.current) {
        window.history.replaceState(
          window.history.state,
          "",
          returnUrlRef.current,
        );
      }
    },
    [],
  );

  return {
    successLeadId,
    showSuccessConfirmation,
    onConfirmationVisible,
    clearSuccessConfirmation,
  };
}
