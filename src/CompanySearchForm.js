import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./Form.css";


/** A form to apply a filter to the company list */

const CompanySearchForm = ({ filter, clearFilter }) => {

  const [formData, setFormData] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData(formData => value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    filter(formData);
  }

  const handleClear = (e) => {
    e.preventDefault();
    clearFilter();
  }

  return (
    <Form className="Form shadow">
      <FormGroup>
        <Label for="search">Search Companies</Label>
        <Input
          type="text"
          id="search"
          name="search"
          value={formData}
          placeholder="Enter search term"
          onChange={handleChange}
          required
        />
      </FormGroup>
      <div>
        <Button onClick={handleSubmit} color="primary" className="m-1">Filter Companies</Button>
        <Button onClick={handleClear} color="secondary" className="m-1">Clear Filters</Button>
      </div>
    </Form>
  );
}

export default CompanySearchForm;