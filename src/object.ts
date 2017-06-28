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
export function extend(obj: any, extension: any): any {
  if (!extension) return obj
  for (const key in extension) {
    if (extension.hasOwnProperty(key)) {
      obj[key] = extension[key]
    }
  }
  return obj
}

// iterate over any object yielding [value, key]
export function each<T = any>(obj: any, cb: (value: T, key: string) => boolean | void): void {
  if (!obj) return
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (cb(obj[key], key) === false) return
    }
  }
}

// iterative asynchronously over all elements of an object
export async function eachAsync<T = any>(
  objects: any,
  cb: (obj: T, key: string) => Promise<void> | void
): Promise<void> {
  const promises: Array<Promise<void>> = []
  each<T>(objects, (obj, key) => {
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

// remove an object from an array
export function removeObject(array: any[], obj: any): boolean {
  const i = array.indexOf(obj)
  if (i < 0) return false
  array.splice(i, 1)
  return true
}

// set or remove a property of an object
export function setOrRemove(obj: any, key: string, value?: any) {
  if (value) {
    obj[key] = value
  } else {
    delete obj[key]
  }
}

// create an index of the objects contained in data
export function makeIndex<T = any>(data: T[], key?: string): { [key: string]: T } {
  const index: { [key: string]: T } = {}
  for (const item of data) {
    index[key ? (item as any)[key] as any : item] = item
  }
  return index
}
