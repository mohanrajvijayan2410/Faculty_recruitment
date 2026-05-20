import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeReportText(value?: string) {
  if (!value) {
    return '';
  }

  let sanitized = String(value);

  const entityMap: Record<string, string> = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
  };

  sanitized = sanitized.replace(/&(#x[0-9A-Fa-f]+|#\d+|[A-Za-z]+);/g, (_, entity) => {
    if (entity.startsWith('#x')) {
      return String.fromCharCode(parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith('#')) {
      return String.fromCharCode(parseInt(entity.slice(1), 10));
    }
    return entityMap[entity.toLowerCase()] ?? '';
  });

  sanitized = sanitized.replace(/&+/g, ' ');
  sanitized = sanitized.replace(/\s+/g, ' ').trim();

  return sanitized;
}
