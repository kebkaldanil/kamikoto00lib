import { uint } from "./number";
/**
 * @param num number to align
 * @param length result length
 * @returns number converted to string aligned by length
 */
export declare function alignNumberToLength<L extends number>(num: number, length: uint<L>): string;
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
export declare function time(strings: TemplateStringsArray, ...params: unknown[]): string;
/**
 * @returns fromated time
 * @example "14:28:03.049"
 */
export declare function formatedTime(date?: Date | string | number | null, showMili?: boolean): string;
