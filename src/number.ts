// compute a random integer between min and min + spread
export function randomInt(min: number, spread: number): number {
  return min + Math.floor(Math.random() * spread)
}

// ensure that a is within [b c]
export function within(a: number, b: number, c: number): number {
  if (a < b) return b
  if (a > c) return c
  return a
}
