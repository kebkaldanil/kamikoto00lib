"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inRange = exports.lessThen = void 0;
function lessThen(max) {
    return Math.random() * max | 0;
}
exports.lessThen = lessThen;
function inRange(from, to) {
    return (Math.random() * (to - from) + from) | 0;
}
exports.inRange = inRange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50LmpzIiwic291cmNlUm9vdCI6Imh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9rZWJrYWxkYW5pbC9rYW1pa290bzAwbGliL21hc3Rlci9zcmMvIiwic291cmNlcyI6WyJyYW5kb20vaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLFFBQVEsQ0FBQyxHQUFXO0lBQ2xDLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUZELDRCQUVDO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLElBQVksRUFBRSxFQUFVO0lBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFGRCwwQkFFQyJ9