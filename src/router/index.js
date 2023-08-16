import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../views/Login";
import Sandbox from "../views/Sandbox";

export default function index() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Sandbox />}></Route>
      {/* <Route path="/" element={} /> */}
      {/* <Route path="/" element={<Navigate to="/sandbox" />} />
      {!localStorage.getItem("token") ? (
        <Navigate to="/login" />
      ) : (
        <Navigate to="/sandbox" />
      )} */}
      {/* {!localStorage.getItem("token") && (
          <Route path="*" element={<Navigate to="/login" />} />
        )}

        {localStorage.getItem("token") && (
          <Route path="*" element={<Navigate to="/sandbox" />} />
        )} */}
    </Routes>
  );
}
