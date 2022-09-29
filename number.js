"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssrt = exports.lambertW = exports.integerOrDefault = exports.numberOrDefault = exports.floor = exports.ceil = exports.round = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLmpzIiwic291cmNlUm9vdCI6Imh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9rZWJrYWxkYW5pbC9rYW1pa290bzAwbGliL21hc3Rlci9zcmMvIiwic291cmNlcyI6WyJudW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscUNBQTBEO0FBc0cxRCxTQUFnQixLQUFLLENBQXlDLENBQUksRUFBRSxLQUFRLENBQVE7SUFDbEYsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNQLE9BQU8sQ0FBUSxDQUFDO0tBQ2pCO0lBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFTLENBQUM7QUFDeEMsQ0FBQztBQUxELHNCQUtDO0FBRUQsU0FBZ0IsSUFBSSxDQUF5QyxDQUFTLEVBQUUsRUFBRSxHQUFHLENBQUM7SUFDNUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNQLE9BQU8sQ0FBUSxDQUFDO0tBQ2pCO0lBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFTLENBQUM7QUFDdkMsQ0FBQztBQUxELG9CQUtDO0FBRUQsU0FBZ0IsS0FBSyxDQUF5QyxDQUFTLEVBQUUsRUFBRSxHQUFHLENBQUM7SUFDN0UsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNQLE9BQU8sQ0FBUSxDQUFDO0tBQ2pCO0lBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFTLENBQUM7QUFDeEMsQ0FBQztBQUxELHNCQUtDO0FBRUQsU0FBZ0IsZUFBZSxDQUFXLEtBQVEsRUFBRSxXQUFjLENBQVE7SUFDeEUsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLE9BQU8sR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBZSxD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