import { HEADERS } from './constants.js';

function pad2(n) {
  return String(n).padStart(2, '0');
}

export function todayYYYYMMDD() {
  const d = new Date();
  return `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}`;
}

// Parses a "yyyy-mm-dd" string (from <input type="date">) into a local Date
// at midnight, avoiding the UTC-parse day-shift that `new Date(str)` causes.
function parseLocalDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function sortItemsByDate(items) {
  return [...items].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}

// Key used to detect duplicate rows when merging imports (e.g. re-importing
// the same file, or importing data that overlaps with what's already here).
export function itemKey(item) {
  return [item.date, item.account, item.detail, item.store, item.price, item.comment, item.person].join('|');
}

const FONT = 'メイリオ';
const C_BLUE = 'FF4472C4';
const C_LIGHT_BLUE = 'FFD9E1F2';
const C_WHITE = 'FFFFFFFF';
const C_GRAY = 'FFF2F2F2';
const C_YELLOW = 'FFFFE699';
const THIN_BORDER = {
  top: { style: 'thin' },
  left: { style: 'thin' },
  bottom: { style: 'thin' },
  right: { style: 'thin' },
};

const fillOf = (argb) => ({ type: 'pattern', pattern: 'solid', fgColor: { argb } });
const rowFill = (row) => fillOf(row % 2 === 1 ? C_WHITE : C_GRAY);

// ExcelJS is dynamically imported so its payload only loads when the user
// actually exports or imports, keeping the initial mobile page load light.
async function loadExcelJS() {
  const mod = await import('exceljs');
  return mod.default ?? mod;
}

// Matches the styling of the original 経費精算 template (blue header, light
// blue title band, alternating row shading, yellow totals row, Meiryo font).
export async function buildExpenseWorkbook({ name, yearMonth, items }) {
  const ExcelJS = await loadExcelJS();
  const sorted = sortItemsByDate(items);

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet(yearMonth);
  ws.columns = [6, 13, 16, 20, 22, 10, 28, 8].map((width) => ({ width }));

  ws.mergeCells('C1:E1');
  ['A1', 'B1', 'C1', 'F1', 'G1'].forEach((addr) => {
    const cell = ws.getCell(addr);
    cell.fill = fillOf(C_LIGHT_BLUE);
    cell.border = THIN_BORDER;
    cell.font = { name: FONT };
  });
  ws.getCell('C1').value = '経費精算';
  ws.getCell('C1').font = { name: FONT, bold: true };
  ws.getCell('C1').alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getCell('F1').value = '氏名';
  ws.getCell('G1').value = name;

  HEADERS.forEach((h, i) => {
    const cell = ws.getCell(2, i + 1);
    cell.value = h;
    cell.font = { name: FONT, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = fillOf(C_BLUE);
    cell.border = THIN_BORDER;
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  });

  sorted.forEach((item, idx) => {
    const rowNum = idx + 3;
    const f = rowFill(rowNum);

    const setCell = (col, value, extra = {}) => {
      const cell = ws.getCell(rowNum, col);
      cell.value = value;
      cell.font = { name: FONT };
      cell.fill = f;
      cell.border = THIN_BORDER;
      if (extra.numFmt) cell.numFmt = extra.numFmt;
      if (extra.align) cell.alignment = { horizontal: extra.align, vertical: 'middle' };
    };

    setCell(1, idx + 1, { align: 'center' });
    setCell(2, parseLocalDate(item.date), { numFmt: 'yyyy/m/d' });
    setCell(3, item.account);
    setCell(4, item.detail);
    setCell(5, item.store);
    setCell(6, item.price, { numFmt: '#,##0' });
    setCell(7, item.comment);
    setCell(8, item.person, { align: 'center' });
  });

  const totalRow = 3 + sorted.length;
  const total = sorted.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const yellow = fillOf(C_YELLOW);
  for (let col = 1; col <= 8; col++) {
    const cell = ws.getCell(totalRow, col);
    cell.fill = yellow;
    cell.font = { name: FONT, bold: true };
    cell.border = THIN_BORDER;
  }
  ws.getCell(totalRow, 5).value = '合計';
  ws.getCell(totalRow, 5).alignment = { horizontal: 'right' };
  const totalCell = ws.getCell(totalRow, 6);
  totalCell.numFmt = '#,##0';
  totalCell.value = sorted.length > 0 ? { formula: `SUM(F3:F${totalRow - 1})`, result: total } : 0;

  const filename = `経費精算_${name}_${todayYYYYMMDD()}.xlsx`;
  return { wb, filename };
}

export async function downloadExpenseWorkbook(args) {
  const { wb, filename } = await buildExpenseWorkbook(args);
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  return filename;
}

// Reads an .xlsx previously produced by buildExpenseWorkbook so entries made
// on a different device can be merged in here.
export async function parseExpenseWorkbook(arrayBuffer) {
  const ExcelJS = await loadExcelJS();
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(arrayBuffer);
  const ws = wb.worksheets[0];
  const sheetName = ws.name;

  const nameCell = ws.getCell('G1').value;
  const detectedName = nameCell ? String(nameCell).trim() : '';
  const detectedYearMonth = /^\d{6}$/.test(sheetName) ? sheetName : '';

  const items = [];
  // row 1 = title, row 2 = headers, data starts at row 3
  for (let r = 3; r <= ws.rowCount; r++) {
    const row = ws.getRow(r);
    const storeVal = row.getCell(5).value;
    const store = storeVal == null ? '' : String(storeVal).trim();
    if (store === '合計') break; // reached the totals row

    const dateVal = row.getCell(2).value;
    if (!(dateVal instanceof Date)) continue; // skip blank/malformed rows
    const date = `${dateVal.getFullYear()}-${pad2(dateVal.getMonth() + 1)}-${pad2(dateVal.getDate())}`;

    const account = String(row.getCell(3).value ?? '').trim();
    const person = String(row.getCell(8).value ?? '').trim();
    if (!account || !person) continue;

    const priceRaw = row.getCell(6).value;
    const price = typeof priceRaw === 'number' ? priceRaw : Number(String(priceRaw ?? '').replace(/,/g, '')) || 0;

    items.push({
      id: crypto.randomUUID(),
      date,
      account,
      detail: String(row.getCell(4).value ?? '').trim(),
      store,
      price,
      comment: String(row.getCell(7).value ?? '').trim(),
      person,
    });
  }

  return { items, detectedName, detectedYearMonth };
}
