import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // role vient de la BDD plus tard, pour l'instant on passe "employee" par défaut
  const login = (id, role) => {
    setUser({
      id,
      name: "Ahmed K.",
      initials: "AK",
      role, // "employee" ou "admin"
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}