import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
  imagesWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  image: {
    width: 100,
    marginLeft: 10,
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, attachments } = props;

  const renderTextMessage = (() => (
    <>
      {!!text && text !== "" && (
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
      )}
    </>
  ))();

  const renderSingleImageWithText = () => (
    <>
      <Box className={classes.imagesWrapper}>
        {attachments?.map((item, index) => {
          const data = JSON.parse(item);
          return (
            <img
              className={classes.image}
              key={index}
              src={data.secure_url}
              alt={data.original_filename}
            />
          );
        })}
      </Box>
      {renderTextMessage}
    </>
  );

  const renderMultipleImagesWithText = () => (
    <>
      {renderTextMessage}
      <Box className={classes.images}>
        {attachments?.map((item, index) => {
          const data = JSON.parse(item);
          return (
            <img
              className={classes.image}
              key={index}
              src={data.secure_url}
              alt={data.original_filename}
            />
          );
        })}
      </Box>
    </>
  );

  const renderMessage = (() => {
    if (attachments?.length > 1)
      return renderMultipleImagesWithText();
    if (attachments?.length === 1)
      return renderSingleImageWithText();
    if (!!text) return renderTextMessage;
    return null;
  })();

  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      {renderMessage}
    </Box>
  );
};

export default SenderBubble;
