import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import EntryLayout from "./EntryLayout";
import EntryForm from "./EntryForm";
import StyledActions from "./StyledActions";
import { register } from "../../store/utils/thunkCreators";

const Register = (props) => {
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

  const fields = [
    {
      type: "text",
      label: "Username",
      ariaLabel: "username",
      name: "username",
      required: true,
    },
    {
      type: "email",
      label: "E-mail address",
      ariaLabel: "email",
      name: "email",
      required: true,
    },
    {
      type: "password",
      label: "Password",
      ariaLabel: "password",
      name: "password",
      required: true,
      error: !!formErrorMessage.confirmPassword,
      helperText: formErrorMessage.confirmPassword,
      controlProps: {
        inputProps: { minLength: 6 },
      },
    },
    {
      type: "password",
      label: "Confirm Password",
      ariaLabel: "confirmPassword",
      name: "confirmPassword",
      required: true,
      error: !!formErrorMessage.confirmPassword,
      helperText: formErrorMessage.confirmPassword,
      controlProps: {
        inputProps: { minLength: 6 },
      },
    },
  ];

  return (
    <EntryLayout title="Create an account." actions={actions}>
      <EntryForm fields={fields} btnLabel="Create" onSubmit={handleRegister} />
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
