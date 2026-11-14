/**
 * Picks the "Font of the Day" from the visitor's local date. The multiplier is
 * coprime with typical list lengths, so the order looks shuffled but every
 * style still comes up in turn.
 */
export function dayNumber(date: Date): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
}

export function fontOfDayIndex(date: Date, count: number): number {
  if (count <= 0) return 0;
  return (dayNumber(date) * 7919) % count;
}
