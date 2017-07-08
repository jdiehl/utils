// async map function
export async function mapAsync<T = any, K = any>(
  array: T[],
  map: (value: T, index: number) => Promise<K>
): Promise<K[]> {
  const promises = []
  for (let i = 0; i < array.length; i++) {
    const value = array[i]
    const promise = map(value, i)
    promises.push(promise)
  }
  return Promise.all<K>(promises)
}

// convert array values to string
export function mapToString(array: Array<{ toString(): string }>): string[] {
  return array.map(d => d.toString())
}

// return a random element from the given array
export function randomElement<T = any>(array: T[]): T {
  const i = Math.floor(Math.random() * array.length)
  return array[i]
}

// remove an object from an array
export function removeValue<T = any>(array: T[], value: T): boolean {
  const i = array.indexOf(value)
  if (i < 0) return false
  array.splice(i, 1)
  return true
}
