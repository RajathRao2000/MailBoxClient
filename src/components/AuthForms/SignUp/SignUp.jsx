import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import keys from "../../../keys";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const [isValid, setIsValid] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = async (e) => {
    setIsValid();
    e.preventDefault();
    if (e.target.password.value != e.target.Cpassword.value) {
      setIsValid(false);
      alert("Passwords do not match");
      return;
    }
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
      console.log("data", data);
      if (data.error) {
        alert(data.error.message);
      } else {
        e.target.email.value = "";
        e.target.password.value = "";
        e.target.Cpassword.value = "";
        dispatch(authActions.signin({ ...data }));
        history.replace("/main-page");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${classes["signup-form-container"]}`}>
      <Form
        noValidate
        className={`${classes["signup-form"]}`}
        onSubmit={handleSubmit}
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
