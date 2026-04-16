"use client";

import { useEffect, useId, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle, Loader2, X } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { Label } from "@/app/ui/components/input/Label";
import type { NewsletterFormData, NewsletterSubmitPayload } from "@/app/types";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Partial<Record<keyof NewsletterFormData, string>>;

/**
 * Lightly formats a phone string as (555) 555-5555.
 * Strips all non-digits and caps at 10 digits — never rejects mid-typing.
 */
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

function validate(data: NewsletterFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  if (digitsOnly(data.phone).length !== 10) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }
  if (!data.optIn) {
    errors.optIn = "You must agree to receive newsletter communications.";
  }

  return errors;
}

function empty(initialEmail = ""): NewsletterFormData {
  return { email: initialEmail, fullName: "", phone: "", optIn: false };
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="!text-blue-100 text-sm">
        {label}
      </Label>
      {children}
      <p
        id={errorId}
        aria-live="polite"
        className={cn(
          "font-inria text-xs text-red-300 transition-opacity duration-150",
          error ? "opacity-100" : "opacity-0 select-none"
        )}
      >
        {error ?? " "}
      </p>
    </div>
  );
}

const inputClass = cn(
  "w-full rounded-md border px-3 py-2.5",
  "bg-blue-400 border-blue-300 text-gray-100 placeholder:text-blue-200",
  "font-inria text-sm",
  "focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  "transition-colors duration-150"
);

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface NewsletterSignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Email pre-filled from the footer input. */
  initialEmail: string;
  /** Called with the full anti-spam payload — no backend call happens here. */
  onSubmit: (data: NewsletterSubmitPayload) => void;
  /** Disables inputs and submit button while the API request is in flight. */
  isLoading?: boolean;
  /** API-level error message to display above the action buttons. */
  apiError?: string | null;
  /** Shows a success panel in place of the form. */
  isSuccess?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NewsletterSignupModal({
  open,
  onOpenChange,
  initialEmail,
  onSubmit,
  isLoading = false,
  apiError = null,
  isSuccess = false,
}: NewsletterSignupModalProps) {
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;

  const [form, setForm] = useState<NewsletterFormData>(() => empty(initialEmail));
  const [errors, setErrors] = useState<FieldErrors>({});
  // Tracks which fields the user has blurred at least once.
  const [touched, setTouched] = useState<Set<keyof NewsletterFormData>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  // Honeypot: bots fill this in; humans never see it.
  const [_hp, set_hp] = useState("");
  // Timestamp recorded when the modal opens — used to detect sub-second bot POSTs.
  const openedAt = useRef<number>(0);

  // Sync initialEmail and reset form each time the modal opens.
  useEffect(() => {
    if (open) {
      setForm(empty(initialEmail));
      setErrors({});
      setTouched(new Set());
      setSubmitted(false);
      set_hp("");
      openedAt.current = Date.now();
    }
  }, [open, initialEmail]);

  // Re-validate whenever the form changes — errors update live once a field
  // has been touched or the user has attempted to submit.
  useEffect(() => {
    if (submitted || touched.size > 0) {
      setErrors(validate(form));
    }
  }, [form, submitted, touched]);

  function set<K extends keyof NewsletterFormData>(key: K, value: NewsletterFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function touch(field: keyof NewsletterFormData) {
    setTouched((prev) => new Set(prev).add(field));
  }

  /** Returns the error string for a field only when it should be visible. */
  function visibleError(field: keyof NewsletterFormData): string | undefined {
    return (submitted || touched.has(field)) ? errors[field] : undefined;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const payload: NewsletterSubmitPayload = {
      ...form,
      _hp,
      _ts: openedAt.current,
    };
    onSubmit(payload);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Panel */}
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[min(92vw,480px)]",
            "-translate-x-1/2 -translate-y-1/2",
            "rounded-xl bg-blue-500 border border-blue-300/30 shadow-2xl",
            "focus:outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2",
            "data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%]"
          )}
          aria-describedby={`${uid}-description`}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-blue-300/20">
            <div className="flex flex-col gap-1 pr-4">
              <Dialog.Title className="font-fredoka text-xl text-gray-100 leading-snug">
                Join the Oblate Academy Newsletter
              </Dialog.Title>
              <p
                id={`${uid}-description`}
                className="font-inria text-sm text-blue-100"
              >
                Stay updated with resources, saint spotlights, and activities for your family.
              </p>
            </div>

            <Dialog.Close asChild>
              <button
                aria-label="Close newsletter signup"
                disabled={isLoading}
                className={cn(
                  "flex-shrink-0 flex items-center justify-center rounded-full",
                  "h-8 w-8 text-blue-200 hover:text-gray-100 hover:bg-blue-400",
                  "transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400",
                  isLoading && "opacity-50 cursor-not-allowed pointer-events-none"
                )}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          {/* Success panel — replaces form after confirmed submission */}
          {isSuccess ? (
            <div className="px-6 py-12 flex flex-col items-center gap-5 text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20">
                <CheckCircle size={32} className="text-green-400" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-fredoka text-xl text-gray-100">
                  You&apos;re signed up!
                </p>
                <p className="font-inria text-sm text-blue-100 max-w-[300px] mx-auto">
                  Thanks for joining. We&apos;ll keep you updated with resources, saint spotlights, and activities for your family.
                </p>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className={cn(
                    "mt-1 font-poppins font-semibold text-sm text-yellow-900",
                    "px-6 py-2 rounded-full bg-yellow-400 hover:bg-yellow-300",
                    "transition-colors duration-150 shadow",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                  )}
                >
                  Close
                </button>
              </Dialog.Close>
            </div>
          ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/*
              Honeypot — visually hidden from real users.
              - position:absolute / opacity:0 keeps it out of view without display:none
                (display:none is sometimes detected and skipped by bots).
              - tabIndex={-1} removes it from keyboard navigation.
              - aria-hidden removes it from the accessibility tree.
              - autoComplete="off" prevents password managers filling it.
              - The field name "website" is a common bot-bait label.
            */}
            <div aria-hidden="true" className="absolute -left-[9999px] opacity-0 pointer-events-none" tabIndex={-1}>
              <label htmlFor={id("website")}>Website</label>
              <input
                id={id("website")}
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={_hp}
                onChange={(e) => set_hp(e.target.value)}
              />
            </div>
            <div className="px-6 py-5 flex flex-col gap-1">
              {/* Full name */}
              <Field
                id={id("fullName")}
                label="Full name"
                error={visibleError("fullName")}
              >
                <input
                  id={id("fullName")}
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  onBlur={() => touch("fullName")}
                  disabled={isLoading}
                  aria-invalid={!!visibleError("fullName")}
                  aria-describedby={visibleError("fullName") ? `${id("fullName")}-error` : undefined}
                  className={cn(inputClass, visibleError("fullName") && "border-red-400 focus:ring-red-400")}
                />
              </Field>

              {/* Email */}
              <Field
                id={id("email")}
                label="Email address"
                error={visibleError("email")}
              >
                <input
                  id={id("email")}
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  onBlur={() => touch("email")}
                  disabled={isLoading}
                  aria-invalid={!!visibleError("email")}
                  aria-describedby={visibleError("email") ? `${id("email")}-error` : undefined}
                  className={cn(inputClass, visibleError("email") && "border-red-400 focus:ring-red-400")}
                />
              </Field>

              {/* Phone */}
              <Field
                id={id("phone")}
                label="Phone number"
                error={visibleError("phone")}
              >
                <input
                  id={id("phone")}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(555) 555-5555"
                  value={form.phone}
                  onChange={(e) => set("phone", formatPhone(e.target.value))}
                  onBlur={() => touch("phone")}
                  disabled={isLoading}
                  aria-invalid={!!visibleError("phone")}
                  aria-describedby={visibleError("phone") ? `${id("phone")}-error` : undefined}
                  className={cn(inputClass, visibleError("phone") && "border-red-400 focus:ring-red-400")}
                />
              </Field>

              {/* Opt-in checkbox */}
              <div className="flex flex-col gap-1 mt-1">
                <div className="flex items-start gap-3">
                  <input
                    id={id("optIn")}
                    type="checkbox"
                    name="optIn"
                    checked={form.optIn}
                    onChange={(e) => { set("optIn", e.target.checked); touch("optIn"); }}
                    disabled={isLoading}
                    aria-invalid={!!visibleError("optIn")}
                    aria-describedby={visibleError("optIn") ? `${id("optIn")}-error` : undefined}
                    className={cn(
                      "mt-0.5 h-4 w-4 flex-shrink-0 rounded cursor-pointer",
                      "accent-yellow-400",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                    )}
                  />
                  <Label htmlFor={id("optIn")} className="!text-blue-100 text-sm leading-snug cursor-pointer">
                    I agree to receive newsletter communications from Oblate Academy. You may unsubscribe at any time.
                  </Label>
                </div>
                <p
                  id={`${id("optIn")}-error`}
                  aria-live="polite"
                  className={cn(
                    "font-inria text-xs text-red-300 pl-7 transition-opacity duration-150",
                    visibleError("optIn") ? "opacity-100" : "opacity-0 select-none"
                  )}
                >
                  {visibleError("optIn") ?? " "}
                </p>
              </div>
            </div>

            {/* API-level error — shown when the network request fails */}
            {apiError && (
              <p
                role="alert"
                className="mx-6 mb-2 rounded-md bg-red-500/20 border border-red-400/40 px-3 py-2 font-inria text-xs text-red-300"
              >
                {apiError}
              </p>
            )}

            {/* Footer actions */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-blue-300/20">
              <Dialog.Close asChild>
                <button
                  type="button"
                  disabled={isLoading}
                  className={cn(
                    "font-inria text-sm text-blue-100 hover:text-gray-100",
                    "px-4 py-2 rounded-md hover:bg-blue-400 transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400",
                    isLoading && "opacity-50 pointer-events-none"
                  )}
                >
                  Cancel
                </button>
              </Dialog.Close>

              <button
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                className={cn(
                  "inline-flex items-center gap-2",
                  "font-poppins font-semibold text-sm text-yellow-900",
                  "px-5 py-2 rounded-full bg-yellow-400 hover:bg-yellow-300",
                  "transition-colors duration-150 shadow",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500",
                  isLoading && "opacity-80 pointer-events-none"
                )}
              >
                {isLoading && (
                  <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                )}
                {isLoading ? "Sending…" : "Subscribe"}
              </button>
            </div>
          </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
