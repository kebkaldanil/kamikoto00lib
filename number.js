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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL251bWJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBMEQ7QUFzRzFELFNBQWdCLEtBQUssQ0FBeUMsQ0FBSSxFQUFFLEtBQVEsQ0FBUTtJQUNsRixJQUFJLENBQUMsRUFBRSxFQUFFO1FBQ1AsT0FBTyxDQUFRLENBQUM7S0FDakI7SUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQVMsQ0FBQztBQUN4QyxDQUFDO0FBTEQsc0JBS0M7QUFFRCxTQUFnQixJQUFJLENBQXlDLENBQVMsRUFBRSxFQUFFLEdBQUcsQ0FBQztJQUM1RSxJQUFJLENBQUMsRUFBRSxFQUFFO1FBQ1AsT0FBTyxDQUFRLENBQUM7S0FDakI7SUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQVMsQ0FBQztBQUN2QyxDQUFDO0FBTEQsb0JBS0M7QUFFRCxTQUFnQixLQUFLLENBQXlDLENBQVMsRUFBRSxFQUFFLEdBQUcsQ0FBQztJQUM3RSxJQUFJLENBQUMsRUFBRSxFQUFFO1FBQ1AsT0FBTyxDQUFRLENBQUM7S0FDakI7SUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQVMsQ0FBQztBQUN4QyxDQUFDO0FBTEQsc0JBS0M7QUFFRCxTQUFnQixlQUFlLENBQVcsS0FBUSxFQUFFLFdBQWMsQ0FBUTtJQUN4RSxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsT0FBTyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFlLENBQUM7QUFDbEQsQ0FBQztBQUhELDBDQUdDO0FBR0QsU0FBZ0IsZ0JBQWdCLENBQUMsS0FBVSxFQUFFLFFB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