import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  buttonWrapper: {
    width: '100%',
    textAlign: 'center',
    marginTop: 40,
  },
  button: {
    padding: '15px 50px'
  }
}));

const EntryForm = ({ fields, btnLabel, onSubmit }) => {
  const classes = useStyles();

  return (
    <form onSubmit={onSubmit}>
      <Grid>
        {fields.map((field) => (
          <FormControl
            style={{ width: "100%", marginBottom: 10 }}
            margin="normal"
            required={field.required}
          >
            <TextField
              label={field.label}
              aria-label={field.ariaLabel}
              name={field.name}
              type={field.type}
              {...field.controlProps}
            />
            {field.error && (
              <FormHelperText>
                {field.helperText}
              </FormHelperText>
            )}
          </FormControl>
        ))}

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
  );
};

EntryForm.propTypes = {
  btnLabel: PropTypes.string,
  fields: PropTypes.array,

  onSubmit: PropTypes.func,
};

EntryForm.defaultProps = {
  btnLabel: "Submit",
  fields: [],

  onSubmit: () => {},
};

export default EntryForm;
