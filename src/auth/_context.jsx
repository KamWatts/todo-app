// From in class demo

import React, { useReducer } from "react";
import jwt_decode from "jwt-decode";

const testUsers = {
  Admininistrator: {
    password: "admin",
    name: "Administrator",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ",
  },
  Editor: {
    password: "editor",
    name: "Editor",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s",
  },
  Writer: {
    password: "writer",
    name: "Writer",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68",
  },
  User: {
    password: "user",
    name: "User",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go",
  },
};

export const LoginContext = React.createContext();

function LoginProvider(props) {
  const initalState = {
    loggedIn: false,
    user: { capabilities: [] },
    error: null,
  }

  const authReducer = (state, action) => {
    switch(action.type) {
      case "LOAD":
        let { username, password } = action.payload;
        let validUser = jwt_decode(token);
        return {
          user: validUser,

        }
      case "LOGIN":
        let { username, password } = action.payload;
        let auth = testUsers[username];

        if (auth && auth.password === password) {
          try { 
            let user = jwt_decode(auth.token);
            return {
              user: user,
              token: auth.token,
              loggedIn: true,
              error: null
            }
          } catch (e) {
            return {
            ...state,
            error:e
            }
          }
        } else {
          return {
            ...state,
            error: { message: 'No user found'}
          }
        }
      case "LOGOUT":
        return initalState;
      case"AUTH_ERROR":
      return {
        ...state,
        error: action.payload,
      }
      default: return state
    }
  }
  const validateToken = () => {}

  const can = ( capability, user) => {
    return user.capabilities.include(capability);
  }

  const onLoad = () => {

  }
  const login = () => {
    dispatch({ 
    type: 'LOGIN',
    payload: ( username, password) 
});

  }

  const logout = () => {
    dispatch({ type: 'LOGOUT'})
  }


  React.useEffect(() => {
      const qs = new URLSearchParams(window.location.search);
      const cookieToken = cookie.load('auth');
      const token = qs.get('token') || cookieToken || null;
      onLoad(token);
  }, []);

  let { loggedIn, user, token, error } = state;

  return (
    <LoginContext.Provider value={{ loggedIn, error, user, token, can, login }}>
      {props.children}
    </LoginContext.Provider>
  )

 }

 export default LoginProvider;