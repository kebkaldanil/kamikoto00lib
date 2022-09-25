export interface Range {
    test(value: number): boolean;
}
export declare class SmallRange implements Range {
    start: number;
    startEqual: boolean;
    end: number;
    endEqual: boolean;
    step: number;
    constructor(src?: Partial<SmallRange>);
    test(value: number): boolean;
    randomNumber(): number;
    [Symbol.iterator](): Generator<number, void, unknown>;
    toString(printStep?: boolean): string;
}
