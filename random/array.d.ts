import { uint } from "../number";
import { Tuple } from "../array";
export declare type AccesibleType = "number" | "int" | "string" | `string:${string}-${string}` | `number:${number | `-${number}`}-${number}` | `int:${number | `-${number}`}-${number}`;
export declare function of<T extends AccesibleType, L extends number>(type: T, length: uint<L>): Tuple<L, T extends `string${string}` ? string : number>;
export declare function of(type: AccesibleType, length: number): string[] | number[];
