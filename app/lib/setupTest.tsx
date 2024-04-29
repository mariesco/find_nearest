import React from "react";
import { vi } from "vitest";

global.window.scrollTo = vi.fn();

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


vi.mock('cmdk', () => {
  const MockComponent = React.forwardRef((props, ref) => <div ref={ref} {...props} />);

  // MockComponent.displayName = 'MockComponent';

  // const MockComponent = React.forwardRef((props, ref) => <div ref={ref} displayName="MockComponent" {...props}>{props.children}</div>);


  return {
    Command: {
      ResizeObserver: vi.fn(),
      Input: MockComponent,
      List: MockComponent,
      Empty: MockComponent,
      Group: MockComponent,
      Separator: MockComponent,
      Item: MockComponent
    }
  };
});
