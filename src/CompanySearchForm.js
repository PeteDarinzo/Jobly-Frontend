import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./CompanySearchForm.css";

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

    // <Form onSubmit={handleSubmit} className="CompanySearchForm">
    //   <FormGroup>
    //     <Label for="search">Filter Companies</Label>
    //     <Input
    //       type="text"
    //       id="search"
    //       name="search"
    //       value={formData}
    //       onChange={handleChange}>
    //     </Input>
    //   </FormGroup>
    //   <Button type="submit">Search Companies</Button>
    // </Form>
<div>
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="email" className="mr-sm-2">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="email@email.cool"
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="password" className="mr-sm-2">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>



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