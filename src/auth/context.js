import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const LoginContext = React.createContext();

const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({ capabilities: [] });
  const [error, setError] = useState(null);

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post('https://api-js401.herokuapp.com/signup', { username, password });
      const authToken = response.data.token;
      validateToken(authToken);
      setError(null);
    } catch (error) {
      setLoggedIn(false);
      setToken(null);
      setUser({});
      setError(error.message);
      console.error("Login Error:", error);
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setToken(null);
    setUser({});
  };

  const validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      setLoggedIn(true);
      setToken(token);
      setUser(validUser);
      cookie.save("auth", token, { path: "/" }); // Save token in a cookie
    } catch (error) {
      setLoggedIn(false);
      setToken(null);
      setUser({});
      setError(error.message);
      console.log("Token Validation Error:", error);
    }
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const token = qs.get("token") || cookieToken || null;
    validateToken(token);
  }, []);

  return (
    <LoginContext.Provider
      value={{ loggedIn, token, user, error, can, login, logout }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
