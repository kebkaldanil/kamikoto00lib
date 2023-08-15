import { ArrayAsString, ArrayConvertableToString } from "./array.ts";
import { Method } from "./object.ts";
import {
  _Extends,
  And,
  Extends,
  ExtendsAnyInUnion,
  If,
  IfElse,
  IsFalse,
} from "../type-logic.ts";

/**except symbol*/
export type primitive<T extends null | false = false> =
  | If<Extends<T, null>, undefined | null>
  | boolean
  | number
  | string
  | bigint;
/**
 * convert one type to enother
 * @example let a: As<5, string | bigint | boolean>; //a: "5" | 5n | true
 */
export type As<T, A> = A extends A ? T extends T ?
      & IfElse<
        [
          [_Extends<unknown, T>, A],
          [_Extends<T, A>, T],
          [_Extends<A, undefined>, undefined],
          [_Extends<A, boolean>, _AsBoolean<T>],
          [_Extends<A, number>, _AsNumber<T>],
          [_Extends<A, bigint>, _AsBigInt<T>],
          [_Extends<A, string>, _AsString<T>],
          [_Extends<[T, A], [0 | 0n | false | "" | [], null]>, null],
        ],
        T /*, T extends primitive ? A extends primitive ? _PrimitiveAs<T, A> : never : never*/
      >
      & A
  : never
  : never;

type _PrimitiveAs<T extends primitive<null>, A extends primitive<null>> = `${T}` extends
  `${infer R extends A}` ? R : never;

type _AsBoolean<T> = IfElse<[
  [_Extends<T, 0 | 0n | "" | null | undefined>, false],
  [ExtendsAnyInUnion<primitive, T>, boolean],
], T extends readonly unknown[] ? _ArrayAsBoolean<T> : true>;

type _ArrayAsBoolean<T extends readonly unknown[]> = IfElse<[
  [_Extends<T["length"], 0>, false],
  [_Extends<number, T["length"]>, boolean],
], true>;

type _AsNumber<T> = T extends number ? T
  : T extends 0n | false | "" | null | [] ? 0
  : T extends true ? 1
  : T extends primitive ? _PrimitiveAs<T, number>
  : T extends [infer V] ? _AsNumber<V>
  : never;
type _AsBigInt<T> = T extends bigint ? T
  : T extends 0 | false | "" | null | [] ? 0n
  : T extends true ? 1n
  : T extends primitive ? _PrimitiveAs<T, bigint>
  : T extends [infer V] ? _AsBigInt<V>
  : never;
type _AsString<T> = T extends ArrayConvertableToString ? ArrayAsString<T>
  : T extends primitive<null> ? `${T}`
  : never;

export type Var<T, LeaveTuples extends boolean | "leave tuples" = false> = T extends T
  ? IfElse<[
    [_Extends<T, boolean>, boolean],
    [_Extends<T, number>, number],
    [_Extends<T, bigint>, bigint],
    [_Extends<T, string>, string],
    [
      And<IsFalse<LeaveTuples>, _Extends<T, unknown[]>>,
      T extends (infer I)[] ? Var<I, LeaveTuples>[] : never,
    ],
    [
      _Extends<T, Record<PropertyKey, never>>,
      { -readonly [I in keyof T]: Var<T[I], LeaveTuples> },
    ],
  ], T>
  : never;

export type ForceCompute<T> = T extends primitive<null> ? T
  : T & { [K in keyof T]: ForceCompute<T[K]> };

export type FunctionArguments<T extends Method> = T extends
  ((...args: infer A extends unknown[]) => unknown) ? A : never;

export interface ErrorClass {
  readonly prototype: Error;
  readonly name: string;
}

export type ValueOf<T> = T[keyof T];
