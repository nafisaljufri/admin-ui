import { createContext, useState } from "react";
import axios from "axios";
import { loginService, logoutService } from "../services/authService";

// Mock user database
const mockUsers = [
  { id: 1, email: "demo@demo.com", password: "demo123", name: "Demo User" },
];

// Generate a mock token
const generateMockToken = (user) => {
  return btoa(
    JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      exp: Date.now() + 86400000, // 24 hours
    }),
  );
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      return {
        id: payload.userId,
        name: payload.name,
        email: payload.email,
      };
    } catch {
      localStorage.removeItem("token");
      return null;
    }
  });

  const login = async (email, password) => {
    try {
      const response = await loginService(email, password);

      console.log("Login Response:", response);

      // Simpan refresh token
      localStorage.setItem("token", response.refreshToken);

      // Decode JWT untuk mendapatkan data user
      const payload = JSON.parse(atob(response.refreshToken.split(".")[1]));

      const currentUser = {
        id: payload.userId,
        name: payload.name,
        email: payload.email,
      };

      setUser(currentUser);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        msg: error.msg || "Email atau password salah",
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        "https://jwt-auth-eight-neon.vercel.app/register",
        {
          name,
          email,
          password,
        },
      );

      return {
        success: true,
        msg: response.data.msg || "Account created successfully!",
      };
    } catch (error) {
      return {
        success: false,
        msg:
          error.response?.data?.msg ||
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed",
      };
    }
  };

  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.log(error);
    }

    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
