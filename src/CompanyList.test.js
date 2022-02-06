import CompanyList from "./CompanyList";
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom"

it("renders home with crashing", () => {
  render(
    <MemoryRouter>
      <CompanyList companies={[]} filter={() => { }} clearFilter={() => { }} />
    </MemoryRouter>
  );
});

it("matches the home snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyList companies={[]} filter={() => { }} clearFilter={() => { }} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});