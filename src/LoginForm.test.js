import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom"
import LoginForm from "./LoginForm";

it("renders signup form without crashing", () => {
  render(
    <MemoryRouter>
      <LoginForm login={() => { }} error="" />
    </MemoryRouter>
  );
});

it("matches the home snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <LoginForm login={() => { }} error="" />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});