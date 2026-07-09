export function parsePrice(price) {
  return Number(String(price).replace(/[^0-9.]/g, '')) || 0;
}

export function formatNaira(amount) {
  return `₦${Math.round(amount).toLocaleString('en-NG')}`;
}
