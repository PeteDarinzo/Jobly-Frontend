import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NavBar from "./NavBar";

it("renders a navbar without crashing", () => {
  render(
    <MemoryRouter>
      <NavBar loggedIn="test-token" logout={() => { }} />
    </MemoryRouter>
  )
});

it("matches the navbar snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <NavBar loggedIn="test-token" logout={() => { }} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches the navbar snapshot when logged out", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <NavBar loggedIn="" logout={() => { }} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});