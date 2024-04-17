import "./App.css";
import AuthForms from "./components/AuthForms/AuthForms";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./components/UI/Header/Header";
import SignUp from "./components/AuthForms/SignUp/SignUp";
import Body from "./components/UI/Body/Body";
import SignIn from "./components/AuthForms/SignIn/SignIn";
import Welcome from "./components/UserPages/Welcome/MainPage";
import { useSelector } from "react-redux";
import Compose from "./components/UserPages/Email/Compose/Compose";
import MainPage from "./components/UserPages/Welcome/MainPage";
import Inbox from "./components/UserPages/Email/Inbox/Inbox";
function App() {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  return (
    <>
      <Header />
      <Body>
        <Route path={"/signup"}>
          <SignUp />
        </Route>
        <Route path={"/signin"}>
          <SignIn />
        </Route>
        {auth.isAuthenticated && (
          <Route path={"/main-page"}>
            <MainPage />
          </Route>
        )}
      </Body>
    </>
  );
}

export default App;
