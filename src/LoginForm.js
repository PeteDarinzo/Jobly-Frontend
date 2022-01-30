import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';


const LoginForm = ({ login }) => {

  const initialState = {
    username: "",
    password: "",
  }

  const [formData, setFormData] = useState(initialState);
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData(formData => ({ ...formData, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
    setFormData(initialState);
    history.push("/");
  }


  return (
    <div>
      <h1>Log In</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="password placeholder"
            onChange={handleChange}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
}

export default LoginForm;