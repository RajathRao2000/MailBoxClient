import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import keys from "../../../keys";

import { authActions } from "../../store/authSlice";


import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./SignIn.module.css";

const SignIn = () => {
  const dispatch=useDispatch()
  const history=useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    try {
      const res = await fetch(`${keys.SignInUrl}${keys.googleApiKey}`, {
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
      console.log("data", data);
      if (data.error) {
        alert(data.error.message);
      }else{
        e.target.email.value=""
        e.target.password.value=""
        dispatch(authActions.signin({...data}))
        history.replace("/welcome")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={`${classes["signin-form-container"]}`}>
        <Form className={`${classes["signin-form"]}`} onSubmit={handleSubmit}>
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
