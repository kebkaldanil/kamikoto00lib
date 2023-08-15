import { Func } from "./types/object.ts";

export const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// deno-lint-ignore ban-ts-comment
//@ts-ignore
const _nextTick: (cb: () => void) => void = globalThis?.process?.nextTick || ((cb) => setTimeout(cb));

export const nextTick = () => new Promise<void>((res) => _nextTick(res));

const tickDelayIntervalsCallbacks: Record<number, Func<[], void>[] | undefined> = {};
/**
* Creates a delayed tick mechanism with the specified time interval.
*
* @param {number} ms - The time interval in milliseconds.
* @returns {Promise<void>} - A promise that resolves after the specified time interval.
*/
export const tickDelay = (ms: number) => new Promise<void>((resolve) => {
  if (isNaN(ms)) {
    throw new Error("Invalid tick delay interval");
  }
  if (tickDelayIntervalsCallbacks[ms]?.push(resolve)) {
    return;
  }
  const callbacks = tickDelayIntervalsCallbacks[ms] = [resolve];
  const interval = setInterval(() => {
    if (callbacks.length === 0) {
      clearInterval(interval);
      delete tickDelayIntervalsCallbacks[ms];
      return;
    }
    for (const callback of callbacks) {
      callback();
    }
    callbacks.length = 0;
  }, ms);
});
