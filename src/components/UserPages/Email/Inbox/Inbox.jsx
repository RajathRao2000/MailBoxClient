import React, { useState } from "react";
import Stack from "react-bootstrap/Stack";
import { GoDotFill } from "react-icons/go";
import classes from "./Inbox.module.css";
import keys from "../../../../keys";
import ViewEmail from "../ViewEmail/ViewEmail";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";

const Inbox = () => {
  const [viewMsg, setViewMsg] = useState(false);
  const [emailDetails, setEmailDetails] = useState({});

  const email = useSelector((state) => state.email);

  const renderEmail = (data) => {
    setEmailRead(data.inboxid, data.to);
    setViewMsg(true);
    setEmailDetails(data);
  };

  const setEmailRead = async (id, to) => {
    const res = await fetch(
      `${keys.firebaseUrl}/${to.replace(/[.@]/g, "")}/inbox/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unread: false,
        }),
      }
    );
    const data = await res.json();
    // console.log(data);
  };

  const deleteItem = async (id, to) => {
    const res = await fetch(
      `${keys.firebaseUrl}/${to.replace(/[.@]/g, "")}/inbox/${id}.json`,
      {
        method: "DELETE",
      }
    );
    // console.log(id, to, res);
  };

  return (
    <div className={classes["inbox-container"]}>
      {viewMsg && (
        <div className={classes["email-display-bg"]}>
          <div>
            <ViewEmail
              emailBody={emailDetails.emailBody}
              subject={emailDetails.subject}
              to={emailDetails.to}
              from={emailDetails.from}
              unread={emailDetails.unread}
              date={emailDetails.date}
              setViewMsg={setViewMsg}
            />
          </div>
        </div>
      )}
      {!viewMsg && (
        <Stack gap={3}>
          {email.inboxList.length !== 0 ? (
            email.inboxList.map((inbox) => {
              const { emailBody, subject, to, from, unread, date, inboxid } =
                inbox;
              return (
                <div className={`${classes["email-bar"]}`}>
                  <button
                    key={inboxid}
                    onClick={() =>
                      renderEmail({
                        emailBody,
                        subject,
                        to,
                        from,
                        unread,
                        inboxid,
                        date,
                      })
                    }
                    className={classes["email-item"]}
                  >
                    {unread && <GoDotFill color="blue" />}
                    {from}
                  </button>
                  <Button
                    className={classes["delete-item"]}
                    onClick={() => deleteItem(inboxid, to)}
                    variant="danger"
                  >
                    <MdDeleteForever />
                  </Button>
                </div>
              );
            })
          ) : (
            <p>The Email you receive will be shown here...</p>
          )}
        </Stack>
      )}
    </div>
  );
};

export default Inbox;
