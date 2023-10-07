import {
  AnyArray,
  As,
  Class,
  Dict,
  Getters,
  primitive,
  ValueOf,
} from "../types/index.ts";
import { Extends, If, IfElse, Not } from "../type-logic.ts";
import { split } from "./string.ts";
import { Func } from "../types/function.ts";

export type PojoDeepCopy<T> = T extends T ? IfElse<
    [
      [Extends<unknown, T>, primitive<null> | object],
      [Extends<T, primitive<null>>, T],
      [Extends<T, AnyArray>, PojoDeepCopyArray<T & AnyArray>],
    ],
    {
      [
        K in Extract<keyof T, Exclude<PropertyKey, symbol>> as If<
          Not<Extends<T[K], Func | undefined>>,
          K
        >
      ]: PojoDeepCopy<T[K]>;
    }
  >
  : never;

type PojoDeepCopyArray<T extends AnyArray> = {
  [K in Extract<keyof T, number>]: If<
    Extends<T[K], undefined | Func | symbol>,
    null,
    PojoDeepCopy<T[K]>
  >;
};

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

export type ComputePropertyOnceOptions = {
  enumerableAfterCompute?: boolean;
  enumerableBeforeCompute?: boolean;
} | boolean;

export function extendsObjectWithOnceComputedProperties<
  const T extends object,
  const A extends object,
>(
  obj: T,
  compute: Getters<A>,
  options: ComputePropertyOnceOptions = true,
): asserts obj is T & A {
  const { enumerableAfterCompute = true, enumerableBeforeCompute = true } =
    typeof options === "boolean"
      ? { enumerableAfterCompute: options, enumerableBeforeCompute: options }
      : options;
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
          const value = compute[key as keyof A].call(
            obj as T & A,
          );
          Object.defineProperty(obj, key, {
            value,
            configurable: true,
            enumerable: enumerableAfterCompute,
            writable: false,
          });
          return value;
        },
        configurable: true,
        enumerable: enumerableBeforeCompute,
        writable: false,
      };
      return [
        key,
        descriptor,
      ];
    }),
  );
  Object.defineProperties(obj, descriptors);
}

export const mapDict = <const S extends object | Dict, const DT>(
  src: S,
  cb: <const K extends keyof S & primitive>(entry: [K, S[K]]) => DT,
) =>
  Object.fromEntries(
    Object.entries(src).map((
      entry,
    ) => [entry[0], cb(entry as [keyof S & primitive, S[keyof S & primitive]])]),
  ) as {
    -readonly [K in keyof S & primitive]: DT;
  };

export const enum SwapKeyAndValuePriority {
  First = 0,
  Last = 1,
}

export const swapKeyAndValue = <
  const T extends Record<string | number, primitive>,
>(object: T, swapKeyAndValuePriority = SwapKeyAndValuePriority.First) => {
  const result = {} as Record<As<ValueOf<T>, string>, As<keyof T, string>>;
  for (
    const [key, value] of Object.entries(object) as [
      As<keyof T, string>,
      As<ValueOf<T>, string>,
    ][]
  ) {
    if (
      swapKeyAndValuePriority == SwapKeyAndValuePriority.First &&
      value in result
    ) {
      continue;
    }
    result[value] = key;
  }
  return result as unknown as {
    -readonly [K in keyof T & primitive as As<T[K], string>]: `${K}`;
  };
};

export function computePropertyOnce<
  const T extends object,
  const K extends PropertyKey,
  const N,
>(
  obj: T,
  key: K,
  compute: () => N,
  options: ComputePropertyOnceOptions = true,
): asserts obj is T & Record<K, N> {
  const { enumerableAfterCompute = true, enumerableBeforeCompute = true } =
    typeof options === "boolean"
      ? { enumerableAfterCompute: options, enumerableBeforeCompute: options }
      : options;
  Object.defineProperty(obj, key, {
    get: () => {
      const value = compute.call(obj);
      Object.defineProperty(obj, key, {
        value,
        configurable: true,
        enumerable: enumerableAfterCompute,
        writable: false,
      });
      return value;
    },
    configurable: true,
    enumerable: enumerableBeforeCompute,
    writable: false,
  });
}

export type MapToArrayProcessor<
  sourceT,
  resultT,
  allowBooleanT extends boolean = false,
  emptyIsErrorT extends boolean = false,
> = (el: sourceT) =>
  | [PropertyKey, resultT]
  | ((allowBooleanT extends true ? [PropertyKey] | PropertyKey : never))
  | (emptyIsErrorT extends true ? void : never);

export interface MapArrayToObjectOptions<
  sourceT,
  resultT,
  allowBooleanT extends boolean = false,
  emptyIsErrorT extends boolean = false,
  toManyIsErrorT extends boolean = false,
> {
  processor?: MapToArrayProcessor<
    sourceT,
    resultT,
    allowBooleanT,
    emptyIsErrorT
  >;
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
  options?: MapArrayToObjectOptions<
    sourceT,
    resultT,
    allowBooleanT,
    emptyIsErrorT,
    toManyIsErrorT
  >,
): MapArrayToObjectResult<resultT, allowBooleanT> {
  if (!options) {
    options = {};
  }
  const processor = (options.processor ||
    ((el: string) => split(el, "=", { minLength: 2, maxLength: 2 }))) as unknown as (
      el: sourceT,
    ) => MapToArrayProcessor<sourceT, resultT, allowBooleanT, emptyIsErrorT>;
  const throwIfError = options.throwIfError ?? true;
  const allowBooleanIfOnlyKey = options.allowBooleanIfOnlyKey ?? false;
  const emptyIsError = options.emptyIsError ?? false;
  const toManyIsError = options.toManyIsError ?? false;
  const res: MapArrayToObjectResult<resultT, allowBooleanT> = {};
  array.forEach((s) => {
    try {
      const a = processor(s) as unknown as [keyof typeof res, resultT] | [
        keyof typeof res,
      ] | [];
      if (a) {
        switch (a.length) {
          case 0:
            if (emptyIsError) {
              throw new Error("Empty result");
            }
            break;
          case 1:
            if (allowBooleanIfOnlyKey) {
              res[a[0]] = true as never;
            } else {
              throw new Error("Only key found");
            }
            break;
          default:
            if (toManyIsError) {
              throw new Error("Too many elements in result");
            }
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
      if (throwIfError) {
        throw e;
      }
      return;
    }
  });
  return res;
}

/**note: freeze is not free*/
export const freezeIfIsClass = (obj: object, _class: Class) => {
  if (Object.getPrototypeOf(obj) === _class.prototype) {
    Object.freeze(obj);
  }
};
