// clone an object
export function clone(obj: any): any {
  if (typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof Array) return obj.map(x => x)
  const res: any = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = clone(obj[key])
    }
  }
  return res
}

// extend
export function extend(obj: object, extension: object | undefined): any {
  if (!extension) return obj
  for (const key in extension) {
    if (extension.hasOwnProperty(key)) {
      (obj as any)[key] = (extension as any)[key]
    }
  }
  return obj
}

// iterate over any object yielding [value, key]
export function each<T = any>(obj: object | undefined, cb: (value: T, key: string) => boolean | void): void {
  if (!obj) return
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (cb((obj as any)[key], key) === false) return
    }
  }
}

// iterative asynchronously over all elements of an object
export async function eachAsync<T = any>(
  object: object,
  cb: (obj: T, key: string) => Promise<void> | void
): Promise<void> {
  const promises: Array<Promise<void>> = []
  each<T>(object, (obj, key) => {
    const promise = cb(obj, key)
    if (promise) promises.push(promise)
  })
  await Promise.all<void>(promises)
}

// deep compare two objects
export function equals<T = any>(a: T, b: T): boolean {
  if (typeof a !== 'object') return a === b
  if (a instanceof Array && b instanceof Array) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!equals(a[i], b[i])) return false
    }
    return true
  }
  return JSON.stringify(a) === JSON.stringify(b)
}

// get the value by following the key path
export function getKeyPath(object: any, keyPath: string): any {
  const keys = keyPath.split('.')
  let value = object
  for (const key of keys) {
    if (!value) return
    value = value[key]
  }
  return value
}

// create an index of the objects contained in data
export function makeIndex<T = any>(data: T[], key?: string): Record<string, T> {
  const index: Record<string, T> = {}
  for (const item of data) {
    index[key ? (item as any)[key] as any : item] = item
  }
  return index
}

// set or remove a property of an object
export function setOrRemove(obj: object, key: string, value?: any) {
  if (value) {
    (obj as any)[key] = value
  } else {
    delete (obj as any)[key]
  }
}
