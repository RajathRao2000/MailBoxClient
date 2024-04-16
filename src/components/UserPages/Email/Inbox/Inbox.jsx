import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";

import classes from "./Inbox.module.css";
import keys from "../../../../keys";
import { useHistory } from "react-router-dom";

const Inbox = () => {
  const history = useHistory();
  const [inboxItems,setInboxItems]=useState([])

  const getInbox = async () => {
    const email = JSON.parse(localStorage.getItem("token")).Cemail;
    if (!email) {
      history.replace("/login");
    }
    const res = await fetch(`${keys.firebaseUrl}/${email}/inbox.json`);
    console.log(res);
    const data = await res.json();
    console.log(data);
    setInboxItems(data)

  };

  useEffect(() => {
    getInbox();
  }, []);
  return (
    <div className={classes["inbox-container"]}>
      <Stack gap={3}>

        {Object.keys(inboxItems).map(inboxid=>{
            const{emailBody,subject,to,from}=inboxItems[inboxid]
            return <button className={classes["inbox-item"]}>{from}</button>
        })}
      </Stack>
    </div>
  );
};

export default Inbox;
