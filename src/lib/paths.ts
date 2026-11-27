// Normalizes Astro's BASE_URL so it always ends with exactly one trailing slash,
// regardless of Astro version/config quirks. Use this everywhere instead of
// import.meta.env.BASE_URL directly when building a path to something in public/.
const raw = import.meta.env.BASE_URL || "/";
export const base = raw.endsWith("/") ? raw : `${raw}/`;
