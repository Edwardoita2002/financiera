import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Puedes mostrar un loader si en el futuro gestionas estados de carga
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  // Si el usuario no está logueado, lo redirige a /signin
  return user ? (
    children
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
