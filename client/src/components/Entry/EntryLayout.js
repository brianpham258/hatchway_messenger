import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontSize: 14,
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" }
  }
});

const useStyles = makeStyles(() => ({
  leftSide: {
    background: "url('/bg-img.png') no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    overflow: 'scroll'
  },
  rightSide: {
    height: "100vh",
    padding: "3%",
    overflow: 'scroll'
  },
  contentWrapper: {
    height: "100%",
    background: "linear-gradient(180deg, #3a8dff 0%, #86b9ff 100%)",
    opacity: "0.85",
  },
  bubbleWrapper: {
    marginBottom: 40,
  },
  formWrapper: {
    width: "100%",
    marginTop: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "70%",
  },
  message: {
    fontSize: 26,
  },
  title: {
    fontWeight: 600,
    fontSize: 26,
  },
}));

const EntryLayout = ({ title, actions, children }) => {
  const classes = useStyles();
  const screenHeight = window?.screen?.height;
  const style = screenHeight > 400 ? { padding: '45% 7% 7%' } : { padding : '20% 7% 7%' };

  return (
    <ThemeProvider theme={theme}>
      <Grid container style={{ height: "100vh" }}>
        <Grid className={classes.leftSide} item xs={0} sm={5}>
          <Box className={classes.contentWrapper} style={style}>
            <Box className={classes.bubbleWrapper}>
              <img src="/bubble.svg" alt="bubble" />
            </Box>
            <Box>
              <Typography className={classes.message}>
                Converse with anyone with any language
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid className={classes.rightSide} item xs={12} sm={7}>
          {actions && <Box>{actions}</Box>}
          <Box className={classes.formWrapper}>
            <Box className={classes.form}>
              <Typography className={classes.title}>{title}</Typography>
              {children && <Box>{children}</Box>}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default EntryLayout;
