"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinLengthError = void 0;
const error_1 = require("../decorators/error");
let MinLengthError = class MinLengthError extends Error {
    constructor(result, minLength) {
        super(`Result length (${result.length}) less than minimum length (${minLength})`);
    }
};
MinLengthError = __decorate([
    (0, error_1.CustomError)()
], MinLengthError);
exports.MinLengthError = MinLengthError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLWxlbmd0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lcnJvcnMvbWluLWxlbmd0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwrQ0FBa0Q7QUFHM0MsSUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBZSxTQUFRLEtBQUs7SUFHdkMsWUFBWSxNQUFnQixFQUFFLFNBQWlCO1FBQzdDLEtBQUssQ0FBQyxrQkFBa0IsTUFBTSxDQUFDLE1BQU0sK0JBQStCLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDcEYsQ0FBQztDQUNGLENBQUE7QUFOWSxjQUFjO0lBRDFCLElBQUEsbUJBQVcsR0FBRTtHQUNELGNBQWMsQ0FNMUI7QUFOWSx3Q0FBYyJ9