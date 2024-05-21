import React from "react";

import classes from "./ViewEmail.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "react-bootstrap";

const ViewEmail = (props) => {
  const { from, to, date, emailBody, subject, setViewMsg } = props;
  return (
    <div className={classes["email-display"]}>
      <div className={classes["email-header"]}>
      <div >
      <Button style={{border:"none",backgroundColor:"transparent"}} variant="dark" onClick={() => setViewMsg(false)}><IoMdArrowRoundBack color={"black"} size={25}/></Button>

      </div>
        <div className={classes["email-info"]}>
          <p><strong>From</strong>: {from}</p>
          <p><strong>To: </strong>{to}</p>
          <p><strong>Sent On: </strong>{date}</p>
          <p><strong>Subject: </strong>{subject}</p>
        </div>
        </div>
        <div className={classes["email-body"]}>
          <div
            className="preview"
            dangerouslySetInnerHTML={emailBody}
          ></div>
      </div>
    </div>
  );
};

export default ViewEmail;
