import { Navigate } from "react-router-dom";
import React from 'react'

interface ProtectedInterface {
  children:  React.ReactNode
}
function Protected({ children } : ProtectedInterface) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default Protected;