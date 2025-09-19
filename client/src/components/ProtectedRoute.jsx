import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ redirectTo = "/login" }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-6">Checking authentication...</div>;
  return user ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
