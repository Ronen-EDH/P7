import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { Posts } from "./pages/Posts";
import { SignUp } from "./pages/SignUp";
import { useState, createContext } from "react";
import { Profile } from "./pages/Profile";

export const TokenContext = createContext();

export function App() {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const updateToken = (newToken) => {
    localStorage.setItem("userInfo", JSON.stringify(newToken));
    setToken(newToken);
  };
  const clearToken = () => {
    localStorage.removeItem("userInfo");
    setToken(null);
  };
  return (
    <TokenContext.Provider value={{ token, updateToken, clearToken }}>
      <Routes>
        {token ? (
          <>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<Navigate to="/posts" />} />
            <Route path="/signup" element={<Navigate to="/posts" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/posts" element={<Navigate to="/signin" />} />
            <Route path="/profile" element={<Navigate to="/signin" />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
      </Routes>
    </TokenContext.Provider>
  );
}
