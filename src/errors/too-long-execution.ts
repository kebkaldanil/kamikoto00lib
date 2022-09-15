import { CustomError } from "../decorators";

@CustomError()
export class TooLongExecution<T, A = any> extends Error {
  result: T;
  args?: A;
  constructor(result: T, message?: string | null, args?: A) {
    super(message ?? undefined);
    this.result = result;
    if (args !== undefined) {
      this.args = args;
    }
  }
}
