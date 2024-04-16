import React from 'react'
import { useHistory } from 'react-router-dom'

import SignUp from './SignUp/SignUp'
import SignIn from './SignIn/SignIn'

import classes from "./AuthForms.module.css"

const AuthForms = () => {
  const history=useHistory()
  return (
    <>
    <SignUp />
    <SignIn />
    <div className={classes["form-msg "]}>
        {history.location.pathname === "/login" && (
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        )}
        {history.location.pathname === "/signup" && (
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        )}
      </div>
    </>
  )
}

export default AuthForms