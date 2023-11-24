import { uint } from "../types/number.ts";
import { inRange } from "./int.ts";

export function string<const L extends number>(length: uint<L>, begin: string, end: string) {
  let r = "";
  const db = begin.length ? begin.codePointAt(begin.length - 1)! : 1;
  const de = end.length ? end.codePointAt(end.length - 1)! : 127;
  for (let i = 0; i < length; i++) {
    let b = begin.codePointAt(i) ?? db;
    let e = end.codePointAt(i) ?? de;
    if (b > e) {
      const t = b;
      b = e;
      e = t;
    }
    r += String.fromCodePoint(inRange(b, e + 1));
  }
  return r;
}
