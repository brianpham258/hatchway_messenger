import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Grid,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";

const StyledButtonWrapper = styled(Grid)`
  width: 100%;
  text-align: center;
  margin-top: 40px;
`;

const StyledButton = styled(Button)`
  padding: 15px 50px;
`;

const EntryForm = ({ fields, btnLabel, onSubmit }) => {
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

        <StyledButtonWrapper>
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            {btnLabel}
          </StyledButton>
        </StyledButtonWrapper>
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
