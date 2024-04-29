import { vi } from "vitest";

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addEventListener: function() {},
    removeEventListener: function() {}
  };
};

vi.mock('remix-themes', () => ({
  matches: vi.fn(),
  themeSessionResolver: vi.fn(),
  createThemeSessionResolver: vi.fn()
}))

