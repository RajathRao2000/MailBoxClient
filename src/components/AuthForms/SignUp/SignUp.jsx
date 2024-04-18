import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import useAuthAPI from "../../customHooks/useAuthAPI"

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import keys from "../../../keys";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const {handleSignUp}=useAuthAPI()
  return (
    <div className={`${classes["signup-form-container"]}`}>
      <Form
        noValidate
        className={`${classes["signup-form"]}`}
        onSubmit={handleSignUp}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="abc@zyxw.com"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="Cpassword"
            type="password"
            placeholder="Confirm Password"
            required
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
