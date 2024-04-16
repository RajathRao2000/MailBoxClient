import "./App.css";
import AuthForms from "./components/AuthForms/AuthForms";
import { Route, Switch } from "react-router-dom";
import Header from "./components/UI/Header/Header";
import SignUp from "./components/AuthForms/SignUp/SignUp";
import Body from "./components/UI/Body/Body";
import SignIn from "./components/AuthForms/SignIn/SignIn";
import Welcome from "./components/UserPages/Welcome/Welcome";

function App() {
  return (
    <>
      <Header />
      <Body>
        <Switch>
          <Route path={"/signup"}>
            <SignUp />
          </Route>
          <Route path={"/signin"}>
            <SignIn />
          </Route>
          <Route path={"/auth"}>
            <AuthForms />
          </Route>
          <Route path={"/welcome"}>
            <Welcome />
          </Route>
          
        </Switch>
      </Body>
    </>
  );
}

export default App;
