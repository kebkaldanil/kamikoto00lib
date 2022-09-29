"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextTick = exports.delay = void 0;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.delay = delay;
//@ts-expect-error
const _nextTick = global?.process?.nextTick || ((cb) => window.setTimeout(cb));
const nextTick = () => new Promise((res) => _nextTick(res));
exports.nextTick = nextTick;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZS5qcyIsInNvdXJjZVJvb3QiOiJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20va2Via2FsZGFuaWwva2FtaWtvdG8wMGxpYi9tYXN0ZXIvc3JjLyIsInNvdXJjZXMiOlsicHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBTyxNQUFNLEtBQUssR0FBRyxDQUFDLEVBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUFoRixRQUFBLEtBQUssU0FBMkU7QUFFN0Ysa0JBQWtCO0FBQ2xCLE1BQU0sU0FBUyxHQUE2QixNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFbEcsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxPQUFPLENBQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQTVELFFBQUEsUUFBUSxZQUFvRCJ9