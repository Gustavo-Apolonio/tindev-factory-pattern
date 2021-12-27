import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import createAPI from "../../../services/api.js";

import {
  Button,
  CommingSoon,
  Container,
  ImagePreview,
  ImgContainer,
  SaveButtons,
} from "./styled";

import defaultPic from "../../../assets/images/defaultUser.svg";

const api = createAPI();

export default function PictureSide(props) {
  const navigation = useNavigate();

  const token = props.token;

  const { id, git_exists, name, user, password, bio, avatar } = props.dev || {
    id: 0,
    git_exists: true,
    name: "Developer FullStack",
    user: "FullStack-Dev",
    password: "000",
    bio: null,
    avatar: defaultPic,
  };

  const [imagePreview, setImagePreview] = useState(avatar);

  useEffect(() => {
    const avatarPreview = avatar.includes("public/profiles/images")
      ? `http://localhost:5000${avatar.substr(avatar.indexOf("/", 1))}`
      : avatar;

    setImagePreview(avatarPreview);
  }, [avatar]);

  const [image, setImage] = useState("img.png");

  const updateProfilePic = async () => {
    try {
      const resp = await api.updateProfilePic(token, image, avatar);

      return resp;
    } catch (error) {
      console.log(error);

      const err = error.response || {
        data: { code: 0, message: "An occurred, try again later..." },
      };

      const code = err.data.code || 0;
      const message = err.data.message;

      switch (code) {
        case 400:
          toast.warn(message);

          break;

        case 401:
          toast.warn(message);
          toast.info("Logging you out...");

          sessionStorage.clear();

          navigation("/");
          break;

        default:
          toast.error(message, {
            theme: "dark",
          });
          break;
      }
    }
  };

  const returnOriginal = () => {
    const avatarPreview = avatar.includes("public/profiles/images")
      ? `http://localhost:5000${avatar.substr(avatar.indexOf("/", 1))}`
      : avatar;

    setImagePreview(avatarPreview);
  };

  return (
    <Container>
      <ImgContainer>
        <ImagePreview background={imagePreview}>
          <label htmlFor="pic-selector">Pick a new Profile Picture</label>
          <input
            id="pic-selector"
            type="file"
            accept="image/png, image/jpeg, image/svg+xml"
            onChange={(e) => {
              setImagePreview(URL.createObjectURL(e.target.files[0]));
              setImage(e.target.files[0]);
            }}
          />
        </ImagePreview>
        <SaveButtons>
          <Button save onClick={updateProfilePic}>
            <p>Save</p>
          </Button>
          <Button cancel onClick={returnOriginal}>
            <p>Cancel</p>
          </Button>
        </SaveButtons>
      </ImgContainer>
      <CommingSoon>
        <p>Comming</p>
        <p>Soon</p>
      </CommingSoon>
    </Container>
  );
}
