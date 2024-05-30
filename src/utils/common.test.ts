import { describe, test, expect } from "vitest";
import { safelyParseJSON } from "./common";

describe("Common utilities should work ok", () => {
  test("safelyParseJSON should return a javascript object", () => {
    expect(safelyParseJSON('{"key":"value"}')).toEqual({ key: "value" });
    expect(safelyParseJSON('{"key":1}')).toEqual({ key: 1 });
    expect(safelyParseJSON('"test"')).toEqual("test");
  });

  test("safelyParseJSON shouldn't throw an error and return null when JSON is invalid", () => {
    expect(safelyParseJSON('{"key":""')).toBe(null);
    expect(safelyParseJSON("undefined")).toBe(null);
  });
});
