import React, { useState } from "react";
import { FormControl, FilledInput, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import axios from "axios";

import { postMessage } from "../../store/utils/thunkCreators";
import ImageUploader from "./ImageUploader";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
  },
  inputContainer: {
    alignItems: "center",
  },
  inputWrapper: {
    position: "relative",
    display: "inline-block",
    width: "100%",
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const { postMessage, otherUser, conversationId, user } = props;
  const messages = document.getElementById("messages");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleOnImageUpload = (event) => {
    const inputImages = Array.from(event.target.files);
    let imageList = images;

    inputImages.map(async (image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", `${process.env.REACT_APP_UPLOAD_PRESET}`);
      formData.append("cloud_name", `${process.env.REACT_APP_CLOUD_NAME}`);
      formData.append("api_key", `${process.env.REACT_APP_API_KEY}`);

      fetch("https://api.cloudinary.com/v1_1/da0gms6qh/image/upload", {
        method: "post",
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          imageList = imageList.concat([data]);
          setImages(imageList);
        });
    });
  };

  const handleAutoScroll = () => {
    const isAtBottom =
      messages.scrollTop + messages.clientHeight === messages.scrollHeight;
    if (!isAtBottom) messages.scrollTop = messages.scrollHeight;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target?.[0]?.value,
      attachments: images,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
    };
    await postMessage(reqBody);
    setTimeout(handleAutoScroll, 200);
    setText("");
    setImages([]);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      {images.length > 0 && <Box>Uploaded {images.length} images</Box>}
      <FormControl fullWidth hiddenLabel>
        <Box className={classes.inputWrapper}>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={text}
            name="text"
            onChange={handleChange}
          />
          <ImageUploader onChange={handleOnImageUpload} />
        </Box>
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
