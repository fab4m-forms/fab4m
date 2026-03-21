import "@testing-library/jest-dom";

const NativeRequest = globalThis.Request;

class CompatibleRequest extends NativeRequest {
  constructor(input: RequestInfo | URL, init?: RequestInit) {
    super(input, init ? { ...init, signal: undefined } : init);
  }
}

globalThis.Request = CompatibleRequest as typeof Request;
