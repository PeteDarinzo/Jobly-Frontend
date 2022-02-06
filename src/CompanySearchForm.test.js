import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom"
import CompanySearchForm from "./CompanySearchForm";

it("renders signup form without crashing", () => {
  render(
    <MemoryRouter>
      <CompanySearchForm filter={() => { }} clearFilter={() => { }} />
    </MemoryRouter>
  );
});

it("matches the home snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanySearchForm filter={() => { }} clearFilter={() => { }} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});