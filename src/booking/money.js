export const CURRENCIES = [
  { code: 'EUR', label: 'Euro (EUR)', rate: 10000 },
  { code: 'USD', label: 'Dólar estadounidense (USD)', rate: 11000 },
  { code: 'PEN', label: 'Sol peruano (PEN)', rate: 41000 },
  { code: 'BRL', label: 'Real brasileño (BRL)', rate: 60000 },
];
// Fixed examples for the demo, not live exchange rates.
export const isCurrency = (code) => CURRENCIES.some((item) => item.code === code);
export function euroCents(value) {
  const raw = String(value).replace(/[^0-9.,-]/g, '');
  if (raw.includes('-')) throw new Error('Invalid price');
  const decimal = raw.lastIndexOf(',') > raw.lastIndexOf('.') ? ',' : '.';
  const normalized = raw.replace(decimal === ',' ? /\./g : /,/g, '').replace(',', '.');
  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) throw new Error('Invalid price');
  return Math.round(Number(normalized) * 100);
}
export function convertEuroCents(value, currency) {
  const item = CURRENCIES.find(({ code }) => code === currency);
  if (!item) throw new Error('Unsupported currency');
  return Math.round(euroCents(value) * item.rate / 10000);
}
export function formatMoney(cents, currency, language = 'es') {
  const locales = { es: 'es-PE', en: 'en-US', pt: 'pt-BR' };
  return new Intl.NumberFormat(locales[language] || locales.es, {
    style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(cents / 100);
}
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function validBookingDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T12:00:00`);
  return !Number.isNaN(parsed.getTime()) && localDate(parsed) === value && value >= localDate();
}
