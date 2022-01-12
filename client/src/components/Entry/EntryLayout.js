import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";

const LeftSide = styled(Grid)`
  background: url("/bg-img.png") no-repeat;
  background-position: cover;
  background-size: cover;
  height: 100vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  text-align: center;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const RightSide = styled(Grid)`
  height: 100vh;
  padding: 3%;
`;

const StyledContentWrapper = styled.div`
  height: 100%;
  background: linear-gradient(180deg, #3a8dff 0%, #86b9ff 100%);
  opacity: 0.85;
  padding: 45% 7% 0;
`;

const StyledBubbleWrapper = styled.div`
  margin-bottom: 40px;
`;

const StyledFormWrapper = styled.div`
  width: 100%;
  margin-top: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.div`
  width: 70%;
`;

const StyledTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 20px;
`;

const LoginLayout = ({ title, actions, children }) => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <LeftSide item xs={0} sm={5}>
        <StyledContentWrapper>
          <StyledBubbleWrapper>
            <img src="/bubble.svg" alt="bubble" />
          </StyledBubbleWrapper>
          <div>
            <Typography variant="h4">
              Converse with anyone with any language
            </Typography>
          </div>
        </StyledContentWrapper>
      </LeftSide>
      <RightSide item xs={12} sm={7}>
        {actions && <div>{actions}</div>}
        <StyledFormWrapper>
          <StyledForm>
            <StyledTitle variant="h4">{title}</StyledTitle>
            {children && <div>{children}</div>}
          </StyledForm>
        </StyledFormWrapper>
      </RightSide>
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
