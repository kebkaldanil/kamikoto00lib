"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtension = exports.getType = void 0;
const object_1 = require("./object");
const string_1 = require("./string");
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
const extensionTable = Object.freeze(Object.assign((0, object_1.swapKeyAndValue)(mimeTable), {
    //text
    "text/ecmascript": "js",
    "application/javascript": "js",
    "application/ecmascript": "js",
    //audio
    "audio/wav": "wav",
    "audio/x-wav": "wav",
    "audio/x-pn-wav": "wav",
}));
function getType(path) {
    const extension = (0, string_1.substrAfterLast)(path, ".") || path;
    return mimeTable[extension.toLowerCase()] || null;
}
exports.getType = getType;
function getExtension(mime) {
    return extensionTable[mime.toLowerCase()] || null;
}
exports.getExtension = getExtension;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hbGwtbWltZS5qcyIsInNvdXJjZVJvb3QiOiJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20va2Via2FsZGFuaWwva2FtaWtvdG8wMGxpYi9tYXN0ZXIvc3JjLyIsInNvdXJjZXMiOlsic21hbGwtbWltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBMkM7QUFDM0MscUNBQTJDO0FBRTNDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDOUIsTUFBTTtJQUNOLEtBQUssRUFBRSxZQUFZO0lBQ25CLEtBQUssRUFBRSxVQUFVO0lBQ2pCLE1BQU0sRUFBRSxXQUFXO0lBQ25CLEtBQUssRUFBRSxpQkFBaUI7SUFDeEIsT0FBTyxFQUFFLHVCQUF1QjtJQUNoQyxJQUFJLEVBQUUsaUJBQWlCO0lBQ3ZCLEtBQUssRUFBRSxpQkFBaUI7SUFDeEIsT0FBTztJQUNQLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLEtBQUssRUFBRSxXQUFXO0lBQ2xCLEtBQUssRUFBRSxZQUFZO0lBQ25CLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLEtBQUssRUFBRSxZQUFZO0lBQ25CLEtBQUssRUFBRSxXQUFXO0lBQ2xCLEtBQUssRUFBRSxlQUFlO0lBQ3RCLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLEtBQUssRUFBRSxXQUFXO0lBQ2xCLEtBQUssRUFBRSxjQUFjO0lBQ3JCLEtBQUssRUFBRSxjQUFjO0lBQ3JCLEtBQUssRUFBRSxZQUFZO0lBQ25CLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLE9BQU87SUFDUCxLQUFLLEVBQUUsWUFBWTtJQUNuQixNQUFNLEVBQUUsWUFBWTtJQUNwQixLQUFLLEVBQUUsV0FBVztJQUNsQixLQUFLLEVBQUUsV0FBVztJQUNsQixLQUFLLEVBQUUsV0FBVztJQUNsQixNQUFNLEVBQUUsV0FBVztJQUNuQixPQUFPO0lBQ1AsTUFBTSxFQUFFLFlBQVk7SUFDcEIsS0FBSyxFQUFFLFdBQVc7SUFDbEIsUUFBUTtJQUNSLEtBQUssRUFBRSxpQkFBaUI7SUFDeEIsT0FBTztJQUNQLEtBQUssRUFBRSxpQkFBaUI7SUFDeEIsS0FBSyxFQUFFLDhCQUE4QjtDQUN0QyxDQUFDLENBQUM7QUFFSCxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQ2hELElBQUEsd0JBQWUsRUFBQyxTQUFTLENBQUMsRUFDMUI7SUFDRSxNQUFNO0lBQ04saUJBQWlCLEVBQUUsSUFBSTtJQUN2Qix3QkFBd0IsRUFBRSxJQUFJO0lBQzlCLHdCQUF3QixFQUFFLElBQUk7SUFDOUIsT0FBTztJQUNQLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLGdCQUFnQixFQUFFLEtBQUs7Q0FDeEIsQ0FDRixDQUFDLENBQUM7QUFLSCxTQUFnQixPQUFPLENBQW1CLElBQU87SUFDL0MsTUFBTSxTQUFTLEdBQUcsSUFBQSx3QkFBZSxFQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDckQsT0FBTyxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDO0FBQ3BELENBQUM7QUFIRCwwQkFHQztBQUVELFNBQWdCLFlBQVksQ0FBbUIsSUFBTztJQUNwRCxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDcEQsQ0FBQztBQUZELG9DQUVDIn0=