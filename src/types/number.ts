import { TooLongExecution, UnsafeNumber } from "../errors/index.ts";
import {
  _Extends,
  And,
  Extends,
  ExtendsAnyInUnion,
  If,
  IfElse,
  IsFalse,
  IsTrue,
  Nor,
  Not,
  Or,
  SameType,
} from "../type-logic.ts";
import { IsLengthGreater } from "./array.ts";
import { As, primitive } from "./helpers.ts";
import { Split } from "./string.ts";

export type TryParseNumber<T extends string> = T extends `${infer N extends number}` ? N
  : never;
export type ParseNumber<T extends string, E = never> = If<
  Extends<T, `${TryParseNumber<T>}`>,
  TryParseNumber<T>,
  E
>;

export type TryParseBigInt<T extends string> = T extends `${infer N extends bigint}` ? N
  : never;
export type ParseBigInt<T extends string, E = never> = If<
  Extends<T, `${TryParseBigInt<T>}`>,
  TryParseBigInt<T>,
  E
>;

export type SmallFloatNumberStr =
  | `${number}.${number}`
  | `${number}e-${number}`;
export type FloatNumberStr =
  | `${number}.${number}`
  | `${number}e${"+" | "-"}${number}`;

/** true only if type is exactly number */
export type IsNumber<T> = _Extends<number, T>;
/** true only if type is exactly bigint */
export type IsBigInt<T> = _Extends<bigint, T>;

export type IsNotNegative<T> = IsFalse<
  ExtendsAnyInUnion<`${T & primitive}`, `-${number}`>
>;
export type IsPositive<T> = IsFalse<
  ExtendsAnyInUnion<`${T & primitive}`, `-${number}` | "0">
>;
export type IsNotPositive<T> = Or<
  IsNumber<T>,
  IsTrue<ExtendsAnyInUnion<`${T & primitive}`, `-${number}` | "0">>
>;
export type IsNegative<T> = Or<
  IsNumber<T>,
  IsTrue<ExtendsAnyInUnion<`${T & primitive}`, `-${number}`>>
>;

export type IsInt<T> = IsFalse<IsSmallFloat<T>>;
export type IsSafeInt<T> = IsFalse<IsFloat<T>>;
export type IsSmallFloat<T> = _Extends<`${T & primitive}`, SmallFloatNumberStr>; //Or<IsNumber<T>, Not<IsInt<T>>>;
export type IsFloat<T> = _Extends<`${T & primitive}`, FloatNumberStr>; //Or<IsNumber<T>, Not<IsSafeInt<T>>>;

export type int<T> = If<IsSafeInt<T>, T>;
export type uint<T> = If<And<IsSafeInt<T>, IsNotNegative<T>>, T>;
export type positive_int<T> = If<And<IsSafeInt<T>, IsPositive<T>>, T>;

export type IsOdd<T> = IsTrue<
  T extends unknown ? IfElse<[
      [Or<IsNumber<T>, IsBigInt<T>>, boolean],
      [Nor<_Extends<T, bigint>, IsSafeInt<Extract<T, number>>>, false],
    ], Extends<`${T & primitive}`, `${number | ""}${1 | 3 | 5 | 7 | 9}`>>
    : never
>;

export type IsEven<T> = IsTrue<
  T extends unknown ? IfElse<[
      [Or<IsNumber<T>, IsBigInt<T>>, boolean],
      [Nor<_Extends<T, bigint>, IsSafeInt<Extract<T, number>>>, false],
    ], Extends<`${T & primitive}`, `${number | ""}${0 | 2 | 4 | 6 | 8}`>>
    : never
>;
/*
export type DeassambleNumber<T extends number> = _DeassambleNumber_ParseSign<T> & { value: T };

type _DeassambleNumber_ParseSign<T extends number> = `${T}` extends `-${infer A extends number}` ?
  { sign: "-", absoluteValue: A } & _DeassambleNumber_FindExponent<A, "-"> :
  { sign: "+", absoluteValue: T } & _DeassambleNumber_FindExponent<T, "+">;

type _DeassambleNumber_FindExponent<T extends number, S extends "+" | "-"> = `${T}` extends `${infer M extends number}e${infer Exp}` ?
  _DeassambleNumber_ParseMain<M, S> & _DeassambleNumber_ParseExponent<Exp> :
  _DeassambleNumber_ParseMain<T, S> & { exponent: false };

type _DeassambleNumber_ParseExponent<T extends string> = `${T}` extends `${infer ExpSign extends "+" | "-"}${infer ExpValue extends number}` ? {
  exponent: {
    sign: ExpSign,
    value: If<_Extends<ExpSign, "-">, T, ExpValue>,
    absoluteValue: ExpValue,
  }
} : never;

type _DeassambleNumber_ParseMain<T extends number, S extends "+" | "-"> = (`${T}` extends `${infer Int extends number}.${infer FractionalPart}` ?
  { mainPart: { integerPart: { absolute: Int, value: S extends "-" ? TryParseNumber<`-${Int}`> : Int }, fractionalPart: FractionalPart } } :
  { mainPart: { integerPart: { absolute: T, value: S extends "-" ? TryParseNumber<`-${T}`> : T }, fractionalPart: false } }) & { mainPart: { absolute: T, value: S extends "-" ? TryParseNumber<`-${T}`> : T } };
*/

export type DigitNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type DigitChar = `${DigitNum}`;
export type DigitBigInt = As<DigitNum, bigint>;
export type Digit = DigitNum | DigitChar | DigitBigInt;
export type NumberDigits<T extends number | bigint | `${bigint | number}`> = Extract<
  Split<`${T}`, "">,
  DigitChar[]
>;
export type ZeroToDigitUnion<T extends Digit> = `${[
  0,
  0 | 1,
  0 | 1 | 2,
  0 | 1 | 2 | 3,
  0 | 1 | 2 | 3 | 4,
  0 | 1 | 2 | 3 | 4 | 5,
  0 | 1 | 2 | 3 | 4 | 5 | 6,
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
  DigitNum,
][As<T, number>]}`;

export type IsGreaterDigitsArray<A extends Digit[], B extends Digit[]> = A extends
  [infer CA extends Digit, ...infer RA extends Digit[]]
  ? B extends [infer CB extends Digit, ...infer RB extends Digit[]] ? If<
      SameType<CA, CB>,
      IsGreaterDigitsArray<RA, RB>,
      Extends<`${CB}`, ZeroToDigitUnion<CA>>
    >
  : true
  : false;
export type IsGreaterDigitsArrayInInteger<
  A extends Digit[],
  B extends Digit[],
> = IfElse<[
  [IsLengthGreater<A, B>, true],
  [IsLengthGreater<B, A>, false],
], IsGreaterDigitsArray<A, B>>;

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
  return str.padStart(Number(length), "0000000000");
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
