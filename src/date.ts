function unitFactor(unit: string): number {
  switch (unit) {
  case 's': return 1000
  case 'm': return 60000
  case 'h': return 3600000
  case 'd': return 86400000
  case 'w': return 604800000
  case 'y': return 31536000000
  default: throw new Error('Invalid Unit')
  }
}

export function stringToDuration(x: string): number {
  const unit = x[x.length - 1]
  const d = parseInt(x, 10)
  return d * unitFactor(unit)
}
