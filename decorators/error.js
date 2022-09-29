"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const CustomError = (name) => (target) => void (target.prototype.name = target.name ?? name);
exports.CustomError = CustomError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2tlYmthbGRhbmlsL2thbWlrb3RvMDBsaWIvbWFzdGVyL3NyYy8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRU8sTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQWtCLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO0FBQW5ILFFBQUEsV0FBVyxlQUF3RyJ9