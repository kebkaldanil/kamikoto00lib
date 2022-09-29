export declare type AccesibleType = "number" | "int" | `string:${string}-${string}` | `number:${number | `-${number}`}-${number}` | `int:${number | `-${number}`}-${number}`;
export declare function of<T extends AccesibleType>(type: T, length: number): T extends `string${string}` ? string[] : number[];
