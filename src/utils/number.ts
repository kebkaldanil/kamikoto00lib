import { TooLongExecution, UnsafeNumber } from "../errors/index.ts";
import { _Extends, And, Extends, If, IfElse, Not, Or } from "../type-logic.ts";
import { As, IsEven, IsInt, IsPositive, IsSafeInt, uint } from "../types/index.ts";

type ToIntFuncResult<X extends number, T extends number> = If<
  IfElse<[
    [_Extends<0, T>, true],
    [_Extends<1, T>, IsInt<X>],
    [_Extends<2, T>, IsEven<X>],
    [
      _Extends<5, T>,
      And<IsSafeInt<X>, _Extends<`${X}`, `${string}${"0" | "5"}`>>,
    ],
    [_Extends<10, T>, And<IsSafeInt<X>, _Extends<`${X}`, `${string}0`>>],
  ], false>,
  X,
  number
>;

export function round<const X extends number, const T extends number = 1>(
  x: X,
  to: T = 1 as T,
): ToIntFuncResult<X, T> {
  if (!to) {
    return x as never;
  }
  return Math.round(x / to) * to as never;
}

export function ceil<const X extends number, const T extends number = 1>(
  x: X,
  to = 1,
): ToIntFuncResult<X, T> {
  if (!to) {
    return x as never;
  }
  return Math.ceil(x / to) * to as never;
}

export function floor<const X extends number, const T extends number = 1>(
  x: X,
  to = 1,
): ToIntFuncResult<X, T> {
  if (!to) {
    return x as never;
  }
  return Math.floor(x / to) * to as never;
}

export const clamp = (min: number, val: number, max: number) => {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.max(min, Math.min(max, val));
};

export function numberOrDefault<const T, const D = 0>(
  value: T,
  _default: D = 0 as D,
): If<Extends<T, number | bigint | `${number}`>, As<T, number>, D> {
  const num = Number(value);
  return (num || num === 0 ? num : _default) as never;
}

export function integerOrDefault<const T, const D = 0>(
  value: T,
  _default: D = 0 as D,
): If<
  Not<_Extends<unknown, T>> | Or<_Extends<T, bigint>, IsInt<T>>,
  As<T, number>,
  D
> { // T extends bigint ? As<T, number> : If<IsInt<T>, T, D> {
  return (typeof value === "bigint"
    ? Number(value)
    : Number.isSafeInteger(value)
    ? value
    : _default) as never;
}

export function padNumberToLength<const L extends number | string | bigint>(
  num: number | bigint,
  length: uint<L>,
) {
  const str = "" + num;
  return str.padStart(Number(length), "0");
}

const xmin = -1 / Math.E;

export function lambertW<
  const MaxIT extends number = 1e2,
  const MinIT extends number = 0,
>(
  x: number,
  precision = 1e-12,
  maxIterations: If<And<IsSafeInt<MaxIT>, IsPositive<MaxIT>>, MaxIT, never> =
    1e2 as never,
  minItarations: uint<MinIT> = 0 as never,
) {
  if (
    !(Number.isSafeInteger(maxIterations) &&
      Number.isSafeInteger(minItarations) && maxIterations > minItarations)
  ) {
    throw new UnsafeNumber("Iterations range error");
  }
  if (x === 0) {
    return 0;
  }
  if (Number.isNaN(x)) {
    return NaN;
  }
  if (x < xmin) {
    return NaN;
  }
  let w = 0;
  let itarationsLeft: number = maxIterations;
  const minIterationMustLeft = maxIterations - minItarations;
  while (itarationsLeft--) {
    const expW = Math.exp(w);
    const wEpxW = w * expW;
    const wPlus1ExpW = wEpxW + expW;
    const wEpxWMinusX = wEpxW - x;
    w -= wEpxWMinusX / (wPlus1ExpW - (w + 2) * wEpxWMinusX / (w * 2 + 2));
    if (
      minIterationMustLeft > itarationsLeft &&
      Math.abs(wEpxWMinusX / wPlus1ExpW) < precision
    ) {
      return w;
    }
  }
  throw new TooLongExecution(w, null, {
    x,
    precision,
    maxIterations,
    minItarations,
  });
}

export function ssrt<
  const MaxIT extends number = 10000,
  const MinIT extends number = 0,
>(
  x: number,
  Wprec = 1e-12,
  maxIterations: If<And<IsSafeInt<MaxIT>, IsPositive<MaxIT>>, MaxIT, never> =
    100000000 as never,
  minItarations: uint<MinIT> = 0 as never,
): number {
  if (
    !(Number.isSafeInteger(maxIterations) &&
      Number.isSafeInteger(minItarations) && maxIterations > minItarations)
  ) {
    throw new UnsafeNumber("Iterations range error");
  }
  if (x === 1) {
    return 1;
  }
  const logx = Math.log(x);
  try {
    return logx / lambertW(logx, Wprec, maxIterations, minItarations);
  } catch (e) {
    console.error(`x = ${x}`);
    throw e;
  }
}

export const numberToBigInt64Representation = (num: number) =>
  Number.isSafeInteger(num)
    ? BigInt(num)
    : new BigUint64Array(Float64Array.of(num).buffer)[0];

export function numberFromBigInt64Representation(val: bigint) {
  const num = Number(val);
  if (Number.isSafeInteger(num)) {
    return num;
  }
  return new Float64Array(BigUint64Array.of(val).buffer)[0];
}

export const bigInt64ToHex = (val: bigint) => val.toString(16).padStart(16, "0");

export const bigInt64FromHex = (hex: string) => BigInt("0x" + hex);

export const numberToHex = (num: number) =>
  bigInt64ToHex(numberToBigInt64Representation(num));

export const numberFromHex = (hex: string) =>
  numberFromBigInt64Representation(bigInt64FromHex(hex));

export const nearlyEquals = (a: number, b: number, precision = 1e-6) =>
  Math.abs(a - b) <= precision;
export const hasFlag = <F extends number | bigint>(v: F, f: F) => (v & f) === f;
