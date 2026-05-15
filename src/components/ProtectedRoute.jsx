import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthUser } from '../utils/storageManager';

const ProtectedRoute = ({ children }) => {
  const user = getAuthUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;