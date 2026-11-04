"use client";
import { useEffect } from "react";
import { shiftDate } from "@/lib/investments/period-profit.mjs";
import { todayBerlin } from "@/lib/investments/family.mjs";
export default function useDecisionResults(
  decisions,
  marketData,
  enabled = true,
) {
  const requests = JSON.stringify(
    (enabled ? decisions : [])
      .filter((d) => d.baseline)
      .map((d) => ({
        isin: d.baseline.isin,
        name: d.name,
        dates: [7, 30]
          .map((days) => shiftDate(d.planDate, days))
          .filter((date) => date < todayBerlin()),
      })),
  );
  useEffect(() => {
    let active = true,
      index = 0;
    const rows = JSON.parse(requests);
    async function worker() {
      while (active && index < rows.length) {
        const row = rows[index++];
        await marketData.load(
          "ISIN:" + row.isin,
          row.name,
          false,
          true,
          row.dates.length ? row.dates : null,
        );
      }
    }
    Promise.all(Array.from({ length: Math.min(3, rows.length) }, worker));
    return () => {
      active = false;
    };
  }, [requests, marketData.load]);
}
