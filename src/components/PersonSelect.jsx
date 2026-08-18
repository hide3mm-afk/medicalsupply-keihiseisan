import { useState } from 'react';

const ADD_NEW = '__add_new__';

export default function PersonSelect({ id, value, onChange, persons, onAddPerson, required }) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');

  function confirmAdd() {
    const trimmed = newName.trim();
    if (trimmed) {
      onAddPerson(trimmed);
      onChange(trimmed);
    }
    setNewName('');
    setAdding(false);
  }

  function cancelAdd() {
    setNewName('');
    setAdding(false);
  }

  if (adding) {
    return (
      <div className="person-add-row">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="新しい名前を入力"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              confirmAdd();
            }
          }}
        />
        <button type="button" className="btn-small" onClick={confirmAdd}>
          追加
        </button>
        <button type="button" className="btn-small btn-secondary" onClick={cancelAdd}>
          キャンセル
        </button>
      </div>
    );
  }

  return (
    <select
      id={id}
      value={persons.includes(value) ? value : ''}
      onChange={(e) => {
        if (e.target.value === ADD_NEW) {
          setAdding(true);
        } else {
          onChange(e.target.value);
        }
      }}
      required={required}
    >
      <option value="" disabled>
        選択してください
      </option>
      {persons.map((p) => (
        <option key={p} value={p}>
          {p}
        </option>
      ))}
      <option value={ADD_NEW}>＋ 新しい名前を追加</option>
    </select>
  );
}
