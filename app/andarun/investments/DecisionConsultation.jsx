"use client";
import { useState } from "react";
import { decisionConsultation } from "@/lib/investments/decision-results.mjs";
import styles from "./SundayReview.module.css";
export default function DecisionConsultation({
  decision,
  owner,
  measurement,
  news,
  answer,
  onAnswer,
}) {
  const [prompt, setPrompt] = useState(""),
    [message, setMessage] = useState("");
  function prepare() {
    const text = decisionConsultation(decision, { owner, measurement, news });
    setPrompt(text);
    onAnswer?.(answer || "", text);
    setMessage("");
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setMessage("کپی شد؛ در گفت‌وگوی شخصی‌ات بچسبان.");
    } catch {
      setMessage("متن را انتخاب و کپی کن.");
    }
  }
  return (
    <details className={styles.consult}>
      <summary>مشورت با ChatGPT</summary>
      <div className={styles.actions}>
        <button type="button" onClick={prepare}>
          آماده‌کردن سؤال درباره همین تصمیم
        </button>
        {prompt && (
          <>
            <button type="button" onClick={copy}>
              کپی سؤال
            </button>
            <a href="https://chatgpt.com/" target="_blank" rel="noreferrer">
              باز کردن ChatGPT
            </a>
          </>
        )}
      </div>
      {prompt && (
        <label className={styles.field}>
          سؤال قابل ویرایش
          <textarea
            rows={8}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onBlur={() => onAnswer?.(answer || "", prompt)}
          />
        </label>
      )}
      {message && (
        <p role="status" className={styles.muted}>
          {message}
        </p>
      )}
      {onAnswer ? (
        <label className={styles.field}>
          پاسخ گفت‌وگوی شخصی‌ات
          <textarea
            rows={4}
            maxLength={20000}
            value={answer || ""}
            onChange={(e) => onAnswer(e.target.value, prompt)}
            placeholder="پاسخ را اینجا بچسبان تا همراه تصمیم ذخیره شود."
          />
        </label>
      ) : (
        <p className={styles.muted}>
          پاسخ و تصمیم بعدی را با «ثبت بازبینی» به همین پرونده اضافه کن.
        </p>
      )}
    </details>
  );
}
