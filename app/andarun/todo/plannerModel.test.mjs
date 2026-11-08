import test from "node:test";
import assert from "node:assert/strict";
import {
  completionDay,
  dayKey,
  deadlineLabel,
  horizon,
  monthDays,
  monthEnd,
  tasksIn,
  weekEnd,
} from "./plannerModel.mjs";
const now = new Date("2026-11-04T18:00:00Z");
test("Berlin dates remain correct around midnight and daylight saving", () => {
  assert.equal(dayKey(new Date("2026-11-04T23:30:00Z")), "2026-11-05");
  assert.equal(weekEnd(new Date("2026-10-25T13:00:00Z")), "2026-10-25");
});
test("horizons are exclusive and past-due work remains in Today", () => {
  assert.deepEqual(
    [
      "2026-11-03",
      "2026-11-04",
      "2026-11-08",
      "2026-11-09",
      "2026-12-01",
      "2026-02-30",
      "",
    ].map((deadline) => horizon({ deadline }, now)),
    ["today", "today", "week", "month", "later", "unscheduled", "unscheduled"],
  );
});
test("the current week takes precedence when it crosses the month boundary", () => {
  assert.equal(
    horizon({ deadline: "2026-12-01" }, new Date("2026-11-30T13:00:00Z")),
    "week",
  );
  assert.equal(monthEnd(new Date("2028-02-01T13:00:00Z")), "2028-02-29");
});
test("calendar events and completed tasks never appear in open task groups", () => {
  assert.deepEqual(
    tasksIn(
      [
        { id: "1", deadline: "2026-11-04" },
        { id: "2", deadline: "2026-11-04", done: true },
        { id: "3", deadline: "2026-11-04", itemType: "event" },
      ],
      "today",
      now,
    ).map((item) => item.id),
    ["1"],
  );
});
test("activity uses actual completion dates in Berlin and excludes undated history", () => {
  assert.equal(
    completionDay({ done: true, completedAt: "2026-11-04T23:30:00Z" }),
    "2026-11-05",
  );
  assert.equal(completionDay({ done: true }), null);
  assert.equal(
    completionDay({ done: false, completedAt: "2026-11-04T23:30:00Z" }),
    null,
  );
  assert.equal(
    completionDay({
      done: true,
      itemType: "event",
      completedAt: "2026-11-04T23:30:00Z",
    }),
    null,
  );
  assert.equal(deadlineLabel("2026-11-03", now, false), "Gestern");
});
test("month grid starts Monday and includes every day once", () => {
  const days = monthDays("2026-11-01");
  assert.equal(days[0], null);
  assert.equal(days[6], "2026-11-01");
  assert.equal(days.length % 7, 0);
  assert.equal(new Set(days.filter(Boolean)).size, 30);
});
