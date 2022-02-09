import React from "react";
import { render, fireEvent, getByLabelText } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { act } from "react-dom/test-utils";

const testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VybmFtZSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDQyODY2NTd9.dCRt06mTos9loSuR9dhwnsIa-Rh-wGDam7Wcme5zsG8";

const updateToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VybmFtZSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDQzNzc5MzJ9.ZUV9GsWUZVv5zOOpouWbmI7-CdtpeeF2NJ1V47olb6s";

const companiesDb = {
  companies:
    [
      {
        handle: 'bauer-gallagher',
        name: 'Bauer-Gallagher',
        numEmployees: 862,
        description: 'Difficult ready trip question produce produce someone.',
        logoUrl: null
      }
    ]
}

const jobsDb = {
  jobs:
    [
      {
        title: 'Conservator, furniture',
        salary: 110000,
        equity: 0,
        companyHandle: 'watson-davis'
      }
    ]
}

const usersDb = {
  testuser: {
    username: "testusername",
    firstName: "testfirst",
    lastName: "testlast",
    email: "test@test.com",
    isAdmin: false,
    applications: []
  }
}

const server = setupServer(
  rest.get("http://localhost:3001/companies/", (req, res, ctx) => {
    return res(
      ctx.json(companiesDb))
  }),
  rest.get("http://localhost:3001/jobs/", (req, res, ctx) => {
    return res(
      ctx.json(jobsDb))
  }),
  rest.get("http://localhost:3001/users/:username", (req, res, ctx) => {
    return res(
      ctx.json({
        user: usersDb.testuser
      })
    )
  }),
  rest.post("http://localhost:3001/auth/token", (req, res, ctx) => {
    return res(
      ctx.json({
        token: testToken
      })
    )
  }),
  rest.post("http://localhost:3001/auth/register", (req, res, ctx) => {
    return res(
      ctx.json({
        token: testToken
      })
    )
  }),
  rest.patch("http://localhost:3001/users/:username", (req, res, ctx) => {
    const { firstName, lastName, email } = req.body;

    usersDb.testuser = { ...usersDb.testuser, [firstName]: firstName, [lastName]: lastName, [email]: email };

    return res(
      ctx.json({
        user: usersDb.testuser
      })
    )
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  // log the user out after each test
  if (localStorage.getItem("joblyToken")) localStorage.removeItem("joblyToken");
});

it("renders without crashing", async function () {
  const { findByText, getByText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(await findByText("Your dream job...")).toBeInTheDocument();
  expect(getByText("...just a click away.")).toBeInTheDocument();
});


// /** POST REGISTER */
it("allows a user to signup", async function () {

  const { findByText, getByText, getByLabelText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const signupLink = await findByText("Sign Up");
  fireEvent.click(signupLink);
  expect(getByText("Sign Up")).toBeInTheDocument();

  const username = getByLabelText("Username");
  const password = getByLabelText("Password");
  const firstName = getByLabelText("First Name");
  const lastName = getByLabelText("Last Name");
  const email = getByLabelText("Email");
  const btn = getByText("Submit");

  fireEvent.change(username, { target: { value: "testusername" } });
  fireEvent.change(password, { target: { value: "testpassword" } });
  fireEvent.change(firstName, { target: { value: "testfirst" } });
  fireEvent.change(lastName, { target: { value: "testlast" } });
  fireEvent.change(email, { target: { value: "test@test.com" } });

  fireEvent.click(btn);

  expect(await findByText("Welcome back, testusername!")).toBeInTheDocument();
});


/** POST LOGIN */
it("allows a user to login", async function () {

  const { findByText, getByText, getByLabelText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const loginLink = await findByText("Log In");
  fireEvent.click(loginLink);
  expect(getByText("Log In")).toBeInTheDocument();

  const username = getByLabelText("Username");
  const password = getByLabelText("Password");
  const btn = getByText("Submit");

  fireEvent.change(username, { target: { value: "testusername" } });
  fireEvent.change(password, { target: { value: "testpassword" } });

  fireEvent.click(btn);

  expect(await findByText("Welcome back, testusername!")).toBeInTheDocument();
});



it("allows a user to edit their profile", async function () {

  const { findByText, getByText, getByLabelText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const loginLink = await findByText("Log In");
  fireEvent.click(loginLink);
  expect(getByText("Log In")).toBeInTheDocument();

  const username = getByLabelText("Username");
  const password = getByLabelText("Password");
  const loginBtn = getByText("Submit");

  fireEvent.change(username, { target: { value: "testusername" } });
  fireEvent.change(password, { target: { value: "testpassword" } });
  fireEvent.click(loginBtn);

  const profileLink = await findByText("Profile");
  fireEvent.click(profileLink);

  expect(await findByText("Edit Profile")).toBeInTheDocument();
  expect(getByText("testusername")).toBeInTheDocument();

  const firstName = getByLabelText("First Name");
  const lastName = getByLabelText("Last Name");
  const email = getByLabelText("Email");
  const passwordConfirm = getByLabelText("Provide password to confirm changes");
  const profileBtn = getByText("Submit");

  fireEvent.change(firstName, { target: { value: "newfirst" } });
  fireEvent.change(lastName, { target: { value: "newlast" } });
  fireEvent.change(email, { target: { value: "newemail@test.com" } });
  fireEvent.change(passwordConfirm, { target: { value: "testpassword" } });
  fireEvent.click(profileBtn);


  fireEvent.click(await findByText("Profile"));
  expect(await findByText("Edit Profile")).toBeInTheDocument();

  // verify credentials have been updated
  expect(getByLabelText("First Name")).toHaveValue("newfirst");
  expect(getByLabelText("Last Name")).toHaveValue("newlast");
  expect(getByLabelText("Email")).toHaveValue("newemail@test.com");

});
