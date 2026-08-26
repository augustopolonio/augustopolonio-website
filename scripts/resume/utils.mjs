export const escapeHtml = (input = "") =>
  String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const dedupe = (items) => [...new Set(items.filter(Boolean))];

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const normalizeWhitespace = (text = "") => text.replace(/\s+/g, " ").trim();

export const truncate = (text = "", maxLength = 145) => {
  const normalized = normalizeWhitespace(text);
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
};
