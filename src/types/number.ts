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
export type IsNumber<T> = SameType<number, T>;
/** true only if type is exactly bigint */
export type IsBigInt<T> = SameType<bigint, T>;

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

export interface NumberLike<T extends number | bigint = number> {
  valueOf(): T;
}
