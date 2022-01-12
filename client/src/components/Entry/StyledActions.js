import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Grid, Typography, Button } from "@material-ui/core";

const StyledCreateButton = styled(Button)`
  margin-left: 4%;
  padding: 10px 30px;
  box-shadow: 0 2px 12px rgba(74, 106, 149, 0.2);
`;

const StyledActionsWrapper = styled(Grid)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: auto;
`;

const StyledActions = ({ question, btnLabel, btnUrl }) => {
  const history = useHistory();

  return (
    <StyledActionsWrapper container item>
      <Typography color="secondary">{question}</Typography>

      <StyledCreateButton size="large" onClick={() => history.push(btnUrl)}>
        <Typography color="primary">{btnLabel}</Typography>
      </StyledCreateButton>
    </StyledActionsWrapper>
  );
};

StyledActions.propTypes = {
  question: PropTypes.string.isRequired,
  btnLabel: PropTypes.string.isRequired,
  btnUrl: PropTypes.string.isRequired,
};

export default StyledActions;
