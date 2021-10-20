
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RegisterForm.css";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";


const Item = styled(Grid)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(6),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function RegisterForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        name: name,
        username: username,
        email: email,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <>
      <Grid container spacing={0} columns={13}>
        <Grid item xs={6}>
          <Item>
            <Card style={{ background: "#7eadc4" }}>
              <form className="formPanel" onSubmit={registerUser}>
                <h2 className="regForm">Budget Journal Registration</h2>
                {errors.registrationMessage && (
                  <h3 className="alert" role="alert">
                    {errors.registrationMessage}
                  </h3>
                )}
                <div className="register">
                  <div>
                    <div>
                      <label htmlFor="name">
                        <TextField
                          label="Name"
                          placeholder="Name"
                          size="small"
                          value={name}
                          required
                          onChange={(event) => setName(event.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                  <br />
                  <div>
                    <label htmlFor="username">
                      <TextField
                        label="Username"
                        placeholder="Username"
                        size="small"
                        value={username}
                        required
                        onChange={(event) => setUsername(event.target.value)}
                      />
                    </label>
                  </div>
                  <br />
                  <div>
                    <label htmlFor="email">
                      <TextField
                        label="E-mail"
                        placeholder="Email"
                        size="small"
                        value={email}
                        required
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </label>
                  </div>
                  <br />
                  <div>
                    <label htmlFor="password">
                      <TextField
                        label="Password"
                        placeholder="Password"
                        size="small"
                        type="password"
                        name="password"
                        value={password}
                        required
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </label>
                  </div>
                </div>
                <br />
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    type="submit"
                    name="submit"
                    value="Register"
                  >
                    Create Account
                  </Button>
                  <br />
                  Already have an Account?
                  <Button
                    size="small"
                    variant="text"
                    color="secondary"
                    type="button"
                    className="btn btn_asLink"
                    onClick={() => {
                      history.push("/login");
                    }}
                  >
                    Login
                  </Button>
                </div>
              </form>
            </Card>
          </Item>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={6}>
          <br />
          <br />
          <h1> &nbsp; Clarify your Goals</h1>
          <h5> &nbsp; Spend time to think. Clarify those ideas.</h5>
          <h5> &nbsp; Focus on your ideas and plan.</h5>
          <br />
          <h1> &nbsp; Keep Goal Associated with Costs in Mind</h1>
          <h5>
            {" "}
            &nbsp; Once your goals are set you'll be able to track them all.
          </h5>
          <h5>
            {" "}
            &nbsp; Think about your budget and the cost associated with your
            goal
          </h5>
          <br />
          <h1> &nbsp; Keep Journal Entries of your Progress</h1>
          <h5>
            {" "}
            &nbsp; Keep track of your thoughts and the progress towards a goal.
          </h5>
          <h5> &nbsp; Journals are a key component to reflecting</h5>
        </Grid>
      </Grid>
    </>
  );
}

export default RegisterForm;
