import { useDispatch } from "react-redux";
import { emailActions } from "../store/emailSlice";
import { sentEmailActions } from "../store/emailSentSlice";
import { useHistory } from "react-router-dom";
import keys from "../../keys";

const useFirebaseAPI = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const getInbox = async () => {
    const email = JSON.parse(localStorage.getItem("token")).Cemail;
    if (!email) {
      history.replace("/login");
    }
    const res = await fetch(`${keys.firebaseUrl}/${email}/inbox.json`);
    const data = await res.json();
    let count = 0;
    const inboxList = data?Object.keys(data).map((inboxid) => {
      const { from, to, date, subject, emailBody, unread } = data[inboxid];
      if (unread === true) count++;
      return { from, to, date, subject, emailBody, unread, inboxid };
    }):[]
    dispatch(emailActions.setInbox({ inboxList, count }));
  };

  const getSentEmails = async () => {
    const email = JSON.parse(localStorage.getItem("token")).Cemail;
    if (!email) {
      history.replace("/login");
    }
    const res = await fetch(`${keys.firebaseUrl}/${email}/sent.json`);
    const data = await res.json();
    const sentEmailList = data?Object.keys(data).map((sentEmailId) => {
      const { from, to, date, subject, emailBody, unread } = data[sentEmailId];
      return {
        from,
        to,
        date,
        subject,
        emailBody,
        unread,
        inboxid: sentEmailId,
      };
    }):[];

    dispatch(sentEmailActions.setSentEmail({ inboxList: sentEmailList }));
  };

  const sendEmail = async (e, emailBody,clearEmailbody) => {
    e.preventDefault();
    const bodyraw = {
      from: JSON.parse(localStorage.getItem("token")).email,
      to: e.target.to.value,
      subject: e.target.subject.value,
      emailBody: emailBody,
      date: new Date().toString(),
      unread: true,
    };
    try {
      let urlmail = JSON.parse(localStorage.getItem("token")).Cemail;
      const res = await fetch(`${keys.firebaseUrl}/${urlmail}/sent.json`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bodyraw),
      });
      let data = await res.json();
      // console.log("data", data);
      if (data.error) {
        alert(data.error.message);
      }
    } catch (error) {
      // console.log(error);
    }
    try {
      let urlmail = e.target.to.value.replace(/[.@]/g, "");
      const res = await fetch(`${keys.firebaseUrl}/${urlmail}/inbox.json`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bodyraw),
      });
      let data = await res.json();
      // console.log("data", data);

      if (data.error) {
        alert(data.error.message);
      }
      dispatch(emailActions.addEmail({ ...bodyraw, ...data }));
    } catch (error) {
      // console.log(error);
    }
    e.target.to.value=""
    e.target.subject.value=""
    // clearEmailbody(<p></p>)
  };

  return { getInbox, getSentEmails, sendEmail };
};

export default useFirebaseAPI;
