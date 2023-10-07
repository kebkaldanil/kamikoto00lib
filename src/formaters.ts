import { integerOrDefault, padNumberToLength } from "./utils/number.ts";

const timeNumIndexToLen = Object.freeze([2, 2, 2, 3]);

/**
 * tag function for time formatting
 *
 * @example
 * const date = new Date();
 * const hours = date.getHours();
 * const minutes = date.getMinutes();
 * const seconds = date.getSeconds();
 * const milliseconds = date.getMilliseconds();
 * consloe.log(time`${hours}:${minutes}:${seconds}.${milliseconds}`);
 * //"14:28:03"
 */
export function time(strings: TemplateStringsArray, ...params: unknown[]) {
  let res = "";
  let i = 0;
  let nextNumIndex = 1;
  let numLength = timeNumIndexToLen[0];

  while (i < params.length && numLength !== undefined) {
    const param = params[i];
    if (param instanceof Date) {
      res += strings[i++] + formatedTime(param);
      continue;
    }
    const num = integerOrDefault(param, null);
    if (num !== null) {
      res += strings[i] + padNumberToLength(num, numLength);
      numLength = timeNumIndexToLen[nextNumIndex++];
    } else {
      res += strings[i] + param;
    }
    i++;
  }
  while (i < params.length) {
    const param = params[i];
    res += strings[i++] + param;
  }
  return res + strings[i];
}

/**
 * @returns fromated time
 * @example "14:28:03.049"
 */
export function formatedTime(
  date?: Date | string | number | null,
  showMili = false,
) {
  const p = date == null ? new Date() : date instanceof Date ? date : new Date(date);
  if (showMili) {
    return time`${p.getHours()}:${p.getMinutes()}:${p.getSeconds()}.${p.getMilliseconds()}`;
  }
  return time`${p.getHours()}:${p.getMinutes()}:${p.getSeconds()}`;
}
