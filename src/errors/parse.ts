import { CustomError } from "./index.ts";

@CustomError()
export class ParseError extends Error {
  constructor(message?: string) {
    super(message);
  }
}