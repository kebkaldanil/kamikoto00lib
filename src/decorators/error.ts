import { ErrorClass } from "../types";

export const CustomError = (name?: string | null) => (target: ErrorClass) => void (target.prototype.name = target.name ?? name);
