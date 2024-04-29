import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';

import { describe, it, expect } from "vitest";
import { createRemixStub } from '@remix-run/testing';
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import Index, { loader as indexLoader } from "@/routes/_index";


describe('SearchInput', () => {

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

  it.todo('SearchInput should display suggestions when typing begins', async () => {
    render(<FindNearestStub initialEntries={['/']} />);
    const searchButton = await waitFor(() =>  screen.getByTestId('search-button'));
    fireEvent.click(searchButton)


    // const ref = React.createRef()

    const searchInput = await waitFor(() =>  screen.getByTestId('search-input'));
    // console.log('SearchINPUTT', searchInput)
    //
    // fireEvent.change(searchInput, { target: { value: 'Bay' } });
    // expect(screen.getByText('Bay Minette')).toBeVisible(); 
  });

  it.todo('The component should not show any suggestions if the cities do not contain the searched word')

  it.todo('The user should be able to select a city from those suggested in the list', async () => {
    render(<FindNearestStub initialEntries={['/']} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'San' } });
    fireEvent.click(await screen.findByText('San Francisco'));
    expect(screen.getByRole('textbox')).toHaveValue('San Francisco');
  });

});
