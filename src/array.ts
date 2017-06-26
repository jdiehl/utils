// convert array values to string
export function mapToString(array: Array<{ toString(): string }>): string[] {
  return array.map(d => d.toString())
}

// return a random element from the given array
export function randomElement<T = any>(array: T[]): T {
  const i = Math.floor(Math.random() * array.length)
  return array[i]
}
