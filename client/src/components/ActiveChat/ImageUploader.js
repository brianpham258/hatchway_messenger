import React from "react";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const ImageUploader = ({ onChange }) => {
  return (
    <label>
      <input
        type="file"
        id="images"
        name="images"
        accept="image/*"
        onChange={onChange}
        style={{ display: "none" }}
        multiple
      />
      <AddPhotoAlternateIcon style={{ fontSize: 30 }} />
    </label>
  );
};

export default ImageUploader;
