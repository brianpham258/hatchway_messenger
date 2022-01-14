import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
    button: {
      textTransform: "capitalize",
    },
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" },
  },
  spacing: 2,
});

const useStyles = makeStyles((theme) => ({
  createButton: {
    // marginLeft: 30,
    boxShadow: "0 2px 12px rgba(74, 106, 149, 0.2)",
    borderRadius: 5,
    width: 170,
    height: 54,
  },
  actionsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "auto",
  },
}));

const StyledActions = ({ question, btnLabel, btnUrl }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Grid className={classes.actionsWrapper} container item>
        <Typography color="secondary">{question}</Typography>

        <Box sx={{ ml: 15 }}>
          <Button
            className={classes.createButton}
            size="large"
            onClick={() => history.push(btnUrl)}
          >
            <Typography color="primary">{btnLabel}</Typography>
          </Button>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default StyledActions;
