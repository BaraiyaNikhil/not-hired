/**
 * Returns a new Date set to the start of the given day (00:00:00.000).
 */
export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Returns a new Date set to the end of the given day (23:59:59.999).
 */
export function endOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Returns a new Date with `days` added (or subtracted if negative).
 */
export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Returns true if `date` is the same calendar day as today.
 */
export function isToday(date: Date): boolean {
  const d = new Date(date);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

/**
 * Returns true if `date` is strictly before the current moment.
 */
export function isPast(date: Date): boolean {
  return new Date(date).getTime() < Date.now();
}

/**
 * Returns a human-readable relative string like "3 days ago" or "in 2 days".
 */
export function formatDistanceToNow(date: Date, options?: { addSuffix?: boolean }): string {
  const diffMs = new Date(date).getTime() - Date.now();
  const absDiffMs = Math.abs(diffMs);
  const past = diffMs < 0;

  const minutes = Math.round(absDiffMs / 60_000);
  const hours = Math.round(absDiffMs / 3_600_000);
  const days = Math.round(absDiffMs / 86_400_000);
  const weeks = Math.round(absDiffMs / (7 * 86_400_000));
  const months = Math.round(absDiffMs / (30 * 86_400_000));

  let distance: string;
  if (minutes < 1) distance = "less than a minute";
  else if (minutes < 60) distance = `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  else if (hours < 24) distance = `${hours} hour${hours !== 1 ? "s" : ""}`;
  else if (days < 7) distance = `${days} day${days !== 1 ? "s" : ""}`;
  else if (weeks < 5) distance = `${weeks} week${weeks !== 1 ? "s" : ""}`;
  else distance = `${months} month${months !== 1 ? "s" : ""}`;

  if (!options?.addSuffix) return distance;
  return past ? `${distance} ago` : `in ${distance}`;
}

/**
 * Formats a Date using a simple subset of date-fns `format` tokens.
 * Supported tokens: yyyy, MM, dd, MMM, MMMM, EEE, EEEE, h, HH, mm, a
 *
 * Example: format(new Date(), "MMM d, h:mm a") → "Jun 29, 2:30 PM"
 */
export function format(date: Date, pattern: string): string {
  const d = new Date(date);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const shortMonths = months.map((m) => m.slice(0, 3));
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const shortWeekdays = weekdays.map((w) => w.slice(0, 3));

  const yyyy = d.getFullYear().toString();
  const MM = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const HH = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const hour12 = d.getHours() % 12 || 12;
  const ampm = d.getHours() < 12 ? "AM" : "PM";

  return pattern
    .replace("MMMM", months[d.getMonth()])
    .replace("MMM", shortMonths[d.getMonth()])
    .replace("MM", MM)
    .replace("EEEE", weekdays[d.getDay()])
    .replace("EEE", shortWeekdays[d.getDay()])
    .replace("yyyy", yyyy)
    .replace("dd", dd)
    .replace("d", String(d.getDate()))
    .replace("HH", HH)
    .replace("h", String(hour12))
    .replace("mm", mm)
    .replace("a", ampm);
}
