import { split } from "./split";
import { _Extends } from "./type-logic";
import { anykey, primitive } from "./types";

export interface Dict<T> {
  [key: string]: T;
}

export type Like<T extends object> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K] extends object ? Like<T[K]> : T[K];
};

export type JsonCopyAllowed = object | string | number | boolean | any[];

export type JsonCopy<T extends JsonCopyAllowed> = {
  [K in Extract<keyof T, string> as T[K] extends (...args: unknown[]) => unknown ? never : K]: T[K] extends object ? JsonCopy<T[K]> : T[K];
};

export function jsonCopy<T extends JsonCopyAllowed>(obj: T): JsonCopy<T> {
  const res = {} as any;
  for (const nm in obj) {
    const v = obj[nm];
    switch (typeof v) {
      case "object":
        res[nm] = jsonCopy(v as Extract<typeof v, object>);
        break;
      case "string":
      case "number":
      case "boolean":
        res[nm] = v;
    }
  }
  return res;
}

export function computePropertyOnce<
  T extends object,
  K extends anykey,
  N,
>(
  obj: T,
  key: K,
  compute: () => N,
): asserts obj is T & Record<K, N> {
  Object.defineProperty(obj, key, {
    get: () => {
      //@ts-expect-error
      delete obj[key];
      return (obj as Record<K, N>)[key] = compute();
    },
    configurable: true,
    enumerable: true,
  });
}

export type Getters<T extends object> = {
  [Key in keyof T]: () => T[Key]
};

export function extendsObjectWithOnceComputedProperties<
  T extends object,
  R extends object,
>(obj: T, compute: Getters<R>): asserts obj is T & R {
  const keys: (string | symbol)[] = [];
  const symbols = Object.getOwnPropertySymbols(compute);
  for (const key in compute) {
    keys.push(key);
  }
  for (const key of symbols) {
    keys.push(key);
  }
  const descriptors = Object.fromEntries(
    keys.map(key => {
      const descriptor: PropertyDescriptor = {
        get() {
          delete obj[key];
          return obj[key] = compute[key]();
        },
        configurable: true,
        enumerable: true,
      };
      return [
        key,
        descriptor,
      ];
    }),
  );
  Object.defineProperties(obj, descriptors);
}

export function mapDict<K extends anykey, TS, TD>(src: Record<K, TS>, cb: (key: Extract<string, K>, value: TS) => TD) {
  return Object.fromEntries(Object.entries<TS>(src).map(([key, value]) => [key, cb(key as Extract<string, K>, value)])) as Record<Extract<string, K>, TD>;
}

export function swapKeyAndValue<T extends Record<string, S>, S extends string | number>(object: T) {
  return Object.fromEntries(
    Object.entries(object).map(
      ([key, value]) => [value, key],
    ),
  ) as { -readonly [K in keyof T as T[K]]: K };
}

export function swapKeyAndValueFromEnd<T extends Record<string, S>, S extends string | number>(object: T) {
  return Object.fromEntries(
    Object.entries(object).map(
      ([key, value]) => [value, key],
    ).reverse(),
  ) as { [K in keyof T as T[K]]: K };
}

export type MapToArrayProcessor<
  sourceT,
  resultT,
  allowBooleanT extends boolean = false,
  emptyIsErrorT extends boolean = false,
> = (el: sourceT) => (
  [anykey, resultT] |
  ((allowBooleanT extends true ? [anykey] | anykey : never)) |
  (emptyIsErrorT extends true ? void : never)
);

export interface MapArrayToObjectOptions<
  sourceT,
  resultT,
  allowBooleanT extends boolean = false,
  emptyIsErrorT extends boolean = false,
  toManyIsErrorT extends boolean = false,
> {
  processor?: MapToArrayProcessor<sourceT, resultT, allowBooleanT, emptyIsErrorT>;
  allowBooleanIfOnlyKey?: allowBooleanT;
  emptyIsError?: emptyIsErrorT;
  throwIfError?: boolean;
  toManyIsError?: toManyIsErrorT;
}

export type MapArrayToObjectResult<
  resultT,
  allowBooleanT,
> = Dict<resultT | (allowBooleanT extends true ? boolean : never)>;

export function mapArrayToObject<
  sourceT,
  resultT,
  allowBooleanT extends boolean = false,
  emptyIsErrorT extends boolean = false,
  toManyIsErrorT extends boolean = false,
> (
  array: sourceT[],
  options?: MapArrayToObjectOptions<sourceT, resultT, allowBooleanT, emptyIsErrorT, toManyIsErrorT>,
): MapArrayToObjectResult<resultT, allowBooleanT> {
  if (!options)
    options = {};
  const processor = (options.processor || ((el: string) => split(el, "=", { minLength: 2, maxLength: 2 }))) as unknown as (el: sourceT) => MapToArrayProcessor<sourceT, resultT, allowBooleanT, emptyIsErrorT>;
  const throwIfError = options.throwIfError ?? true;
  const allowBooleanIfOnlyKey = options.allowBooleanIfOnlyKey ?? false;
  const emptyIsError = options.emptyIsError ?? false;
  const toManyIsError = options.toManyIsError ?? false;
  const res: MapArrayToObjectResult<resultT, allowBooleanT> = {};
  array.forEach(s => {
    try {
      const a = processor(s);
      if (a) {
        switch (a.length) {
          case 0:
            if (emptyIsError)
              throw new Error("Empty result");
            break;
          case 1:
            if (allowBooleanIfOnlyKey) {
              res[a[0]] = true as allowBooleanT extends true ? boolean : never;
            }
            else
              throw new Error("Only key found");
            break;
          default:
            if (toManyIsError)
              throw new Error("Too many elements in result");
          // eslint-disable-next-line no-fallthrough
          case 2: {
            res[a[0]] = a[1];
            break;
          }
        }
      } else if (emptyIsError) {
        throw new Error("Empty result");
      }
    } catch (e) {
      if (throwIfError)
        throw e;
      return;
    }
  });
  return res;
}
