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
  monthEnd,
  tasksIn,
  weekEnd,
  ZONE,
} from "./plannerModel.mjs";
import s from "./planner.module.css";

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
  const isJournal = tab === "plan";
  const today = dayKey(now);
  const todayRows = [
    ...tasks.filter((task) => completionDay(task) === today),
    ...tasksIn(tasks, "today", now),
  ];
  const date = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: ZONE,
  }).format(now);
  const headings = {
    all: "Alle Aufgaben",
    activity: "Aktivität",
    profile: "Einstellungen",
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
    <div
      className={s.shell}
      data-theme={theme}
      data-todo-planner
      data-layout="journal"
      lang="de"
      dir="ltr"
    >
      <main className={`${s.main} ${s.journalMain}`}>
        <nav className={s.journalTools} aria-label="To Do">
          <button type="button" aria-label={isJournal ? "Aktivität" : "Zum Tagesblatt"}
            title={isJournal ? "Aktivität" : "Zum Tagesblatt"}
            onClick={() => navigate(isJournal ? "activity" : "plan")}>
            <TodoIcon name={isJournal ? "activity" : "back"} size={24} />
          </button>
          <span aria-hidden="true" />
          <button type="button" aria-label="Einstellungen" title="Einstellungen"
            onClick={() => navigate("profile")}>
            <TodoIcon name="settings" size={24} />
          </button>
        </nav>
        <header className={isJournal ? s.journalHeader : s.pageHeader}>
          {isJournal ? (
            <>
              <p className={s.journalBrand}>Jaminova To Do</p>
              <h1>Tagesblatt</h1>
              <p className={s.journalDate}>{date.replace(", ", ",\n")}</p>
            </>
          ) : <h1>{headings[tab]}</h1>}
        </header>
        {error && !editor ? (
          <div className={s.error} role="alert">
            {error}
            <button type="button" disabled={busy} onClick={load}>
              Erneut versuchen
            </button>
          </div>
        ) : null}
        {isJournal ? (
          <div className={s.journalContent}>
            <section className={s.journalSection} aria-label="Heute">
              {loading ? (
                <p role="status" className={s.journalEmpty}>Deine Aufgaben werden geladen …</p>
              ) : todayRows.length ? rows(todayRows) : (
                <p className={s.journalEmpty}>Keine Aufgaben für heute</p>
              )}
              <button className={s.journalAdd} type="button"
                onClick={() => edit({ title: "", note: "", deadline: today })}>
                <TodoIcon name="plus" size={19} /> Aufgabe
              </button>
            </section>
            <section className={s.journalSection}>
              <NotesPanel journal />
            </section>
            <div className={s.journalSection}>
              {HORIZONS.slice(1, 3).map((group) => {
                const items = tasksIn(tasks, group.id, now);
                return (
                  <details className={s.journalDisclosure} key={group.id}>
                    <summary>{group.title}<TodoIcon name="down" size={18} /></summary>
                    {items.length ? rows(items) : <p className={s.journalEmpty}>Keine offenen Aufgaben</p>}
                    <button type="button" className={s.journalAdd}
                      onClick={() => edit({ title: "", note: "", deadline: group.id === "week" ? weekEnd(now) : monthEnd(now) })}>
                      <TodoIcon name="plus" size={17} /> Aufgabe
                    </button>
                  </details>
                );
              })}
              <button className={s.journalAll} type="button" onClick={() => navigate("all")}>
                <TodoIcon name="all" size={16} /> Alle Aufgaben
              </button>
            </div>
          </div>
        ) : null}
        {tab === "all" ? (
          <div className={s.tasks}>
            {loading ? (
              <div className={s.loading} role="status">Deine Aufgaben werden geladen …</div>
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
              <div>
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
