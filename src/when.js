// Event timing, kept free of React so `node src/when.js` can check it.

export const isUpcoming = (iso, now = Date.now()) => new Date(iso) > now;

// "Today" / "Tomorrow" / "In 12 days", counted in calendar days; null once it has started.
export function whenLabel(iso, now = Date.now()) {
  if (!isUpcoming(iso, now)) return null;
  const day = x => Date.UTC(x.getFullYear(), x.getMonth(), x.getDate());
  const n = Math.round((day(new Date(iso)) - day(new Date(now))) / 864e5);
  return n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : `In ${n} days`;
}

if (typeof process !== 'undefined' && process.argv[1]?.endsWith('when.js')) {
  const assert = (await import('node:assert')).strict;
  const now = new Date('2026-10-28T20:00').getTime();
  assert.equal(whenLabel('2026-10-28T19:00', now), null);         // already started
  assert.equal(whenLabel('2026-10-28T21:00', now), 'Today');
  assert.equal(whenLabel('2026-10-29T08:30', now), 'Tomorrow');   // under 24h, still tomorrow
  assert.equal(whenLabel('2026-11-08T10:00', now), 'In 11 days');
  assert.equal(isUpcoming('2026-10-11T09:00', now), false);
  console.log('when.js ok');
}
