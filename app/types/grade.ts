export type GradeKey = "gk_2" | "g3_5";
export type GradeKeyLink = "k-2" | "3-5";

export const GRADE_TO_LINK: Record<GradeKey, GradeKeyLink> = {
  gk_2: "k-2",
  g3_5: "3-5",
};

export const LINK_TO_GRADE: Record<GradeKeyLink, GradeKey> = {
  "k-2": "gk_2",
  "3-5": "g3_5",
};

export function toGradeLink(g: GradeKey): GradeKeyLink {
  return GRADE_TO_LINK[g];
}

export function toGradeKey(link: GradeKeyLink): GradeKey {
  return LINK_TO_GRADE[link];
}

export function isGradeKey(val: unknown): val is GradeKey {
  return val === "gk_2" || val === "g3_5";
}

export function isGradeLink(val: unknown): val is GradeKeyLink {
  return val === "k-2" || val === "3-5";
}
