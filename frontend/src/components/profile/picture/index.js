import React, { useState } from "react";
import {
  Button,
  Container,
  ImagePreview,
  ImgContainer,
  SaveButtons,
} from "./styled";

import defaultPic from "../../../assets/images/defaultUser.svg";

export default function PictureSide() {
  const [imagePreview, setImagePreview] = useState(defaultPic);

  return (
    <Container>
      <ImgContainer>
        <ImagePreview background={imagePreview}>
          <label for="pic-selector">Pick a new Profile Picture</label>
          <input
            id="pic-selector"
            type="file"
            accept="image/png, image/jpeg, image/svg+xml"
            onChange={(e) => {
              setImagePreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </ImagePreview>
        <SaveButtons>
          <Button save>
            <p>Save</p>
          </Button>
          <Button cancel>
            <p>Cancel</p>
          </Button>
        </SaveButtons>
      </ImgContainer>
    </Container>
  );
}
