import { formatDate } from "@lib/utils";

const UNKNOWN = "Unknown";

export function formatText(value?: string | null) {
  return value?.trim() ? value : UNKNOWN;
}

export function formatBoolean(value?: boolean) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return UNKNOWN;
}

export function formatAlternateNames(names?: string[]) {
  if (!names?.length) return UNKNOWN;
  return names.join(", ");
}

export function formatAlternateActors(actors?: string[]) {
  if (!actors?.length) return UNKNOWN;
  return actors.join(", ");
}

export function formatAvailableDate(date?: string) {
  if (!date) return UNKNOWN;
  return formatDate(date) ?? UNKNOWN;
}
