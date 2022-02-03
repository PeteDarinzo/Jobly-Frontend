import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import "./Form.css";



const SignupForm = ({ register, error }) => {

  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  }

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData(formData => ({ ...formData, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
    setFormData(initialState);
  }

  return (
    <Form onSubmit={handleSubmit} className="Form shadow">
      <h1>Sign Up</h1>
      {error && <Alert color="danger">
        {error}
      </Alert>}
      <FormGroup>
        <Label for="username">Username</Label>
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="examplePassword"
          placeholder="password"
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="first name"
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="last name"
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="email"
          onChange={handleChange}
          required
        />
      </FormGroup>
      <Button color="primary" className="btn-lg">Submit</Button>
    </Form>
  );
}

export default SignupForm;