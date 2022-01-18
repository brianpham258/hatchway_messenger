import React, { useRef, useEffect } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  chatBox: {
    height: "calc(100vh - 250px)",
    overflowY: "auto",
    paddingBottom: 10,
  },
}));

const Messages = (props) => {
  const classes = useStyles();
  const messageBox = useRef(null);
  const { messages, otherUser, userId, scroll, setScroll } = props;

  useEffect(() => {
    if (scroll) {
      const isAtBottom =
        messageBox.current.scrollTop + messageBox.current.clientHeight ===
        messageBox.current.scrollHeight;
      if (!isAtBottom) {
        messageBox.current.scrollTop = messageBox.current.scrollHeight;
      }
      setScroll(false);
    }
  }, [scroll, setScroll]);

  return (
    <Box className={classes.chatBox} ref={messageBox}>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            attachments={message.attachments}
            text={message.text}
            time={time}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
