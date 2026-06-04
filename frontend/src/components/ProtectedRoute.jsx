import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  if (!token) {
    return navigate('/login')
  }
  return children;
}

export default ProtectedRoute;