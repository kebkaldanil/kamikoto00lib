export function lessThen(max: number) {
  return Math.random() * max | 0;
}

export function inRange(from: number, to: number) {
  return (Math.random() * (to - from) + from) | 0;
}
