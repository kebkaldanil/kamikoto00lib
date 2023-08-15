import { CustomError } from "../decorators/error.ts";

@CustomError()
export class MinLengthError extends Error {
  constructor(public result: string[], public minLength: number) {
    super(
      `Result length (${result.length}) less than minimum length (${minLength})`,
    );
  }
}
