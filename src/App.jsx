import { useState } from "react";
import "./App.css";
import AuthForms from "./components/AuthForms/AuthForms";
import { Route, Switch } from "react-router-dom";
import Header from "./components/UI/Header/Header";
import SignUp from "./components/AuthForms/SignUp/SignUp";
import Body from "./components/UI/Body/Body"

function App() {

  return (
    <>
      <Header />
      <Body>
        <Switch>
          <Route path={"/signup"}>
            <SignUp />
          </Route>
        </Switch>
      </Body>
    </>
  );
}

export default App;
