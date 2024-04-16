import React from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import keys from "../../../keys";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    try {
      const res = await fetch(`${keys.SignUpUrl}${keys.googleApiKey}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
          returnSecureToken: true,
        }),
      });
      let data = await res.json();
      console.log("data", data, data.error);
      if (data.error) {
        alert(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${classes["signup-form-container"]}`}>
      <Form className={`${classes["signup-form"]}`} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="Cpassword"
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div className="form-msg ">
        <p>
          Have an account? <Link to="/signin">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
