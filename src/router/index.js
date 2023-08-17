import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/Login";
import Sandbox from "../views/Sandbox";

export default function index() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            localStorage.getItem("token") ? (
              <Sandbox />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 
        {localStorage.getItem("token") && (
          <Route path="*" element={<Sandbox />} />
        )}
        {localStorage.getItem("token") && (
          <Route path="/home" element={<Sandbox />} />
        )}  */}
      </Routes>
    </>
  );
}
