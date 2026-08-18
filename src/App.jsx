import { useEffect, useRef, useState } from 'react';
import HeaderBar from './components/HeaderBar.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import { DEFAULT_PERSONS } from './constants.js';
import { loadDraft, saveDraft, clearDraft, loadPersons, savePersons } from './storage.js';
import { downloadExpenseWorkbook } from './exportExcel.js';
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
  const isFirstRender = useRef(true);

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

  function setName(v) {
    setState((s) => ({ ...s, name: v }));
  }

  function setYearMonth(v) {
    setState((s) => ({ ...s, yearMonth: v }));
  }

  function addPerson(newName) {
    setPersons((ps) => (ps.includes(newName) ? ps : [...ps, newName]));
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

      <ExpenseForm defaultPerson={name} persons={persons} onAddPerson={addPerson} onSubmit={addItem} />

      <ExpenseList items={items} persons={persons} onAddPerson={addPerson} onUpdate={updateItem} onDelete={deleteItem} />

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
