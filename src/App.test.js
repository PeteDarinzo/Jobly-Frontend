import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

// import { rest } from "msw";
// import { setupServer } from "msw/node";


// const server = setupServer(
//   rest.get("http://localhost:3001/companies", (req, res, ctx) => {
//     res(
//       ctx.json({
//         data: {
//           companies:
//             [
//               {
//                 handle: 'bauer-gallagher',
//                 name: 'Bauer-Gallagher',
//                 numEmployees: 862,
//                 description: 'Difficult ready trip question produce produce someone.',
//                 logoUrl: null
//               }
//             ]
//         }
//       })
//     )
//   }),
//   rest.get("http://localhost:3001/jobs", (req, res, ctx) => {
//     res(
//       ctx.json({
//         data:
//         {
//           jobs:
//             [
//               {
//                 title: 'Conservator, furniture',
//                 salary: 110000,
//                 equity: 0,
//                 companyHandle: 'watson-davis'
//               }
//             ]
//         }
//       })
//     )
//   })
// );

// beforeAll(() => server.listen());
// afterAll(() => server.close());
// afterEach(() => server.resetHandlers());

it("renders without crashing", function () {
  render(<App />);
});