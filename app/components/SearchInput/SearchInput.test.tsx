import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';

import { describe, it, expect } from "vitest";
import { createRemixStub } from '@remix-run/testing';
import { render, screen, waitFor } from '@testing-library/react'
import Index, { loader as indexLoader } from "@/routes/_index";


describe('AutocompleteInput', () => {

 const FindNearestStub = createRemixStub([{
      path: '/',
      loader: indexLoader,
      Component: Index
  }])

  it('SearchInput renders correctly', async () => {
    render(<FindNearestStub initialEntries={['/']} />);
    const searchButton = await waitFor(() =>  screen.getByTestId('search-button'));
    expect(searchButton).toBeInTheDocument();
  });

  // it('displays suggestions when user types', async () => {
  //   render(<AutocompleteInput />);
  //   fireEvent.change(screen.getByRole('textbox'), { target: { value: 'San' } });
  //   expect(await screen.findByText('San Francisco')).toBeVisible();
  // });
  //
  // it('selects a suggestion', async () => {
  //   render(<AutocompleteInput />);
  //   fireEvent.change(screen.getByRole('textbox'), { target: { value: 'San' } });
  //   fireEvent.click(await screen.findByText('San Francisco'));
  //   expect(screen.getByRole('textbox')).toHaveValue('San Francisco');
  // });
});
