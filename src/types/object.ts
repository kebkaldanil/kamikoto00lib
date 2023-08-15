import { split } from "../split.ts";
import { If,Extends,IfElse,Not } from "../type-logic.ts";
import { AnyArray } from "./array.ts";
import { primitive,anykey,As,ValueOf } from "./helpers.ts";

export interface Dict<T = unknown> {
  [key: string]: T | undefined;
}

export interface ReadonlyDict<T = unknown> {
  readonly [key: string]: T | undefined;
}

export type Method<O = unknown, A extends AnyArray = AnyArray, R = unknown> = (this: O, ...args: A) => R;
export type Func<A extends AnyArray = AnyArray, R = unknown> = (...args: A) => R;

export type Like<T> = {
  [K in keyof T as T[K] extends Func ? never : K]: T[K] extends object ? Like<T[K]> : T[K];
};

type PojoDeepCopyArray<T extends AnyArray> = {
  [K in Extract<keyof T, number>]: If<
    Extends<T[K], undefined | Func | symbol>,
    null,
    PojoDeepCopy<T[K]>
  >;
};

export type PojoDeepCopy<T> = T extends T ? IfElse<
  [
    [Extends<unknown, T>, primitive<null> | object],
    [Extends<T, primitive<null>>, T],
    [Extends<T, AnyArray>, PojoDeepCopyArray<T & AnyArray>]
  ], {
    [K in Extract<keyof T, Exclude<anykey, symbol>> as If<Not<Extends<T[K], Func | undefined>>, K>]: PojoDeepCopy<T[K]>;
  }
> : never;

const pojoDeepCopyReferences: object[] = [];

export function pojoDeepCopy<const T>(src: T): PojoDeepCopy<T>;
export function pojoDeepCopy(src: Dict | primitive<null>): unknown {
  if (src === null) {
    return null;
  }
  switch (typeof src) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
      return src;
    case "object": {
      if (pojoDeepCopyReferences.includes(src)) {
        return undefined;
      }
      pojoDeepCopyReferences.push(src);
      const isArray = Array.isArray(src);
      const res = (isArray ? [] : {}) as Dict;
      for (const key in src) {
        const val = src[key];
        const r = pojoDeepCopy(val);
        if (r === undefined) {
          if (isArray) {
            res[key] = null;
          }
          break;
        }
        res[key] = r;
      }
      pojoDeepCopyReferences.pop();
      return res;
    }
  }
  return undefined;
}

export function computePropertyOnce<
  const T extends Dict,
  const K extends anykey,
  const N,
>(
  obj: T,
  key: K,
  compute: () => N,
): asserts obj is T & Record<K, N> {
  Object.defineProperty(obj, key, {
    get: () => {
      delete obj[key as keyof T];
      return (obj as Record<K, N>)[key] = compute.call(obj);
    },
    configurable: true,
    enumerable: true,
  });
}

export type Getters<T> = {
  [K in keyof T]: Method<T, readonly [], T[K]>
};

export function extendsObjectWithOnceComputedProperties<
  const T,
  const A,
>(obj: T, compute: Getters<A>): asserts obj is T & A {
  const keys: (string | symbol)[] = [];
  const symbols = Object.getOwnPropertySymbols(compute);
  for (const key in compute) {
    keys.push(key);
  }
  for (const key of symbols) {
    keys.push(key);
  }
  const descriptors = Object.fromEntries(
    keys.map((key) => {
      const descriptor: PropertyDescriptor = {
        get() {
          delete obj[key as keyof T];
          return obj[key as keyof T] = compute[key as keyof A].call(obj as T & A) as never;
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

export const mapDict = <const K extends anykey, const TS, const TD>(src: Record<K, TS>, cb: (key: Extract<string, K>, value: TS) => TD) =>
  Object.fromEntries(Object.entries<TS>(src).map(([key, value]) => [key, cb(key as Extract<string, K>, value)])) as Record<Extract<string, K>, TD>;

export const enum SwapKeyAndValuePriority {
  First = 0,
  Last = 1,
}

export const swapKeyAndValue = <const T extends Record<string | number, primitive>>(object: T, swapKeyAndValuePriority = SwapKeyAndValuePriority.First) => {
  const result = {} as Record<As<ValueOf<T>, string>, As<keyof T, string>>;
  for (const [key, value] of Object.entries(object) as [As<keyof T, string>, As<ValueOf<T>, string>][]) {
    if (swapKeyAndValuePriority == SwapKeyAndValuePriority.First && value in result) {
      continue;
    }
    result[value] = key;
  }
  return result as unknown as { -readonly [K in keyof T & primitive as As<T[K], string>]: `${K}` };
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
> = Dict<resultT | (allowBooleanT extends true ? true : never)>;

//TODO: types rewrite
export function mapArrayToObject<
  const sourceT,
  const resultT,
  const allowBooleanT extends boolean = false,
  const emptyIsErrorT extends boolean = false,
  const toManyIsErrorT extends boolean = false,
>(
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
      const a = processor(s) as unknown as [keyof typeof res, resultT] | [keyof typeof res] | [];
      if (a) {
        switch (a.length) {
          case 0:
            if (emptyIsError)
              throw new Error("Empty result");
            break;
          case 1:
            if (allowBooleanIfOnlyKey) {
              res[a[0]] = true as never;
            }
            else
              throw new Error("Only key found");
            break;
          default:
            if (toManyIsError)
              throw new Error("Too many elements in result");
            res[a[0]] = a[1];
            break;
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

export interface Class<T = object> {
  new(...args: AnyArray): T;
}

/**note: freeze is not free*/
export const freezeIfIsClass = (obj: object, _class: Class) => {
  if (Object.getPrototypeOf(obj) === _class.prototype) {
    Object.freeze(obj);
  }
};
