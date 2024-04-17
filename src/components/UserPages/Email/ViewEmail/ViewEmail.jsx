import React from "react";

import classes from "./ViewEmail.module.css";

const ViewEmail = (props) => {
  const { from, to, date, emailBody, subject, setViewMsg } = props;
  return (
    <div className={classes["email-display"]}>
      <div className={classes["email-header"]}>
        <button onClick={() => setViewMsg(false)}>back</button>
        <div className={classes["email-info"]}>
          <p><strong>From</strong>: {from}</p>
          <p><strong>To: </strong>{to}</p>
          <p><strong>Sent On: </strong>{date}</p>
          <p><strong>Subject: </strong>{subject}</p>
        </div>
        <div className={classes["email-body"]}>
          <div
            className="preview"
            dangerouslySetInnerHTML={emailBody}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmail;
