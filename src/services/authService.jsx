import axios from "axios";

const API_URL = "https://jwt-auth-eight-neon.vercel.app"; // URL backend

export const loginService = async (email, password) => {
  try {
    console.log("Sending login request to:", `${API_URL}/login`);
    console.log("Payload:", { email, password });
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log("Full login response:", response);
    console.log("Login response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error full details:", error);
    console.error("Login error response:", error.response);
    console.error("Login error message:", error.message);
    throw error.response?.data || { msg: "Login gagal" };
  }
};

export const registerService = async (name, email, password) => {
  try {
    console.log("Sending register request to:", `${API_URL}/register`);
    console.log("Payload:", { name, email, password });
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    console.log("Full register response:", response);
    console.log("Register response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Register error full details:", error);
    console.error("Register error response:", error.response);
    console.error("Register error message:", error.message);
    throw error.response?.data || { msg: "Register gagal" };
  }
};

export const logoutService = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg,
    };
  }
};
