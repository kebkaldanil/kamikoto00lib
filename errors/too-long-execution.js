"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooLongExecution = void 0;
const decorators_1 = require("../decorators");
let TooLongExecution = class TooLongExecution extends Error {
    constructor(result, message, args) {
        super(message ?? undefined);
        this.result = result;
        if (args !== undefined) {
            this.args = args;
        }
    }
};
TooLongExecution = __decorate([
    (0, decorators_1.CustomError)()
], TooLongExecution);
exports.TooLongExecution = TooLongExecution;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vLWxvbmctZXhlY3V0aW9uLmpzIiwic291cmNlUm9vdCI6Imh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9rZWJrYWxkYW5pbC9rYW1pa290bzAwbGliL21hc3Rlci9zcmMvIiwic291cmNlcyI6WyJlcnJvcnMvdG9vLWxvbmctZXhlY3V0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDhDQUE0QztBQUdyQyxJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUE2QixTQUFRLEtBQUs7SUFHckQsWUFBWSxNQUFTLEVBQUUsT0FBdUIsRUFBRSxJQUFRO1FBQ3RELEtBQUssQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFWWSxnQkFBZ0I7SUFENUIsSUFBQSx3QkFBVyxHQUFFO0dBQ0QsZ0JBQWdCLENBVTVCO0FBVlksNENBQWdCIn0=