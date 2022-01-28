import React, { useState } from "react";
import CompanyList from "./CompanyList";

const CompanySearchForm = ({ filter }) => {

  const [formData, setFormData] = useState("");


  const handleChange = (e) => {
    const { value } = e.target;
    setFormData(formData => value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    filter(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
        </label>
        <input
          id="search"
          name="search"
          value={formData}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit">
        Search
      </button>
    </form>
  );
}

export default CompanySearchForm;