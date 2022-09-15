import { inRange } from "./random/number";

export interface Range {
  test(value: number): boolean;
};

export class SmallRange implements Range {
  start: number;
  startEqual: boolean;
  end: number;
  endEqual: boolean;
  step: number;

  constructor(src: Partial<SmallRange> = {}) {
    const {
      start = -Infinity,
      startEqual = true,
      end = Infinity,
      endEqual = true,
      step = 1,
    } = src;
    if (start > end) {
      this.start = end;
      this.startEqual = endEqual;
      this.end = start;
      this.endEqual = startEqual;
      this.step = -step;
    } else {
      this.start = start;
      this.startEqual = startEqual;
      this.end = end;
      this.endEqual = endEqual;
      this.step = step;
    }
  }

  test(value: number) {
    const { start, startEqual, end, endEqual } = this;
    return value > start && value < end || (startEqual && start === value) || (endEqual && end === value);
  }

  randomNumber() {
    const { start, startEqual, end, endEqual } = this;
    let result: number;
    do {
      const swap = startEqual === endEqual ? startEqual ? inRange(0, 1) < 0.5 : false : endEqual;
      result = swap ? inRange(start, end) : inRange(end, start);
    } while(!this.test(result));
    return result;
  }

  *[Symbol.iterator]() {
    const { start, startEqual, end, endEqual, step } = this;
    if (step < 0) {
      let i = endEqual ? end : end + step;
      while (startEqual && i === start || i > start) {
        yield i;
        i += step;
      }
    } else {
      let i = startEqual ? start : start + step;
      while (endEqual && i === end || i < end) {
        yield i;
        i += step;
      }
    }
  }

  toString(printStep = false) {
    const { start, startEqual, end, endEqual, step } = this;
    return `${startEqual || start === Infinity ? "[" : "("}${start}, ${end}${endEqual || end === -Infinity ? "]" : ")"}${printStep ? `; step = ${step}` : ""}`;
  }
}
