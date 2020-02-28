// escape any regular expressions inside a string
export function escapeRegExp(str: string): string {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')
}

// savely parse json strings
export function parseJSON(json: string): any {
  try {
    json = JSON.parse(json)
  } catch (err) {
    // nothing
  }
  return json
}

export function repeat(text: string, count: number): string {
  let out = ''
  for (let i = 0; i < count; i++) {
    out += text
  }
  return out
}
