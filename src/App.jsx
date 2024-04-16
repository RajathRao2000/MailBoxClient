import "./App.css";
import AuthForms from "./components/AuthForms/AuthForms";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./components/UI/Header/Header";
import SignUp from "./components/AuthForms/SignUp/SignUp";
import Body from "./components/UI/Body/Body";
import SignIn from "./components/AuthForms/SignIn/SignIn";
import Welcome from "./components/UserPages/Welcome/Welcome";
import { useSelector } from "react-redux";
import Email from "./components/UserPages/Email/Email";

function App() {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  return (
    <>
      <Header />
      <Body>
        <Switch>
          <Route path={"/signup"}>
            {auth.isAuthenticated ? (
              () => {
                history.replace("/welcome");
              }
            ) : (
              <SignUp />
            )}
          </Route>
          <Route path={"/signin"}>
            {auth.isAuthenticated ? (
              () => {
                history.replace("/welcome");
              }
            ) : (
              <SignIn />
            )}
          </Route>
          <Route path={"/email-editor"}>
            {auth.isAuthenticated ? (
              () => {
                history.replace("/welcome");
              }
            ) : (
              <Email />
            )}
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
