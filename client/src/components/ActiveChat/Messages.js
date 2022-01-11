import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { orderBy } from 'lodash';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  chatBox: {
    height: 'calc(100vh - 300px)',
    overflowY: 'auto'
  }
}));

const Messages = (props) => {
  const classes = useStyles();
  const { messages, otherUser, userId } = props;
  const orderedMessages = orderBy(messages, 'createdAt', 'asc');

  return (
    <Box className={classes.chatBox} id="messages">
      {orderedMessages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
