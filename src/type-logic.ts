import { primitive } from "./types";

export type _Extends<T, E> = T extends E ? true : false;
export type Extends<T, E> = IsTrue<_Extends<T, E>>;
export type ExtendsAnyInUnion<T, E> = Not<IsFalse<_Extends<T, E>>>;
export type SameType<T, E> = And<Extends<T, E>, Extends<E, T>>;
export type Intersects<T, E> = Or<ExtendsAnyInUnion<T, E>, ExtendsAnyInUnion<E, T>>;

export type If<C extends boolean, T, F = never> = C extends boolean ? C extends true ? T : C extends false ? F : T | F : never;
export type Not<T extends boolean> = If<T, false, true>;
export type Or<A extends boolean, B extends boolean> = If<A, true, B>;
export type And<A extends boolean, B extends boolean> = If<A, B, false>;
export type Xor<A extends boolean, B extends boolean> = If<A, Not<B>, B>;
export type Nor<A extends boolean, B extends boolean> = If<A, false, Not<B>>;
export type Nand<A extends boolean, B extends boolean> = If<A, Not<B>, true>;
export type Nxor<A extends boolean, B extends boolean> = If<A, B, Not<B>>;

export type IsTrue<T> = (T extends true ? true : false) extends true ? true : false;
export type IsFalse<T> = (T extends false ? true : false) extends true ? true : false;

export type PrimitiveEquals<T extends primitive, E extends primitive> = And<_Extends<T, E> | _Extends<E, T>, Not<_Extends<primitive, T | E>>>;

type IfElseHelper<T, D> = T extends [[infer E extends boolean, infer V], ...infer R] ? If<E, V, IfElseHelper<R, D>> : D;
export type IfElse<T extends [boolean, any][], D = never> = number extends T["length"] ? D : IfElseHelper<T, D>;

export type Mor<A extends [boolean, ...boolean[]]> = A extends [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]] ? Or<C, Mor<Rest>> : A[0];
export type Mand<A extends [boolean, ...boolean[]]> = A extends [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]] ? And<C, Mand<Rest>> : A[0];
export type Mxor<A extends [boolean, ...boolean[]]> = A extends [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]] ? Xor<C, Mxor<Rest>> : A[0];
export type Mnor<A extends [boolean, ...boolean[]]> = A extends [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]] ? Nor<C, Mnor<Rest>> : A[0];
export type Mnand<A extends [boolean, ...boolean[]]> = A extends [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]] ? Nand<C, Mnand<Rest>> : A[0];
export type Mnxor<A extends [boolean, ...boolean[]]> = A extends [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]] ? Nxor<C, Mnxor<Rest>> : A[0];
