import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ❌ Not admin
  if (!user.isAdmin) {
    return <h2 style={{ textAlign: "center" }}>Access Denied ❌</h2>;
  }

  // ✅ Admin allowed
  return children;
}

export default ProtectedRoute;