import { primitive } from "./types/helpers.ts";

export type _Extends<T, E> = T extends E ? true : false;
export type Extends<T, E> = IsTrue<_Extends<T, E>>;
export type ExtendsAnyInUnion<T, E> = Not<IsFalse<_Extends<T, E>>>;
export type SameType<T, E> = And<Extends<T, E>, Extends<E, T>>;
export type Intersects<T, E> = Or<
  ExtendsAnyInUnion<T, E>,
  ExtendsAnyInUnion<E, T>
>;

export type If<C, T, F = never> = C extends boolean
  ? C extends true ? T : C extends false ? F : T | F
  : never;
export type Not<T> = If<T, false, true>;
export type Or<A, B> = If<A, true, B>;
export type And<A, B> = If<A, B, false>;
export type Xor<A, B> = If<A, Not<B>, B>;
export type Nor<A, B> = If<A, false, Not<B>>;
export type Nand<A, B> = If<A, Not<B>, true>;
export type Nxor<A, B> = If<A, B, Not<B>>;
export type IsTrue<T> = (T extends true ? true : false) extends true ? true
  : false;
export type IsFalse<T> = (T extends false ? true : false) extends true ? true
  : false;

export type PrimitiveEquals<T, E> = If<
  Intersects<T, E>,
  If<
    ExtendsAnyInUnion<primitive<null>, T | E>,
    boolean,
    _Extends<T, E> | _Extends<E, T>
  >,
  false
>;

type IfElseHelper<T, D> = T extends [[infer E extends boolean, infer V], ...infer R]
  ? If<E, V, IfElseHelper<R, D>>
  : D;
export type IfElse<T extends [unknown, unknown][], D = never> = number extends T["length"]
  ? D
  : IfElseHelper<T, D>;

export type Mor<A extends [unknown, ...unknown[]]> = A extends
  [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]]
  ? Or<C, Mor<Rest>>
  : A[0];
export type Mand<A extends [unknown, ...unknown[]]> = A extends
  [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]]
  ? And<C, Mand<Rest>>
  : A[0];
export type Mxor<A extends [unknown, ...unknown[]]> = A extends
  [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]]
  ? Xor<C, Mxor<Rest>>
  : A[0];
export type Mnor<A extends [unknown, ...unknown[]]> = A extends
  [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]]
  ? Nor<C, Mnor<Rest>>
  : A[0];
export type Mnand<A extends [unknown, ...unknown[]]> = A extends
  [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]]
  ? Nand<C, Mnand<Rest>>
  : A[0];
export type Mnxor<A extends [unknown, ...unknown[]]> = A extends
  [infer C extends boolean, ...infer Rest extends [boolean, ...boolean[]]]
  ? Nxor<C, Mnxor<Rest>>
  : A[0];
