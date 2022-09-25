export declare type AccesibleType = "number" | "int" | `string:${string}-${string}` | `number:${number}-${number}` | `int:${number}-${number}`;
export declare const array: {
    of(type: "number" | "int" | `number:${number}-${number}` | `int:${number}-${number}`, length: number): number[];
    of(type: `string:${string}-${string}`, length: number): string[];
};
