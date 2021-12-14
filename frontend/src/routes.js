import React, { useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoadingBar from "react-top-loading-bar";

import Login from "./pages/login";
import Main from "./pages/main";
import Liked from "./pages/likes";
import Disliked from "./pages/dislikes";

export default function Router() {
  const ref = useRef();

  return (
    <BrowserRouter>
      <LoadingBar color="#df4723" ref={ref} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tindev" element={<Main loadingRef={ref} />} />
        <Route
          path="/tindev/:name/likes"
          element={<Liked loadingRef={ref} />}
        />
        <Route
          path="/tindev/:name/dislikes"
          element={<Disliked loadingRef={ref} />}
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
