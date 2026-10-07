"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type LeadSuccessConfirmationOptions = {
  service: string;
  autoReturnMs?: number;
};

type DataLayerWindow = typeof window & {
  dataLayer?: Record<string, unknown>[];
};

const DEFAULT_AUTO_RETURN_MS = 4500;

function getCurrentRelativeUrl() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function useLeadSuccessConfirmation({
  service,
  autoReturnMs = DEFAULT_AUTO_RETURN_MS,
}: LeadSuccessConfirmationOptions) {
  const [successLeadId, setSuccessLeadId] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const returnUrlRef = useRef("");

  const clearSuccessConfirmation = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (typeof window !== "undefined" && returnUrlRef.current) {
      window.history.replaceState(
        window.history.state,
        "",
        returnUrlRef.current,
      );
      returnUrlRef.current = "";
    }

    setSuccessLeadId("");
  }, []);

  const showSuccessConfirmation = useCallback(
    (leadId: string) => {
      if (typeof window === "undefined") {
        setSuccessLeadId(leadId);
        return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const originalUrl = getCurrentRelativeUrl();
      returnUrlRef.current = originalUrl;

      const confirmationUrl = new URL(window.location.href);
      confirmationUrl.searchParams.set("lead_confirmation", service);
      confirmationUrl.searchParams.set("lead_status", "success");

      window.history.pushState(
        { leadConfirmation: service },
        "",
        `${confirmationUrl.pathname}${confirmationUrl.search}${confirmationUrl.hash}`,
      );

      const analyticsWindow = window as DataLayerWindow;
      const confirmationPath = `${confirmationUrl.pathname}${confirmationUrl.search}`;
      analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
      analyticsWindow.dataLayer.push({
        event: "lead_confirmation_view",
        event_category: "Lead",
        event_action: "success_confirmation_view",
        event_label: service,
        lead_service: service,
        lead_id: leadId,
        lead_status: "success",
        page_path: confirmationPath,
        page_location: confirmationUrl.href,
        virtual_page_path: confirmationPath,
        virtual_page_title: `Lead confirmation - ${service}`,
      });

      setSuccessLeadId(leadId);

      timeoutRef.current = setTimeout(() => {
        clearSuccessConfirmation();
      }, autoReturnMs);
    },
    [autoReturnMs, clearSuccessConfirmation, service],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (returnUrlRef.current) {
        window.history.replaceState(
          window.history.state,
          "",
          returnUrlRef.current,
        );
      }
    };
  }, []);

  return {
    successLeadId,
    showSuccessConfirmation,
    clearSuccessConfirmation,
  };
}
