import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Posts } from "./pages/Posts";
import { SignUp } from "./pages/SignUp";
import { useEffect, useState, createContext } from "react";

export const TokenContext = createContext();

export function App() {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let defaultLogedIn;
  if (!userInfo) {
    // console.log("userInfo is null");
    userInfo = {};
    userInfo.token = null;
    defaultLogedIn = false;
  } else {
    defaultLogedIn = true;
  }
  // const [token, setToken] = useState("");
  // console.log("token:", token);
  const [isUserLogedIn, setIsUserLogedIn] = useState(defaultLogedIn);
  const [token, setToken] = useState(userInfo.token);

  // This part might be useless?
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("userInfo:", userInfo);
    if (userInfo) {
      setToken(userInfo.token);
    }
  }, []);

  function renderPath() {
    // console.log("tokenRenderEl:", token);
    if (!token) {
      return (
        <>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/posts" element={<Navigate to="/login" />} />
        </>
      );
    } else {
      return <Route path="/posts" element={<Posts isUserLogedIn={isUserLogedIn} funcSetIsUserLogedIn={setIsUserLogedIn} />} />;
    }
  }

  return (
    <TokenContext.Provider value={token}>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        {renderPath()}
        <Route path="/login" element={<Login funcSetIsUserLogedIn={setIsUserLogedIn} funcSetToken={setToken} />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        {/* {isUserLogedIn ? <Route path="/posts" element={<Posts isUserLogedIn={isUserLogedIn} funcSetIsUserLogedIn={setIsUserLogedIn} />}></Route> : <Route path="/posts" element={<Navigate to="/login" />} />} */}
      </Routes>
    </TokenContext.Provider>
  );
}
