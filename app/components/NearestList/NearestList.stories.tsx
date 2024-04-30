import type { Args, Meta, StoryObj } from '@storybook/react'
import { createRemixStub } from '@remix-run/testing'
import Index, { loader as indexLoader, action as indexAction } from "@/routes/_index";

import NearestList from '.'

interface ExtendedArgs extends Args {
  initialEntries?: string[];
}
const meta = {
  title: 'Components/NearestList',
  component: NearestList,
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
} satisfies Meta<typeof NearestList>
export default meta
type Story = StoryObj<ExtendedArgs>
export const NearestListComponent: Story = {
  args: {},
}
