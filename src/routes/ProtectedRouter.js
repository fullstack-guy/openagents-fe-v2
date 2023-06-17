import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = {"user":1};

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
