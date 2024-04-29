import { describe, it, expect } from "vitest";
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { createRemixStub } from '@remix-run/testing';

import Index, { loader as indexLoader } from "@/routes/_index";

describe('Full User Interaction Flow', () => {

 const FindNearestStub = createRemixStub([{
      path: '/',
      loader: indexLoader,
      Component: Index
  }])

  it.todo('The user can complete user flow from search city, and see nearest cities', async () => {
    render(<FindNearestStub initialEntries={['/']} />);

    // fireEvent.change(screen.getByRole('textbox'), { target: { value: 'San' } });
    // fireEvent.click(await screen.findByText('San Francisco'));
    // const results = await screen.findAllByRole('listitem');
    // expect(results).toHaveLength(3);
    // expect(results.map(node => node.textContent)).toEqual(['Oakland', 'Berkeley', 'San Jose']);
  });
});
