import React, { useState } from "react";
import { FormControl, FilledInput, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import { postMessage } from "../../store/utils/thunkCreators";
import ImageUploader from "./ImageUploader";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20
  },
  inputContainer: {
    alignItems: "center"
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
      formData.append("upload_preset", "messenger");
      formData.append("cloud_name", "da0gms6qh");
      formData.append("api_key", "323412189623755");

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

    event.target.value = null;
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
      <Grid className={classes.inputContainer} container>
        {images.length > 0 && <Box>Uploaded {images.length} images</Box>}
        <Grid item xs={11}>
          <FormControl fullWidth hiddenLabel>
            <FilledInput
              classes={{ root: classes.input }}
              disableUnderline
              placeholder="Type something..."
              value={text}
              name="text"
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <FormControl fullWidth hiddenLabel>
            <ImageUploader onChange={handleOnImageUpload} />
          </FormControl>
        </Grid>
      </Grid>
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
