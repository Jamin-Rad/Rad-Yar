"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NotesPanel from "./NotesPanel";
import PlannerDialog from "./PlannerDialog";
import PlannerActivity from "./PlannerActivity";
import TodoIcon from "./TodoIcon";
import usePlannerTasks from "./usePlannerTasks";
import {
  completionDay,
  dayKey,
  deadlineLabel,
  HORIZONS,
  horizon,
  monthEnd,
  tasksIn,
  weekEnd,
  ZONE,
} from "./plannerModel.mjs";
import s from "./planner.module.css";

const NAV = [
  ["plan", "Plan"],
  ["all", "Alle"],
  ["activity", "Aktivität"],
  ["profile", "Profil"],
];
const THEMES = [
  ["amethyst", "Amethyst", "#7137bb"],
  ["sapphire", "Saphir", "#2854bb"],
  ["emerald", "Smaragd", "#21694f"],
  ["rose", "Rosenquarz", "#a13b68"],
  ["champagne", "Champagner", "#8b6120"],
  ["titanium", "Titan", "#485a79"],
];
export default function PlannerPage() {
  const {
    tasks,
    loading,
    busy,
    error,
    syncedAt,
    load,
    save,
    toggle,
    remove,
    clearError,
  } = usePlannerTasks();
  const [tab, setTab] = useState("plan"),
    [filter, setFilter] = useState("open"),
    [editor, setEditor] = useState(null),
    [notice, setNotice] = useState(null),
    [theme, setTheme] = useState("amethyst"),
    [now, setNow] = useState(() => new Date());
  useEffect(() => {
    try {
      const saved = localStorage.getItem("jaminova-todo-web-theme");
      if (THEMES.some(([id]) => id === saved)) setTheme(saved);
    } catch {}
    const update = () => setNow(new Date()),
      timer = setInterval(update, 60000);
    window.addEventListener("focus", update);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", update);
    };
  }, []);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 8000);
    return () => clearTimeout(timer);
  }, [notice]);
  function navigate(id) {
    setTab(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function edit(task) {
    clearError();
    setEditor({
      ...task,
      note: task.note || "",
      deadline: task.deadline || "",
    });
  }
  async function complete(task) {
    const result = await toggle(task);
    if (result)
      setNotice({
        text: task.done ? "Wieder auf deiner Liste." : "Erledigt. Gut gemacht.",
        task: result,
      });
    return result;
  }
  const todayCount = tasks.filter(
    (task) => !task.done && horizon(task, now) === "today",
  ).length;
  const headings = {
    plan: "Dein Tag.",
    all: "Alles im Blick.",
    activity: "Deine kleinen Erfolge.",
    profile: "Dein Raum.",
  };
  const subtitles = {
    plan: todayCount
      ? `${todayCount} ${todayCount === 1 ? "Aufgabe" : "Aufgaben"} für heute. In deinem Tempo.`
      : "Heute ist Platz für das, was dir wichtig ist.",
    all: "Ein klarer Platz für alles, was ansteht.",
    activity: "Was du erledigt hast. Tag für Tag.",
    profile: "So fühlt sich Jaminova nach dir an.",
  };
  const allTasks = tasks
    .filter((task) => (filter === "done" ? task.done : !task.done))
    .sort((a, b) =>
      filter === "done"
        ? String(b.completedAt || "").localeCompare(String(a.completedAt || ""))
        : (a.deadline || "9999").localeCompare(b.deadline || "9999"),
    );
  function rows(items) {
    return (
      <ul className={s.taskList}>
        {items.map((task) => (
          <li key={task.id} className={s.taskRow}>
            <button
              type="button"
              className={s.taskContent}
              onClick={() => edit(task)}
            >
              <span className={s.taskTitle} dir="auto">
                {task.title}
              </span>
              <span className={s.taskMeta}>
                {task.done ? (
                  <>
                    <TodoIcon name="check" size={13} />
                    Erledigt
                    {completionDay(task)
                      ? ` · ${deadlineLabel(completionDay(task), now, false)}`
                      : ""}
                  </>
                ) : (
                  <>
                    {deadlineLabel(task.deadline, now)}
                    {task.priority === "high" ? (
                      <span className={s.priority}>
                        <TodoIcon name="flag" size={12} />
                        Hoch
                      </span>
                    ) : null}
                    {task.note ? <TodoIcon name="note" size={13} /> : null}
                    {String(task.id).startsWith("local-") ? (
                      <span>Lokaler Entwurf</span>
                    ) : null}
                  </>
                )}
              </span>
            </button>
            <button
              type="button"
              className={`${s.checkButton} ${task.done ? s.checked : ""}`}
              aria-label={`${task.done ? "Wieder öffnen" : "Erledigen"}: ${task.title}`}
              aria-pressed={task.done}
              disabled={busy || String(task.id).startsWith("local-")}
              onClick={() => complete(task)}
            >
              <span>
                {task.done ? <TodoIcon name="check" size={17} /> : null}
              </span>
            </button>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className={s.shell} data-theme={theme} dir="ltr">
      <aside className={s.sidebar}>
        <Link
          href="/andarun"
          className={s.brand}
          aria-label="Jaminova Übersicht"
        >
          <span className={s.brandIcon}>
            <TodoIcon name="check" size={25} />
          </span>
          <span>
            Jaminova<small>To Do</small>
          </span>
        </Link>
        <nav aria-label="To Do">
          {NAV.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate(id)}
              className={`${s.navButton} ${tab === id ? s.navActive : ""} ${id === "profile" ? s.profileNav : ""}`}
              aria-current={tab === id ? "page" : undefined}
            >
              <TodoIcon name={id} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>
      <main className={s.main}>
        <header className={s.pageHeader}>
          <p className={s.date}>
            {new Intl.DateTimeFormat("de-DE", {
              weekday: "long",
              day: "numeric",
              month: "long",
              timeZone: ZONE,
            }).format(now)}
          </p>
          <h1>{headings[tab]}</h1>
          <p className={s.subtitle}>{subtitles[tab]}</p>
        </header>
        {error && !editor ? (
          <div className={s.error} role="alert">
            {error}
            <button type="button" disabled={busy} onClick={load}>
              Erneut versuchen
            </button>
          </div>
        ) : null}
        {tab === "plan" || tab === "all" ? (
          <div className={s.workspace}>
            <div className={s.tasks}>
              {loading ? (
                <div className={s.loading} role="status">
                  Deine Aufgaben werden geladen …
                </div>
              ) : tab === "plan" ? (
                HORIZONS.map((group, index) => {
                  const items = tasksIn(tasks, group.id, now);
                  if (index > 2 && !items.length) return null;
                  return (
                    <section key={group.id} className={s.group}>
                      <header className={s.sectionHead}>
                        <h2>
                          {index === 0 ? (
                            <TodoIcon name="sun" size={20} />
                          ) : null}
                          {group.title}
                        </h2>
                        <span>{items.length}</span>
                      </header>
                      {items.length ? (
                        rows(items)
                      ) : (
                        <button
                          type="button"
                          className={s.emptyGroup}
                          onClick={() =>
                            edit({
                              title: "",
                              note: "",
                              deadline:
                                group.id === "today"
                                  ? dayKey(now)
                                  : group.id === "week"
                                    ? weekEnd(now)
                                    : group.id === "month"
                                      ? monthEnd(now)
                                      : "",
                            })
                          }
                        >
                          {index === 0
                            ? "Alles im Fluss. Was steht heute an?"
                            : "Noch nichts geplant."}
                          <TodoIcon name="plus" size={17} />
                        </button>
                      )}
                    </section>
                  );
                })
              ) : (
                <section className={s.group}>
                  <div className={s.filter} aria-label="Aufgaben filtern">
                    <button
                      type="button"
                      aria-pressed={filter === "open"}
                      onClick={() => setFilter("open")}
                    >
                      Offen <span>{tasks.filter((t) => !t.done).length}</span>
                    </button>
                    <button
                      type="button"
                      aria-pressed={filter === "done"}
                      onClick={() => setFilter("done")}
                    >
                      Erledigt <span>{tasks.filter((t) => t.done).length}</span>
                    </button>
                  </div>
                  {allTasks.length ? (
                    rows(allTasks)
                  ) : (
                    <div className={s.empty}>
                      {filter === "done"
                        ? "Deine erledigten Aufgaben erscheinen hier."
                        : "Alles erledigt. Ein guter Moment zum Durchatmen."}
                    </div>
                  )}
                </section>
              )}
              <div className={s.newTaskDock}>
                <button
                  type="button"
                  className={s.newTask}
                  onClick={() =>
                    edit({ title: "", note: "", deadline: dayKey(now) })
                  }
                >
                  <TodoIcon name="plus" size={20} />
                  Neue Aufgabe
                </button>
              </div>
            </div>
            <div className={s.notesRail}>
              <NotesPanel />
            </div>
          </div>
        ) : null}
        {tab === "activity" ? (
          <PlannerActivity tasks={tasks} renderRows={rows} />
        ) : null}
        {tab === "profile" ? (
          <div className={s.profile}>
            <section className={s.settingsCard}>
              <h2>Deine Farbe</h2>
              <p>Die Farben aus deiner iPhone-App.</p>
              <div className={s.themes}>
                {THEMES.map(([id, label, color]) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={theme === id}
                    onClick={() => {
                      setTheme(id);
                      try {
                        localStorage.setItem("jaminova-todo-web-theme", id);
                      } catch {}
                    }}
                  >
                    <span style={{ background: color }}>
                      {theme === id ? (
                        <TodoIcon name="check" size={19} />
                      ) : null}
                    </span>
                    {label}
                  </button>
                ))}
              </div>
            </section>
            <section className={s.settingsCard}>
              <h2>Mit Jaminova verbunden</h2>
              <p>
                Deine Aufgaben, Notizen und Sprachnotizen sind auf dem iPhone
                und im Web verfügbar.
              </p>
              <button
                type="button"
                className={s.syncButton}
                disabled={busy || loading}
                onClick={load}
              >
                <TodoIcon name="refresh" size={17} />
                Aufgaben aktualisieren
              </button>
              <p className={s.syncTime}>
                {syncedAt
                  ? `Zuletzt aktualisiert um ${syncedAt.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", timeZone: ZONE })}`
                  : "Noch keine Verbindung bestätigt."}
              </p>
            </section>
            <Link className={s.returnLink} href="/andarun">
              Zur Jaminova Übersicht
              <TodoIcon name="arrow" size={18} />
            </Link>
          </div>
        ) : null}
      </main>
      {notice ? (
        <div className={s.toast} role="status">
          <TodoIcon name="check" size={18} />
          <span>{notice.text}</span>
          <button
            disabled={busy}
            onClick={async () => {
              if (await toggle(notice.task)) setNotice(null);
            }}
          >
            Rückgängig
          </button>
          <button
            className={s.iconButton}
            onClick={() => setNotice(null)}
            aria-label="Hinweis schließen"
          >
            <TodoIcon name="close" size={16} />
          </button>
        </div>
      ) : null}
      {editor ? (
        <PlannerDialog
          key={editor.id || "new"}
          task={editor}
          busy={busy}
          error={error}
          onClose={() => {
            setEditor(null);
            clearError();
          }}
          onSave={save}
          onDelete={remove}
          onToggle={complete}
        />
      ) : null}
    </div>
  );
}
