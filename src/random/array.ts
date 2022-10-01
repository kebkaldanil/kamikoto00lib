import * as number from "./number";
import * as int from "./int";
import { split } from "../split";
import { uint } from "../number";
import { Tuple } from "../array";

export type AccesibleType = "number" | "int" | "string" | `string:${string}-${string}` | `number:${number | `-${number}`}-${number}` | `int:${number | `-${number}`}-${number}`;

export function of<T extends AccesibleType, L extends number>(type: T, length: uint<L>): Tuple<L, T extends `string${string}` ? string : number>;
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
      const result = <number[]>[];
      //@ts-expect-error
      const from = +fromAsString || 0;
      const to = +(toAsString ?? 1);
      for (let i = 0; i < length; i++) {
        result[i] = number.inRange(from, to);
      }
      return result;
    }
    case "int": {
      const result = <number[]>[];
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
      const result = <string[]>[];
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
        defaultFrom = 97;//a
      }
      let defaultTo = 0;
      for (let i = 0; i < fromAsString.length; i++) {
        const cur = fromAsString.codePointAt(0)!;
        if (cur > defaultTo) {
          defaultTo = cur;
        }
      }
      if (toAsString === undefined) {                   //z
        toAsString = String.fromCodePoint(defaultTo || 122).repeat(Math.max(fromAsString.length, 1));
      }
      for (let i = 0; i < length; i++) {
        const length = int.inRange(fromAsString.length || 1, toAsString.length + 1);
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
  throw new Error();
};
  /*,
} as {
of(
  type: "number" | "int" | `number:${number}-${number}` | `int:${number}-${number}`,
  length: number
): number[];
of(
  type: `string:${string}-${string}`,
  length: number
): string[];
};*/
