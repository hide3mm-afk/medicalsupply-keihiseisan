import { useState } from 'react';
import { ACCOUNTS } from '../constants.js';
import { sortItemsByDate } from '../exportExcel.js';
import PersonSelect from './PersonSelect.jsx';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${y}/${Number(m)}/${Number(d)}`;
}

function EditRow({ item, persons, onAddPerson, onSave, onCancel }) {
  const [form, setForm] = useState({ ...item, price: String(item.price) });
  const [error, setError] = useState('');

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function handleSave() {
    if (!form.date || !form.account || !form.person) {
      setError('日付・項目・担当は必須です');
      return;
    }
    const n = Number(form.price);
    if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0) {
      setError('代金は0円以上の整数で入力してください');
      return;
    }
    onSave({
      ...item,
      date: form.date,
      account: form.account,
      detail: form.detail.trim(),
      store: form.store.trim(),
      price: n,
      comment: form.comment.trim(),
      person: form.person,
    });
  }

  return (
    <li className="expense-card editing">
      <div className="edit-grid">
        <label>
          日付
          <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
        </label>
        <label>
          項目
          <select value={form.account} onChange={(e) => set('account', e.target.value)}>
            {ACCOUNTS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <label>
          詳細
          <input type="text" value={form.detail} onChange={(e) => set('detail', e.target.value)} />
        </label>
        <label>
          店名
          <input type="text" value={form.store} onChange={(e) => set('store', e.target.value)} />
        </label>
        <label>
          代金
          <input
            type="number"
            inputMode="numeric"
            min="0"
            step="1"
            value={form.price}
            onChange={(e) => set('price', e.target.value)}
          />
        </label>
        <label>
          担当
          <PersonSelect
            value={form.person}
            onChange={(v) => set('person', v)}
            persons={persons}
            onAddPerson={onAddPerson}
          />
        </label>
        <label className="span-2">
          コメント
          <textarea rows={2} value={form.comment} onChange={(e) => set('comment', e.target.value)} />
        </label>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="row-actions">
        <button type="button" className="btn-small" onClick={handleSave}>
          保存
        </button>
        <button type="button" className="btn-small btn-secondary" onClick={onCancel}>
          キャンセル
        </button>
      </div>
    </li>
  );
}

export default function ExpenseList({ items, persons, onAddPerson, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const sorted = sortItemsByDate(items);
  const total = items.reduce((sum, i) => sum + (Number(i.price) || 0), 0);

  return (
    <section className="card expense-list">
      <div className="list-header">
        <h2>明細一覧（{items.length}件）</h2>
        <div className="total">
          合計 <span className="total-amount">¥{total.toLocaleString()}</span>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="empty-hint">まだ明細がありません。上のフォームから追加してください。</p>
      ) : (
        <ul className="expense-cards">
          {sorted.map((item) =>
            editingId === item.id ? (
              <EditRow
                key={item.id}
                item={item}
                persons={persons}
                onAddPerson={onAddPerson}
                onSave={(patch) => {
                  onUpdate(item.id, patch);
                  setEditingId(null);
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <li key={item.id} className="expense-card">
                <div className="expense-card-main">
                  <div className="expense-card-top">
                    <span className="expense-date">{formatDate(item.date)}</span>
                    <span className="expense-account">{item.account}</span>
                  </div>
                  <div className="expense-card-detail">
                    {item.store && <span>{item.store}</span>}
                    {item.detail && <span>{item.detail}</span>}
                  </div>
                  {item.comment && <div className="expense-card-comment">{item.comment}</div>}
                  <div className="expense-card-bottom">
                    <span className="expense-person">担当: {item.person}</span>
                    <span className="expense-price">¥{Number(item.price).toLocaleString()}</span>
                  </div>
                </div>
                <div className="row-actions">
                  <button type="button" className="btn-small" onClick={() => setEditingId(item.id)}>
                    編集
                  </button>
                  <button
                    type="button"
                    className="btn-small btn-danger"
                    onClick={() => {
                      if (confirm('この明細を削除しますか？')) onDelete(item.id);
                    }}
                  >
                    削除
                  </button>
                </div>
              </li>
            ),
          )}
        </ul>
      )}
    </section>
  );
}
