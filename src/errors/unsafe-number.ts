import { CustomError } from "../decorators/error.ts";

@CustomError()
export class UnsafeNumber extends Error {}
