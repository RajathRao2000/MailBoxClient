import React, { useEffect } from "react";
import classes from "./MainPage.module.css";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Compose from "../Email/Compose/Compose";
import Inbox from "../Email/Inbox/Inbox";
import { useSelector } from "react-redux";
import SentEmail from "../Email/SentEmail/SentEmail";
import useFirebaseAPI from "../../customHooks/useFirebaseAPI"

const MainPage = () => {
  const auth = useSelector((state) => state.auth);
  const email = useSelector((state) => state.email);
  const {getInbox,getSentEmails}=useFirebaseAPI()

  useEffect(() => {
    getInbox();
    const inboxid = setInterval(getInbox, 2000);
    getSentEmails();
    const sentid = setInterval(getSentEmails, 2000);
    return () => {
      console.log("clearing inbox", inboxid);
      clearInterval(inboxid);
      console.log("clearing getSentEmails", sentid);
      clearInterval(sentid);
    };
  }, []);

  return (
    <>
      <section className={classes["main-page"]}>
        <Stack className={classes["navigation"]} gap={3}>
          <NavLink to={"/main-page/compose"}>Compose</NavLink>
          <NavLink to={"/main-page/inbox"}>
            Inbox{email.inboxUnreadcount}
          </NavLink>
          <NavLink to={"/main-page/sent"}>Sent</NavLink>
        </Stack>
        <div className={classes["view-page"]}>
          {auth.isAuthenticated && (
            <>
              <Route path={"/main-page/compose"}>
                <Compose />
              </Route>
              <Route path={"/main-page/inbox"}>
                <Inbox />
              </Route>
              <Route path={"/main-page/sent"}>
                <SentEmail />
              </Route>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default MainPage;
