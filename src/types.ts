import { ArrayAsString, ArrayConvertableToString } from "./array";
import { And, If, IfElse, IsTrue, Not, _Extends } from "./type-logic";

export type anykey = keyof any;
export type primitive = undefined | null | boolean | number | string | bigint;

export type As<T, A> = T extends A ? T : IfElse<[
  [_Extends<A, boolean>, _AsBoolean<T>],
  [_Extends<A, number>, _AsNumber<T>],
  [_Extends<A, bigint>, _AsBigInt<T>],
  [_Extends<A, string>, T extends ArrayConvertableToString[] ? ArrayAsString<T> : T extends primitive ? `${T}` : never],
  [_Extends<[T, A], [0 | 0n | false | "" | [], null]>, null],
], T extends primitive ? A extends primitive ? `${T}` extends `${infer R extends A}` ? R : never : never : never>;

type _PrimitiveAs<T extends primitive, A extends primitive> = `${T}` extends `${infer R extends A}` ? R : never;

type _AsBoolean<T> = IfElse<[
  [_Extends<T, boolean>, T],
  [_Extends<T, 0 | 0n | "" | null | undefined>, false],
], true>;

type _AsNumber<T> = T extends number ? T : T extends 0n | false | "" | null | [] ? 0 : T extends primitive ? _PrimitiveAs<T, number> : T extends [infer V] ? _AsNumber<V> : never;
type _AsBigInt<T> = T extends bigint ? T : T extends 0 | false | "" | null | [] ? 0n : T extends primitive ? _PrimitiveAs<T, bigint> : T extends [infer V] ? _AsBigInt<V> : never;

export type Var<T, LeaveTuple extends boolean = false> = T extends any ? IfElse<[
  [_Extends<T, boolean>, boolean],
  [_Extends<T, number>, number],
  [_Extends<T, bigint>, bigint],
  [_Extends<T, string>, string],
  [And<Not<IsTrue<LeaveTuple>>, _Extends<T, any[]>>, T extends (infer I)[] ? Var<I, LeaveTuple>[] : never],
  [_Extends<T, object>, { -readonly [I in keyof T]: Var<T[I], LeaveTuple> }]
], T> : never;

export type Unnull<T, E = never> = T extends null | undefined ? E : unknown extends T ? E : T;

export type ForseCompute<T> = T extends primitive ? T : { [K in keyof T]: ForseCompute<T[K]> };

export interface ErrorClass {
  new(...args: any[]): Error;
  readonly prototype: Error;
}
