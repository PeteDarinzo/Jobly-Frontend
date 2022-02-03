import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./Form.css";

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
        />
      </FormGroup>
      <Button color="primary">Search Companies</Button>
    </Form>
  );
}

export default CompanySearchForm;