import React from "react";
import { Grid, Button } from "@material-ui/core";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    button: {
      fontSize: '16px !important',
      textTransform: "capitalize",
    },
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" }
  }
});

const useStyles = makeStyles(() => ({
  buttonWrapper: {
    width: "100%",
    textAlign: "center",
    marginTop: 40,
  },
  button: {
    padding: "18px 60px",
  },
}));

const EntryForm = ({ children, btnLabel, onSubmit }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={onSubmit}>
        <Grid>
          {children}

          <Grid className={classes.buttonWrapper}>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              {btnLabel}
            </Button>
          </Grid>
        </Grid>
      </form>
    </ThemeProvider>
  );
};

export default EntryForm;
