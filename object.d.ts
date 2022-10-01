import { If } from "./type-logic";
import { anykey, As, primitive } from "./types";
export interface Dict<T> {
    [key: string]: T;
}
export declare type Like<T extends object, Stringify extends boolean = false> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K] extends object ? Like<T[K]> : T[K] | If<Stringify, As<Extract<T[K], primitive>, string>>;
};
export declare type JsonCopyAllowed = object | string | number | boolean | any[];
export declare type JsonCopy<T extends JsonCopyAllowed> = {
    [K in Extract<keyof T, string> as T[K] extends (...args: unknown[]) => unknown ? never : K]: T[K] extends object ? JsonCopy<T[K]> : T[K];
};
export declare function jsonCopy<T extends JsonCopyAllowed>(obj: T): JsonCopy<T>;
export declare function computePropertyOnce<T extends object, K extends anykey, N>(obj: T, key: K, compute: () => N): asserts obj is T & Record<K, N>;
export declare type Getters<T extends object> = {
    [Key in keyof T]: () => T[Key];
};
export declare function extendsObjectWithOnceComputedProperties<T extends object, R extends object>(obj: T, compute: Getters<R>): asserts obj is T & R;
export declare function mapDict<K extends anykey, TS, TD>(src: Record<K, TS>, cb: (key: Extract<string, K>, value: TS) => TD): Record<Extract<string, K>, TD>;
export declare function swapKeyAndValue<T extends Record<string, S>, S extends string | number>(object: T): { -readonly [K in keyof T as T[K]]: K; };
export declare function swapKeyAndValueFromEnd<T extends Record<string, S>, S extends string | number>(object: T): { [K in keyof T as T[K]]: K; };
export declare type MapToArrayProcessor<sourceT, resultT, allowBooleanT extends boolean = false, emptyIsErrorT extends boolean = false> = (el: sourceT) => ([
    anykey,
    resultT
] | ((allowBooleanT extends true ? [anykey] | anykey : never)) | (emptyIsErrorT extends true ? void : never));
export interface MapArrayToObjectOptions<sourceT, resultT, allowBooleanT extends boolean = false, emptyIsErrorT extends boolean = false, toManyIsErrorT extends boolean = false> {
    processor?: MapToArrayProcessor<sourceT, resultT, allowBooleanT, emptyIsErrorT>;
    allowBooleanIfOnlyKey?: allowBooleanT;
    emptyIsError?: emptyIsErrorT;
    throwIfError?: boolean;
    toManyIsError?: toManyIsErrorT;
}
export declare type MapArrayToObjectResult<resultT, allowBooleanT> = Dict<resultT | (allowBooleanT extends true ? boolean : never)>;
export declare function mapArrayToObject<sourceT, resultT, allowBooleanT extends boolean = false, emptyIsErrorT extends boolean = false, toManyIsErrorT extends boolean = false>(array: sourceT[], options?: MapArrayToObjectOptions<sourceT, resultT, allowBooleanT, emptyIsErrorT, toManyIsErrorT>): MapArrayToObjectResult<resultT, allowBooleanT>;
