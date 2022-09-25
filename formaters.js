"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatedTime = exports.time = exports.alignNumberToLength = void 0;
const nulls = "000000000000";
/**
 * @param num number to align
 * @param length result length
 * @returns number converted to string aligned by length
 */
function alignNumberToLength(num, length) {
    const bs = "" + Math.trunc(num);
    return nulls.slice(nulls.length + bs.length - length) + bs;
}
exports.alignNumberToLength = alignNumberToLength;
/**
 * tag function for time formatting
 *
 * @example
 * const date = new Date();
 * const hours = date.getHours();
 * const minutes = date.getMinutes();
 * const seconds = date.getSeconds();
 * consloe.log(time\`${hours}:${minutes}:${seconds}\`);
 * //"14:28:03"
 */
function time(strings, ...params) {
    let res = "";
    let i = 0;
    while (i < params.length) {
        const tmp = params[i];
        const num = typeof tmp === "number" ? alignNumberToLength(tmp, 2) : tmp;
        res += strings[i++] + num;
    }
    return res + strings[i];
}
exports.time = time;
/**
 * @returns fromated time
 * @example "14:28:03.049"
 */
function formatedTime(date, showMili = true) {
    const p = (date == null ? new Date() : date instanceof Date ? date : new Date(date));
    const r = time `${p.getHours()}:${p.getMinutes()}:${p.getSeconds()}`;
    return showMili ? r + "." + alignNumberToLength(p.getMilliseconds(), 3) : r;
}
exports.formatedTime = formatedTime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Zvcm1hdGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFNLEtBQUssR0FBRyxjQUFjLENBQUM7QUFFN0I7Ozs7R0FJRztBQUNILFNBQWdCLG1CQUFtQixDQUFtQixHQUFXLEVBQUUsTUFBZTtJQUNoRixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUM3RCxDQUFDO0FBSEQsa0RBR0M7QUFFRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsU0FBZ0IsSUFBSSxDQUFDLE9BQTZCLEVBQUUsR0FBRyxNQUFpQjtJQUN0RSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFO1FBQ3hCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLEdBQUcsR0FBRyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hFLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7S0FDM0I7SUFDRCxPQUFPLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQVRELG9CQVNDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBZ0IsWUFBWSxDQUFDLElBQW9DLEVBQUUsUUFBUSxHQUFHLElBQUk7SUFDaEYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDckYsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFBLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztJQUNwRSxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5RSxDQUFDO0FBSkQsb0NBSUMifQ==