export declare class TooLongExecution<T, A = any> extends Error {
    result: T;
    args?: A;
    constructor(result: T, message?: string | null, args?: A);
}
