import React, { forwardRef } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  uplodaerWrapper: {
    position: "absolute",
    right: 15,
    top: 25,
    width: 20,
    height: 20,
    cursor: "pointer",
  },
  input: {
    display: "none",
  },
  photoIcon: {
    fontSize: 30,
    width: 20,
  },
}));

const ImageUploader = ({ onChange }) => {
  const classes = useStyles();
  return (
    <Box className={classes.uplodaerWrapper}>
      <label>
        <input
          className={classes.input}
          type="file"
          id="images"
          name="images"
          accept="image/*"
          onChange={onChange}
          multiple
        />
        <img className={classes.photoIcon} src="/photo-icon.png" alt="icon" />
      </label>
    </Box>
  );
};

export default ImageUploader;
