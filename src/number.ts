// compute a random integer between min and min + spread
export function randomInt(min: number, spread: number): number {
  return min + Math.floor(Math.random() * spread)
}

// ensure that a is within [b c]
export function within(x: number, lower: number, upper: number): number {
  if (x < lower) return lower
  if (x > upper) return upper
  return x
}
