export const ZONE = "Europe/Berlin";
const DAY = 86400000;
export function dayKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const read = (name) => parts.find((part) => part.type === name)?.value;
  return `${read("year")}-${read("month")}-${read("day")}`;
}
export function validDay(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return (
    !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
  );
}
export function shiftDay(key, offset) {
  return new Date(Date.parse(`${key}T12:00:00Z`) + offset * DAY)
    .toISOString()
    .slice(0, 10);
}
export function weekEnd(now = new Date()) {
  const key = dayKey(now);
  const weekday = new Date(`${key}T12:00:00Z`).getUTCDay();
  return shiftDay(key, (7 - weekday) % 7);
}
export function monthEnd(now = new Date()) {
  const key = dayKey(now);
  const [y, m] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m, 0, 12)).toISOString().slice(0, 10);
}
export function horizon(item, now = new Date()) {
  if (!validDay(item.deadline)) return "unscheduled";
  if (item.deadline <= dayKey(now)) return "today";
  if (item.deadline <= weekEnd(now)) return "week";
  if (item.deadline <= monthEnd(now)) return "month";
  return "later";
}
export const HORIZONS = [
  { id: "today", title: "Heute" },
  { id: "week", title: "Diese Woche" },
  { id: "month", title: "Bis Monatsende" },
  { id: "later", title: "Später" },
  { id: "unscheduled", title: "Ohne Datum" },
];
export function isTask(item) {
  return item.itemType !== "event";
}
const priorityRank = (value) =>
  value === "high" ? 0 : value === "medium" ? 1 : 2;
export function tasksIn(items, group, now = new Date()) {
  return items
    .filter(
      (item) => isTask(item) && !item.done && horizon(item, now) === group,
    )
    .sort(
      (a, b) =>
        priorityRank(a.priority) - priorityRank(b.priority) ||
        (a.deadline || "").localeCompare(b.deadline || "") ||
        String(a.createdAt || "").localeCompare(String(b.createdAt || "")) ||
        String(a.id).localeCompare(String(b.id)),
    );
}
export function deadlineLabel(value, now = new Date(), showOverdue = true) {
  if (!validDay(value)) return "Ohne Datum";
  const today = dayKey(now);
  const label =
    value === today
      ? "Heute"
      : value === shiftDay(today, 1)
        ? "Morgen"
        : value === shiftDay(today, -1)
          ? "Gestern"
          : new Intl.DateTimeFormat("de-DE", {
              day: "numeric",
              month: "short",
              year:
                value.slice(0, 4) !== today.slice(0, 4) ? "numeric" : undefined,
              timeZone: "UTC",
            }).format(new Date(`${value}T12:00:00Z`));
  return showOverdue && value < today ? `Überfällig · ${label}` : label;
}
export function completionDay(item) {
  const date = new Date(item.completedAt);
  return isTask(item) &&
    item.done &&
    item.completedAt &&
    !Number.isNaN(date.valueOf())
    ? dayKey(date)
    : null;
}
export function monthShift(key, offset) {
  const [y, m] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1 + offset, 1, 12))
    .toISOString()
    .slice(0, 10);
}
export function monthDays(key) {
  const first = `${key.slice(0, 7)}-01`,
    date = new Date(`${first}T12:00:00Z`);
  const pad = (date.getUTCDay() + 6) % 7;
  const count = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
  ).getUTCDate();
  const days = [
    ...Array(pad).fill(null),
    ...Array.from({ length: count }, (_, i) => shiftDay(first, i)),
  ];
  while (days.length % 7) days.push(null);
  return days;
}
export function taskPayload(draft, now = new Date()) {
  return {
    title: draft.title.trim(),
    note: draft.note.trim(),
    deadline: validDay(draft.deadline) ? draft.deadline : "",
    lane:
      validDay(draft.deadline) && draft.deadline <= dayKey(now)
        ? "urgent"
        : validDay(draft.deadline) && draft.deadline <= weekEnd(now)
          ? "today"
          : "watch",
    itemType: "todo",
  };
}
