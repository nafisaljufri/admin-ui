import { createContext, useState } from "react";

// Mock user database
const mockUsers = [
  { id: 1, email: "demo@demo.com", password: "demo123", name: "Demo User" }
];

// Generate a mock token
const generateMockToken = (user) => {
  return btoa(JSON.stringify({
    id: user.id,
    email: user.email,
    name: user.name,
    exp: Date.now() + 86400000 // 24 hours
  }));
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        return JSON.parse(atob(token));
      } catch {
        localStorage.removeItem("token");
        return null;
      }
    }
    return null;
  });

  const login = (email, password) => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const token = generateMockToken(foundUser);
      setUser(JSON.parse(atob(token)));
      localStorage.setItem("token", token);
      return { success: true };
    }
    return { success: false, msg: "Email atau password salah" };
  };

  const register = (name, email, password) => {
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return { success: false, msg: "Email sudah terdaftar" };
    }
    const newUser = { id: mockUsers.length + 1, email, password, name };
    mockUsers.push(newUser);
    const token = generateMockToken(newUser);
    setUser(JSON.parse(atob(token)));
    localStorage.setItem("token", token);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
