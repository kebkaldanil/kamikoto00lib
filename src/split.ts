import { MinLengthError } from "./errors/min-length.ts";

export function split(str: string, separator: string, options?: {
  fromEnd?: boolean | null;
  minLength?: number | null;
  maxLength?: number | null;
} | null): string[] {
  if (!options)
    options = {};
  const fromEnd = options.fromEnd ?? false;
  const minLength = options.minLength! > 0 ? Math.round(options.minLength!) : 0;
  if (minLength > Number.MAX_SAFE_INTEGER) {
    throw new RangeError(`Min length (${minLength}) can not be more than ${Number.MAX_SAFE_INTEGER}`);
  }
  const maxLength = Math.max(minLength, options.maxLength! >= 0.5 ? Math.round(options.maxLength!) : Infinity);
  str = "" + str;
  if (minLength === 0 && maxLength === null || maxLength === Infinity)
    return String.prototype.split.call(str, separator as never);
  let i = 0;
  let lastIndex = fromEnd ? str.length : 0;
  const result: string[] = [];
  while (i < maxLength - 1) {
    let separatorIndex: number;
    if (fromEnd) {
      separatorIndex = str.lastIndexOf(separator, lastIndex - 1);
      if (separatorIndex !== -1) {
        result[i] = str.slice(separatorIndex + 1, lastIndex);
        lastIndex = separatorIndex;
      }
    } else {
      separatorIndex = str.indexOf(separator, lastIndex);
      if (separatorIndex !== -1) {
        result[i] = str.slice(lastIndex, separatorIndex);
        lastIndex = separatorIndex + separator.length;
      }
    }
    if (separatorIndex === -1) {
      result[i] = fromEnd ? str.slice(0, lastIndex) : str.slice(lastIndex);
      if (i + 1 < minLength) {
        throw new MinLengthError(result, minLength);
      }
      return result;
    }
    i++;
  }
  result[i] = fromEnd ? str.slice(0, lastIndex) : str.slice(lastIndex);
  return result;
}
