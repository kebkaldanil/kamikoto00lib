import { IsLengthGreater } from "./array";
import { Split } from "./string";
import { And, Extends, ExtendsAnyInUnion, If, IfElse, IsFalse, IsTrue, Nor, Not, Or, SameType, _Extends } from "./type-logic";
import { As, ForceCompute } from "./types";
export declare type TryParseNumber<T extends string> = T extends `${infer N extends number}` ? N : never;
export declare type ParseNumber<T extends string, E = never> = If<Extends<T, `${TryParseNumber<T>}`>, TryParseNumber<T>, E>;
export declare type TryParseBigInt<T extends string> = T extends `${infer N extends bigint}` ? N : never;
export declare type ParseBigInt<T extends string, E = never> = If<Extends<T, `${TryParseBigInt<T>}`>, TryParseBigInt<T>, E>;
export declare type SmallFloatNumberStr = `${number}.${number}` | `${number}e-${number}`;
export declare type FloatNumberStr = `${number}.${number}` | `${number}e${"+" | "-"}${number}`;
export declare type IsNumber<T> = _Extends<number, T>;
export declare type IsBigInt<T> = _Extends<bigint, T>;
export declare type IsNotNegative<T extends number | bigint | string> = IsFalse<ExtendsAnyInUnion<`${T}`, `-${number}`>>;
export declare type IsPositive<T extends number | bigint | string> = IsFalse<ExtendsAnyInUnion<`${T}`, `-${number}` | "0">>;
export declare type IsNotPositive<T extends number | bigint | string> = Or<IsNumber<T>, IsTrue<ExtendsAnyInUnion<`${T}`, `-${number}` | "0">>>;
export declare type IsNegative<T extends number | bigint | string> = Or<IsNumber<T>, IsTrue<ExtendsAnyInUnion<`${T}`, `-${number}`>>>;
export declare type IsInt<T extends string | number> = Not<IsSmallFloat<T>>;
export declare type IsSafeInt<T extends string | number> = Not<IsFloat<T>>;
export declare type IsSmallFloat<T extends string | number> = _Extends<`${T}`, SmallFloatNumberStr>;
export declare type IsFloat<T extends string | number> = _Extends<`${T}`, FloatNumberStr>;
export declare type int<T extends string | number> = If<IsSafeInt<T>, T, never>;
export declare type uint<T extends string | number> = If<And<IsSafeInt<T>, IsNotNegative<T>>, T, never>;
export declare type IsOdd<T extends number | bigint> = IsTrue<T extends any ? IfElse<[
    [
        Or<IsNumber<T>, IsBigInt<T>>,
        true
    ],
    [
        Nor<_Extends<T, bigint>, IsSafeInt<Extract<T, number>>>,
        false
    ]
], Extends<`${T}`, `${number | ""}${1 | 3 | 5 | 7 | 9}`>> : never>;
export declare type IsEven<T extends number | bigint> = IsTrue<T extends any ? IfElse<[
    [
        Or<IsNumber<T>, IsBigInt<T>>,
        true
    ],
    [
        Nor<_Extends<T, bigint>, IsSafeInt<Extract<T, number>>>,
        false
    ]
], Extends<`${T}`, `${number | ""}${0 | 2 | 4 | 6 | 8}`>> : never>;
export declare type DeassambleNumber<T extends number> = ForceCompute<_DeassambleNumber_ParseSign<T> & {
    value: T;
}>;
declare type _DeassambleNumber_ParseSign<T extends number> = `${T}` extends `-${infer A extends number}` ? {
    sign: "-";
    absoluteValue: A;
} & _DeassambleNumber_FindExponent<A, "-"> : {
    sign: "+";
    absoluteValue: T;
} & _DeassambleNumber_FindExponent<T, "+">;
declare type _DeassambleNumber_FindExponent<T extends number, S extends "+" | "-"> = `${T}` extends `${infer M extends number}e${infer Exp}` ? _DeassambleNumber_ParseMain<M, S> & _DeassambleNumber_ParseExponent<Exp> : _DeassambleNumber_ParseMain<T, S> & {
    exponent: false;
};
declare type _DeassambleNumber_ParseExponent<T extends string> = `${T}` extends `${infer ExpSign extends "+" | "-"}${infer ExpValue extends number}` ? {
    exponent: {
        sign: ExpSign;
        value: If<_Extends<ExpSign, "-">, T, ExpValue>;
        absoluteValue: ExpValue;
    };
} : never;
declare type _DeassambleNumber_ParseMain<T extends number, S extends "+" | "-"> = (`${T}` extends `${infer Int extends number}.${infer FractionalPart}` ? {
    mainPart: {
        integerPart: {
            absolute: Int;
            value: S extends "-" ? TryParseNumber<`-${Int}`> : Int;
        };
        fractionalPart: FractionalPart;
    };
} : {
    mainPart: {
        integerPart: {
            absolute: T;
            value: S extends "-" ? TryParseNumber<`-${T}`> : T;
        };
        fractionalPart: false;
    };
}) & {
    mainPart: {
        absolute: T;
        value: S extends "-" ? TryParseNumber<`-${T}`> : T;
    };
};
export declare type Floor<T extends number> = `${T}` extends `${infer I extends number}.${number}` ? I : never;
export declare type _Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export declare type DigitChar = `${_Digit}`;
export declare type Digit = _Digit | DigitChar;
export declare type NumberDigits<T extends number | bigint | `${bigint | number}`> = As<Split<`${T}`, "">, DigitChar[]>;
export declare type ZeroToDigitUnion<T extends Digit> = `${[
    0,
    0 | 1,
    0 | 1 | 2,
    0 | 1 | 2 | 3,
    0 | 1 | 2 | 3 | 4,
    0 | 1 | 2 | 3 | 4 | 5,
    0 | 1 | 2 | 3 | 4 | 5 | 6,
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    Digit
][T]}`;
export declare type IsGreaterDigitsArray<A extends Digit[], B extends Digit[]> = A extends [infer CA extends Digit, ...infer RA extends Digit[]] ? B extends [infer CB extends Digit, ...infer RB extends Digit[]] ? If<SameType<CA, CB>, IsGreaterDigitsArray<RA, RB>, Extends<`${CB}`, ZeroToDigitUnion<CA>>> : true : false;
export declare type IsGreaterDigitsArrayInInteger<A extends Digit[], B extends Digit[]> = IfElse<[
    [
        IsLengthGreater<A, B>,
        true
    ],
    [
        IsLengthGreater<B, A>,
        false
    ]
], IsGreaterDigitsArray<A, B>>;
declare type ToIntFuncResult<X extends number, T extends number> = If<IfElse<[
    [
        _Extends<0, T>,
        true
    ],
    [
        _Extends<1, T>,
        IsInt<X>
    ],
    [
        _Extends<2, T>,
        IsEven<X>
    ],
    [
        _Extends<5, T>,
        And<IsSafeInt<X>, _Extends<`${X}`, `${string}${"0" | "5"}`>>
    ],
    [
        _Extends<10, T>,
        And<IsSafeInt<X>, _Extends<`${X}`, `${string}0`>>
    ]
], false>, X, number>;
export declare function round<X extends number, T extends number = 1>(x: X, to?: T): ToIntFuncResult<X, T>;
export declare function ceil<X extends number, T extends number = 1>(x: number, to?: number): ToIntFuncResult<X, T>;
export declare function floor<X extends number, T extends number = 1>(x: number, to?: number): ToIntFuncResult<X, T>;
export declare function numberOrDefault<T, D = 0>(value: T, _default?: D): T extends number ? T : T extends `${infer N extends number}` ? N : string extends T ? number | D : D;
export declare function integerOrDefault<T, D = 0>(value: T, _default: D): T extends number ? If<Or<IsNumber<T>, IsInt<T>>, T, D> : T extends bigint ? number : D;
export declare function lambertW<MaxIT extends number = 1e2, MinIT extends number = 0>(x: number, precision?: number, maxIterations?: If<And<IsSafeInt<MaxIT>, IsPositive<MaxIT>>, MaxIT, never>, minItarations?: uint<MinIT>): number;
export declare function ssrt<MaxIT extends number = 10000, MinIT extends number = 0>(x: number, Wprec?: number, maxIterations?: If<And<IsSafeInt<MaxIT>, IsPositive<MaxIT>>, MaxIT, never>, minItarations?: uint<MinIT>): number;
export {};
