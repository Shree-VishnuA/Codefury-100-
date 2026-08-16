import { initialResumeData } from "./resume-schema";

const STORAGE_KEY = "genforge_resume_data_v1";

export function loadSavedResumeData() {
  if (typeof window === "undefined") {
    return initialResumeData;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialResumeData;
    const parsed = JSON.parse(raw);
    return {
      ...initialResumeData,
      ...parsed,
      personal: { ...initialResumeData.personal, ...(parsed.personal || {}) },
      targetJob: { ...initialResumeData.targetJob, ...(parsed.targetJob || {}) },
      skills: { ...initialResumeData.skills, ...(parsed.skills || {}) },
    };
  } catch (error) {
    console.error("Failed to load resume data from localStorage:", error);
    return initialResumeData;
  }
}

export function saveResumeData(data) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save resume data to localStorage:", error);
  }
}

export function clearSavedResumeData() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear resume data from localStorage:", error);
  }
}
