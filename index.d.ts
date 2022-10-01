export * from "./decorators";
export * from "./errors";
import * as randomNumber from "./random/number";
import * as randomInt from "./random/int";
import * as randomArray from "./random/array";
export declare namespace random {
    const number: typeof randomNumber;
    const int: typeof randomInt;
    const array: typeof randomArray;
}
export * from "./array";
export * from "./formaters";
export * from "./mime";
export * from "./number";
export * from "./object";
export * from "./promise";
export * from "./range";
export * from "./string";
export * from "./type-logic";
export * from "./types";
export * as default from ".";
