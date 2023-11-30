import { ErrorClass } from "../types/helpers.ts";

export const CustomError =
  (name?: string | null) =>
  <const T extends ErrorClass>(target: T, _?: ClassDecoratorContext<T>) =>
    void (target.prototype.name = name ?? target.name);
