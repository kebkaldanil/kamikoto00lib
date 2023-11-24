import { ParseError } from "../errors/parse.ts";
import { Tuple } from "../types/array.ts";
import { uint } from "../types/number.ts";
import { split } from "../utils/string.ts";
import { int, number, string } from "./index.ts";

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
        result[i] = int.inRange(from, to + 1);
      }
      return result;
    }
    case "string": {
      const result: string[] = [];
      for (let i = 0; i < length; i++) {
        let minLen = fromAsString?.length || 0;
        let maxLen = toAsString.length;
        if (minLen > maxLen) {
          const t = minLen;
          minLen = maxLen;
          maxLen = t;
        }
        const len = int.inRange(minLen, maxLen + 1);
        result[i] = string(len, fromAsString || "", toAsString);
      }
      return result;
    }
  }
  throw new ParseError(
    `Unexpected "${gtype}" in ${type}; number | int | string expected`,
  );
}
