const DRAFT_KEY = 'expense-app:draft:v1';
const PERSONS_KEY = 'expense-app:persons:v1';
const ACCOUNTS_KEY = 'expense-app:accounts:v1';

export function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveDraft(draft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — ignore
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

function loadList(key, defaults) {
  try {
    const raw = localStorage.getItem(key);
    const saved = raw ? JSON.parse(raw) : null;
    if (!Array.isArray(saved) || saved.length === 0) return defaults;
    // merge in case defaults were extended later, keep saved order first
    const merged = [...saved];
    for (const d of defaults) {
      if (!merged.includes(d)) merged.push(d);
    }
    return merged;
  } catch {
    return defaults;
  }
}

function saveList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function loadPersons(defaults) {
  return loadList(PERSONS_KEY, defaults);
}

export function savePersons(persons) {
  saveList(PERSONS_KEY, persons);
}

export function loadAccounts(defaults) {
  return loadList(ACCOUNTS_KEY, defaults);
}

export function saveAccounts(accounts) {
  saveList(ACCOUNTS_KEY, accounts);
}
