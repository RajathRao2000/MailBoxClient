import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import keys from "../../keys";
const useAuthAPI = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
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
      console.log("data", data);
      if (data.error) {
        alert(data.error.message);
      } else {
        e.target.email.value = "";
        e.target.password.value = "";
        dispatch(authActions.signin({ ...data }));
        history.replace("/main-page");
      }
    } catch (error) {
      console.log(error);
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
      console.log("data", data);
      if (data.error) {
        alert(data.error.message);
      } else {
        e.target.email.value = "";
        e.target.password.value = "";
        e.target.Cpassword.value = "";
        dispatch(authActions.signin({ ...data }));
        history.replace("/main-page");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { handleSignIn, handleSignUp };
};

export default useAuthAPI;
