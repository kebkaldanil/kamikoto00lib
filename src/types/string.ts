import { _Extends,If,Mand,Not } from "../type-logic.ts";
import { primitive } from "./helpers.ts";

export * from "../split.ts";

/** true only if type is exactly string */
export type IsString<T> = _Extends<string, T>;

type SplitHelper<Str extends string, Sep extends string, R extends string[]> = If<Mand<[_Extends<"", Str>, _Extends<"", Sep>, Not<_Extends<0, R["length"]>>]>, R, Str extends `${infer C}${Sep}${infer Rest}` ? SplitHelper<Rest, Sep, [...R, C]> : [...R, Str]>;
export type Split<Str extends string, Sep extends string> = SplitHelper<Str, Sep, []>;

export type StrConcat<T extends [primitive<null>, ...primitive<null>[]]> = T extends [infer C extends primitive<null>, ...infer R extends [primitive<null>, ...primitive<null>[]]] ? `${C}${StrConcat<R>}` : T[0];

type JoinHelper<T extends primitive<null>[], S extends primitive<null>, R extends string> = T extends [infer C extends primitive<null>, ...infer Rest extends primitive<null>[]] ? JoinHelper<Rest, S, `${R}${S}${C}`> : R;
export type StrJoin<T extends primitive<null>[], S extends primitive<null> = ","> = T extends [infer C extends primitive<null>, ...infer R extends primitive<null>[]] ? JoinHelper<R, S, `${C}`> : number extends T["length"] ? never : "";

export function splice(to: string, position: number, length: number, str = "") {
  const firstToPart = to.slice(0, position);
  const lastToPart = to.slice(position + length);
  return firstToPart + str + lastToPart;
}

export function substrAfter(str: string, after: string) {
  const index = str.indexOf(after);
  if (index === -1) {
    return null;
  }
  return str.slice(index + after.length);
}

export function substrAfterLast(str: string, after: string) {
  const index = str.lastIndexOf(after);
  if (index === -1) {
    return null;
  }
  return str.slice(index + after.length);
}

export function countOccurrences(str: string, part: string) {
  let counter = -1;
  let index = str.indexOf(part);
  while (index !== -1) {
    index = str.indexOf(part, index + 1);
    counter++;
  }
  return counter;
}
