import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";

// Crear contexto
const AuthContext = createContext();

// Usuarios "fake"
const fakeUsers = [
  { email: "admin@mail.com", password: "admin123", role: "Admin" },
  { email: "employee@mail.com", password: "emp123", role: "Employe" },
  { email: "user@mail.com", password: "user123", role: "User" },
];

export const AuthProvider = ({ children }) => {
  // Estado usuario, inicializar con localStorage si existe
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Guardar usuario en localStorage cuando cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [user]);

  // Login: buscar usuario y validar
  const login = useCallback(({ email, password, role }) => {
    const foundUser = fakeUsers.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (foundUser) {
      setUser(foundUser);
      toast.success(`✅ Welcome ${foundUser.role}!`);
      return true;
    } else {
      toast.error("❌ Invalid credentials or role mismatch!");
      return false;
    }
  }, []);

  // Logout: limpiar usuario
  const logout = useCallback(() => {
    setUser(null);
    toast.info("🚪 Logged out!");
  }, []);

  // isLoggedIn derivado
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir el contexto más fácilmente
export const useAuth = () => useContext(AuthContext);
