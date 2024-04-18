import React, { useEffect, useState } from 'react'
import classes from "./SentEmail.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import keys from '../../../../keys';
import { sentEmailActions } from '../../../store/emailSentSlice';
import { GoDotFill } from 'react-icons/go';
import { MdDeleteForever } from 'react-icons/md';
import ViewEmail from '../ViewEmail/ViewEmail';
import { Stack } from 'react-bootstrap';

const SentEmail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [viewMsg, setViewMsg] = useState(false);
    const [emailDetails, setEmailDetails] = useState({});
  
    const sentemail = useSelector((state) => state.sent);
  
    const renderEmail = (data) => {
      console.log(data);
      // setEmailRead(data.inboxid, data.to);
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
                      {/* {unread && <GoDotFill color="blue" />} */}
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
  
}

export default SentEmail