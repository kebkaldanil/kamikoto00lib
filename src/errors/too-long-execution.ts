import { CustomError } from "../decorators/error.ts";

@CustomError()
export class TooLongExecution<T, A> extends Error {
  args?: A;
  constructor(public result: T, message?: string | null, args?: A) {
    super(message ?? undefined);
    if (args !== undefined) {
      this.args = args;
    }
  }
}
