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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLWxlbmd0aC5qcyIsInNvdXJjZVJvb3QiOiJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20va2Via2FsZGFuaWwva2FtaWtvdG8wMGxpYi9tYXN0ZXIvc3JjLyIsInNvdXJjZXMiOlsiZXJyb3JzL21pbi1sZW5ndGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsK0NBQWtEO0FBRzNDLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWUsU0FBUSxLQUFLO0lBR3ZDLFlBQVksTUFBZ0IsRUFBRSxTQUFpQjtRQUM3QyxLQUFLLENBQUMsa0JBQWtCLE1BQU0sQ0FBQyxNQUFNLCtCQUErQixTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7Q0FDRixDQUFBO0FBTlksY0FBYztJQUQxQixJQUFBLG1CQUFXLEdBQUU7R0FDRCxjQUFjLENBTTFCO0FBTlksd0NBQWMifQ==