"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtension = exports.getType = exports.setMime = exports.getLoadStarted = exports.getLoadPrevented = exports.getLoaded = exports.MimeIsNotLoadedError = void 0;
const decorators_1 = require("./decorators");
const promise_1 = require("./promise");
let MimeIsNotLoadedError = class MimeIsNotLoadedError extends Error {
    constructor() {
        super("Mime is not loaded");
    }
};
MimeIsNotLoadedError = __decorate([
    (0, decorators_1.CustomError)()
], MimeIsNotLoadedError);
exports.MimeIsNotLoadedError = MimeIsNotLoadedError;
let current;
let loadState = { loaded: false, loadStarted: false, loadPrevented: false };
const getLoaded = () => loadState.loaded;
exports.getLoaded = getLoaded;
const getLoadPrevented = () => loadState.loadPrevented;
exports.getLoadPrevented = getLoadPrevented;
const getLoadStarted = () => loadState.loadStarted;
exports.getLoadStarted = getLoadStarted;
async function setMime(mime) {
    if (loadState.loadStarted) {
        loadState.loadPrevented = true;
    }
    const currentLoadState = loadState = { loaded: false, loadStarted: true, loadPrevented: false };
    const r = await mime;
    if (currentLoadState.loadPrevented) {
        current = r;
    }
    currentLoadState.loaded = true;
}
exports.setMime = setMime;
(0, promise_1.nextTick)().then(() => {
    if ((0, exports.getLoadStarted)()) {
        setMime(Promise.resolve().then(() => __importStar(require("./small-mime"))));
    }
});
function getType(path) {
    if (!loadState.loaded) {
        throw new MimeIsNotLoadedError();
    }
    return current.getType(path);
}
exports.getType = getType;
function getExtension(mime) {
    if (!loadState.loaded) {
        throw new MimeIsNotLoadedError();
    }
    return current.getExtension(mime);
}
exports.getExtension = getExtension;
exports.default = {
    getType,
    getExtension,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS5qcyIsInNvdXJjZVJvb3QiOiJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20va2Via2FsZGFuaWwva2FtaWtvdG8wMGxpYi9tYXN0ZXIvc3JjLyIsInNvdXJjZXMiOlsibWltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUEyQztBQUMzQyx1Q0FBcUM7QUFjOUIsSUFBTSxvQkFBb0IsR0FBMUIsTUFBTSxvQkFBcUIsU0FBUSxLQUFLO0lBQzdDO1FBQ0UsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNGLENBQUE7QUFKWSxvQkFBb0I7SUFEaEMsSUFBQSx3QkFBVyxHQUFFO0dBQ0Qsb0JBQW9CLENBSWhDO0FBSlksb0RBQW9CO0FBTWpDLElBQUksT0FBYSxDQUFDO0FBQ2xCLElBQUksU0FBUyxHQUFjLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUVoRixNQUFNLFNBQVMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQW5DLFFBQUEsU0FBUyxhQUEwQjtBQUN6QyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7QUFBakQsUUFBQSxnQkFBZ0Isb0JBQWlDO0FBQ3ZELE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7QUFBN0MsUUFBQSxjQUFjLGtCQUErQjtBQUVuRCxLQUFLLFVBQVUsT0FBTyxDQUFDLElBQTBCO0lBQ3RELElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRTtRQUN6QixTQUFTLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztLQUNoQztJQUNELE1BQU0sZ0JBQWdCLEdBQWMsU0FBUyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUMzRyxNQUFNLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQztJQUNyQixJQUFJLGdCQUFnQixDQUFDLGFBQWEsRUFBRTtRQUNsQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7SUFDRCxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ2pDLENBQUM7QUFWRCwwQkFVQztBQUVELElBQUEsa0JBQVEsR0FBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDbkIsSUFBSSxJQUFBLHNCQUFjLEdBQUUsRUFBRTtRQUNwQixPQUFPLG1EQUFRLGNBQWMsSUFBRSxDQUFDO0tBQ2pDO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFnQixPQUFPLENBQUMsSUFBWTtJQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtRQUNyQixNQUFNLElBQUksb0JBQW9CLEVBQUUsQ0FBQztLQUNsQztJQUNELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBTEQsMEJBS0M7QUFFRCxTQUFnQixZQUFZLENBQUMsSUFBWTtJQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtRQUNyQixNQUFNLElBQUksb0JBQW9CLEVBQUUsQ0FBQztLQUNsQztJQUNELE9BQU8sT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBTEQsb0NBS0M7QUFFRCxrQkFBZTtJQUNiLE9BQU87SUFDUCxZQUFZO0NBQ2IsQ0FBQyJ9