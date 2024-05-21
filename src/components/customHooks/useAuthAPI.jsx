import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import keys from "../../keys";
import { uiactions } from "../store/UISlice";
const useAuthAPI = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${keys.SignInUrl}${keys.googleApiKey}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
          returnSecureToken: true,
        }),
      });
      let data = await res.json();
      // console.log("data", data);
      if (data.error) {
        // alert(data.error.message);
        const err = data.error.message;
        switch (err) {
          case "EMAIL_NOT_FOUND":
            dispatch(
              uiactions.setAlertValues({
                head: "Email Not Found!",
                variant: "danger",
                details: "Couldn't find you account",
              })
            );
            break;
          case "INVALID_PASSWORD":
            dispatch(
              uiactions.setAlertValues({
                head: "Invalid Password!",
                variant: "danger",
                details: "The Password is incorrect",
              })
            );
            break;
          case "USER_DISABLED":
            dispatch(
              uiactions.setAlertValues({
                head: "User Disabled!",
                variant: "danger",
                details:
                  "The user account has been disabled by an administrator",
              })
            );
            break;
          case "INVALID_LOGIN_CREDENTIALS":
            dispatch(
              uiactions.setAlertValues({
                head: "Invalid Login Credentials!",
                variant: "danger",
                details:
                  "Please recheck the credentials you have provided",
              })
            );
          default:
            dispatch(
              uiactions.setAlertValues({
                head: err,
                variant: "danger",
                details: err,
              })
            );
        }
        dispatch(
          uiactions.setAlertValues({
            head: err,
            variant: "danger",
            details: err,
          })
        );
        dispatch(uiactions.setShowAlert());
      } else {
        e.target.email.value = "";
        e.target.password.value = "";
        dispatch(authActions.signin({ ...data }));
        history.replace("/main-page/inbox");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (e.target.password.value != e.target.Cpassword.value) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(`${keys.SignUpUrl}${keys.googleApiKey}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
          returnSecureToken: true,
        }),
      });
      let data = await res.json();
      // console.log("data", data);
      if (data.error) {
        alert(data.error.message);
      } else {
        e.target.email.value = "";
        e.target.password.value = "";
        e.target.Cpassword.value = "";
        dispatch(authActions.signin({ ...data }));
        history.replace("/main-page/inbox");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return { handleSignIn, handleSignUp };
};

export default useAuthAPI;
