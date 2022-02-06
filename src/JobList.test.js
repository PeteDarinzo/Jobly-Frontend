import JobList from "./JobList";
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom"

it("renders a job list without crashing", () => {
  render(
    <MemoryRouter>
      <JobList jobs={[]} apply={() => { }} applications={[]} />
    </MemoryRouter>
  );
});

it("matches the job list snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <JobList jobs={[]} apply={() => { }} applications={[]} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});