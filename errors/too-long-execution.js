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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vLWxvbmctZXhlY3V0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Vycm9ycy90b28tbG9uZy1leGVjdXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsOENBQTRDO0FBR3JDLElBQU0sZ0JBQWdCLEdBQXRCLE1BQU0sZ0JBQTZCLFNBQVEsS0FBSztJQUdyRCxZQUFZLE1BQVMsRUFBRSxPQUF1QixFQUFFLElBQVE7UUFDdEQsS0FBSyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDbEI7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQVZZLGdCQUFnQjtJQUQ1QixJQUFBLHdCQUFXLEdBQUU7R0FDRCxnQkFBZ0IsQ0FVNUI7QUFWWSw0Q0FBZ0IifQ==