import "./App.css";
import { Route } from "react-router-dom";
import Header from "./components/UI/Header/Header";
import SignUp from "./components/AuthForms/SignUp/SignUp";
import Body from "./components/UI/Body/Body";
import SignIn from "./components/AuthForms/SignIn/SignIn";
import { useSelector } from "react-redux";
import MainPage from "./components/UserPages/Welcome/MainPage";
import { createPortal } from "react-dom";
import AlertMsg from "./components/UI/Alert/Alert";
function App() {
  const auth = useSelector((state) => state.auth);
  const ui = useSelector((state) => state.ui);

  return (
    <>
      {ui.showAlert &&
        createPortal(<AlertMsg />, document.getElementById("alert"))}
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
