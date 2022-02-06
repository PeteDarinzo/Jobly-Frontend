import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom"
import SignupForm from "./SignupForm";

it("renders signup form without crashing", () => {
  render(
    <MemoryRouter>
      <SignupForm register={() => { }} error="" />
    </MemoryRouter>
  );
});

it("matches the home snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <SignupForm register={() => { }} error="" />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});