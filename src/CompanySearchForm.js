import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./Form.css";


/** A form to apply a filter to the company list */

const CompanySearchForm = ({ filter }) => {

  const [formData, setFormData] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData(formData => value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData("");
    filter(formData);
  }

  return (
    <Form onSubmit={handleSubmit} className="Form shadow">
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
      <Button color="primary">Search Companies</Button>
    </Form>
  );
}

export default CompanySearchForm;