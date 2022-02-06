import HomeAnon from "./HomeAnon";
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom"

it("renders anonymous home without crashing", () => {
  render(
    <MemoryRouter>
      <HomeAnon />
    </MemoryRouter>
  );
});

it("matches the home snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <HomeAnon />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});