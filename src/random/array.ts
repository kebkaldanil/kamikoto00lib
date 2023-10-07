import { ParseError } from "../errors/parse.ts";
import { Tuple } from "../types/array.ts";
import { uint } from "../types/number.ts";
import { split } from "../utils/string.ts";
import { int, number } from "./index.ts";

export type AccesibleType =
  | "number"
  | "int"
  | "string"
  | `string:${string}-${string}`
  | `number:${number | `-${number}`}-${number}`
  | `int:${number | `-${number}`}-${number}`;

export function of<const T extends AccesibleType, const L extends number>(
  type: T,
  length: uint<L>,
): Tuple<L, T extends `string${string}` ? string : number>;
export function of(type: AccesibleType, length: number): string[] | number[];

export function of(type: AccesibleType, length: number) {
  const [gtype, srange] = split(type, ":", { minLength: 1, maxLength: 2 });
  const srangeDeli = srange?.indexOf("-", 1);
  let fromAsString: string | undefined;
  let toAsString: string;
  if (srangeDeli !== void 0 && srangeDeli !== -1) {
    fromAsString = srange.slice(0, srangeDeli);
    toAsString = srange.slice(srangeDeli + 1);
  } else {
    toAsString = srange;
  }
  switch (gtype) {
    case "number": {
      const result: number[] = [];
      const from = +fromAsString! || 0;
      const to = +(toAsString ?? 1);
      for (let i = 0; i < length; i++) {
        result[i] = number.inRange(from, to);
      }
      return result;
    }
    case "int": {
      const result: number[] = [];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /**@ts-ignore */
      const from = fromAsString | 0;
      const to = +(toAsString ?? Number.MAX_SAFE_INTEGER);
      for (let i = 0; i < length; i++) {
        result[i] = int.inRange(from, to);
      }
      return result;
    }
    case "string": {
      const result: string[] = [];
      if (fromAsString === undefined) {
        fromAsString = "";
      }
      let defaultFrom = NaN;
      for (let i = 0; i < fromAsString.length; i++) {
        const cur = fromAsString.codePointAt(0)!;
        if (cur < defaultFrom) {
          defaultFrom = cur;
        }
      }
      if (Number.isNaN(defaultFrom)) {
        defaultFrom = 97; //a
      }
      let defaultTo = 0;
      for (let i = 0; i < fromAsString.length; i++) {
        const cur = fromAsString.codePointAt(0)!;
        if (cur > defaultTo) {
          defaultTo = cur;
        }
      }
      if (toAsString === undefined) { //z
        toAsString = String.fromCodePoint(defaultTo || 122).repeat(
          Math.max(fromAsString.length, 1),
        );
      }
      for (let i = 0; i < length; i++) {
        const length = int.inRange(
          fromAsString.length || 1,
          toAsString.length + 1,
        );
        let str = "";
        for (let stri = 0; stri < length; stri++) {
          str += String.fromCodePoint(
            int.inRange(
              fromAsString.codePointAt(stri) || defaultFrom,
              toAsString.codePointAt(stri) || defaultTo,
            ),
          );
        }
        result[i] = str;
      }
      return result;
    }
  }
  throw new ParseError(
    `Unexpected "${gtype}" in ${type}; number | int | string expected`,
  );
}
