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


  /** Get a list of all jobs in the database */
  static async getAllJobs() {
    let res = await this.request("jobs/");
    return res.jobs;
  }

  /** Register a new user */

  static async register(userData) {
    let res = await this.request("auth/register", userData, "post");
    const token = res.token;
    JoblyApi.token = token;
    return token;
  }

  /** Get a token for an existing user */

  static async getToken(userData) {
    let res = await this.request("auth/token", userData, "post");
    const token = res.token;
    JoblyApi.token = token;
    return token;
  }

  /** Get an existing user's credentials */

  static async getCredentials(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update an existing user's credentials  */

  static async updateCredentials(username, userData) {
    let res = await this.request(`users/${username}`, userData, "patch")
    return res.user;
  }

  /** Apply to a job */

  static async apply(username, id) {
    let res = await this.request(`users/${username}/jobs/${id}`, {}, "post");
    return res.applied;
  }

}

export default JoblyApi;