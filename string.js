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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.substrAfterLast = exports.substrAfter = exports.splice = void 0;
__exportStar(require("./split"), exports);
function splice(to, position, length, str = "") {
    const firstToPart = to.slice(0, position);
    const lastToPart = to.slice(position + length);
    return firstToPart + str + lastToPart;
}
exports.splice = splice;
function substrAfter(str, after) {
    const index = str.indexOf(after);
    if (index === -1) {
        return null;
    }
    return str.slice(index + after.length);
}
exports.substrAfter = substrAfter;
function substrAfterLast(str, after) {
    const index = str.lastIndexOf(after);
    if (index === -1) {
        return null;
    }
    return str.slice(index + after.length);
}
exports.substrAfterLast = substrAfterLast;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLmpzIiwic291cmNlUm9vdCI6Imh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9rZWJrYWxkYW5pbC9rYW1pa290bzAwbGliL21hc3Rlci9zcmMvIiwic291cmNlcyI6WyJzdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSwwQ0FBd0I7QUFVeEIsU0FBZ0IsTUFBTSxDQUFDLEVBQVUsRUFBRSxRQUFnQixFQUFFLE1BQWMsRUFBRSxHQUFHLEdBQUcsRUFBRTtJQUN6RSxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMxQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUMvQyxPQUFPLFdBQVcsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDO0FBQzFDLENBQUM7QUFKRCx3QkFJQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxHQUFXLEVBQUUsS0FBYTtJQUNwRCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2hCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBTkQsa0NBTUM7QUFFRCxTQUFnQixlQUFlLENBQUMsR0FBVyxFQUFFLEtBQWE7SUFDeEQsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNoQixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekMsQ0FBQztBQU5ELDBDQU1DIn0=