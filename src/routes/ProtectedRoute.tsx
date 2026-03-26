import { Navigate } from "react-router-dom";
import React from 'react'

interface ProtectedInterface {
  children:  React.ReactNode
}
function Protected({ children } : ProtectedInterface) {
  const auth = JSON.parse(localStorage.getItem("auth") as string);
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default Protected;