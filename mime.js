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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTJDO0FBQzNDLHVDQUFxQztBQWM5QixJQUFNLG9CQUFvQixHQUExQixNQUFNLG9CQUFxQixTQUFRLEtBQUs7SUFDN0M7UUFDRSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0YsQ0FBQTtBQUpZLG9CQUFvQjtJQURoQyxJQUFBLHdCQUFXLEdBQUU7R0FDRCxvQkFBb0IsQ0FJaEM7QUFKWSxvREFBb0I7QUFNakMsSUFBSSxPQUFhLENBQUM7QUFDbEIsSUFBSSxTQUFTLEdBQWMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBRWhGLE1BQU0sU0FBUyxHQUFHLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBbkMsUUFBQSxTQUFTLGFBQTBCO0FBQ3pDLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztBQUFqRCxRQUFBLGdCQUFnQixvQkFBaUM7QUFDdkQsTUFBTSxjQUFjLEdBQUcsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztBQUE3QyxRQUFBLGNBQWMsa0JBQStCO0FBRW5ELEtBQUssVUFBVSxPQUFPLENBQUMsSUFBMEI7SUFDdEQsSUFBSSxTQUFTLENBQUMsV0FBVyxFQUFFO1FBQ3pCLFNBQVMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0tBQ2hDO0lBQ0QsTUFBTSxnQkFBZ0IsR0FBYyxTQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQzNHLE1BQU0sQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDO0lBQ3JCLElBQUksZ0JBQWdCLENBQUMsYUFBYSxFQUFFO1FBQ2xDLE9BQU8sR0FBRyxDQUFDLENBQUM7S0FDYjtJQUNELGdCQUFnQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDakMsQ0FBQztBQVZELDBCQVVDO0FBRUQsSUFBQSxrQkFBUSxHQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtJQUNuQixJQUFJLElBQUEsc0JBQWMsR0FBRSxFQUFFO1FBQ3BCLE9BQU8sbURBQVEsY0FBYyxJQUFFLENBQUM7S0FDakM7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILFNBQWdCLE9BQU8sQ0FBQyxJQUFZO0lBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxvQkFBb0IsRUFBRSxDQUFDO0tBQ2xDO0lBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFMRCwwQkFLQztBQUVELFNBQWdCLFlBQVksQ0FBQyxJQUFZO0lBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxvQkFBb0IsRUFBRSxDQUFDO0tBQ2xDO0lBQ0QsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFMRCxvQ0FLQztBQUVELGtCQUFlO0lBQ2IsT0FBTztJQUNQLFlBQVk7Q0FDYixDQUFDIn0=