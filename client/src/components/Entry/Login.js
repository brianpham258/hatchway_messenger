import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  FormControl,
  TextField,
} from "@material-ui/core";

import EntryLayout from "./EntryLayout";
import EntryForm from "./EntryForm";
import StyledActions from "./StyledActions";
import { login } from "../../store/utils/thunkCreators";
import { useEntryFormControlStyles } from './constant';

const Login = (props) => {
  const classes = useEntryFormControlStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  const actions = (
    <StyledActions
      history={history}
      question="Don't have an account?"
      btnLabel="Create account"
      btnUrl="/register"
    />
  );

  return (
    <EntryLayout title="Welcome back!" actions={actions}>
      <EntryForm btnLabel="Login" onSubmit={handleLogin}>
        <FormControl
          className={classes.formControl}
          margin="normal"
          required
        >
          <TextField
            label="E-mail address"
            aria-label="username"
            name="username"
            type="text"
          />
        </FormControl>
        <FormControl
          className={classes.formControl}
          margin="normal"
          required
        >
          <TextField
            label="Password"
            aria-label="password"
            name="password"
            type="password"
          />
        </FormControl>
      </EntryForm>
    </EntryLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
