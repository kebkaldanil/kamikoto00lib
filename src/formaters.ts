import { uint } from "./number";

const nulls = "000000000000";

/**
 * @param num number to align
 * @param length result length
 * @returns number converted to string aligned by length
 */
export function alignNumberToLength<L extends number>(num: number, length: uint<L>) {
  const bs = "" + Math.trunc(num);
  return nulls.slice(nulls.length + bs.length - length) + bs;
}

/**
 * tag function for time formatting
 * 
 * @example
 * const date = new Date();
 * const hours = date.getHours();
 * const minutes = date.getMinutes();
 * const seconds = date.getSeconds();
 * consloe.log(time\`${hours}:${minutes}:${seconds}\`);
 * //"14:28:03"
 */
export function time(strings: TemplateStringsArray, ...params: unknown[]) {
  let res = "";
  let i = 0;
  while (i < params.length) {
    const tmp = params[i];
    const num = typeof tmp === "number" ? alignNumberToLength(tmp, 2) : tmp;
    res += strings[i++] + num;
  }
  return res + strings[i];
}

/**
 * @returns fromated time
 * @example "14:28:03.049"
 */
export function formatedTime(date?: Date | string | number | null, showMili = true) {
  const p = (date == null ? new Date() : date instanceof Date ? date : new Date(date));
  const r = time`${p.getHours()}:${p.getMinutes()}:${p.getSeconds()}`;
  return showMili ? r + "." + alignNumberToLength(p.getMilliseconds(), 3) : r;
}
