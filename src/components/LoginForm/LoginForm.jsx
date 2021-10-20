import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";


const Item = styled(Grid)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(12),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function LoginForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("");
  const [totalBudget, setTotalBudget] = useState(0);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
         
          username: username,
          
          password: password,
          
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <>
      <Grid container spacing={0} columns={13}>
        <Grid item xs={6}>
          <Item>
            <Card style={{ background: "#7eadc4" }}>
              <form className="formPanel" onSubmit={login}>
                <h2 className="loginHead"> Budget Journal Login</h2>
                {errors.loginMessage && (
                  <h3 className="alert" role="alert">
                    {errors.loginMessage}
                  </h3>
                )}
                <div>
                  <label htmlFor="username">
                    <TextField
                      label="Username"
                      size="small"
                      type="text"
                      name="username"
                      required
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </label>
                </div>
                <br />
                <div>
                  <label htmlFor="password">
                    <TextField
                      label="Password"
                      size="small"
                      type="password"
                      name="password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </label>
                </div>
                <br />
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    type="submit"
                    name="submit"
                    value="Log In"
                  >
                    Log In
                  </Button>
                  <br />
                  Don't have an account?
                  <Button
                    variant="text"
                    color="secondary"
                    type="button"
                    size="small"
                    className="btn btn_asLink"
                    onClick={() => {
                      history.push("/registration");
                    }}
                  >
                    Create Account
                  </Button>
                </div>
                <div></div>
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

export default LoginForm;
