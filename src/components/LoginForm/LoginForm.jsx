import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

function LoginForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('email')
  const [password, setPassword] = useState('');
  const [totalBudget, setTotalBudget] = useState(0);
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          //name: name,
          username: username,
          //email: email,
          password: password,
          //totalBudget: totalBudget
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <body>
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password :  
            <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>
      <div>  
      </div>
    </form>
                <h1>Clarify your Goals</h1>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1>Keep Goal Associated with Costs in Mind</h1>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1>Keep Journal Entries of your Progress</h1>


    </body>
    

  );
}

export default LoginForm;
