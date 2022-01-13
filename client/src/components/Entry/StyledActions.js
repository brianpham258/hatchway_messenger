import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  createButton: {
    marginLeft: '4%',
    padding: '10px 30px',
    boxShadow: '0 2px 12px rgba(74, 106, 149, 0.2)'
  },
  actionsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 'auto'
  }
}));

const StyledActions = ({ question, btnLabel, btnUrl }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid className={classes.actionsWrapper} container item>
      <Typography color="secondary">{question}</Typography>

      <Button className={classes.createButton} size="large" onClick={() => history.push(btnUrl)}>
        <Typography color="primary">{btnLabel}</Typography>
      </Button>
    </Grid>
  );
};

StyledActions.propTypes = {
  question: PropTypes.string.isRequired,
  btnLabel: PropTypes.string.isRequired,
  btnUrl: PropTypes.string.isRequired,
};

export default StyledActions;
