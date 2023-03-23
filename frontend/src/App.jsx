import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { SignUp } from "./pages/SignUp";
import { useEffect, useState } from "react";

export function App() {
  // const [token, setToken] = useState("");
  // console.log("token:", token);
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setIsUserLogedIn(userInfo);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login funcSetIsUserLogedIn={setIsUserLogedIn} />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      {isUserLogedIn ? <Route path="/posts" element={<Main isUserLogedIn={isUserLogedIn} funcSetIsUserLogedIn={setIsUserLogedIn} />}></Route> : <Route path="/posts" element={<Navigate to="/login" />} />}
    </Routes>
  );
}
