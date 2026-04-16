"use client";

import { useId, useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/app/lib/utils";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface FooterNewsletterSignupProps {
  /** Called with the validated email when the user hits submit. */
  onStartSignup: (email: string) => void;
  /** When true, renders a thank-you state instead of the input form. */
  isSuccess?: boolean;
  /** Called when the user clicks "Sign up with a different email". */
  onReset?: () => void;
  /** Optional extra class names for the wrapper element. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FooterNewsletterSignup({
  onStartSignup,
  isSuccess = false,
  onReset,
  className,
}: FooterNewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const uid = useId();
  const inputId = `${uid}-email`;
  const errorId = `${uid}-email-error`;

  const isInvalid = touched && !isValidEmail(email);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    if (!isValidEmail(email)) return;
    onStartSignup(email.trim());
  }

  // Success state — shown after the modal confirms the signup.
  if (isSuccess) {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <p className="font-inria text-sm text-green-300 flex items-center gap-2">
          <CheckCircle size={15} className="flex-shrink-0" aria-hidden="true" />
          You&apos;re signed up! Thanks for joining.
        </p>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="font-inria text-xs text-blue-200 hover:text-gray-100 underline underline-offset-2 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-yellow-400 rounded"
          >
            Sign up with a different email
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="font-inria text-sm text-gray-200">
        Stay updated — join our newsletter.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Newsletter signup"
        className="flex items-center w-full max-w-sm"
      >
        {/* Pill wrapper — input + button share one rounded border */}
        <div
          className={cn(
            "flex flex-1 items-center rounded-full overflow-hidden border transition-colors duration-200",
            isInvalid
              ? "border-red-400"
              : "border-blue-300 focus-within:border-yellow-400"
          )}
        >
          <label htmlFor={inputId} className="sr-only">
            Email address
          </label>
          <input
            id={inputId}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Your email address"
            aria-invalid={isInvalid}
            aria-describedby={isInvalid ? errorId : undefined}
            className={cn(
              "flex-1 min-w-0 bg-transparent px-4 py-2.5",
              "font-inria text-sm text-gray-100 placeholder:text-blue-200",
              "focus:outline-none"
            )}
          />

          {/* Arrow submit button */}
          <button
            type="submit"
            aria-label="Subscribe to newsletter"
            className={cn(
              "flex-shrink-0 flex items-center justify-center",
              "h-9 w-9 mr-1 rounded-full transition-colors duration-200",
              "bg-yellow-400 hover:bg-yellow-300",
              "text-yellow-900",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500"
            )}
          >
            <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      </form>

      {/* Inline validation message — reserved space to avoid layout shift */}
      <p
        id={errorId}
        role="alert"
        aria-live="polite"
        className={cn(
          "font-inria text-xs transition-opacity duration-200",
          isInvalid ? "text-red-300 opacity-100" : "opacity-0 select-none"
        )}
      >
        Please enter a valid email address.
      </p>
    </div>
  );
}
