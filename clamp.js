"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clamp = (min, val, max) => {
    if (min > max) {
        [min, max] = [max, min];
    }
    return Math.max(min, Math.min(max, val));
};
exports.default = clamp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhbXAuanMiLCJzb3VyY2VSb290IjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2tlYmthbGRhbmlsL2thbWlrb3RvMDBsaWIvbWFzdGVyL3NyYy8iLCJzb3VyY2VzIjpbImNsYW1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFFLEdBQVcsRUFBRSxFQUFFO0lBQ3RELElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRTtRQUNiLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3pCO0lBQ0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQztBQUNGLGtCQUFlLEtBQUssQ0FBQyJ9