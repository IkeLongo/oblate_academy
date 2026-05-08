import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns a display title for a resource card.
 *
 * Priority:
 * 1. Explicit `title` field
 * 2. `resourceType – subject` (both present)
 * 3. `resourceType` alone
 * 4. `subject` alone
 * 5. Fallback: "Resource"
 */
export function getResourceDisplayTitle(resource: {
  title?: string | null;
  resourceType?: string | null;
  subject?: string | null;
}): string {
  if (resource.title) return resource.title;
  if (resource.resourceType && resource.subject) {
    return `${resource.resourceType} – ${resource.subject}`;
  }
  return resource.resourceType || resource.subject || "Resource";
}