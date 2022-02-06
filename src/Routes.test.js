import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Routes from "./Routes";


it("renders routes without crashing", () => {
  render(
    <MemoryRouter>
      <Routes companies={[]} jobs={[]} register={() => { }} login={() => { }} updateUser={() => { }} apply={() => { }} filter={() => { }} clearFilter={() => { }} applications={[]} loggedIn="" userCredentials={{}} loginError="" signupError="" profileError="" />
    </MemoryRouter>
  )
});

it("renders matches the router snapshot when logged out", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <Routes companies={[]} jobs={[]} register={() => { }} login={() => { }} updateUser={() => { }} apply={() => { }} filter={() => { }} clearFilter={() => { }} applications={[]} loggedIn="" userCredentials={{}} loginError="" signupError="" profileError="" />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("renders matches the router snapshot when logged in", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <Routes companies={[]} jobs={[]} register={() => { }} login={() => { }} updateUser={() => { }} apply={() => { }} filter={() => { }} clearFilter={() => { }} applications={[]} loggedIn="test-token" userCredentials={{}} loginError="" signupError="" profileError="" />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
