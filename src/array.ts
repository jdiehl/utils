// convert array values to string
export interface Stringifiable { toString(): void }
export function mapToString(array: Stringifiable[] = []): string[] {
  return array.map<any>(d => d.toString())
}

// return a random element from the given array
export function randomElement<T = any>(array: T[]): T {
  const i = Math.floor(Math.random() * array.length)
  return array[i]
}
