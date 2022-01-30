import React, { useState } from "react";
import { Col, Button, Form, FormGroup, Input, Label } from "reactstrap";

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

    <Form onSubmit={handleSubmit} inline>
      <FormGroup row>
        <Label for="search">Filter Companies</Label>
        <Input
          type="text"
          id="search"
          name="search"
          value={formData}
          onChange={handleChange}>
        </Input>
      </FormGroup>
      <Button type="submit">Search Companies</Button>
    </Form>

    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label htmlFor="search">
    //       Filter
    //     </label>
    //     <input
    //       id="search"
    //       name="search"
    //       value={formData}
    //       onChange={handleChange}
    //     />
    //   </div>
    //   <Button
    //     type="submit">
    //     Search
    //   </Button>
    // </form>
  );
}

export default CompanySearchForm;