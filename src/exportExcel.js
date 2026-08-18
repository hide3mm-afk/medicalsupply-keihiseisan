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

// xlsx is dynamically imported so its ~170KB (gzipped) payload only loads
// when the user actually exports, keeping the initial mobile page load light.
export async function buildExpenseWorkbook({ name, yearMonth, items }) {
  const XLSX = await import('xlsx');
  const sorted = sortItemsByDate(items);

  const aoa = [
    ['', '', '経費精算', '', '', '氏名', name, ''],
    [...HEADERS],
  ];

  sorted.forEach((item, i) => {
    aoa.push([
      i + 1,
      parseLocalDate(item.date),
      item.account,
      item.detail,
      item.store,
      item.price,
      item.comment,
      item.person,
    ]);
  });

  const totalRowIndex = aoa.length; // 0-based index of the total row we're about to push
  const total = sorted.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  aoa.push(['', '', '', '', '合計', total, '', '']);

  const ws = XLSX.utils.aoa_to_sheet(aoa);

  ws['!merges'] = [{ s: { r: 0, c: 2 }, e: { r: 0, c: 4 } }];
  ws['!cols'] = [
    { wch: 6 },
    { wch: 13 },
    { wch: 16 },
    { wch: 20 },
    { wch: 22 },
    { wch: 10 },
    { wch: 28 },
    { wch: 8 },
  ];

  const dateCol = 1;
  const priceCol = 5;
  for (let r = 2; r < totalRowIndex; r++) {
    const dateCell = ws[XLSX.utils.encode_cell({ r, c: dateCol })];
    if (dateCell) dateCell.z = 'yyyy/m/d';
    const priceCell = ws[XLSX.utils.encode_cell({ r, c: priceCol })];
    if (priceCell) priceCell.z = '#,##0';
  }

  const totalPriceCell = ws[XLSX.utils.encode_cell({ r: totalRowIndex, c: priceCol })];
  if (totalPriceCell) {
    totalPriceCell.z = '#,##0';
    const firstDataRow = 3; // row 3 = first data row (1-indexed, matches reference sheet)
    const lastDataRow = 2 + sorted.length;
    if (sorted.length > 0) {
      totalPriceCell.f = `SUM(F${firstDataRow}:F${lastDataRow})`;
    }
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, yearMonth);

  const filename = `経費精算_${name}_${todayYYYYMMDD()}.xlsx`;
  return { wb, filename };
}

export async function downloadExpenseWorkbook(args) {
  const [{ wb, filename }, XLSX] = await Promise.all([buildExpenseWorkbook(args), import('xlsx')]);
  XLSX.writeFile(wb, filename);
  return filename;
}
