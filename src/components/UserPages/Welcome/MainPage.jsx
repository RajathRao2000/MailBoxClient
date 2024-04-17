import React from "react";
import classes from "./MainPage.module.css";
import { NavLink } from "react-router-dom";
import { Route, Switch, useHistory } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Compose from "../Email/Compose/Compose";
import Inbox from "../Email/Inbox/Inbox";
import { useSelector } from "react-redux";
import SentEmail from "../Email/SentEmail/SentEmail";

const MainPage = () => {
  const auth = useSelector((state) => state.auth);
  const email=useSelector(state=>state.email)
  console.log("unread",email.inboxUnreadcount)
  return (
    <>
      <section className={classes["main-page"]}>
        <Stack className={classes["navigation"]} gap={3}>
          <NavLink to={"/main-page/compose"}>Compose</NavLink>
          <NavLink to={"/main-page/inbox"}>Inbox{email.inboxUnreadcount}</NavLink>
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
