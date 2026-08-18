import { useState } from 'react';

const ADD_NEW = '__add_new__';

export default function AccountSelect({ id, value, onChange, accounts, onAddAccount, onRenameAccount, required }) {
  const [mode, setMode] = useState('select'); // 'select' | 'add' | 'rename'
  const [text, setText] = useState('');

  function startAdd() {
    setText('');
    setMode('add');
  }

  function startRename() {
    if (!value) return;
    setText(value);
    setMode('rename');
  }

  function cancel() {
    setText('');
    setMode('select');
  }

  function confirmAdd() {
    const trimmed = text.trim();
    if (trimmed) {
      onAddAccount(trimmed);
      onChange(trimmed);
    }
    setText('');
    setMode('select');
  }

  function confirmRename() {
    const trimmed = text.trim();
    if (trimmed && trimmed !== value) {
      onRenameAccount(value, trimmed);
      onChange(trimmed);
    }
    setText('');
    setMode('select');
  }

  if (mode === 'add' || mode === 'rename') {
    const isRename = mode === 'rename';
    return (
      <div className="person-add-row">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しい項目名を入力"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (isRename) confirmRename();
              else confirmAdd();
            }
          }}
        />
        <button type="button" className="btn-small" onClick={isRename ? confirmRename : confirmAdd}>
          {isRename ? '保存' : '追加'}
        </button>
        <button type="button" className="btn-small btn-secondary" onClick={cancel}>
          キャンセル
        </button>
      </div>
    );
  }

  return (
    <div className="account-select-row">
      <select
        id={id}
        value={accounts.includes(value) ? value : ''}
        onChange={(e) => {
          if (e.target.value === ADD_NEW) {
            startAdd();
          } else {
            onChange(e.target.value);
          }
        }}
        required={required}
      >
        <option value="" disabled>
          選択してください
        </option>
        {accounts.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
        <option value={ADD_NEW}>＋ 新しい項目を追加</option>
      </select>
      <button
        type="button"
        className="btn-icon-edit"
        onClick={startRename}
        disabled={!value}
        aria-label="項目名を編集"
        title="項目名を編集"
      >
        ✎
      </button>
    </div>
  );
}
