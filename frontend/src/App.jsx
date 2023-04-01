import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Posts } from "./pages/Posts";
import { SignUp } from "./pages/SignUp";
import { useEffect, useState, createContext } from "react";
import { Profile } from "./pages/Profile";

export const TokenContext = createContext();

export function App() {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("userInfo")));
  /*   const [token, setToken] = useState();
  const [renderPath, setRenderPath] = useState();
  // const navigate = useNavigate();
  useEffect(() => {
    let tokenFromStorage = localStorage.getItem("userInfo");
    if (tokenFromStorage) {
      tokenFromStorage = JSON.parse(tokenFromStorage);
      setToken(tokenFromStorage);
    }
  }, []); */
  const updateToken = (newToken) => {
    localStorage.setItem("userInfo", JSON.stringify(newToken));
    setToken(newToken);
  };
  const clearToken = () => {
    localStorage.removeItem("userInfo");
    setToken(null);
  };
  /*   useEffect(() => {
    // console.log("renderPath:", renderPath);
    if (!token) {
      setRenderPath(
        <>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/posts" element={<Navigate to="/login" />} />
          <Route path="/profile" element={<Navigate to="/login" />} />
        </>
      );
    } else {
      setRenderPath(
        <>
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/login" element={<Navigate to="/posts" />} />
          <Route path="/" element={<Navigate to="/posts" />} />
        </>
      );
      // navigate("/posts");
    }
  }, [token]); */

  return (
    <TokenContext.Provider value={{ token, updateToken, clearToken }}>
      <Routes>
        {token ? (
          <>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Navigate to="/posts" />} />
            <Route path="/signup" element={<Navigate to="/posts" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/posts" element={<Navigate to="/login" />} />
            <Route path="/profile" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
      </Routes>
    </TokenContext.Provider>
  );
}
