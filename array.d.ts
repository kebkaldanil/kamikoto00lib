import { StrJoin } from "./string";
import { primitive } from "./types";
export declare type Tuple<N extends number, T> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
declare type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N ? R : _TupleOf<T, N, [T, ...R]>;
export declare type ReverseArray<T extends any[]> = T extends [infer C, ...infer Rest] ? [...ReverseArray<Rest>, C] : T;
/**A.length > B.length*/
export declare type IsLengthGreater<A extends any[], B extends any[]> = A extends [any, ...infer RA] ? B extends [any, ...infer RB] ? IsLengthGreater<RA, RB> : true : false;
export declare type ArrayConvertableToString = primitive | ArrayConvertableToString[];
export declare type ArrayAsString<T extends ArrayConvertableToString[]> = T extends any ? `[${StrJoin<{
    [K in keyof T]: T[K] extends ArrayConvertableToString[] ? ArrayAsString<T[K]> : T[K] extends primitive ? T[K] extends string ? `'${T[K]}'` : `${T[K]}` : never;
}, ", ">}]` : never;
export {};
