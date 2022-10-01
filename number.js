"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssrt = exports.lambertW = exports.integerOrDefault = exports.numberOrDefault = exports.clamp = exports.floor = exports.ceil = exports.round = void 0;
const errors_1 = require("./errors");
function round(x, to = 1) {
    if (!to) {
        return x;
    }
    return Math.round(x / to) * to;
}
exports.round = round;
function ceil(x, to = 1) {
    if (!to) {
        return x;
    }
    return Math.ceil(x / to) * to;
}
exports.ceil = ceil;
function floor(x, to = 1) {
    if (!to) {
        return x;
    }
    return Math.floor(x / to) * to;
}
exports.floor = floor;
const clamp = (min, val, max) => {
    if (min > max) {
        [min, max] = [max, min];
    }
    return Math.max(min, Math.min(max, val));
};
exports.clamp = clamp;
function numberOrDefault(value, _default = 0) {
    const num = Number(value);
    return num || num === 0 ? num : _default;
}
exports.numberOrDefault = numberOrDefault;
function integerOrDefault(value, _default = 0) {
    typeof value === "bigint" ? Number(value) : Number.isSafeInteger(value) ? value : _default;
}
exports.integerOrDefault = integerOrDefault;
const xmin = -1 / Math.E;
function lambertW(x, precision = 1e-12, maxIterations = 1e2, minItarations = 0) {
    if (!(Number.isSafeInteger(maxIterations) && Number.isSafeInteger(minItarations) && maxIterations > minItarations)) {
        throw new errors_1.UnsafeNumber("Iterations range error");
    }
    if (x === 0) {
        return 0;
    }
    if (Number.isNaN(x)) {
        return NaN;
    }
    if (x < xmin) {
        return NaN;
    }
    let w = 0;
    let itarationsLeft = maxIterations;
    const minIterationMustLeft = maxIterations - minItarations;
    while (itarationsLeft--) {
        const expW = Math.exp(w);
        const wEpxW = w * expW;
        const wPlus1ExpW = wEpxW + expW;
        const wEpxWMinusX = wEpxW - x;
        w -= wEpxWMinusX / (wPlus1ExpW - (w + 2) * wEpxWMinusX / (w * 2 + 2));
        if (minIterationMustLeft > itarationsLeft && Math.abs(wEpxWMinusX / wPlus1ExpW) < precision) {
            return w;
        }
    }
    throw new errors_1.TooLongExecution(w, null, { x, precision, maxIterations, minItarations });
}
exports.lambertW = lambertW;
/* Slower, worse precision
export function ssrt1<MaxIT extends number = 10000, MinIT extends number = 0>(
  x: number,
  Wprec: number = 0.001,
  maxIterations: If<And<IsSafeInt<MaxIT>, IsPositive<MaxIT>>, MaxIT, never> = 10000 as any,
  minItarations: uint<MinIT> = 0 as any
) {
  if (!(Number.isSafeInteger(maxIterations) && Number.isSafeInteger(minItarations) && maxIterations > minItarations)) {
    throw new UnsafeNumber("Iterations range error");
  }
  return Math.exp(lambertW(Math.log(x), Wprec, maxIterations, minItarations));
}*/
function ssrt(x, Wprec = 1e-12, maxIterations = 100000000, minItarations = 0) {
    if (!(Number.isSafeInteger(maxIterations) && Number.isSafeInteger(minItarations) && maxIterations > minItarations)) {
        throw new errors_1.UnsafeNumber("Iterations range error");
    }
    if (x === 1) {
        return 1;
    } //x = e^(-1/e)
    //logx = -1/e
    const logx = Math.log(x);
    try {
        return logx / lambertW(logx, Wprec, maxIterations, minItarations);
    }
    catch (e) {
        console.error(`x = ${x}`);
        throw e;
    }
}
exports.ssrt = ssrt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLmpzIiwic291cmNlUm9vdCI6Imh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9rZWJrYWxkYW5pbC9rYW1pa290bzAwbGliL21hc3Rlci9zcmMvIiwic291cmNlcyI6WyJudW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscUNBQTBEO0FBc0cxRCxTQUFnQixLQUFLLENBQXlDLENBQUksRUFBRSxLQUFRLENBQVE7SUFDbEYsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNQLE9BQU8sQ0FBUSxDQUFDO0tBQ2pCO0lBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFTLENBQUM7QUFDeEMsQ0FBQztBQUxELHNCQUtDO0FBRUQsU0FBZ0IsSUFBSSxDQUF5QyxDQUFTLEVBQUUsRUFBRSxHQUFHLENBQUM7SUFDNUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNQLE9BQU8sQ0FBUSxDQUFDO0tBQ2pCO0lBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFTLENBQUM7QUFDdkMsQ0FBQztBQUxELG9CQUtDO0FBRUQsU0FBZ0IsS0FBSyxDQUF5QyxDQUFTLEVBQUUsRUFBRSxHQUFHLENBQUM7SUFDN0UsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNQLE9BQU8sQ0FBUSxDQUFDO0tBQ2pCO0lBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFTLENBQUM7QUFDeEMsQ0FBQztBQUxELHNCQUtDO0FBRU0sTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFFLEdBQVcsRUFBRSxFQUFFO0lBQzdELElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRTtRQUNiLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3pCO0lB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