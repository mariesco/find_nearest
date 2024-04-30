import * as React from 'react';
import { ComponentProps } from 'react';
import { vi } from "vitest";

import {
  Popover as OriginalPopover,
  PopoverTrigger as OriginalPopoverTrigger,
  PopoverContent as OriginalPopoverContent,
} from "@/components/ui/popover";

import {
  Drawer as OriginalDrawer,
  DrawerTrigger as OriginalDrawerTrigger,
  DrawerContent as OriginalDrawerContent,
} from "@/components/ui/drawer";

import {
  Command as OriginalCommand,
  CommandInput as OriginalCommandInput,
  CommandList as OriginalCommandList,
  CommandItem as OriginalCommandItem,
  CommandGroup as OriginalCommandGroup,
  CommandEmpty as OriginalCommandEmpty,
} from "@/components/ui/command";

global.window.scrollTo = vi.fn();

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addEventListener: function() {},
    removeEventListener: function() {}
  };
};

vi.mock("@radix-ui/react-slot", () => ({
  Slot: vi.fn()
}))

vi.mock('tailwind-merge', () => ({
  twMerge: vi.fn()
}))

vi.mock('remix-themes', () => ({
  matches: vi.fn(),
  themeSessionResolver: vi.fn(),
  createThemeSessionResolver: vi.fn()
}))

vi.mock('@radix-ui/react-icons', () => ({
  MagnifyingGlassIcon: vi.fn(),
  PaperPlaneIcon: vi.fn(),
  Cross1Icon: vi.fn()
}))

vi.mock('@radix-ui/react-dialog', () => ({
  DialogProps: vi.fn(),
  Root: vi.fn(),
  Trigger: vi.fn(),
  Portal: vi.fn(),
  Close:  vi.fn(),
  Overlay: {
    displayName: vi.fn()
  },
  Content: vi.fn(),
  Title: vi.fn(),
  Description: vi.fn(),
}))


const Popover: React.FC<ComponentProps<typeof OriginalPopover>> = ({ children, open, onOpenChange }) => {
  const handleOpenChange = (newOpen: boolean) => {
    if (typeof onOpenChange === 'function') {
      onOpenChange(newOpen);
    }
  };

  return <div onClick={() => handleOpenChange(!open)}>{children}</div>;
};
const PopoverTrigger: React.FC<ComponentProps<typeof OriginalPopoverTrigger>> = ({ children }) => <div>{children}</div>;
const PopoverContent: React.FC<ComponentProps<typeof OriginalPopoverContent>> = ({ children }) => <div>{children}</div>;

vi.mock('@/components/ui/popover', () => ({
  Popover,
  PopoverTrigger,
  PopoverContent,
}));

const Drawer: React.FC<ComponentProps<typeof OriginalDrawer>> = ({ children }) => <div>{children}</div>;
const DrawerTrigger: React.FC<ComponentProps<typeof OriginalDrawerTrigger>> = ({ children }) => <div>{children}</div>;
const DrawerContent: React.FC<ComponentProps<typeof OriginalDrawerContent>> = ({ children }) => <div>{children}</div>;

vi.mock('@/components/ui/drawer', () => ({
  Drawer,
  DrawerTrigger,
  DrawerContent,
}));

const Command: React.FC<ComponentProps<typeof OriginalCommand>> = ({ children }) => <div>{children}</div>;
const CommandInput: React.FC<ComponentProps<typeof OriginalCommandInput>> = (props) => <input {...props} />;
const CommandList: React.FC<ComponentProps<typeof OriginalCommandList>> = ({ children }) => <ul>{children}</ul>;
const CommandItem: React.FC<ComponentProps<typeof OriginalCommandItem>> = ({ children, onSelect, value }) => (
  <li onClick={() => onSelect(value)}>{children}</li>
);
const CommandGroup: React.FC<ComponentProps<typeof OriginalCommandGroup>> = ({ children }) => <div>{children}</div>;
const CommandEmpty: React.FC<ComponentProps<typeof OriginalCommandEmpty>> = ({ children }) => <span>{children}</span>;

vi.mock('@/components/ui/command', () => ({
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
}));
