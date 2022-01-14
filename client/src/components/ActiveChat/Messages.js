import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  chatBox: {
    height: 'calc(100vh - 250px)',
    overflowY: 'auto',
    paddingBottom: 10
  }
}));

const Messages = (props) => {
  const classes = useStyles();
  const { messages, otherUser, userId } = props;

  return (
    <Box className={classes.chatBox} id="messages">
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} attachments={message.attachments} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
