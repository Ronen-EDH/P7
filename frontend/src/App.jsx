import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { SignUp } from "./pages/SignUp";
import { useState } from "react";

export function App() {
  const [token, setToken] = useState("");
  console.log("token:", token);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login funcSetToken={setToken} />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/posts" element={<Main token={token} />}></Route>
    </Routes>
  );
}
