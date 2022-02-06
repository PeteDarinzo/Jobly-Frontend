import CompanyDetail from "./CompanyDetail";
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from "react-router-dom";



it("renders home with crashing", () => {
  render(
    <MemoryRouter initialEntries={["/companies/test"]}>
      <Route path="/companies/handle">
        <CompanyDetail companies={[]} jobs={[]} apply={() => { }} applications={() => { }} />
      </Route>
    </MemoryRouter>
  );
});

it("matches the home snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/companies/test"]}>
      <Route path="/companies/handle">
        <CompanyDetail companies={[]} jobs={[]} apply={() => { }} applications={() => { }} />
      </Route>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});