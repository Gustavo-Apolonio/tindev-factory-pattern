import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/login";
import Main from "./pages/main";
import Liked from "./pages/likes";
import Disliked from "./pages/dislikes";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tindev" element={<Main />} />
        <Route path="/tindev/:name/likes" element={<Liked />} />
        <Route path="/tindev/:name/dislikes" element={<Disliked />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
