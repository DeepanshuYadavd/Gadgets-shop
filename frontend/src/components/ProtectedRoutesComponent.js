import { Outlet, Navigate } from "react-router-dom";
import UserChatComponent from "./users/UserChatComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LoginPage from "../pages/loginpage";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/actions/userActions";

const ProtectedRoutesComponent = ({ admin }) => {
  const [isAuth, setIsAuth] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/get-token")
      .then(function (res) {
        if (res.data.token) {
          setIsAuth(res.data.token);
        }
        return isAuth;
      })
      .catch((err) => {
        dispatch(logOut())
      });
  }, [isAuth]);

  if (isAuth === undefined) return <LoginPage />;
  return isAuth && admin && isAuth !== isAuth ? (
    <Navigate to="/login" />
  ) : isAuth && admin ? (
    <Outlet />
  ) : isAuth && !admin ? (
    <>
      <UserChatComponent />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutesComponent;
