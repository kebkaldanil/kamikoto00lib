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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0ZXJzLmpzIiwic291cmNlUm9vdCI6Imh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9rZWJrYWxkYW5pbC9rYW1pa290bzAwbGliL21hc3Rlci9zcmMvIiwic291cmNlcyI6WyJmb3JtYXRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDO0FBRTdCOzs7O0dBSUc7QUFDSCxTQUFnQixtQkFBbUIsQ0FBbUIsR0FBVyxFQUFFLE1BQWU7SUFDaEYsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDN0QsQ0FBQztBQUhELGtEQUdDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILFNBQWdCLElBQUksQ0FBQyxPQUE2QixFQUFFLEdBQUcsTUFBaUI7SUFDdEUsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUN4QixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsTUFBTSxHQUFHLEdBQUcsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4RSxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQzNCO0lBQ0QsT0FBTyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFURCxvQkFTQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLFlBQVksQ0FBQyxJQUFvQyxFQUFFLFFBQVEsR0FBRyxJQUFJO0lBQ2hGLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7SUFDcEUsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUUsQ0FBQztBQUpELG9DQUlDIn0=