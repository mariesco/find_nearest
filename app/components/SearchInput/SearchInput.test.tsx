import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';

import { describe, it, expect } from "vitest";
import { createRemixStub } from '@remix-run/testing';
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import Index, { loader as indexLoader, action as indexAction } from "@/routes/_index";


describe('SearchInput', () => {

  const FindNearestStub = createRemixStub([{
      path: '/',
      loader: indexLoader,
      action: indexAction,
      Component: Index
  }])

  const renderButtonAndInput = async () => {
    render(<FindNearestStub initialEntries={['/']} />);
    const searchButton = await waitFor(() =>  screen.getByTestId('search-button'));
    expect(searchButton).toBeInTheDocument();
    fireEvent.click(searchButton)

    const searchInput = await waitFor(() =>  screen.getByTestId('search-input'));
    expect(searchInput).toBeVisible()
    return {
      searchInput
    }
  }

  it('Input for search should renders correctly when user click on button', async () => {
    await renderButtonAndInput()
  });

  it('SearchInput should display suggestions when typing begins', async () => {
    const { searchInput } = await renderButtonAndInput()
    fireEvent.change(searchInput, { target: { value: 'Ale' } });
    const citySearchedText = await waitFor(() =>  screen.getByText('Calera'));
    expect(citySearchedText).toBeVisible()

  });

  it('The component should not show any suggestions if the cities do not contain the searched word', async () => {
    const { searchInput } = await renderButtonAndInput()
    fireEvent.change(searchInput, { target: { value: 'xxnosexx' } });

    const noCityFoundText = await waitFor(() =>  screen.getByText('No cities found.'));
    expect(noCityFoundText).toBeVisible()

  })

  it('The user should be able to select a city from those suggested in the list', async () => {
    const { searchInput } = await renderButtonAndInput()
    fireEvent.change(searchInput, {
      target: { value: 'ale' }
    });

    const citySearchedText = await waitFor(() => screen.getByText('Calera'));
    fireEvent.click(citySearchedText);

    //TODO: Extend this test with correctly selection of city item [refactor of CommandItem mocks]
    expect(citySearchedText).toBeInTheDocument();
  });

});
