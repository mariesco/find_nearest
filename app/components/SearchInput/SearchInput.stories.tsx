import type { Args, Meta, StoryObj } from '@storybook/react'
import { createRemixStub } from '@remix-run/testing'
import Index, { loader as indexLoader, action as indexAction } from "@/routes/_index";

import SearchInput from '.'

interface ExtendedArgs extends Args {
  initialEntries?: string[];
}
const meta = {
  title: 'Components/SearchInput',
  component: SearchInput,
  decorators: [
    () => {
      const FindNearestStub = createRemixStub([{
          path: '/',
          loader: indexLoader,
          action: indexAction,
          Component: Index
      }])
      return <FindNearestStub initialEntries={['/']}/>;
    }
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>
export default meta
type Story = StoryObj<ExtendedArgs>
export const SearchInputComponent: Story = {
  args: {},
}
