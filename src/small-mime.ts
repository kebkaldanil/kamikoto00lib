import { SwapKeyAndValuePriority, swapKeyAndValue } from "./types/object.ts";
import { substrAfterLast } from "./types/string.ts";


const mimeTable = Object.freeze({
  //text
  "txt": "text/plain",
  "css": "text/css",
  "html": "text/html",
  "xml": "application/xml",
  "xhtml": "application/xhtml+xml",
  "js": "text/javasrcipt",
  "jsm": "text/javasrcipt",
  //image
  "apng": "image/apng",
  "avif": "image/avif",
  "gif": "image/gif",
  "jpg": "image/jpeg",
  "jpeg": "image/jpeg",
  "jfif": "image/jpeg",
  "pjpeg": "image/jpeg",
  "pjp": "image/jpeg",
  "png": "image/png",
  "svg": "image/svg+xml",
  "webp": "image/webp",
  "bmp": "image/bmp",
  "ico": "image/x-icon",
  "cur": "image/x-icon",
  "tif": "image/tiff",
  "tiff": "image/tiff",
  //audio
  "wav": "audio/wave",
  "weba": "audio/webm",
  "ogg": "audio/ogg",
  "oga": "audio/ogg",
  "spx": "audio/ogg",
  "opus": "audio/ogg",
  //video
  "webm": "video/webm",
  "ogv": "video/ogg",
  //media?
  "ogx": "application/ogg",
  //other
  "zip": "application/zip",
  "rar": "application/x-rar-compressed",
});

const extensionTable = Object.freeze(Object.assign(
  swapKeyAndValue(mimeTable, SwapKeyAndValuePriority.First),
  {
    //text
    "text/ecmascript": "js",
    "application/javascript": "js",
    "application/ecmascript": "js",
    //audio
    "audio/wav": "wav",
    "audio/x-wav": "wav",
    "audio/x-pn-wav": "wav",
  },
));

export type SupportedExtensions = keyof typeof mimeTable;
export type SupportedMime = keyof typeof extensionTable;

export function getType<const S extends string>(path: S): Lowercase<S> extends `${string}.${infer T extends SupportedExtensions}` ? typeof mimeTable[T] : S extends SupportedExtensions ? typeof mimeTable[Lowercase<S>] : string extends S ? string : null {
  const extension = substrAfterLast(path, ".") || path;
  return mimeTable[extension.toLowerCase() as never] || null;
}

export function getExtension<const T extends string>(mime: T): Lowercase<T> extends SupportedMime ? typeof extensionTable[Lowercase<T>] : string extends T ? string : null {
  return extensionTable[mime.toLowerCase() as never] || null;
}
