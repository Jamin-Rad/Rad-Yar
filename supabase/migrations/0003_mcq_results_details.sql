-- ════════════════════════════════════════════════════════════════
-- Migration 0003: zusätzliche Detail-Daten für MCQ-Ergebnisse
-- (wrongQuestionIds, tägliche Aufschlüsselung, lastSessionAttempted –
--  ersetzt den localStorage-Key "radyar_mcq_scores")
-- ════════════════════════════════════════════════════════════════

alter table mcq_results
  add column if not exists details jsonb not null default '{}'::jsonb;
