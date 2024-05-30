import { afterAll, afterEach, beforeAll, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from "../src/mocks/node";
import "@testing-library/jest-dom/vitest";

expect.extend(matchers);

// Start listening on to the mock service worker server
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Stop listening to server after all tests are done
afterAll(() => server.close());

// Isolate each test from the previous one by resetting and cleaning up after each test
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
