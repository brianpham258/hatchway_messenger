import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import EntryLayout from "./EntryLayout";
import EntryForm from "./EntryForm";
import StyledActions from "./StyledActions";
import { login } from "../../store/utils/thunkCreators";

const Login = (props) => {
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

  const fields = [
    {
      type: "text",
      label: "E-mail address",
      ariaLabel: "username",
      name: "username",
      required: true,
    },
    {
      type: "password",
      label: "Password",
      ariaLabel: "password",
      name: "password",
      required: true,
    },
  ];

  return (
    <EntryLayout title="Welcome back!" actions={actions}>
      <EntryForm fields={fields} btnLabel="Login" onSubmit={handleLogin} />
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
