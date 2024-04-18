import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import keys from "../../../keys";

import { authActions } from "../../store/authSlice";
import useAuthAPI from "../../customHooks/useAuthAPI";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./SignIn.module.css";

const SignIn = () => {
  const {handleSignIn}=useAuthAPI()
  return (
    <>
      <div className={`${classes["signin-form-container"]}`}>
        <Form className={`${classes["signin-form"]}`} onSubmit={handleSignIn}>
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div className="form-msg ">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
