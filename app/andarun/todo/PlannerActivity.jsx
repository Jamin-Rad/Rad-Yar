"use client";

import { useState } from "react";
import {
  completionDay,
  dayKey,
  monthDays,
  monthShift,
  ZONE,
} from "./plannerModel.mjs";
import TodoIcon from "./TodoIcon";
import s from "./planner.module.css";

export default function PlannerActivity({ tasks, renderRows }) {
  const today = dayKey(),
    [month, setMonth] = useState(`${today.slice(0, 7)}-01`),
    [selected, setSelected] = useState(today);
  function changeMonth(offset) {
    const next = monthShift(month, offset);
    setMonth(next);
    setSelected(next.slice(0, 7) === today.slice(0, 7) ? today : next);
  }
  const counts = new Map();
  tasks.forEach((task) => {
    const key = completionDay(task);
    if (key) counts.set(key, (counts.get(key) || 0) + 1);
  });
  const label = new Intl.DateTimeFormat("de-DE", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${month}T12:00:00Z`));
  const done = tasks.filter((task) => completionDay(task) === selected);
  return (
    <div className={s.activity}>
      <section className={s.calendar} aria-label="Erledigte Aufgaben pro Tag">
        <header>
          <button
            className={s.iconButton}
            aria-label="Vorheriger Monat"
            onClick={() => changeMonth(-1)}
          >
            <TodoIcon name="back" />
          </button>
          <h2>{label}</h2>
          <button
            className={s.iconButton}
            aria-label="Nächster Monat"
            onClick={() => changeMonth(1)}
          >
            <TodoIcon name="back" style={{ transform: "rotate(180deg)" }} />
          </button>
        </header>
        <div className={s.calendarGrid}>
          {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
            <span className={s.weekday} key={day}>
              {day}
            </span>
          ))}
          {monthDays(month).map((key, index) =>
            key ? (
              <button
                key={key}
                className={`${s.calendarDay} ${counts.has(key) ? s.activeDay : ""} ${key === selected ? s.selectedDay : ""}`}
                aria-label={`${new Intl.DateTimeFormat("de-DE", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${key}T12:00:00Z`))}: ${counts.get(key) || 0} erledigt`}
                aria-pressed={key === selected}
                aria-current={key === today ? "date" : undefined}
                onClick={() => setSelected(key)}
              >
                <span>{Number(key.slice(-2))}</span>
                <small>{counts.has(key) ? counts.get(key) : ""}</small>
              </button>
            ) : (
              <span key={`blank-${index}`} />
            ),
          )}
        </div>
        <p className={s.calendarCaption}>
          Ein Häkchen für jeden kleinen Erfolg.
        </p>
      </section>
      <section className={s.group}>
        <header className={s.sectionHead}>
          <h2>
            {new Intl.DateTimeFormat("de-DE", {
              day: "numeric",
              month: "long",
              timeZone: ZONE,
            }).format(new Date(`${selected}T12:00:00Z`))}
          </h2>
          <span>{done.length} erledigt</span>
        </header>
        {done.length ? (
          renderRows(done)
        ) : (
          <div className={s.empty}>
            Für diesen Tag sind noch keine erledigten Aufgaben gespeichert.
          </div>
        )}
      </section>
    </div>
  );
}
