import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
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
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/posts" element={<Navigate to="/signin" />} />
          <Route path="/profile" element={<Navigate to="/signin" />} />
        </>
      );
    } else {
      setRenderPath(
        <>
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/signin" element={<Navigate to="/posts" />} />
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

// return (
//   <TokenContext.Provider value={{ token, updateToken, clearToken }}>
//     <Routes>
//       {renderPath}
//       {/* <Route path="/" element={<Navigate to="/login" />} /> */}
//       <Route path="/login" element={<Login />}></Route>
//       <Route path="/signup" element={<SignUp />}></Route>
//       <Route path="/profile" element={<Profile />}></Route>
//     </Routes>
//   </TokenContext.Provider>
// );
