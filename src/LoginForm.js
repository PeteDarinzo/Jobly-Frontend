import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import "./Form.css"

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
      <Form onSubmit={handleSubmit} className="Form shadow">
        <h1>Log In</h1>
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
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="password"
            onChange={handleChange}
          />
        </FormGroup>
        <Button color="primary" className="btn-lg">Submit</Button>
      </Form>
  );
}

export default LoginForm;