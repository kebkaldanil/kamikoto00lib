import { _Extends, If, Mand, Not, SameType } from "../type-logic.ts";
import { primitive } from "./helpers.ts";

/** true only if type is exactly string */
export type IsString<T> = SameType<string, T>;

type SplitHelper<Str extends string, Sep extends string, R extends string[]> = If<
  Mand<[_Extends<"", Str>, _Extends<"", Sep>, Not<_Extends<0, R["length"]>>]>,
  R,
  Str extends `${infer C}${Sep}${infer Rest}` ? SplitHelper<Rest, Sep, [...R, C]>
    : [...R, Str]
>;
export type Split<Str extends string, Sep extends string> = SplitHelper<
  Str,
  Sep,
  []
>;

export type StrConcat<T extends [primitive<null>, ...primitive<null>[]]> = T extends [
  infer C extends primitive<null>,
  ...infer R extends [primitive<null>, ...primitive<null>[]],
] ? `${C}${StrConcat<R>}`
  : T[0];

type JoinHelper<
  T extends primitive<null>[],
  S extends primitive<null>,
  R extends string,
> = T extends [infer C extends primitive<null>, ...infer Rest extends primitive<null>[]]
  ? JoinHelper<Rest, S, `${R}${S}${C}`>
  : R;
export type StrJoin<
  T extends primitive<null>[],
  S extends primitive<null> = ",",
> = T extends [infer C extends primitive<null>, ...infer R extends primitive<null>[]]
  ? JoinHelper<R, S, `${C}`>
  : number extends T["length"] ? never
  : "";

export type StrLen<Str extends string> = If<
  IsString<Str>,
  number,
  Split<Str, "">["length"]
>;

export interface StringLike<T extends string = string> {
  toString(): T;
}
