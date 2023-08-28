import { IsFalse, IsTrue } from "../type-logic.ts";
import { IsUnion } from "./helpers.ts";

type UnionTest1 = IsUnion<1 | 2>;
// deno-lint-ignore ban-types
type UnionTest2 = IsUnion<{} | { optionalField?: string }>;
type NonUnionTest = IsUnion<1>;
type BooleanTest = IsUnion<boolean>;
type BooleanUnionTest = IsUnion<boolean | 1>;
const _unionTest1: IsTrue<UnionTest1> = true;
const _unionTest2: IsTrue<UnionTest2> = true;
const _notUnionTest: IsFalse<NonUnionTest> = true;
const _booleanTest: IsFalse<BooleanTest> = true;
const _booleanUnionTest: IsTrue<BooleanUnionTest> = true;

Deno.test({
  name: "Helpers test",
  fn() {},
});
