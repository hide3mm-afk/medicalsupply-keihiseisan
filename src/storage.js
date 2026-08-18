const DRAFT_KEY = 'expense-app:draft:v1';
const PERSONS_KEY = 'expense-app:persons:v1';

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

export function loadPersons(defaults) {
  try {
    const raw = localStorage.getItem(PERSONS_KEY);
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

export function savePersons(persons) {
  try {
    localStorage.setItem(PERSONS_KEY, JSON.stringify(persons));
  } catch {
    // ignore
  }
}
