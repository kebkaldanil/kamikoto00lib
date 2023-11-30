import { If } from "../type-logic.ts";
import { primitive } from "./helpers.ts";
import { IsNumber, IsPositive } from "./number.ts";
import { StrJoin } from "./string.ts";

// deno-lint-ignore no-explicit-any
export type AnyArray = readonly any[];

export type Tuple<N extends number, T> = If<
  IsNumber<N>,
  T[],
  N extends N ? If<
      IsPositive<N>,
      `${N}` extends `${infer I extends number}.${string}` | `${infer I extends number}`
        ? TupleHelper<I, T, []>
        : never
    >
    : never
>;
type TupleHelper<N extends number, T, R extends unknown[]> = R["length"] extends N ? R
  : TupleHelper<N, T, [T, ...R]>;

export type ReadonlyTuple<N extends number, T> = If<
  IsNumber<N>,
  readonly T[],
  N extends N ? If<
      IsPositive<N>,
      `${N}` extends `${infer I extends number}.${string}` | `${infer I extends number}`
        ? ReadonlyTupleHelper<I, T, readonly []>
        : never
    >
    : never
>;
//export type ReadonlyTuple<N extends number, T> = number extends N ? readonly T[] : N extends N ? ReadonlyTupleHelper<N, T, readonly []> : never;
type ReadonlyTupleHelper<N extends number, T, R extends readonly unknown[]> =
  R["length"] extends N ? R : ReadonlyTupleHelper<N, T, readonly [T, ...R]>;

export type ReverseArray<T extends unknown[]> = T extends [infer C, ...infer Rest]
  ? [...ReverseArray<Rest>, C]
  : T;
/**A.length > B.length*/
export type IsLengthGreater<A extends unknown[], B extends unknown[]> = A extends
  [unknown, ...infer RA]
  ? B extends [unknown, ...infer RB] ? IsLengthGreater<RA, RB> : true
  : false;

export type ArrayConvertableToString = (primitive<null> | ArrayConvertableToString)[];

export type ArrayAsString<T extends ArrayConvertableToString> = T extends unknown
  ? `[${StrJoin<
    {
      [K in keyof T]: T[K] extends ArrayConvertableToString ? ArrayAsString<T[K]>
        : T[K] extends primitive ? T[K] extends string ? `'${T[K]}'` : `${T[K]}`
        : never;
    },
    ", "
  >}]`
  : never;

export type ArrayPush<T extends readonly unknown[], E> = T extends unknown[] ? [...T, E]
  : readonly [...T, E];
