import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Posts } from "./pages/Posts";
import { SignUp } from "./pages/SignUp";
import { useEffect, useState, createContext } from "react";
import { Profile } from "./pages/Profile";

export const TokenContext = createContext();

export function App() {
  let tokenFromStorage = JSON.parse(localStorage.getItem("userInfo"));
  const [token, setToken] = useState(tokenFromStorage);
  const updateToken = (newToken) => {
    localStorage.setItem("userInfo", JSON.stringify(newToken));
    setToken(newToken);
  };
  const clearToken = () => {
    localStorage.removeItem("userInfo");
    setToken(null);
  };

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
      return <Route path="/posts" element={<Posts />} />;
    }
  }

  return (
    <TokenContext.Provider value={{ token, updateToken, clearToken }}>
      <Routes>
        {renderPath()}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </TokenContext.Provider>
  );
}
