import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column",
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = props.conversation || {};

  const sortedMessages = useMemo(() => {
    let copiedMessages = conversation.messages || [];
    const arrLength = copiedMessages.length;
    for (let i = 0; i < arrLength; i++) {
      for (let j = 0; j < arrLength - i - 1; j++) {
        if (copiedMessages[j].createdAt > copiedMessages[j+1].createdAt) {
          const temp = copiedMessages[j];
          copiedMessages[j] = copiedMessages[j+1];
          copiedMessages[j+1] = temp;
        }
      }
    }
    return copiedMessages;
  }, [conversation.messages]);

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={sortedMessages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
          </Box>
          <Box className={classes.inputContainer}>
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) =>
          conversation.otherUser.username === state.activeConversation
      ),
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
