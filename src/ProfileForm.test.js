import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom"
import ProfileForm from "./ProfileForm";

it("renders signup form without crashing", () => {
  render(
    <MemoryRouter>
      <ProfileForm updateUser={() => { }} username="" firstName="" lastName="" email="" error="" />
    </MemoryRouter>
  );
});

it("matches the home snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <ProfileForm updateUser={() => { }} username="" firstName="" lastName="" email="" error="" />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});