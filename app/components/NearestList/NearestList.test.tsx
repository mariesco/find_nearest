import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';

import { describe, it, expect } from "vitest";
import { createRemixStub } from '@remix-run/testing';
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import Index, { loader as indexLoader } from "@/routes/_index";


describe('NearestList', () => {

 const FindNearestStub = createRemixStub([{
      path: '/',
      loader: indexLoader,
      Component: Index
  }])

  it.todo('NearestList should show all cities if a search was not performed')
  it.todo('NearestList should displays 4 nearest cities correctly after a city is searched', async () => {});
  it.todo('NearestList should shows appropriate message or state when no results are available', async () => {});

});
