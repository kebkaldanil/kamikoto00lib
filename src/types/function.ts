import { AnyArray } from "./array.ts";

export type Method<O = unknown, A extends AnyArray = never[], R = unknown> = (
  this: O,
  ...args: A
) => R;
export type Func<A extends AnyArray = never[], R = unknown> = (
  ...args: A
) => R;
