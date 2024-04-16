import React from "react";
import classes from "./MainPage.module.css";
import { NavLink } from "react-router-dom";
import { Route, Switch, useHistory } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Compose from "../Email/Compose/Compose";
import Inbox from "../Email/Inbox/Inbox";
import { useSelector } from "react-redux";

const MainPage = () => {
  const auth=useSelector((state)=>state.auth)
  return (
    <>
      <section className={classes["main-page"]}>
        <Stack className={classes["navigation"]} gap={3}>
          <NavLink to={"/main-page/compose"}>Compose</NavLink>
          <NavLink to={"/main-page/inbox"}>Inbox</NavLink>
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
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default MainPage;
