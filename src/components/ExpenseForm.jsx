import { useEffect, useRef, useState } from 'react';
import { ACCOUNTS } from '../constants.js';
import PersonSelect from './PersonSelect.jsx';

function pad2(n) {
  return String(n).padStart(2, '0');
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function emptyForm(defaultPerson) {
  return {
    date: todayStr(),
    account: '',
    detail: '',
    store: '',
    price: '',
    comment: '',
    person: defaultPerson,
  };
}

export default function ExpenseForm({ defaultPerson, persons, onAddPerson, onSubmit }) {
  const [form, setForm] = useState(() => emptyForm(defaultPerson));
  const [errors, setErrors] = useState({});
  const prevDefaultPerson = useRef(defaultPerson);

  // Keep the row's 担当 in sync with the header's 氏名 until the user
  // explicitly picks a different person for this row.
  useEffect(() => {
    setForm((f) => (f.person === prevDefaultPerson.current ? { ...f, person: defaultPerson } : f));
    prevDefaultPerson.current = defaultPerson;
  }, [defaultPerson]);

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function validate() {
    const errs = {};
    if (!form.date) errs.date = '日付を入力してください';
    if (!form.account) errs.account = '項目を選択してください';
    if (form.price === '' || form.price === null) {
      errs.price = '代金を入力してください';
    } else {
      const n = Number(form.price);
      if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0) {
        errs.price = '0円以上の整数で入力してください';
      }
    }
    if (!form.person) errs.person = '担当を選択してください';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onSubmit({
      id: crypto.randomUUID(),
      date: form.date,
      account: form.account,
      detail: form.detail.trim(),
      store: form.store.trim(),
      price: Number(form.price),
      comment: form.comment.trim(),
      person: form.person,
    });

    setForm(emptyForm(defaultPerson));
    setErrors({});
  }

  return (
    <form className="card expense-form" onSubmit={handleSubmit} noValidate>
      <h2>経費を追加</h2>

      <div className="field">
        <label htmlFor="f-date">
          日付 <span className="required">*</span>
        </label>
        <input
          id="f-date"
          type="date"
          value={form.date}
          onChange={(e) => set('date', e.target.value)}
          required
        />
        {errors.date && <p className="error">{errors.date}</p>}
      </div>

      <div className="field">
        <label htmlFor="f-account">
          項目 <span className="required">*</span>
        </label>
        <select id="f-account" value={form.account} onChange={(e) => set('account', e.target.value)} required>
          <option value="" disabled>
            選択してください
          </option>
          {ACCOUNTS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        {errors.account && <p className="error">{errors.account}</p>}
      </div>

      <div className="field">
        <label htmlFor="f-detail">詳細</label>
        <input
          id="f-detail"
          type="text"
          value={form.detail}
          onChange={(e) => set('detail', e.target.value)}
          placeholder="例: 駐車料金"
        />
      </div>

      <div className="field">
        <label htmlFor="f-store">店名</label>
        <input id="f-store" type="text" value={form.store} onChange={(e) => set('store', e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="f-price">
          代金（円） <span className="required">*</span>
        </label>
        <input
          id="f-price"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          min="0"
          step="1"
          value={form.price}
          onChange={(e) => set('price', e.target.value)}
          placeholder="0"
          required
        />
        {errors.price && <p className="error">{errors.price}</p>}
      </div>

      <div className="field">
        <label htmlFor="f-comment">コメント</label>
        <textarea
          id="f-comment"
          rows={2}
          value={form.comment}
          onChange={(e) => set('comment', e.target.value)}
          placeholder="出張先・同席者など"
        />
      </div>

      <div className="field">
        <label htmlFor="f-person">
          担当 <span className="required">*</span>
        </label>
        <PersonSelect
          id="f-person"
          value={form.person}
          onChange={(v) => set('person', v)}
          persons={persons}
          onAddPerson={onAddPerson}
          required
        />
        {errors.person && <p className="error">{errors.person}</p>}
      </div>

      <button type="submit" className="btn-primary btn-add">
        追加
      </button>
    </form>
  );
}
