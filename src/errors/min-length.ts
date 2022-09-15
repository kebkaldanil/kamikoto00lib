import { CustomError } from "../decorators/error";

@CustomError()
export class MinLengthError extends Error {
  result: string[];

  constructor(result: string[], minLength: number) {
    super(`Result length (${result.length}) less than minimum length (${minLength})`);
  }
}
