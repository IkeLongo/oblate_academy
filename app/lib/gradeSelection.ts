import type { GradeKey } from "@/app/types/types";

const KEY = "oa:selectedGrade";

export function setSelectedGrade(grade: GradeKey) {
  try {
    sessionStorage.setItem(KEY, grade);
    window.dispatchEvent(new Event("oa:selectedGrade"));
  } catch {}
}

export function getSelectedGrade(): GradeKey | null {
  try {
    const v = sessionStorage.getItem(KEY);
    return v === "gk_2" || v === "g3_5" ? v : null;
  } catch {
    return null;
  }
}

export function clearSelectedGrade() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
}
