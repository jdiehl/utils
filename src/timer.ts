// throttle a callback
let throttleTimeout: any
export function throttle(then: () => void, delay: number = 100) {
  if (throttleTimeout) clearTimeout(throttleTimeout)
  throttleTimeout = setTimeout(then, delay)
}

export function wait(delay: number = 0): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, delay))
}
