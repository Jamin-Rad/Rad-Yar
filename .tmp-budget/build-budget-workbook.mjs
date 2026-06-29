import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "C:/Users/Drham/OneDrive/Dokumente/Bucuhaltung/Zu Hause - 2026.xlsx";
const outputDir = path.resolve("outputs/private-budget");
const outputPath = path.join(outputDir, "Zu Hause - 2026 mit Budget.xlsx");

const sourceMonths = [
  { label: "Januar", sheet: "Januar 2026" },
  { label: "Februar", sheet: "Februar 2026" },
  { label: "März", sheet: "März" },
  { label: "April", sheet: "April" },
  { label: "Mai", sheet: "Mai" },
  { label: "Juni", sheet: "Juni" },
  { label: "Juli", sheet: null },
  { label: "August", sheet: null },
  { label: "September", sheet: null },
  { label: "Oktober", sheet: null },
  { label: "November", sheet: null },
  { label: "Dezember", sheet: null },
];

const categories = [
  "Lebensmittel",
  "Kleidung",
  "Online",
  "Restaurant",
  "Auto",
  "Zu Hause",
  "Jamin",
  "Fatima",
  "Mobin",
  "Mobina",
  "Meine Eltern",
  "Moschee",
  "Ausflug",
];

function euroFormula(sheetName, cell) {
  return sheetName ? `='${sheetName}'!${cell}` : "";
}

function findCategoryTotals(values) {
  const totals = new Map();
  for (let row = 0; row < values.length; row += 1) {
    const label = values[row]?.[0];
    const total = values[row]?.[3];
    if (typeof label === "string" && categories.includes(label) && typeof total === "number") {
      totals.set(label, total);
    }
  }
  return totals;
}

function colName(index) {
  let name = "";
  let n = index;
  while (n > 0) {
    const r = (n - 1) % 26;
    name = String.fromCharCode(65 + r) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);
const budgetSheet = workbook.worksheets.getOrAdd("Privat Budget");

budgetSheet.deleteAllDrawings();
budgetSheet.getRange("A1:T80").clear({ applyTo: "all" });
budgetSheet.showGridLines = false;

const monthData = [];
for (const month of sourceMonths) {
  let categoryTotals = new Map();
  if (month.sheet) {
    const sheet = workbook.worksheets.getItem(month.sheet);
    const used = sheet.getUsedRange(true);
    categoryTotals = findCategoryTotals(used.values || []);
  }
  monthData.push({ ...month, categoryTotals });
}

const headers = [
  "Monat",
  "Budget",
  "Einnahmen",
  "Ausgaben",
  "Saldo",
  "Budget übrig",
  "Notiz",
  ...categories,
];
const lastCol = colName(headers.length);
const actualMonthCount = sourceMonths.filter(month => month.sheet).length;

budgetSheet.getRange(`A1:${lastCol}1`).merge();
budgetSheet.getRange("A1").values = [["Privates Monatsbudget 2026"]];
budgetSheet.getRange(`A2:${lastCol}2`).merge();
budgetSheet.getRange("A2").values = [["Budget, Einnahmen, Ausgaben und Kategorien. Gelbe Felder kannst du monatlich selbst anpassen."]];

budgetSheet.getRangeByIndexes(3, 0, 1, headers.length).values = [headers];

const rows = monthData.map(month => [
  month.label,
  "",
  month.sheet ? null : "",
  month.sheet ? null : "",
  null,
  null,
  "",
  ...categories.map(category => month.categoryTotals.get(category) ?? ""),
]);
budgetSheet.getRangeByIndexes(4, 0, rows.length, headers.length).values = rows;

for (let i = 0; i < sourceMonths.length; i += 1) {
  const excelRow = i + 5;
  const month = sourceMonths[i];
  if (month.sheet) {
    budgetSheet.getRange(`C${excelRow}`).formulas = [[`=SUM('${month.sheet}'!I6:I7)`]];
    budgetSheet.getRange(`D${excelRow}`).formulas = [[`=-'${month.sheet}'!I8`]];
  }
  budgetSheet.getRange(`E${excelRow}`).formulas = [[`=C${excelRow}-D${excelRow}`]];
  budgetSheet.getRange(`F${excelRow}`).formulas = [[`=B${excelRow}-D${excelRow}`]];
}

const totalRow = 17;
budgetSheet.getRange(`A${totalRow}`).values = [["Summe"]];
budgetSheet.getRange(`B${totalRow}:F${totalRow}`).formulas = [[
  "=SUM(B5:B16)",
  "=SUM(C5:C16)",
  "=SUM(D5:D16)",
  "=SUM(E5:E16)",
  "=SUM(F5:F16)",
]];
for (let col = 8; col <= headers.length; col += 1) {
  const letter = colName(col);
  budgetSheet.getRange(`${letter}${totalRow}`).formulas = [[`=SUM(${letter}5:${letter}16)`]];
}

const averageRow = 18;
budgetSheet.getRange(`A${averageRow}`).values = [["Mittel"]];
budgetSheet.getRange(`B${averageRow}:F${averageRow}`).formulas = [[
  "=IFERROR(AVERAGE(B5:B16),0)",
  "=IFERROR(AVERAGE(C5:C16),0)",
  "=IFERROR(AVERAGE(D5:D16),0)",
  "=IFERROR(AVERAGE(E5:E16),0)",
  "=IFERROR(AVERAGE(F5:F16),0)",
]];
for (let col = 8; col <= headers.length; col += 1) {
  const letter = colName(col);
  budgetSheet.getRange(`${letter}${averageRow}`).formulas = [[`=IFERROR(AVERAGE(${letter}5:${letter}16),0)`]];
}

budgetSheet.getRange("A21").values = [["Diagrammdaten"]];
budgetSheet.getRange("A22:D22").values = [["Monat", "Einnahmen", "Ausgaben", "Saldo"]];
budgetSheet.getRange("A23:D34").formulas = sourceMonths.map((_, index) => {
  const sourceRow = index + 5;
  return [`=A${sourceRow}`, `=C${sourceRow}`, `=D${sourceRow}`, `=E${sourceRow}`];
});

budgetSheet.getRange("F21").values = [["Kategorien"]];
budgetSheet.getRange("F22:G22").values = [["Kategorie", "Summe"]];
budgetSheet.getRange("F23:F35").values = categories.map(category => [category]);
budgetSheet.getRange("G23:G35").formulas = categories.map((_, index) => {
  const sourceCol = colName(index + 8);
  return [`=${sourceCol}${totalRow}`];
});

budgetSheet.freezePanes.freezeRows(4);
budgetSheet.getRange(`A1:${lastCol}2`).format = {
  fill: "#0F172A",
  font: { bold: true, color: "#FFFFFF" },
  wrapText: true,
};
budgetSheet.getRange("A1").format.font = { bold: true, color: "#FFFFFF", size: 18 };
budgetSheet.getRange(`A4:${lastCol}4`).format = {
  fill: "#F97316",
  font: { bold: true, color: "#FFFFFF" },
  borders: { preset: "bottom", style: "medium", color: "#C2410C" },
};
budgetSheet.getRange(`A17:${lastCol}18`).format = {
  fill: "#F8FAFC",
  font: { bold: true, color: "#0F172A" },
  borders: { preset: "top", style: "thin", color: "#CBD5E1" },
};
budgetSheet.getRange("B5:B16").format = {
  fill: "#FEF3C7",
  borders: { preset: "all", style: "thin", color: "#FCD34D" },
};
budgetSheet.getRange("G5:G16").format = {
  fill: "#FEFCE8",
  borders: { preset: "all", style: "thin", color: "#FDE68A" },
};
budgetSheet.getRange("B5:F18").format.numberFormat = "€#,##0";
budgetSheet.getRange(`H5:${lastCol}18`).format.numberFormat = "€#,##0";
budgetSheet.getRange(`A4:${lastCol}18`).format.borders = { preset: "insideHorizontal", style: "thin", color: "#E2E8F0" };
budgetSheet.getRange("A22:D34").format.numberFormat = [["@"], ["€#,##0"], ["€#,##0"], ["€#,##0"]];
budgetSheet.getRange("G23:G35").format.numberFormat = "€#,##0";
budgetSheet.getRange("A22:D22").format = { fill: "#E2E8F0", font: { bold: true, color: "#0F172A" } };
budgetSheet.getRange("F22:G22").format = { fill: "#E2E8F0", font: { bold: true, color: "#0F172A" } };
budgetSheet.getRange("A21").format.font = { bold: true, color: "#0F172A" };
budgetSheet.getRange("F21").format.font = { bold: true, color: "#0F172A" };

budgetSheet.getRange("A:A").format.columnWidth = 15;
budgetSheet.getRange("B:F").format.columnWidth = 13;
budgetSheet.getRange("G:G").format.columnWidth = 26;
budgetSheet.getRange(`H:${lastCol}`).format.columnWidth = 13;

const trendChart = budgetSheet.charts.add("line", budgetSheet.getRange(`A22:D${22 + actualMonthCount}`));
trendChart.title = "Monatlicher Verlauf: Einnahmen, Ausgaben, Saldo";
trendChart.hasLegend = true;
trendChart.xAxis = { axisType: "textAxis", textStyle: { fontSize: 9 } };
trendChart.yAxis = { numberFormatCode: "€#,##0" };
trendChart.setPosition("K21", "T38");

const categoryChart = budgetSheet.charts.add("bar", budgetSheet.getRange("F22:G35"));
categoryChart.title = "Ausgaben nach Kategorie";
categoryChart.hasLegend = false;
categoryChart.xAxis = { axisType: "textAxis", textStyle: { fontSize: 9 } };
categoryChart.yAxis = { numberFormatCode: "€#,##0" };
categoryChart.setPosition("A37", "H55");

const reportSheet = workbook.worksheets.getItem("Bericht");
reportSheet.deleteAllDrawings();
const reportChart = reportSheet.charts.add("line", budgetSheet.getRange(`A22:D${22 + actualMonthCount}`));
reportChart.title = "2026: Einnahmen, Ausgaben und Saldo";
reportChart.hasLegend = true;
reportChart.xAxis = { axisType: "textAxis", textStyle: { fontSize: 9 } };
reportChart.yAxis = { numberFormatCode: "€#,##0" };
reportChart.setPosition("A14", "H31");

const reportCatChart = reportSheet.charts.add("bar", budgetSheet.getRange("F22:G35"));
reportCatChart.title = "Kategorien 2026";
reportCatChart.hasLegend = false;
reportCatChart.yAxis = { numberFormatCode: "€#,##0" };
reportCatChart.setPosition("I14", "N31");

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

await fs.mkdir(outputDir, { recursive: true });
const preview = await workbook.render({
  sheetName: "Privat Budget",
  range: `A1:${lastCol}55`,
  scale: 1,
  format: "png",
});
await fs.writeFile(path.join(outputDir, "privat-budget-preview.png"), new Uint8Array(await preview.arrayBuffer()));

const reportPreview = await workbook.render({
  sheetName: "Bericht",
  range: "A1:N32",
  scale: 1,
  format: "png",
});
await fs.writeFile(path.join(outputDir, "bericht-preview.png"), new Uint8Array(await reportPreview.arrayBuffer()));

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
