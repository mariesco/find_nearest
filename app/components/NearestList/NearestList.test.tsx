import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';

import { describe, it, expect } from "vitest";
import { createRemixStub } from '@remix-run/testing';
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import Index, { loader as indexLoader, action as indexAction } from "@/routes/_index";


describe('NearestList', () => {

 const FindNearestStub = createRemixStub([{
      path: '/',
      loader: indexLoader,
      action: indexAction,
      Component: Index
  }])

  it('NearestList should show all cities if a search was not performed', async () => {
    render(<FindNearestStub initialEntries={['/']}/>);
    
    await waitFor(() => {
      expect(screen.getByTestId('nearest-list')).toBeInTheDocument();
    });

    const cities = screen.getAllByTestId('city-item');
    expect(cities.length).toBe(10);
    const paginationInfo= await waitFor(() =>  screen.getByTestId('pagination-info'));
    expect(paginationInfo).toHaveTextContent('Page 1 of')
  })

  it.todo('NearestList should displays 4 nearest cities correctly after a city is searched', async () => {

    render(<FindNearestStub initialEntries={['/']} />);
    const searchButton = await waitFor(() =>  screen.getByTestId('search-button'));
    expect(searchButton).toBeInTheDocument();
    fireEvent.click(searchButton)

    const searchInput = await waitFor(() =>  screen.getByTestId('search-input'));
    fireEvent.change(searchInput, {
      target: { value: 'ale' }
    });
    const searchForm = await waitFor(() => screen.getByTestId('search-form'))
    fireEvent.submit(searchForm);

    //TODO: Check mocks....submit is not dispatching the action for display 4 nearest cities
    await waitFor(() => {
      const displayedCities = screen.getAllByTestId('city-item');
      expect(displayedCities.length).toBe(4); 
    });
  });

  it.todo('NearestList should shows appropriate message or state when no results are available', async () => {});

});
