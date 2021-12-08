import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Img, Form } from "./styled.js";

import logo from "../../assets/images/logo.svg";

import PuffLoader from "react-spinners/PuffLoader";

import { toast } from "react-toastify";

import createAPI from "../../services/api.js";
const api = createAPI();

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();

  const enterApp = async () => {
    try {
      setLoading(true);
      const req = {
        username,
        password,
      };

      const resp = await api.enter(req);

      sessionStorage.setItem("@tindev/token", resp.token);

      navigation("/tindev", { state: resp.dev });

      setLoading(false);

      return resp;
    } catch (error) {
      setLoading(false);
      const err = error.response || {
        data: { code: 0, message: "An occurred, try again later..." },
      };

      const code = err.data.code || 0;
      const message = err.data.message;

      switch (code) {
        case 400:
          toast.warn(message);
          break;

        case 404:
          toast.error(message);
          break;

        default:
          toast.error(message, {
            theme: "dark",
          });
          break;
      }
    }
  };

  const enterKey = (e) => {
    if (e.keyCode === 13) enterApp();
    return null;
  };

  return (
    <Container loading={loading}>
      <Img src={logo} alt="TINDEV" />
      <Form>
        <input
          type="text"
          placeholder="Your GitHub user"
          autoComplete={false}
          onChange={(e) => setUsername(e.target.value)}
          onKeyUp={enterKey}
        />
        <input
          type="password"
          placeholder="Your password"
          autoComplete={false}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={(e) => enterKey(e)}
        />
        <button type="button" onClick={enterApp}>
          Register/Login
        </button>
      </Form>
      <div className="loader">
        <PuffLoader color="#df4723" loading={true} />
      </div>
    </Container>
  );
}
