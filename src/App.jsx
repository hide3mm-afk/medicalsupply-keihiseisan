import { useEffect, useRef, useState } from 'react';
import HeaderBar from './components/HeaderBar.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import { DEFAULT_PERSONS, DEFAULT_ACCOUNTS } from './constants.js';
import {
  loadDraft,
  saveDraft,
  clearDraft,
  loadPersons,
  savePersons,
  loadAccounts,
  saveAccounts,
} from './storage.js';
import { downloadExpenseWorkbook, parseExpenseWorkbook, itemKey } from './exportExcel.js';
import './App.css';

function pad2(n) {
  return String(n).padStart(2, '0');
}

function currentYearMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
}

function initState() {
  const draft = loadDraft();
  return {
    name: draft?.name ?? '',
    yearMonth: draft?.yearMonth ?? currentYearMonth(),
    items: draft?.items ?? [],
  };
}

export default function App() {
  const [{ name, yearMonth, items }, setState] = useState(initState);
  const [persons, setPersons] = useState(() => loadPersons(DEFAULT_PERSONS));
  const [accounts, setAccounts] = useState(() => loadAccounts(DEFAULT_ACCOUNTS));
  const isFirstRender = useRef(true);
  const importInputRef = useRef(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    saveDraft({ name, yearMonth, items });
  }, [name, yearMonth, items]);

  useEffect(() => {
    savePersons(persons);
  }, [persons]);

  useEffect(() => {
    saveAccounts(accounts);
  }, [accounts]);

  function setName(v) {
    setState((s) => ({ ...s, name: v }));
  }

  function setYearMonth(v) {
    setState((s) => ({ ...s, yearMonth: v }));
  }

  function addPerson(newName) {
    setPersons((ps) => (ps.includes(newName) ? ps : [...ps, newName]));
  }

  function addAccount(newAccount) {
    setAccounts((as) => (as.includes(newAccount) ? as : [...as, newAccount]));
  }

  function renameAccount(oldName, newName) {
    if (!oldName || !newName || oldName === newName) return;
    setAccounts((as) => {
      // if the target name already exists, merge into it instead of duplicating
      if (as.includes(newName)) return as.filter((a) => a !== oldName);
      return as.map((a) => (a === oldName ? newName : a));
    });
    setState((s) => ({
      ...s,
      items: s.items.map((i) => (i.account === oldName ? { ...i, account: newName } : i)),
    }));
  }

  function addItem(item) {
    setState((s) => ({ ...s, items: [...s.items, item] }));
  }

  function updateItem(id, patch) {
    setState((s) => ({ ...s, items: s.items.map((i) => (i.id === id ? patch : i)) }));
  }

  function deleteItem(id) {
    setState((s) => ({ ...s, items: s.items.filter((i) => i.id !== id) }));
  }

  function handleClear() {
    if (items.length === 0) return;
    if (!confirm('入力済みの明細をすべて削除します。よろしいですか？')) return;
    setState((s) => ({ ...s, items: [] }));
    clearDraft();
    saveDraft({ name, yearMonth, items: [] });
  }

  async function handleExport() {
    if (!name) {
      alert('氏名を選択してください');
      return;
    }
    if (!yearMonth) {
      alert('対象月を選択してください');
      return;
    }
    if (items.length === 0) {
      alert('明細が1件もありません');
      return;
    }
    const sheetYearMonth = yearMonth.replace('-', '');
    const filename = await downloadExpenseWorkbook({ name, yearMonth: sheetYearMonth, items });

    if (confirm(`${filename} を出力しました。\n入力済みの明細をクリアしますか？`)) {
      setState((s) => ({ ...s, items: [] }));
    }
  }

  function triggerImport() {
    importInputRef.current?.click();
  }

  async function handleImportFileChange(e) {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-selecting the same file later
    if (!file) return;

    let parsed;
    try {
      const buf = await file.arrayBuffer();
      parsed = await parseExpenseWorkbook(buf);
    } catch {
      alert('ファイルを読み込めませんでした。この経費精算アプリで出力したExcelファイルを選択してください。');
      return;
    }

    if (parsed.items.length === 0) {
      alert('取り込める明細が見つかりませんでした。この経費精算アプリで出力したExcelファイルを選択してください。');
      return;
    }

    const infoLines = [];
    if (parsed.detectedName) infoLines.push(`氏名: ${parsed.detectedName}`);
    if (parsed.detectedYearMonth) infoLines.push(`対象月: ${parsed.detectedYearMonth}`);
    const info = infoLines.length > 0 ? `${infoLines.join(' / ')}\n` : '';
    if (!confirm(`${info}${parsed.items.length}件の明細が見つかりました。現在の一覧に追加しますか？`)) {
      return;
    }

    const existingKeys = new Set(items.map(itemKey));
    const toAdd = [];
    let skipped = 0;
    for (const it of parsed.items) {
      const key = itemKey(it);
      if (existingKeys.has(key)) {
        skipped++;
        continue;
      }
      existingKeys.add(key);
      toAdd.push(it);
    }

    if (toAdd.length > 0) {
      setState((s) => ({ ...s, items: [...s.items, ...toAdd] }));
      const newAccounts = [...new Set(toAdd.map((i) => i.account))];
      const newPersons = [...new Set(toAdd.map((i) => i.person))];
      setAccounts((as) => [...as, ...newAccounts.filter((a) => !as.includes(a))]);
      setPersons((ps) => [...ps, ...newPersons.filter((p) => !ps.includes(p))]);
    }

    alert(`${toAdd.length}件を取り込みました。${skipped > 0 ? `（重複していた${skipped}件はスキップしました）` : ''}`);
  }

  return (
    <div className="app-shell">
      <HeaderBar
        name={name}
        onNameChange={setName}
        persons={persons}
        onAddPerson={addPerson}
        yearMonth={yearMonth}
        onYearMonthChange={setYearMonth}
      />

      <ExpenseForm
        defaultPerson={name}
        persons={persons}
        onAddPerson={addPerson}
        accounts={accounts}
        onAddAccount={addAccount}
        onRenameAccount={renameAccount}
        onSubmit={addItem}
      />

      <ExpenseList
        items={items}
        persons={persons}
        onAddPerson={addPerson}
        accounts={accounts}
        onAddAccount={addAccount}
        onRenameAccount={renameAccount}
        onUpdate={updateItem}
        onDelete={deleteItem}
        onImportClick={triggerImport}
      />
      <input
        ref={importInputRef}
        type="file"
        accept=".xlsx"
        onChange={handleImportFileChange}
        style={{ display: 'none' }}
      />

      <div className="action-bar">
        <button type="button" className="btn-primary btn-export" onClick={handleExport}>
          Excel出力
        </button>
        <button type="button" className="btn-secondary" onClick={handleClear}>
          明細をクリア
        </button>
      </div>
    </div>
  );
}
