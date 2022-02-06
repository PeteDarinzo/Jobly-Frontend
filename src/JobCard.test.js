import JobCard from "./JobCard";
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom"

it("renders a job card without crashing", () => {
  render(
    <MemoryRouter>
      <JobCard id={1} title="test-job" salary={1000} equity={0} companyName="test-company" apply={() => { }} applied={false} />
    </MemoryRouter>
  );
});

it("matches the home snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <JobCard id={1} title="test-job" salary={1000} equity={0} companyName="test-company" apply={() => { }} applied={false} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});