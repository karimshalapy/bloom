import { afterAll, afterEach, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "../mocks/node";
import "@testing-library/jest-dom/vitest";

// Start listening on to the mock service worker server
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Stop listening to server after all tests are done
afterAll(() => server.close());

// Isolate each test from the previous one by resetting and cleaning up after each test
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
