import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormControl, TextField, FormHelperText } from "@material-ui/core";

import EntryLayout from "./EntryLayout";
import EntryForm from "./EntryForm";
import StyledActions from "./StyledActions";
import { register } from "../../store/utils/thunkCreators";
import { useEntryFormControlStyles } from './constant';

const Register = (props) => {
  const classes = useEntryFormControlStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  const actions = (
    <StyledActions
      question="Already have an account?"
      btnLabel="Login"
      btnUrl="/login"
    />
  );

  return (
    <EntryLayout title="Create an account." actions={actions}>
      <EntryForm btnLabel="Create" onSubmit={handleRegister}>
      <FormControl
          className={classes.formControl}
          margin="normal"
          required
        >
          <TextField
            label="Username"
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
            label="E-mail address"
            aria-label="email"
            name="email"
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
            inputProps={{ minLength: 6 }}
          />
          <FormHelperText>
            {formErrorMessage.confirmPassword}
          </FormHelperText>
        </FormControl>
        <FormControl
          className={classes.formControl}
          margin="normal"
          required
        >
          <TextField
            label="Confirm Password"
            aria-label="confirmPassword"
            name="confirmPassword"
            type="password"
            inputProps={{ minLength: 6 }}
          />
          <FormHelperText>
            {formErrorMessage.confirmPassword}
          </FormHelperText>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
