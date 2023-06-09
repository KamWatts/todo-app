import React from 'react';
import Auth from './auth';
import Login from './login.js';
import LoginContext from './context.js';
// import LoginProvider from './context.js';

function App() {
  return (
    <LoginContext>
      <Login />

      <Auth>
        <div>Any valid user can see this</div>
      </Auth>

      <Auth capability="create">
        <div>Users with create access can see this</div>
      </Auth>

      <Auth capability="update">
        <div>Users with update access can see this</div>
      </Auth>

      <Auth capability="delete">
        <div>Users with delete access can see this</div>
      </Auth>
    </LoginContext>
  );
}

export default App;
