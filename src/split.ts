import { Tuple } from "./array";
import { MinLengthError } from "./errors/min-length";
import { And, Extends, ExtendsAnyInUnion, If, IfElse, Not, Or, SameType, _Extends } from "./type-logic";

type SplitForwardMin<
  Str extends string,
  Sep extends string,
  MinLen extends number,
  MaxLen extends number | null,
  R extends string[] = []
> = If<
  Or<Extends<R["length"], MaxLen>, And<Extends<Str, "">, Not<Extends<R, []>>>>,
  R,
  Str extends `${infer C}${Sep}${infer Rest}` ? SplitForwardMin<Rest, Sep, MinLen, MaxLen, [...R, C]> : [...R, Str]
>;

type SplitForwardMax<
  Str extends string,
  Sep extends string,
  MaxLen extends number | null,
  R extends string[]
> = If<
  Or<Extends<R["length"], MaxLen>, And<Extends<Str, "">, Not<Extends<R, []>>>>,
  R,
  Str extends `${infer C}${Sep}${infer Rest}` ? SplitForwardMax<Rest, Sep, MaxLen, [...R, C]> : [...R, Str]
>;

type SplitForward<
  Str extends string,
  Sep extends string,
  MinLen extends number,
  MaxLen extends number | null,
  R extends string[] = []
> = If<
  Or<Extends<R["length"], MaxLen>, And<Extends<Str, "">, Not<Extends<R, []>>>>,
  R,
  Str extends `${infer C}${Sep}${infer Rest}` ? SplitForward<Rest, Sep, MinLen, MaxLen, [...R, C]> : [...R, Str]
>;

type SplitBackward<
  Str extends string,
  Sep extends string,
  MinLen extends number,
  MaxLen extends number | null,
  R extends any[] = []
> = If<ExtendsAnyInUnion<R["length"], MaxLen>, R, Str extends `${infer Rest}${Sep}${infer C}` ? SplitBackward<Rest, Sep, MinLen, MaxLen, [C, ...R]> : [Str, ...R]>;

/*export*/ type SplitResult<
  Str extends string,
  Sep extends string,
  FromEnd extends boolean,
  MinLen extends number = 0,
  MaxLen extends number | null = null,
> = IfElse<[
  [Or<_Extends<string, Str>, _Extends<string, Sep>>, IfElse<[
    [SameType<MinLen, MaxLen>, Tuple<MinLen, string>],
    [And<SameType<MinLen, 0>, Not<ExtendsAnyInUnion<MaxLen, null>>>, Tuple<Extract<MaxLen, number>, string>],
  ], [...Tuple<MinLen, string>, string[]]>],
  [FromEnd, SplitBackward<Str, Sep, MinLen, MaxLen>],
], SplitForward<Str, Sep, MinLen, MaxLen>>;//If<FromEnd, SplitBackward<Str, Sep, MinLen, MaxLen>, SplitForward<Str, Sep, MinLen, MaxLen>>;

/**
 * @throws RangeError
 * @param str 
 * @param separator 
 * @param options 
 *//*
export function split<
  Str extends string,
  Sep extends string,
  FromEnd extends boolean = false,
  MinLen extends number = 0,
  MaxLen extends number | null = null,
>(
  str: Str,
  separator: Sep,
  options?: {
    fromEnd?: FromEnd | null;
    minLength?: uint<MinLen> | null;
    maxLength?: If<MaxLen extends number ? And<IsPositive<MaxLen>, IsSafeInt<MaxLen>> : true, MaxLen, never>;
  } | null,
): SplitResult<Str, Sep, FromEnd, MinLen, MaxLen>;
*/
export function split(str: string, separator: string, options?: {
  fromEnd?: boolean | null;
  minLength?: number | null;
  maxLength?: number | null;
} | null): string[] {
  if (!options)
    options = {};
  const fromEnd = options.fromEnd ?? false;
  const minLength = options.minLength! > 0 ? Math.round(options.minLength!): 0;
  if (minLength > Number.MAX_SAFE_INTEGER) {
    throw new RangeError(`Min length (${minLength}) can not be more than ${Number.MAX_SAFE_INTEGER}`);
  }
  const maxLength = Math.max(minLength, options.maxLength! >= 0.5 ? Math.round(options.maxLength!) : Infinity);
  str = "" + str;
  if (minLength === 0 && maxLength === null || maxLength === Infinity)
    return String.prototype.split.call(str, separator);
  let i = 0;
  let lastIndex = fromEnd ? str.length : 0;
  const result: string[] = [];
  while(i < maxLength) {
    let separatorIndex: number;
    if (fromEnd) {
      separatorIndex = str.lastIndexOf(separator, lastIndex - 1);
      result[i] = str.slice(separatorIndex + 1, lastIndex);
      lastIndex = separatorIndex;
    } else {
      separatorIndex = str.indexOf(separator, lastIndex);
      result[i] = str.slice(lastIndex, separatorIndex);
      lastIndex = separatorIndex + separator.length;
    }
    if (separatorIndex === -1) {
      result[i] = fromEnd ? str.slice(0, lastIndex) : str.slice(lastIndex);
      if (i + 1 < minLength) {
        throw new MinLengthError(result, minLength);
      }
      break;
    }
    i++;
  }
  return result;
}
