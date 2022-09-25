export interface Mime {
    getType(path: string): string | null;
    getExtension(mime: string): string | null;
}
export declare class MimeIsNotLoadedError extends Error {
    constructor();
}
export declare const getLoaded: () => boolean;
export declare const getLoadPrevented: () => boolean;
export declare const getLoadStarted: () => boolean;
export declare function setMime(mime: Promise<Mime> | Mime): Promise<void>;
export declare function getType(path: string): string | null;
export declare function getExtension(mime: string): string | null;
declare const _default: {
    getType: typeof getType;
    getExtension: typeof getExtension;
};
export default _default;
