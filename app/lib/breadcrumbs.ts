export type BreadcrumbItem = {
  label: string;
  href?: string; // undefined = current page, non-clickable
};

// ─── Grade label helpers ─────────────────────────────────────────────────────

const GRADE_LABELS: Record<string, string> = {
  "k-2": "K–2",
  "3-5": "3–5",
};

function gradeLabel(grade: string): string {
  return GRADE_LABELS[grade] ?? grade;
}

// ─── Slug → display label ────────────────────────────────────────────────────

/**
 * Converts a kebab-case slug into a title-cased label.
 * e.g. "st-francis-of-assisi" → "St Francis Of Assisi"
 * Good enough for supplementary breadcrumb context.
 */
function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// ─── Static route map ────────────────────────────────────────────────────────

const STATIC_ROUTE_MAP: Record<string, BreadcrumbItem[]> = {
  "/about": [
    { label: "Home", href: "/" },
    { label: "About" },
  ],
  "/contact": [
    { label: "Home", href: "/" },
    { label: "Contact" },
  ],
  "/resources": [
    { label: "Home", href: "/" },
    { label: "Resources" },
  ],
  "/catholic-faith": [
    { label: "Home", href: "/" },
    { label: "Catholic Faith" },
  ],
  "/privacy": [
    { label: "Home", href: "/" },
    { label: "Privacy Policy" },
  ],
  "/terms": [
    { label: "Home", href: "/" },
    { label: "Terms & Conditions" },
  ],
};

// ─── Dynamic route patterns (most specific first) ───────────────────────────

// /grade/:grade/saints/:slug/:category
const SAINTS_CATEGORY =
  /^\/grade\/(k-2|3-5)\/saints\/([^/]+)\/([^/]+)$/;

// /grade/:grade/virtues/:slug/:category
const VIRTUES_CATEGORY =
  /^\/grade\/(k-2|3-5)\/virtues\/([^/]+)\/([^/]+)$/;

// /grade/:grade/saints/:slug
const SAINTS_DETAIL =
  /^\/grade\/(k-2|3-5)\/saints\/([^/]+)$/;

// /grade/:grade/virtues/:slug
const VIRTUES_DETAIL =
  /^\/grade\/(k-2|3-5)\/virtues\/([^/]+)$/;

// /grade/:grade/saints
const SAINTS_HUB =
  /^\/grade\/(k-2|3-5)\/saints$/;

// /grade/:grade/virtues
const VIRTUES_HUB =
  /^\/grade\/(k-2|3-5)\/virtues$/;

// /resources/:type
const RESOURCES_TYPE =
  /^\/resources\/([^/]+)$/;

// ─── Resolver ────────────────────────────────────────────────────────────────

export function resolveBreadcrumbs(pathname: string): BreadcrumbItem[] {
  // Home — no breadcrumb needed
  if (pathname === "/") return [];

  // Static routes
  if (STATIC_ROUTE_MAP[pathname]) {
    return STATIC_ROUTE_MAP[pathname];
  }

  let m: RegExpMatchArray | null;

  // /grade/:grade/saints/:slug/:category
  m = pathname.match(SAINTS_CATEGORY);
  if (m) {
    const [, grade, slug, category] = m;
    const gl = gradeLabel(grade);
    return [
      { label: "Home", href: "/" },
      { label: `Saints (${gl})`, href: `/grade/${grade}/saints` },
      { label: formatSlug(slug), href: `/grade/${grade}/saints/${slug}` },
      { label: formatSlug(category) },
    ];
  }

  // /grade/:grade/virtues/:slug/:category
  m = pathname.match(VIRTUES_CATEGORY);
  if (m) {
    const [, grade, slug, category] = m;
    const gl = gradeLabel(grade);
    return [
      { label: "Home", href: "/" },
      { label: `Virtues (${gl})`, href: `/grade/${grade}/virtues` },
      { label: formatSlug(slug), href: `/grade/${grade}/virtues/${slug}` },
      { label: formatSlug(category) },
    ];
  }

  // /grade/:grade/saints/:slug
  m = pathname.match(SAINTS_DETAIL);
  if (m) {
    const [, grade, slug] = m;
    const gl = gradeLabel(grade);
    return [
      { label: "Home", href: "/" },
      { label: `Saints (${gl})`, href: `/grade/${grade}/saints` },
      { label: formatSlug(slug) },
    ];
  }

  // /grade/:grade/virtues/:slug
  m = pathname.match(VIRTUES_DETAIL);
  if (m) {
    const [, grade, slug] = m;
    const gl = gradeLabel(grade);
    return [
      { label: "Home", href: "/" },
      { label: `Virtues (${gl})`, href: `/grade/${grade}/virtues` },
      { label: formatSlug(slug) },
    ];
  }

  // /grade/:grade/saints
  m = pathname.match(SAINTS_HUB);
  if (m) {
    const [, grade] = m;
    const gl = gradeLabel(grade);
    return [
      { label: "Home", href: "/" },
      { label: `Saints (${gl})` },
    ];
  }

  // /grade/:grade/virtues
  m = pathname.match(VIRTUES_HUB);
  if (m) {
    const [, grade] = m;
    const gl = gradeLabel(grade);
    return [
      { label: "Home", href: "/" },
      { label: `Virtues (${gl})` },
    ];
  }

  // /resources/:type
  m = pathname.match(RESOURCES_TYPE);
  if (m) {
    const [, type] = m;
    return [
      { label: "Home", href: "/" },
      { label: "Resources", href: "/resources" },
      { label: formatSlug(type) },
    ];
  }

  // Unknown route — render nothing
  return [];
}
