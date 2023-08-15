import { ErrorClass } from "../types/helpers.ts";

export const CustomError =
  (name?: string | null) => <const T extends ErrorClass>(target: T) =>
    void (target.prototype.name = name ?? target.name);
