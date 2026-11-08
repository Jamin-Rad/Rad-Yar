"use client";

import { useEffect, useRef, useState } from "react";
import TodoIcon from "./TodoIcon";
import { dayKey, monthEnd, shiftDay, weekEnd } from "./plannerModel.mjs";
import s from "./planner.module.css";

export default function PlannerDialog({
  task,
  busy,
  error,
  onClose,
  onSave,
  onDelete,
  onToggle,
}) {
  const ref = useRef(null);
  const [draft, setDraft] = useState(task),
    [confirm, setConfirm] = useState(false);
  useEffect(() => {
    ref.current?.showModal();
    ref.current?.querySelector("#task-title")?.focus();
  }, []);
  const today = dayKey();
  const options = [
    ["Heute", today],
    ["Morgen", shiftDay(today, 1)],
    ["Diese Woche", weekEnd()],
    ["Monatsende", monthEnd()],
  ];
  async function save(event) {
    event.preventDefault();
    if (await onSave(draft)) onClose();
  }
  return (
    <dialog
      ref={ref}
      className={s.dialog}
      aria-labelledby="task-dialog-title"
      onCancel={(event) => {
        if (busy) event.preventDefault();
        else onClose();
      }}
    >
      <header className={s.dialogHeader}>
        <h2 id="task-dialog-title">
          {confirm
            ? "Aufgabe löschen?"
            : task.id
              ? "Deine Aufgabe"
              : "Neue Aufgabe"}
        </h2>
        <button
          type="button"
          className={s.iconButton}
          aria-label="Schließen"
          disabled={busy}
          onClick={onClose}
        >
          <TodoIcon name="close" />
        </button>
      </header>
      {confirm ? (
        <div>
          <p>Diese Aufgabe wird auch auf dem iPhone entfernt.</p>
          <div className={s.dialogActions}>
            <button disabled={busy} onClick={() => setConfirm(false)}>
              Zurück
            </button>
            <button
              className={s.danger}
              disabled={busy}
              onClick={async () => {
                if (await onDelete(task)) onClose();
              }}
            >
              Löschen
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={save}>
          <label htmlFor="task-title">Was möchtest du erledigen?</label>
          <input
            autoFocus
            id="task-title"
            dir="auto"
            maxLength={240}
            value={draft.title}
            onChange={(event) =>
              setDraft({ ...draft, title: event.target.value })
            }
            placeholder="Deine nächste Aufgabe"
            required
            disabled={busy}
          />
          <label htmlFor="task-description">
            Beschreibung <span>optional</span>
          </label>
          <textarea
            id="task-description"
            dir="auto"
            maxLength={500}
            rows={4}
            value={draft.note}
            placeholder="Gedanken, nächste Schritte …"
            onChange={(event) =>
              setDraft({ ...draft, note: event.target.value })
            }
            disabled={busy}
          />
          <label htmlFor="task-date">Wann?</label>
          <div className={s.dateChoices}>
            {options.map(([label, date]) => (
              <button
                key={label}
                type="button"
                aria-pressed={draft.deadline === date}
                disabled={busy}
                onClick={() => setDraft({ ...draft, deadline: date })}
              >
                {label}
              </button>
            ))}
          </div>
          <div className={s.dateInput}>
            <input
              id="task-date"
              aria-label="Fällig am"
              type="date"
              value={draft.deadline}
              onChange={(event) =>
                setDraft({ ...draft, deadline: event.target.value })
              }
              disabled={busy}
            />
            <button
              type="button"
              disabled={busy}
              onClick={() => setDraft({ ...draft, deadline: "" })}
            >
              Ohne Datum
            </button>
          </div>
          {String(task.id || "").startsWith("local-") ? (
            <p>
              Lokaler Entwurf. Mit Speichern wird er mit Jaminova
              synchronisiert.
            </p>
          ) : null}
          <div className={s.dialogActions}>
            {task.id ? (
              <button
                type="button"
                className={s.iconButton}
                aria-label="Aufgabe löschen"
                disabled={busy}
                onClick={() => setConfirm(true)}
              >
                <TodoIcon name="trash" />
              </button>
            ) : null}
            <button type="button" disabled={busy} onClick={onClose}>
              Abbrechen
            </button>
            <button
              type="submit"
              className={s.primary}
              disabled={busy || !draft.title.trim()}
            >
              {busy ? "Wird gespeichert …" : "Speichern"}
            </button>
          </div>
          {task.id ? (
            <button
              type="button"
              className={s.completeInDialog}
              disabled={busy || String(task.id).startsWith("local-")}
              onClick={async () => {
                if (await onToggle(task)) onClose();
              }}
            >
              <TodoIcon name="check" />
              {task.done ? "Wieder öffnen" : "Als erledigt markieren"}
            </button>
          ) : null}
        </form>
      )}
      {error ? (
        <p className={s.error} role="alert">
          {error} Dein Entwurf bleibt erhalten.
        </p>
      ) : null}
    </dialog>
  );
}
