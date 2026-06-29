import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "C:/Users/Drham/OneDrive/Dokumente/Bucuhaltung/Zu Hause - 2026.xlsx";
const outputDir = path.resolve(".tmp-budget/inspect");
await fs.mkdir(outputDir, { recursive: true });

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const summary = await workbook.inspect({
  kind: "workbook,sheet,table,drawing",
  maxChars: 8000,
  tableMaxRows: 8,
  tableMaxCols: 10,
  tableMaxCellChars: 80,
});
console.log(summary.ndjson);

const sheets = await workbook.inspect({ kind: "sheet", include: "id,name", maxChars: 4000 });
console.log("SHEETS");
console.log(sheets.ndjson);

for (const line of sheets.ndjson.trim().split(/\n+/)) {
  const record = JSON.parse(line);
  if (!record.name) continue;
  try {
    const preview = await workbook.render({
      sheetName: record.name,
      autoCrop: "all",
      scale: 1,
      format: "png",
    });
    await fs.writeFile(
      path.join(outputDir, `${record.name.replace(/[\\/:*?"<>|]/g, "_")}.png`),
      new Uint8Array(await preview.arrayBuffer()),
    );
  } catch (error) {
    console.error(`Render failed for ${record.name}: ${error.message}`);
  }
}
