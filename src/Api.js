import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be anything frontend-specific here, and there shouldn't
 * be anything API-aware elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // there are multiple ways to pass an authorization token, this is how you pass it in the header.
    // this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get all companies */

  static async getAllCompanies(filter) {
    let res = await this.request("companies/", filter);
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }


  static async getAllJobs() {
    let res = await this.request("jobs/");
    return res.jobs;
  }


  static async register(userData) {
    let res = await this.request("auth/register", userData, "post");
    const token = res.token;
    JoblyApi.token = token;
    return token;
  }


  static async getToken(userData) {
    let res = await this.request("auth/token", userData, "post");
    const token = res.token;
    JoblyApi.token = token;
    return token;
  }

  static async getCredentials(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

// toast
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvYXN0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0MzUxNzE3M30.stx2uFSjrheeX0O3yZCnGuvL-gQCfPNiyNKB17uvNaY

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvYXN0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0MzUxODc0OX0.3ykkfgN213gLOrVg6BZZaYeyr9LJuIYDgRRWGYDFA64

export default JoblyApi;