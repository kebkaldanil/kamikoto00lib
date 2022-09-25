import { primitive } from "./types";
export declare type _Extends<T, E> = T extends E ? true : false;
export declare type Extends<T, E> = IsTrue<_Extends<T, E>>;
export declare type ExtendsAnyInUnion<T, E> = Not<IsFalse<_Extends<T, E>>>;
export declare type SameType<T, E> = And<Extends<T, E>, Extends<E, T>>;
export declare type Intersects<T, E> = Or<ExtendsAnyInUnion<T, E>, ExtendsAnyInUnion<E, T>>;
export declare type If<C extends boolean, T, F = never> = C extends boolean ? C extends true ? T : C extends false ? F : T | F : never;
export declare type Not<T extends boolean> = If<T, false, true>;
export declare type Or<A extends boolean, B extends boolean> = If<A, true, B>;
export declare type And<A extends boolean, B extends boolean> = If<A, B, false>;
export declare type Xor<A extends boolean, B extends boolean> = If<A, Not<B>, B>;
export declare type Nor<A extends boolean, B extends boolean> = If<A, false, Not<B>>;
export declare type Nand<A extends boolean, B extends boolean> = If<A, Not<B>, true>;
export declare type Nxor<A extends boolean, B extends boolean> = If<A, B, Not<B>>;
export declare type IsTrue<T> = (T extends true ? true : false) extends true ? true : false;
export declare type IsFalse<T> = (T extends false ? true : false) extends true ? true : false;
export declare type PrimitiveEquals<T extends primitive, E extends primitive> = And<_Extends<T, E> | _Extends<E, T>, Not<_Extends<primitive, T | E>>>;
declare type IfElseHelper<T, D> = T extends [[infer E extends boolean, infer V], ...infer R] ? If<E, V, IfElseHelper<R, D>> : D;
export declare type IfElse<T extends [boolean, any][], D = never> = number extends T["length"] ? D : IfElseHelper<T, D>;
export declare type Mor<A extends [boolean, ...boolean[]]> = A extends [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]] ? Or<C, Mor<Rest>> : A[0];
export declare type Mand<A extends [boolean, ...boolean[]]> = A extends [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]] ? And<C, Mand<Rest>> : A[0];
export declare type Mxor<A extends [boolean, ...boolean[]]> = A extends [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]] ? Xor<C, Mxor<Rest>> : A[0];
export declare type Mnor<A extends [boolean, ...boolean[]]> = A extends [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]] ? Nor<C, Mnor<Rest>> : A[0];
export declare type Mnand<A extends [boolean, ...boolean[]]> = A extends [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]] ? Nand<C, Mnand<Rest>> : A[0];
export declare type Mnxor<A extends [boolean, ...boolean[]]> = A extends [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]] ? Nxor<C, Mnxor<Rest>> : A[0];
export {};
