import { CustomError } from "../decorators";

@CustomError()
export class UnsafeNumber extends Error {}
