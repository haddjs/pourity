import type { PersonalInfo } from "../../types";
import { todayISO } from "../../lib/format";
import type { LetterConfig, LetterData } from "./types";

// Letters draw their sender details from the saved CV so the profile is shared.
const CV_STORAGE_KEY = "pourity.cv.v3";

export function readCvPersonal(): PersonalInfo | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CV_STORAGE_KEY);
    if (!raw) return null;
    const cv = JSON.parse(raw) as { personal?: PersonalInfo };
    return cv.personal ?? null;
  } catch {
    return null;
  }
}

export function createDefaultLetter(config: LetterConfig): LetterData {
  const p = readCvPersonal();
  return {
    senderName: p?.fullName ?? "",
    senderEmail: p?.email ?? "",
    senderPhone: p?.phone ?? "",
    senderLocation: p?.location ?? "",
    date: todayISO(),
    recipientName: "",
    recipientTitle: "",
    organization: "",
    organizationLocation: "",
    role: "",
    greeting: config.defaultGreeting,
    body: config.defaultBody,
    signOff: config.defaultSignOff,
  };
}
