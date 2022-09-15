export const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

//@ts-expect-error
const _nextTick: (cb: () => void) => void = global?.process?.nextTick || ((cb) => window.setTimeout(cb));

export const nextTick = () => new Promise<void>((res) => _nextTick(res));
