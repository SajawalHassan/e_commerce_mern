import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
