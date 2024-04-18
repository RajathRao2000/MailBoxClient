import "./App.css";
import { Route, useHistory } from "react-router-dom";
import Header from "./components/UI/Header/Header";
import SignUp from "./components/AuthForms/SignUp/SignUp";
import Body from "./components/UI/Body/Body";
import SignIn from "./components/AuthForms/SignIn/SignIn";
import { useSelector } from "react-redux";
import MainPage from "./components/UserPages/Welcome/MainPage";

function App() {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  return (
    <>
      <Header />
      <Body>
        <Route path={"/"} exact>
          {auth.isAuthenticated ? <MainPage /> : <SignIn />}
        </Route>
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
