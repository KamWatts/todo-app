import React, { useState, useContext } from 'react';
import { When } from 'react-if';
import { LoginContext } from './context.js';

function Login() {
  const context = useContext(LoginContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    context.login(username, password);
  };

  return (
    <>
      <When condition={context.loggedIn}>
        <button onClick={context.logout}>Log Out</button>
      </When>

      <When condition={!context.loggedIn}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <input
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            type="password"
          />
          <button>Login</button>
        </form>
      </When>
    </>
  );
}

export default Login;
