"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallRange = void 0;
const number_1 = require("./random/number");
;
class SmallRange {
    constructor(src = {}) {
        const { start = -Infinity, startEqual = true, end = Infinity, endEqual = true, step = 1, } = src;
        if (start > end) {
            this.start = end;
            this.startEqual = endEqual;
            this.end = start;
            this.endEqual = startEqual;
            this.step = -step;
        }
        else {
            this.start = start;
            this.startEqual = startEqual;
            this.end = end;
            this.endEqual = endEqual;
            this.step = step;
        }
    }
    test(value) {
        const { start, startEqual, end, endEqual } = this;
        return value > start && value < end || (startEqual && start === value) || (endEqual && end === value);
    }
    randomNumber() {
        const { start, startEqual, end, endEqual } = this;
        let result;
        do {
            const swap = startEqual === endEqual ? startEqual ? (0, number_1.inRange)(0, 1) < 0.5 : false : endEqual;
            result = swap ? (0, number_1.inRange)(start, end) : (0, number_1.inRange)(end, start);
        } while (!this.test(result));
        return result;
    }
    *[Symbol.iterator]() {
        const { start, startEqual, end, endEqual, step } = this;
        if (step < 0) {
            let i = endEqual ? end : end + step;
            while (startEqual && i === start || i > start) {
                yield i;
                i += step;
            }
        }
        else {
            let i = startEqual ? start : start + step;
            while (endEqual && i === end || i < end) {
                yield i;
                i += step;
            }
        }
    }
    toString(printStep = false) {
        const { start, startEqual, end, endEqual, step } = this;
        return `${startEqual || start === Infinity ? "[" : "("}${start}, ${end}${endEqual || end === -Infinity ? "]" : ")"}${printStep ? `; step = ${step}` : ""}`;
    }
}
exports.SmallRange = SmallRange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuanMiLCJzb3VyY2VSb290IjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2tlYmthbGRhbmlsL2thbWlrb3RvMDBsaWIvbWFzdGVyL3NyYy8iLCJzb3VyY2VzIjpbInJhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUEwQztBQUl6QyxDQUFDO0FBRUYsTUFBYSxVQUFVO0lBT3JCLFlBQVksTUFBMkIsRUFBRTtRQUN2QyxNQUFNLEVBQ0osS0FBSyxHQUFHLENBQUMsUUFBUSxFQUNqQixVQUFVLEdBQUcsSUFBSSxFQUNqQixHQUFHLEdBQUcsUUFBUSxFQUNkLFFBQVEsR0FBRyxJQUFJLEVBQ2YsSUFBSSxHQUFHLENBQUMsR0FDVCxHQUFHLEdBQUcsQ0FBQztRQUNSLElBQUksS0FBSyxHQUFHLEdBQUcsRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1lBQzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDbkI7YUFBTTtZQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzdCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDbEI7SUFDSCxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQWE7UUFDaEIsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNsRCxPQUFPLEtBQUssR0FBRyxLQUFL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