import { AnyArray } from "./array.ts";
import { Func, Method } from "./function.ts";

export interface Dict<T = unknown> {
  [key: string]: T | undefined;
}

export interface ReadonlyDict<T = unknown> {
  readonly [key: string]: T | undefined;
}

export type Like<T> = {
  [K in keyof T as T[K] extends Func ? never : K]: T[K] extends object ? Like<T[K]>
    : T[K];
};

export type Getters<T> = {
  [K in keyof T]: Method<T, readonly [], T[K]>;
};

export interface Class<T = object> {
  new (...args: AnyArray): T;
}
