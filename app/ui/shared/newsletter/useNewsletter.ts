"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NewsletterApiResponse, NewsletterSubmitPayload } from "@/app/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Status = "idle" | "loading" | "success" | "error";

export interface UseNewsletterReturn {
  /** Current email value — shared between footer input and modal. */
  email: string;
  modalOpen: boolean;
  /** True while the API request is in flight. */
  isLoading: boolean;
  /** True after a successful submission. */
  isSuccess: boolean;
  /** Error message from the API, or null. */
  apiError: string | null;
  /**
   * Key to pass to FooterNewsletterSignup. Increments on reset so the
   * component remounts and clears its local email state.
   */
  inputKey: number;
  /** Footer input calls this when the user submits a valid email. */
  handleStartSignup: (email: string) => void;
  /** Controls the modal open state; ignores close requests while loading. */
  handleModalOpenChange: (open: boolean) => void;
  /** Modal form calls this with the full anti-spam payload. */
  handleModalSubmit: (payload: NewsletterSubmitPayload) => Promise<void>;
  /** Resets the entire flow back to idle — used by the footer reset link. */
  handleReset: () => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useNewsletter(): UseNewsletterReturn {
  const [email, setEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [apiError, setApiError] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState(0);

  // AbortController ref — lets us cancel an in-flight request on unmount.
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const handleStartSignup = useCallback((submittedEmail: string) => {
    setEmail(submittedEmail);
    setApiError(null);
    setStatus("idle"); // always reset so the form shows, even after a previous success
    setModalOpen(true);
  }, []);

  const handleModalOpenChange = useCallback(
    (open: boolean) => {
      // Block closing while a request is in flight so the user can't dismiss mid-submit.
      if (status === "loading") return;
      setModalOpen(open);
      if (!open) setApiError(null);
    },
    [status]
  );

  const handleModalSubmit = useCallback(
    async (payload: NewsletterSubmitPayload) => {
      // Cancel any previous in-flight request before starting a new one.
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setStatus("loading");
      setApiError(null);

      try {
        const res = await fetch("/api/newsletter-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        // Always parse JSON — even non-2xx responses from our route return JSON.
        const data: NewsletterApiResponse = await res.json();

        if (data.success) {
          setStatus("success");
          // Keep modal open — it will render the success panel so the user
          // sees clear confirmation before closing themselves.
        } else {
          setStatus("error");
          setApiError(data.message ?? "Something went wrong. Please try again.");
        }
      } catch (err: unknown) {
        // Ignore intentional aborts (component unmounted).
        if (err instanceof DOMException && err.name === "AbortError") return;
        // Network failure — fetch itself threw (no response).
        setStatus("error");
        setApiError("A network error occurred. Please check your connection and try again.");
      }
    },
    []
  );

  const handleReset = useCallback(() => {
    setStatus("idle");
    setEmail("");
    setApiError(null);
    setModalOpen(false);
    setInputKey((k) => k + 1); // remounts FooterNewsletterSignup, clearing its local state
  }, []);

  return {
    email,
    modalOpen,
    isLoading: status === "loading",
    isSuccess: status === "success",
    apiError,
    inputKey,
    handleStartSignup,
    handleModalOpenChange,
    handleModalSubmit,
    handleReset,
  };
}
