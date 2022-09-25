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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBQTBDO0FBSXpDLENBQUM7QUFFRixNQUFhLFVBQVU7SUFPckIsWUFBWSxNQUEyQixFQUFFO1FBQ3ZDLE1BQU0sRUFDSixLQUFLLEdBQUcsQ0FBQyxRQUFRLEVBQ2pCLFVBQVUsR0FBRyxJQUFJLEVBQ2pCLEdBQUcsR0FBRyxRQUFRLEVBQ2QsUUFBUSxHQUFHLElBQUksRUFDZixJQUFJLEdBQUcsQ0FBQyxHQUNULEdBQUcsR0FBRyxDQUFDO1FBQ1IsSUFBSSxLQUFLLEdBQUcsR0FBRyxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7WUFDM0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQztTQUNuQjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNsQjtJQUNILENBQUM7SUFFRCxJQUFJLENBQUMsS0FBYTtRQUNoQixNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2xELE9BQU8sS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUM7SUFDeEcsQ0FBQztJQUVELFlBQVk7UUFDVixNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2xELElBQUksTUFBYyxDQUFDO1FBQ25CLEdBQUc7WUFDRCxNQUFNLElBQUksR0FBRyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUEsZ0JBQU8sRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUMzRixNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFBLGdCQUFPLEVBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFBLGdCQUFPLEVBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzNELFFBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzVCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQixNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztRQUN4RCxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDWixJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztZQUNwQyxPQUFPLFVBQVUsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUU7Z0JBQzdDLE1BQU0sQ0FBQyxDQUFDO2dCQUNSLENBQUMsSUFBSSxJQUFJLENBQUM7YUFDWDtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUMxQyxPQUFPLFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUU7Z0JBQ3ZDLE1BQU0sQ0FBQyxDQUFDO2dCQUNSLENBQUMsSUFBSSxJQUFJLENBQUM7YUFDWDtTQUNGO0lBQ0gsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUFTLEdBQUcsS0FBSztRQUN4QixNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztRQUN4RCxPQUFPLEdBQUcsVUFBVSxJQUFJLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssS0FBSyxHQUFHLEdBQUcsUUFBUSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUM3SixDQUFDO0NBQ0Y7QUFsRUQsZ0NBa0VDIn0=