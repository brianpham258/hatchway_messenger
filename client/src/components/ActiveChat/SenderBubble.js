import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  },
  images: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: 'wrap',
    marginBottom: 10
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, attachments } = props;

  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      {!!text && text !== "" && (
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
      )}
      {attachments?.length > 0 && (
        <Box className={classes.images}>
          {attachments.map((item, index) => {
            const data = JSON.parse(item);

            return (
              <img
                key={index}
                src={data.secure_url}
                alt={data.original_filename}
                style={{ width: 100, marginLeft: 10 }}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default SenderBubble;
