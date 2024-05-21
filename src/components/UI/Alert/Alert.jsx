import React from "react";
import classes from "./Alert.module.css";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { uiactions } from "../../store/UISlice";
import { Alert } from "react-bootstrap";
const AlertMsg = (props) => {
  const value=useSelector(state=>state.ui)
  const dispatch=useDispatch()
    return (
      <div className={classes["alert-bg"]}>
        <Alert variant={value.variant} onClose={()=>dispatch(uiactions.setShowAlert())} dismissible>
          <Alert.Heading>{value.head}</Alert.Heading>
          <p>{value.details}</p>
        </Alert>
      </div>
    );
};

export default AlertMsg;
