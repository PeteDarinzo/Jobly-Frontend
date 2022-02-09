import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import "./Form.css"

const ProfileForm = ({ updateUser, username, firstName, lastName, email, error }) => {

  const initialState = {
    username,
    firstName,
    lastName,
    email,
    password: ""
  }

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData(formData => ({ ...formData, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
  }

  return (
    <Form onSubmit={handleSubmit} className="Form shadow">
      <h1>Edit Profile</h1>
      {error && <Alert color="danger">
        {error}
      </Alert>}
      <FormGroup>
        <Label for="username">Username</Label>
        <p id="username">
          {username}
        </p>
      </FormGroup>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
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
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Provide password to confirm changes</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
          required
        />
      </FormGroup>
      <Button color="primary" className="btn-lg">Submit</Button>
    </Form>
  );
}

export default ProfileForm;