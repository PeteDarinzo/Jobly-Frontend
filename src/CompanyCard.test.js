import CompanyCard from "./CompanyCard";
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom"

it("renders home with crashing", () => {
  render(
    <MemoryRouter>
      <CompanyCard name="test company" description="a test company" />
    </MemoryRouter>
  );
});

it("matches the home snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyCard name="test company" description="a test company" />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});