// ---------------------------------------------------------------------------
// Newsletter signup types
// ---------------------------------------------------------------------------

/** Raw form fields the user fills out across the footer input + modal form. */
export interface NewsletterFormData {
  /** Email collected in the footer input and pre-filled in the modal. */
  email: string;
  /** Full name collected in the modal. */
  fullName: string;
  /** Phone number collected in the modal (optional by UX, required by GHL). */
  phone: string;
  /** Explicit opt-in checkbox — required for compliance before submit. */
  optIn: boolean;
}

// ---------------------------------------------------------------------------
// Request payload — frontend → /api/newsletter
// ---------------------------------------------------------------------------

/**
 * The JSON body POSTed from the browser to the internal API route.
 *
 * The `_hp` (honeypot) field is a hidden input rendered in the form.
 * Legitimate users never see or fill it. If a bot populates it the API
 * rejects the request silently (returns a fake success to avoid feedback).
 *
 * The `_ts` field is a Unix timestamp (ms) recording when the modal was
 * opened. The API rejects submissions that arrive suspiciously fast
 * (default threshold: < 3 000 ms), which filters headless POST attacks.
 */
export interface NewsletterSubmitPayload extends NewsletterFormData {
  /** Honeypot field — must be empty string on legitimate submissions. */
  _hp: string;
  /** Modal-open timestamp in milliseconds (Date.now()). */
  _ts: number;
}

// ---------------------------------------------------------------------------
// API response types — /api/newsletter → frontend
// ---------------------------------------------------------------------------

export interface NewsletterSuccessResponse {
  success: true;
  message: string;
}

export interface NewsletterErrorResponse {
  success: false;
  message: string;
  /** Optional: identifies which field caused a validation error. */
  field?: keyof NewsletterFormData;
}

/** Union covering every possible response from /api/newsletter. */
export type NewsletterApiResponse =
  | NewsletterSuccessResponse
  | NewsletterErrorResponse;
