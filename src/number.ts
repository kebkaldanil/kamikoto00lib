import { IsLengthGreater } from "./array";
import { TooLongExecution, UnsafeNumber } from "./errors";
import { Split } from "./string";
import { And, Extends, ExtendsAnyInUnion, If, IfElse, IsFalse, IsTrue, Mnor, Nor, Not, Or, SameType, _Extends } from "./type-logic";
import { As, ForceCompute } from "./types";

export type TryParseNumber<T extends string> = T extends `${infer N extends number}` ? N : never;
export type ParseNumber<T extends string, E = never> = If<Extends<T, `${TryParseNumber<T>}`>, TryParseNumber<T>, E>;

export type TryParseBigInt<T extends string> = T extends `${infer N extends bigint}` ? N : never;
export type ParseBigInt<T extends string, E = never> = If<Extends<T, `${TryParseBigInt<T>}`>, TryParseBigInt<T>, E>;

export type SmallFloatNumberStr = `${number}.${number}` | `${number}e-${number}`;
export type FloatNumberStr = `${number}.${number}` | `${number}e${"+" | "-"}${number}`;

export type IsNumber<T> = _Extends<number, T>;
export type IsBigInt<T> = _Extends<bigint, T>;

export type IsNotNegative<T extends number | bigint | string> = IsFalse<ExtendsAnyInUnion<`${T}`, `-${number}`>>;
export type IsPositive<T extends number | bigint | string> = IsFalse<ExtendsAnyInUnion<`${T}`, `-${number}` | "0">>;
export type IsNotPositive<T extends number | bigint | string> = Or<IsNumber<T>, IsTrue<ExtendsAnyInUnion<`${T}`, `-${number}` | "0">>>;
export type IsNegative<T extends number | bigint | string> = Or<IsNumber<T>, IsTrue<ExtendsAnyInUnion<`${T}`, `-${number}`>>>;

export type IsInt<T extends string | number> = Not<IsSmallFloat<T>>;//IsFalse<ExtendsAnyInUnion<`${T}`, SmallFloatNumberStr>>;
export type IsSafeInt<T extends string | number> = Not<IsFloat<T>>;//IsFalse<ExtendsAnyInUnion<`${T}`, FloatNumberStr>>;
export type IsSmallFloat<T extends string | number> = _Extends<`${T}`, SmallFloatNumberStr>;//Or<IsNumber<T>, Not<IsInt<T>>>;
export type IsFloat<T extends string | number> = _Extends<`${T}`, FloatNumberStr>;//Or<IsNumber<T>, Not<IsSafeInt<T>>>;

export type int<T extends string | number> = If<IsSafeInt<T>, T, never>;
export type uint<T extends string | number> = If<And<IsSafeInt<T>, IsNotNegative<T>>, T, never>;

export type IsOdd<T extends number | bigint> = IsTrue<T extends any ? IfElse<[
  [Or<IsNumber<T>, IsBigInt<T>>, true],
  [Nor<_Extends<T, bigint>, IsSafeInt<Extract<T, number>>>, false],
], Extends<`${T}`, `${number | ""}${1 | 3 | 5 | 7 | 9}`>> : never>;

export type IsEven<T extends number | bigint> = IsTrue<T extends any ? IfElse<[
  [Or<IsNumber<T>, IsBigInt<T>>, true],
  [Nor<_Extends<T, bigint>, IsSafeInt<Extract<T, number>>>, false],
], Extends<`${T}`, `${number | ""}${0 | 2 | 4 | 6 | 8}`>> : never>;

export type DeassambleNumber<T extends number> = ForceCompute<_DeassambleNumber_ParseSign<T> & { value: T }>;

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

export type Floor<T extends number> = `${T}` extends `${infer I extends number}.${number}` ? I : never;

export type _Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type DigitChar = `${_Digit}`;
export type Digit = _Digit | DigitChar;
export type NumberDigits<T extends number | bigint | `${bigint | number}`> = As<Split<`${T}`, "">, DigitChar[]>;
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
  Digit,
][T]}`;

export type IsGreaterDigitsArray<A extends Digit[], B extends Digit[]> = A extends [infer CA extends Digit, ...infer RA extends Digit[]] ?
  B extends [infer CB extends Digit, ...infer RB extends Digit[]] ?
  If<SameType<CA, CB>, IsGreaterDigitsArray<RA, RB>, Extends<`${CB}`, ZeroToDigitUnion<CA>>>
  : true : false;
export type IsGreaterDigitsArrayInInteger<A extends Digit[], B extends Digit[]> = IfElse<[
  [IsLengthGreater<A, B>, true],
  [IsLengthGreater<B, A>, false],
], IsGreaterDigitsArray<A, B>>;

type ToIntFuncResult<X extends number, T extends number> = If<
  IfElse<[
    [_Extends<0, T>, true],
    [_Extends<1, T>, IsInt<X>],
    [_Extends<2, T>, IsEven<X>],
    [_Extends<5, T>, And<IsSafeInt<X>, _Extends<`${X}`, `${string}${"0" | "5"}`>>],
    [_Extends<10, T>, And<IsSafeInt<X>, _Extends<`${X}`, `${string}0`>>],
  ], false>,
  X,
  number
>;

export function round<X extends number, T extends number = 1>(x: X, to: T = 1 as any): ToIntFuncResult<X, T> {
  if (!to) {
    return x as any;
  }
  return Math.round(x / to) * to as any;
}

export function ceil<X extends number, T extends number = 1>(x: number, to = 1): ToIntFuncResult<X, T> {
  if (!to) {
    return x as any;
  }
  return Math.ceil(x / to) * to as any;
}

export function floor<X extends number, T extends number = 1>(x: number, to = 1): ToIntFuncResult<X, T> {
  if (!to) {
    return x as any;
  }
  return Math.floor(x / to) * to as any;
}

export function numberOrDefault<T, D = 0>(value: T, _default: D = 0 as any): T extends number ? T : T extends `${infer N extends number}` ? N : string extends T ? number | D : D {
  const num = Number(value);
  return num || num === 0 ? num : _default as any;
}

export function integerOrDefault<T, D = 0>(value: T, _default: D): T extends number ? If<Or<IsNumber<T>, IsInt<T>>, T, D> : T extends bigint ? number : D;
export function integerOrDefault(value: any, _default = 0) {
  typeof value === "bigint" ? Number(value) : Number.isSafeInteger(value) ? value : _default;
}


export function lambertW<MaxIT extends number = 100000000, MinIT extends number = 0>(
  x: number,
  precision = 1e-12,
  maxIterations: If<And<IsSafeInt<MaxIT>, IsPositive<MaxIT>>, MaxIT, never> = 100000000 as any,
  minItarations: uint<MinIT> = 0 as any
) {
  if (!(Number.isSafeInteger(maxIterations) && Number.isSafeInteger(minItarations) && maxIterations > minItarations)) {
    throw new UnsafeNumber("Iterations range error");
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
    if (minIterationMustLeft > itarationsLeft && Math.abs(wEpxWMinusX / wPlus1ExpW) < precision) {
      return w;
    }
  }
  throw new TooLongExecution(w, null, { x, precision, maxIterations, minItarations });
}

/* Slower, worse precision
export function ssrt1<MaxIT extends number = 10000, MinIT extends number = 0>(
  x: number,
  Wprec: number = 0.001,
  maxIterations: If<And<IsSafeInt<MaxIT>, IsPositive<MaxIT>>, MaxIT, never> = 10000 as any,
  minItarations: uint<MinIT> = 0 as any
) {
  if (!(Number.isSafeInteger(maxIterations) && Number.isSafeInteger(minItarations) && maxIterations > minItarations)) {
    throw new UnsafeNumber("Iterations range error");
  }
  return Math.exp(lambertW(Math.log(x), Wprec, maxIterations, minItarations));
}*/

export function ssrt<MaxIT extends number = 100000000, MinIT extends number = 0>(
  x: number,
  Wprec: number = 0.001,
  maxIterations: If<And<IsSafeInt<MaxIT>, IsPositive<MaxIT>>, MaxIT, never> = 100000000 as any,
  minItarations: uint<MinIT> = 0 as any
) {
  if (!(Number.isSafeInteger(maxIterations) && Number.isSafeInteger(minItarations) && maxIterations > minItarations)) {
    throw new UnsafeNumber("Iterations range error");
  }
  if (x === 1) {
    return 1;
  }
  const logx = Math.log(x);
  return logx / lambertW(logx, Wprec, maxIterations, minItarations);
}
