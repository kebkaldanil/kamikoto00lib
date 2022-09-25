"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const CustomError = (name) => (target) => void (target.prototype.name = target.name ?? name);
exports.CustomError = CustomError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGVjb3JhdG9ycy9lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFTyxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQW9CLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBa0IsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUM7QUFBbkgsUUFBQSxXQUFXLGVBQXdHIn0=