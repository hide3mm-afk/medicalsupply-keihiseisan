import PersonSelect from './PersonSelect.jsx';

export default function HeaderBar({ name, onNameChange, persons, onAddPerson, yearMonth, onYearMonthChange }) {
  return (
    <section className="card header-bar">
      <h1>経費精算</h1>
      <div className="field-grid">
        <div className="field">
          <label htmlFor="header-name">氏名</label>
          <PersonSelect
            id="header-name"
            value={name}
            onChange={onNameChange}
            persons={persons}
            onAddPerson={onAddPerson}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="header-yearmonth">対象月</label>
          <input
            id="header-yearmonth"
            type="month"
            value={yearMonth}
            onChange={(e) => onYearMonthChange(e.target.value)}
            required
          />
        </div>
      </div>
    </section>
  );
}
