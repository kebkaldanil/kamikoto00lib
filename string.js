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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLDBDQUF3QjtBQVV4QixTQUFnQixNQUFNLENBQUMsRUFBVSxFQUFFLFFBQWdCLEVBQUUsTUFBYyxFQUFFLEdBQUcsR0FBRyxFQUFFO0lBQ3pFLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLE9BQU8sV0FBVyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUM7QUFDMUMsQ0FBQztBQUpELHdCQUlDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLEdBQVcsRUFBRSxLQUFhO0lBQ3BELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDaEIsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFORCxrQ0FNQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxHQUFXLEVBQUUsS0FBYTtJQUN4RCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2hCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBTkQsMENBTUMifQ==