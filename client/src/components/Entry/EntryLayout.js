import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  leftSide: {
    background: "url('/bg-img.png') no-repeat",
    backgroundPosition: "cover",
    backgroundSize: "cover",
    height: '100vh',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  },
  rightSide: {
    height: '100vh',
    padding: '3%'
  },
  contentWrapper: {
    height: '100%',
    background: 'linear-gradient(180deg, #3a8dff 0%, #86b9ff 100%)',
    opacity: '0.85',
    padding: '45% 7% 0'
  },
  bubbleWrapper: {
    marginBottom: 40
  },
  formWrapper: {
    width: '100%',
    marginTop: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    width: '70%'
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20
  }
}));

const LoginLayout = ({ title, actions, children }) => {
  const classes = useStyles();
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid className={classes.leftSide} item xs={0} sm={5}>
        <div className={classes.contentWrapper}>
          <div className={classes.bubbleWrapper}>
            <img src="/bubble.svg" alt="bubble" />
          </div>
          <div>
            <Typography variant="h4">
              Converse with anyone with any language
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid className={classes.rightSide} item xs={12} sm={7}>
        {actions && <div>{actions}</div>}
        <div className={classes.formWrapper}>
          <div className={classes.form}>
            <Typography className={classes.title} variant="h4">{title}</Typography>
            {children && <div>{children}</div>}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

LoginLayout.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.any,
  children: PropTypes.any,
};

LoginLayout.defaultProps = {
  title: "",
  actions: undefined,
  children: undefined,
};

export default LoginLayout;
