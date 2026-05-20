const GHL_BASE_URL = process.env.GHL_API_BASE_URL?.trim() || "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

export type GhlFetchOptions<TBody = unknown> = Omit<RequestInit, "body" | "headers"> & {
  body?: TBody;
  headers?: HeadersInit;
};

export class GhlApiError extends Error {
  status: number;
  details: string;

  constructor(message: string, status: number, details: string) {
    super(message);
    this.name = "GhlApiError";
    this.status = status;
    this.details = details;
  }
}

export interface GhlContact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export function normalizeName(value: unknown, fallback = "Unknown"): string {
  if (typeof value !== "string") return fallback;
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized || fallback;
}

export async function ghlFetch<TResponse, TBody = unknown>(
  path: string,
  options: GhlFetchOptions<TBody> = {}
): Promise<TResponse> {
  const apiKey = requiredEnv("GHL_OBLATE_API_KEY");
  const url = `${GHL_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const headers: HeadersInit = {
    Accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
    Version: GHL_API_VERSION,
    ...options.headers,
  };

  const hasBody = typeof options.body !== "undefined";
  if (hasBody && !(headers instanceof Headers) && !("Content-Type" in headers) && !("content-type" in headers)) {
    (headers as Record<string, string>)["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    ...options,
    headers,
    body: hasBody ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  const text = await res.text();
  const payload = text ? (JSON.parse(text) as TResponse) : ({} as TResponse);

  if (!res.ok) {
    throw new GhlApiError("GHL request failed", res.status, text);
  }

  return payload;
}

// Update the findContactByEmailOrPhone function to return GhlContact | null
export async function findContactByEmailOrPhone(email: string, phone: string): Promise<GhlContact | null> {
  const locationId = requiredEnv("GHL_OBLATE_LOCATION_ID");

  // Determine the query string
  const query = email?.trim() || phone?.trim();
  if (!query) {
    return null; // No valid query, return null
  }

  if (query.length > 75) {
    throw new Error("Query exceeds maximum length of 75 characters.");
  }

  const response = await ghlFetch<{ contacts: GhlContact[] }>(`/contacts/search`, {
    method: "POST",
    body: {
      query,
      pageLimit: 1, // Ensure pageLimit is a number
      locationId,
    },
  });

  return response.contacts?.[0] || null;
}

export async function createContact(contact: { name: string; email: string; phone: string }): Promise<GhlContact> {
  const locationId = requiredEnv("GHL_OBLATE_LOCATION_ID");
  // GHL returns { contact: {...} } for creation — unwrap defensively
  const response = await ghlFetch<{ contact: GhlContact } | GhlContact>(`/contacts/`, {
    method: "POST",
    body: { ...contact, locationId },
  });
  return 'contact' in response ? (response as { contact: GhlContact }).contact : (response as GhlContact);
}

export async function updateContact(contactId: string, updates: { name?: string; email?: string; phone?: string }): Promise<GhlContact> {
  return ghlFetch<GhlContact>(`/contacts/${contactId}`, {
    method: "PUT",
    body: updates,
  });
}

export interface GhlOpportunity {
  id: string;
  contactId: string;
  pipelineId: string;
  stageId: string;
  status: string;
}

export async function findOpportunity(contactId: string, pipelineId: string): Promise<GhlOpportunity | null> {
  const locationId = requiredEnv("GHL_OBLATE_LOCATION_ID");
  const params = new URLSearchParams({
    location_id: locationId,
    contact_id: contactId,
    pipeline_id: pipelineId,
    limit: "1",
  });
  const response = await ghlFetch<{ opportunities: GhlOpportunity[] }>(`/opportunities/search?${params.toString()}`);
  return response.opportunities?.[0] || null;
}

export async function createOpportunity(opportunity: { contactId: string; pipelineId: string; pipelineStageId: string; contactName?: string }): Promise<GhlOpportunity> {
  const locationId = requiredEnv("GHL_OBLATE_LOCATION_ID");
  const { contactName, ...rest } = opportunity;
  const name = `${contactName || "Website Contact"} - Website Inquiry`;
  return ghlFetch<GhlOpportunity>(`/opportunities/`, {
    method: "POST",
    body: { ...rest, locationId, name, status: "open" },
  });
}

// ── Email / Conversations ─────────────────────────────────────────────────────

async function findOrCreateConversation(contactId: string): Promise<string> {
  const locationId = requiredEnv("GHL_OBLATE_LOCATION_ID");

  // [DEBUG]
  console.log('[EMAIL:conv] Searching for conversation — contactId:', contactId);

  const params = new URLSearchParams({ contactId, locationId });
  const search = await ghlFetch<{ conversations?: { id: string }[] }>(
    `/conversations/search?${params.toString()}`
  );

  if (search.conversations?.[0]?.id) {
    // [DEBUG]
    console.log('[EMAIL:conv] Existing conversation found — id:', search.conversations[0].id);
    return search.conversations[0].id;
  }

  // [DEBUG]
  console.log('[EMAIL:conv] No existing conversation — creating new one for contactId:', contactId);

  const created = await ghlFetch<{ conversation?: { id: string }; id?: string }>(
    `/conversations/`,
    {
      method: "POST",
      body: { contactId, locationId },
    }
  );

  const id = created.conversation?.id ?? created.id;
  if (!id) throw new Error("GHL: failed to create conversation — no id in response");

  // [DEBUG]
  console.log('[EMAIL:conv] New conversation created — id:', id);
  return id;
}

export async function sendContactEmail(opts: {
  contactId: string;
  toEmail: string;
  subject: string;
  html: string;
}): Promise<void> {
  // [DEBUG]
  console.log('[EMAIL] sendContactEmail called — contactId:', opts.contactId, '| emailTo:', opts.toEmail);
  console.log('[EMAIL] GHL_OBLATE_EMAIL_FROM present:', !!process.env.GHL_OBLATE_EMAIL_FROM);

  const emailFrom = requiredEnv("GHL_OBLATE_EMAIL_FROM");
  const conversationId = await findOrCreateConversation(opts.contactId);

  // [DEBUG]
  console.log('[EMAIL] conversationId resolved:', conversationId);
  console.log('[EMAIL] Sending payload (safe fields):', {
    type: 'Email',
    conversationId,
    subject: opts.subject,
    emailFrom,
    emailTo: opts.toEmail,
  });

  await ghlFetch<unknown>(`/conversations/messages`, {
    method: "POST",
    body: {
      type: "Email",
      conversationId,
      contactId: opts.contactId,
      subject: opts.subject,
      html: opts.html,
      emailFrom,
      emailTo: opts.toEmail,
    },
  });

  // [DEBUG]
  console.log('[EMAIL] GHL messages API responded — email queued successfully.');
}

export async function sendEmailToAddress(toEmail: string, subject: string, html: string): Promise<void> {
  let contact = await findContactByEmailOrPhone(toEmail, '');
  if (!contact) {
    contact = await createContact({ name: toEmail, email: toEmail, phone: '' });
  }
  await sendContactEmail({ contactId: contact.id, toEmail, subject, html });
}
