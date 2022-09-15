import { If, Mand, Not, _Extends } from "./type-logic";
import { primitive } from "./types";

export * from "./split";

type SplitHelper<Str extends string, Sep extends string, R extends string[]> = If<Mand<[_Extends<"", Str>, _Extends<"", Sep>, Not<_Extends<0, R["length"]>>]>, R, Str extends `${infer C}${Sep}${infer Rest}` ? SplitHelper<Rest, Sep, [...R, C]> : [...R, Str]>;
export type Split<Str extends string, Sep extends string> = SplitHelper<Str, Sep, []>;

export type StrConcat<T extends [primitive, ...primitive[]]> = T extends [infer C extends primitive, ...infer R extends [primitive, ...primitive[]]] ? `${C}${StrConcat<R>}` : T[0];

type JoinHelper<T extends primitive[], S extends primitive, R extends string> = T extends [infer C extends primitive, ...infer Rest extends primitive[]] ? JoinHelper<Rest, S, `${R}${S}${C}`> : R;
export type StrJoin<T extends primitive[], S extends primitive = ","> = T extends [infer C extends primitive, ...infer R extends primitive[]] ? JoinHelper<R, S, `${C}`> : number extends T["length"] ? never : "";

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
