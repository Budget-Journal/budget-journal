// import { PhotoSizeSelectActual } from '@mui/icons-material';
// import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./RegisterForm.css";
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
    <div className="bodyReg">
    <form className="formPanel" onSubmit={registerUser}>
      <h2 className= "regForm">Budget Journal Registration</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className="register">
      <div>
        <div>
        <label htmlFor="name">
          Name: 
          <input className="test"
            placeholder="Name" 
            
            size="small"
            variant="filled"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        </div>
      </div>

      <div >
        <label htmlFor="username">
          Username: 
          
          <input
            
            placeholder="Username" 
            
            size="small"
            variant="filled"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>


      <div >
        <label htmlFor="email">
        Email: 
          <input
            placeholder="Email"

            size="small"
            variant="filled"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>

      <div >
        <label htmlFor="password">
          Password: 
          <input
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
      </div>
      <div>
        <input className="btnReg" type="submit" name="submit" value="Register" />
      </div>
    </form>
    </div>
  );
}

export default RegisterForm;
