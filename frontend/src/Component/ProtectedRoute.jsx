import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Check if logged in and has role === "admin"
  const isAdmin = token && user?.role === "admin";

  console.log("isAdmin:", isAdmin);
  console.log("user:", user);

  return isAdmin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
