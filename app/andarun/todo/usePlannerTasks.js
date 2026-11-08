"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isTask, taskPayload } from "./plannerModel.mjs";

const API = "/api/andarun/todos";
const STORAGE = "andarun_todos_fallback_v1";
function localItems() {
  try {
    const items = JSON.parse(localStorage.getItem(STORAGE) || "[]");
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}
const localDrafts = () =>
  localItems().filter(
    (item) => String(item.id).startsWith("local-") && isTask(item),
  );
async function request(method = "GET", body, id) {
  const response = await fetch(
    id ? `${API}?id=${encodeURIComponent(id)}` : API,
    {
      method,
      cache: "no-store",
      headers: body ? { "Content-Type": "application/json" } : {},
      body: body ? JSON.stringify(body) : undefined,
    },
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      response.status === 403
        ? "Bitte erneut bei Jaminova anmelden."
        : "Nicht gespeichert. Bitte erneut versuchen.",
    );
  return data;
}
export default function usePlannerTasks() {
  const [tasks, setTasks] = useState([]),
    [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [syncedAt, setSyncedAt] = useState(null);
  const active = useRef(false),
    working = useRef(false),
    sequence = useRef(0);
  const load = useCallback(async () => {
    if (working.current) return;
    const version = ++sequence.current;
    try {
      const data = await request();
      if (active.current && version === sequence.current) {
        setTasks([...localDrafts(), ...(data.todos || []).filter(isTask)]);
        setSyncedAt(new Date());
        setError("");
      }
    } catch {
      if (active.current && version === sequence.current) {
        setError(
          "Verbindung unterbrochen. Deine geöffneten Aufgaben bleiben sichtbar.",
        );
        setTasks((current) => (current.length ? current : localDrafts()));
      }
    } finally {
      if (active.current) setLoading(false);
    }
  }, []);
  useEffect(() => {
    active.current = true;
    load();
    const focus = () => {
      if (document.visibilityState === "visible") load();
    };
    window.addEventListener("focus", focus);
    document.addEventListener("visibilitychange", focus);
    return () => {
      active.current = false;
      sequence.current++;
      window.removeEventListener("focus", focus);
      document.removeEventListener("visibilitychange", focus);
    };
  }, [load]);
  async function mutate(method, body, item) {
    if (working.current) return null;
    working.current = true;
    setBusy(true);
    setError("");
    sequence.current++;
    try {
      const local = String(item?.id || "").startsWith("local-");
      if (local && method === "DELETE") {
        localStorage.setItem(
          STORAGE,
          JSON.stringify(localItems().filter((task) => task.id !== item.id)),
        );
        setTasks((current) => current.filter((task) => task.id !== item.id));
        return item;
      }
      const data = await request(
        local ? "POST" : method,
        local ? { ...taskPayload(item), ...body, id: undefined } : body,
        method === "DELETE" ? item.id : null,
      );
      if (!active.current) return null;
      if (local)
        localStorage.setItem(
          STORAGE,
          JSON.stringify(localItems().filter((task) => task.id !== item.id)),
        );
      setTasks((current) =>
        method === "DELETE"
          ? current.filter((task) => task.id !== item.id)
          : [
              ...current.filter(
                (task) => task.id !== item?.id && task.id !== data.todo.id,
              ),
              data.todo,
            ],
      );
      setSyncedAt(new Date());
      return data.todo || item;
    } catch (cause) {
      if (active.current) setError(cause.message);
      return null;
    } finally {
      working.current = false;
      if (active.current) setBusy(false);
    }
  }
  return {
    tasks,
    loading,
    busy,
    error,
    syncedAt,
    load,
    save: (draft) =>
      mutate(
        draft.id ? "PATCH" : "POST",
        { ...taskPayload(draft), ...(draft.id ? { id: draft.id } : {}) },
        draft,
      ),
    toggle: (item) => mutate("PATCH", { id: item.id, done: !item.done }, item),
    remove: (item) => mutate("DELETE", null, item),
    clearError: () => setError(""),
  };
}
