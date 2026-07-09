const STORAGE_KEY = 'cavalri_address';

export function getAddress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveAddress(address) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(address));
}
