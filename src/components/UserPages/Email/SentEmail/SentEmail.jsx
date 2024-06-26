import React, { useState } from "react";
import classes from "./SentEmail.module.css";
import { useSelector } from "react-redux";
import ViewEmail from "../ViewEmail/ViewEmail";
import { Stack } from "react-bootstrap";

const SentEmail = () => {
  const [viewMsg, setViewMsg] = useState(false);
  const [emailDetails, setEmailDetails] = useState({});

  const sentemail = useSelector((state) => state.sent);

  const renderEmail = (data) => {
    console.log(data);
    setViewMsg(true);
    setEmailDetails(data);
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
          {sentemail.sentList.length !== 0 ? (
            sentemail.sentList.map((sent) => {
              const { emailBody, subject, to, from, unread, date, inboxid } =
                sent;
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
                    {from}
                  </button>
                  {/* <Button
                      className={classes["delete-item"]}
                      onClick={() => deleteItem(inboxid, to)}
                      variant="danger"
                    >
                      <MdDeleteForever />
                    </Button> */}
                </div>
              );
            })
          ) : (
            <p>The Email you have sent will be shown here...</p>
          )}
        </Stack>
      )}
    </div>
  );
};

export default SentEmail;
