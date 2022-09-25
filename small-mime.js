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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hbGwtbWltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zbWFsbC1taW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUEyQztBQUMzQyxxQ0FBMkM7QUFFM0MsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM5QixNQUFNO0lBQ04sS0FBSyxFQUFFLFlBQVk7SUFDbkIsS0FBSyxFQUFFLFVBQVU7SUFDakIsTUFBTSxFQUFFLFdBQVc7SUFDbkIsS0FBSyxFQUFFLGlCQUFpQjtJQUN4QixPQUFPLEVBQUUsdUJBQXVCO0lBQ2hDLElBQUksRUFBRSxpQkFBaUI7SUFDdkIsS0FBSyxFQUFFLGlCQUFpQjtJQUN4QixPQUFPO0lBQ1AsTUFBTSxFQUFFLFlBQVk7SUFDcEIsTUFBTSxFQUFFLFlBQVk7SUFDcEIsS0FBSyxFQUFFLFdBQVc7SUFDbEIsS0FBSyxFQUFFLFlBQVk7SUFDbkIsTUFBTSxFQUFFLFlBQVk7SUFDcEIsTUFBTSxFQUFFLFlBQVk7SUFDcEIsT0FBTyxFQUFFLFlBQVk7SUFDckIsS0FBSyxFQUFFLFlBQVk7SUFDbkIsS0FBSyxFQUFFLFdBQVc7SUFDbEIsS0FBSyxFQUFFLGVBQWU7SUFDdEIsTUFBTSxFQUFFLFlBQVk7SUFDcEIsS0FBSyxFQUFFLFdBQVc7SUFDbEIsS0FBSyxFQUFFLGNBQWM7SUFDckIsS0FBSyxFQUFFLGNBQWM7SUFDckIsS0FBSyxFQUFFLFlBQVk7SUFDbkIsTUFBTSxFQUFFLFlBQVk7SUFDcEIsT0FBTztJQUNQLEtBQUssRUFBRSxZQUFZO0lBQ25CLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLEtBQUssRUFBRSxXQUFXO0lBQ2xCLEtBQUssRUFBRSxXQUFXO0lBQ2xCLEtBQUssRUFBRSxXQUFXO0lBQ2xCLE1BQU0sRUFBRSxXQUFXO0lBQ25CLE9BQU87SUFDUCxNQUFNLEVBQUUsWUFBWTtJQUNwQixLQUFLLEVBQUUsV0FBVztJQUNsQixRQUFRO0lBQ1IsS0FBSyxFQUFFLGlCQUFpQjtJQUN4QixPQUFPO0lBQ1AsS0FBSyxFQUFFLGlCQUFpQjtJQUN4QixLQUFLLEVBQUUsOEJBQThCO0NBQ3RDLENBQUMsQ0FBQztBQUVILE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDaEQsSUFBQSx3QkFBZSxFQUFDLFNBQVMsQ0FBQyxFQUMxQjtJQUNFLE1BQU07SUFDTixpQkFBaUIsRUFBRSxJQUFJO0lBQ3ZCLHdCQUF3QixFQUFFLElBQUk7SUFDOUIsd0JBQXdCLEVBQUUsSUFBSTtJQUM5QixPQUFPO0lBQ1AsV0FBVyxFQUFFLEtBQUs7SUFDbEIsYUFBYSxFQUFFLEtBQUs7SUFDcEIsZ0JBQWdCLEVBQUUsS0FBSztDQUN4QixDQUNGLENBQUMsQ0FBQztBQUtILFNBQWdCLE9BQU8sQ0FBbUIsSUFBTztJQUMvQyxNQUFNLFNBQVMsR0FBRyxJQUFBLHdCQUFlLEVBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUNyRCxPQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDcEQsQ0FBQztBQUhELDBCQUdDO0FBRUQsU0FBZ0IsWUFBWSxDQUFtQixJQUFPO0lBQ3BELE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQztBQUNwRCxDQUFDO0FBRkQsb0NBRUMifQ==