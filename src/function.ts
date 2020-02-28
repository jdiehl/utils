// create a promise for node-like callback function
export async function promise<T = any>(cb: (err: any, res?: T) => void): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    cb((err: any, res?: T) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}

// throttle a callback
let throttleTimeout: any
export function throttle(then: () => void, delay = 100) {
  if (throttleTimeout) clearTimeout(throttleTimeout)
  throttleTimeout = setTimeout(then, delay)
}

// wait
export function wait(delay = 0): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, delay))
}
