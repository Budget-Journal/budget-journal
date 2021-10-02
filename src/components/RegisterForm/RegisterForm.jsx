import { PhotoSizeSelectActual } from '@mui/icons-material';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        name: name,
        username: username,
        email: email,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2 className= "titlePanel">Budget Journal</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}

      <div>
        <label htmlFor="name">

          <TextField
            placeholder="Name"

            size="small"
            variant="filled"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="username">
          
          <TextField
            placeholder="Username" 
            
            size="small"
            variant="filled"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>


      <div>
        <label htmlFor="email">

          <TextField
            placeholder="Email"

            size="small"
            variant="filled"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="password">
          
          <TextField
            placeholder="Password"
            size="small"
            variant="filled"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
